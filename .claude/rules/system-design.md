# System Design — Architecture Principles

> Source: System design principles for this monorepo

## Architecture Pattern

This monorepo uses a **microservices-inspired monorepo** pattern:
- Each service in `apps/` is independently deployable
- Shared libraries in `libs/` are reusable across services
- Each service owns its own database (database-per-service)
- Services communicate via REST API (async via RabbitMQ where needed)

## CAP Theorem Considerations

- **Consistency:** PostgreSQL provides strong consistency per service
- **Availability:** Each service can fail independently without cascading
- **Partition tolerance:** RabbitMQ provides async fallback for service-to-service communication

## Caching Strategy

```
Request → [Cache Layer (Redis)] → [Application (NestJS)] → [Database (PostgreSQL)]
              ↓ HIT: return cached                                  ↑ MISS: query DB
              ↓ MISS: query DB → store in cache ────────────────────┘
```

- Cache reads at the service layer (see `redis-patterns` rule)
- Invalidate on writes (never serve stale data)
- TTL-based expiry as safety net

## Scaling Approach

| Scale Need | Solution |
|-----------|----------|
| More throughput | Horizontal scaling (multiple instances behind load balancer) |
| Slow queries | Database indexing, read replicas, Prisma `select` |
| Heavy processing | Offload to RabbitMQ workers |
| Session state | Externalize to Redis (not in-memory) |
| File storage | Object storage (S3), not database blobs |

## Communication Patterns

| Pattern | When | Technology |
|---------|------|-----------|
| Synchronous request/response | Client needs immediate response | REST API (Fastify) |
| Async event notification | Fire-and-forget, eventual consistency | RabbitMQ (amqplib) |
| Cache invalidation | Write-through or write-behind | Redis (ioredis) |

## Service Boundaries

Each service should:
- Own its data (no direct database access across services)
- Expose a REST API for synchronous communication
- Publish domain events for asynchronous communication
- Be independently testable and deployable

## Error Handling at Scale

- Circuit breakers for external service calls
- Dead letter queues for failed async messages
- Graceful degradation (Redis failure → fall back to DB)
- Health check endpoints for monitoring (`@app/health`)
