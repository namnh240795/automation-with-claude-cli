# RabbitMQ Patterns — Async Messaging and Event-Driven Architecture

> Source: RabbitMQ/amqplib usage patterns for this monorepo

## Connection Setup

### Use a shared module for RabbitMQ connections
```typescript
// libs/messaging/src/messaging.module.ts
import { Module, Global } from '@nestjs/common';
import { MessagingService } from './messaging.service';

@Global()
@Module({
  providers: [MessagingService],
  exports: [MessagingService],
})
export class MessagingModule {}
```

### Connection configuration via ConfigService
```typescript
@Injectable()
export class MessagingService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection;
  private channel: Channel;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const url = this.configService.get<string>(ENVIRONMENT.RABBITMQ_URL, 'amqp://localhost:5672');
    this.connection = await amqp.connect(url);
    this.channel = await this.connection.createChannel();
  }

  async onModuleDestroy() {
    await this.channel?.close();
    await this.connection?.close();
  }
}
```

---

## Naming Conventions

### Exchanges
```
{service}.events          # Topic exchange for domain events
{service}.commands        # Direct exchange for commands
{service}.dead-letter     # Dead letter exchange
```

### Queues
```
{service}.{action}.{consumer}    # e.g., auth.user.created.email-service
{service}.dlq.{original_queue}   # Dead letter queue
```

### Routing Keys
```
{entity}.{action}         # e.g., user.created, user.updated, user.deleted
organization.member.added
role.assigned
```

---

## Exchange and Queue Topology

### Declare topology on module init
```typescript
async setupTopology() {
  // Dead letter exchange
  await this.channel.assertExchange('auth.dead-letter', 'direct', { durable: true });
  await this.channel.assertQueue('auth.dlq.user-events', { durable: true });
  await this.channel.bindQueue('auth.dlq.user-events', 'auth.dead-letter', 'user-events');

  // Main exchange
  await this.channel.assertExchange('auth.events', 'topic', { durable: true });

  // Queue with dead letter configuration
  await this.channel.assertQueue('auth.user.created.email-service', {
    durable: true,
    arguments: {
      'x-dead-letter-exchange': 'auth.dead-letter',
      'x-dead-letter-routing-key': 'user-events',
    },
  });

  // Bind queue to exchange with routing key
  await this.channel.bindQueue(
    'auth.user.created.email-service',
    'auth.events',
    'user.created',
  );
}
```

---

## Publishing Messages

### Message structure
```typescript
interface MessageEnvelope<T> {
  event: string;          // e.g., 'user.created'
  timestamp: string;      // ISO 8601
  correlation_id: string; // UUID for tracing
  source: string;         // Service name
  data: T;                // Payload
}
```

### Publish with confirmation
```typescript
async publish<T>(exchange: string, routingKey: string, data: T): Promise<void> {
  const envelope: MessageEnvelope<T> = {
    event: routingKey,
    timestamp: new Date().toISOString(),
    correlation_id: uuid(),
    source: this.configService.get<string>(ENVIRONMENT.SERVICE_PREFIX),
    data,
  };

  this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(envelope)), {
    persistent: true,      // Survive broker restart
    contentType: 'application/json',
    messageId: uuid(),
  });
}
```

---

## Consuming Messages

### Consumer with acknowledgment
```typescript
async consume(queue: string, handler: (data: any) => Promise<void>): Promise<void> {
  await this.channel.consume(queue, async (msg) => {
    if (!msg) return;

    try {
      const envelope = JSON.parse(msg.content.toString());
      await handler(envelope.data);
      this.channel.ack(msg);
    } catch (error) {
      // Nack and requeue on transient errors
      this.channel.nack(msg, false, !this.isPermanentError(error));
    }
  }, { prefetch: 10 }); // Process 10 messages at a time
}
```

### Service consumer pattern
```typescript
@Injectable()
export class UserEventConsumer {
  constructor(
    private readonly messaging: MessagingService,
    private readonly usersService: UsersService,
  ) {}

  async onModuleInit() {
    await this.messaging.consume(
      'auth.user.created.email-service',
      async (data: UserCreatedEvent) => {
        await this.sendWelcomeEmail(data);
      },
    );
  }
}
```

---

## Error Handling

### Dead Letter Queue processing
```typescript
async processDeadLetters(queue: string): Promise<void> {
  await this.messaging.consume(queue, async (data) => {
    this.logger.error(`Dead letter received: ${JSON.stringify(data)}`);
    // Alert, log to monitoring, or retry with backoff
  });
}
```

### Permanent vs transient errors
```typescript
private isPermanentError(error: any): boolean {
  // Validation errors, not-found — don't requeue
  if (error instanceof BadRequestException) return true;
  if (error instanceof NotFoundException) return true;
  // Network errors, timeouts — requeue
  return false;
}
```

---

## Testing

### Mock MessagingService
```typescript
const mockMessaging = {
  publish: jest.fn(),
  consume: jest.fn(),
  setupTopology: jest.fn(),
};

beforeEach(async () => {
  const module = await Test.createTestingModule({
    providers: [
      MyService,
      { provide: MessagingService, useValue: mockMessaging },
    ],
  }).compile();
});

it('publishes user.created event after user creation', async () => {
  const user = { id: '1', email: 'test@example.com' };
  prisma.user.create.mockResolvedValue(user);

  await service.create(mockUser, createDto);

  expect(mockMessaging.publish).toHaveBeenCalledWith(
    'auth.events',
    'user.created',
    expect.objectContaining({ id: '1', email: 'test@example.com' }),
  );
});
```

---

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| No dead letter queue | Failed messages lost forever | Always configure DLQ |
| Infinite requeue | Poison message loops forever | Max retry count + DLQ |
| Large messages (>128KB) | Broker memory pressure | Store in DB, send only ID |
| Missing message acknowledgment | Messages redelivered indefinitely | Always ack/nack |
| Shared queue between consumers | Competing consumers, ordering issues | One queue per consumer |
| Not setting prefetch | Consumer overwhelmed | Set prefetch to 10-50 |

---

## Checklist

- Always declare exchanges and queues as `durable: true`
- Always publish with `persistent: true`
- Always configure dead letter exchanges for critical queues
- Always ack on success, nack on failure
- Always use `MessageEnvelope` structure with correlation_id
- Always use ConfigService for RabbitMQ connection URL
- Never publish messages larger than 128KB
- Never block the consumer handler — delegate to a service
