# Monitoring — Logging, Health Checks, and Alerting

> Source: Observability standards for this monorepo

## Logging

### Use @LogActivity() decorator on service methods
```typescript
@Injectable()
export class AuthService {
  @LogActivity()
  async signIn(dto: SignInDto) { /* ... */ }

  @LogActivity()
  async signUp(dto: SignUpDto) { /* ... */ }
}
```

### Never log sensitive data
```typescript
// NEVER log these:
console.log(user.password_hash);
console.log(`Token: ${accessToken}`);
this.logger.debug(`Credentials: ${email}:${password}`);

// OK to log:
this.logger.log(`User ${userId} signed in successfully`);
this.logger.warn(`Rate limit exceeded for ${identifier}`);
this.logger.error(`Database connection failed: ${error.message}`);
```

## Health Checks

### Use @app/health for service health endpoints
```typescript
import { HealthCheckService } from '@app/health';

@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @Get()
  check() {
    return this.health.check([
      () => this.health.checkDatabase(),
      () => this.health.checkRedis(),
    ]);
  }
}
```

Health check endpoint is at `/{SERVICE_PREFIX}/health` (outside versioning).

## Structured Logging

Logs should include:
- Timestamp (automatic via NestJS logger)
- Service name (from SERVICE_PREFIX)
- Request ID (correlation ID for tracing)
- User ID (when authenticated)
- Action performed
- Duration for slow operations

## Alerting Triggers

| Condition | Severity | Action |
|-----------|----------|--------|
| Health check failing | Critical | Page on-call |
| Error rate > 5% | High | Alert team channel |
| Response time p99 > 2s | High | Investigate bottleneck |
| Database connection pool exhausted | Critical | Scale or restart |
| RabbitMQ queue depth > 1000 | Medium | Check consumer health |
| Redis connection lost | High | Fallback to DB, alert team |

## What NOT to Monitor

- Don't log every request body (PII risk)
- Don't log at debug level in production
- Don't create custom metrics for everything — start with built-in NestJS metrics
