# Naming Conventions — Cache Keys, DB, Queues, and Environment Variables

> Source: Naming standards across all layers of this monorepo

## Overview

| Layer | Convention | Example |
|-------|-----------|---------|
| TypeScript variables | camelCase | `foundUser`, `isActive` |
| TypeScript functions | camelCase | `getUserById()` |
| TypeScript classes | PascalCase | `AuthService` |
| DTO properties | snake_case | `first_name`, `is_active` |
| Database columns | snake_case | `created_at`, `password_hash` |
| Database tables | snake_case, singular | `user`, `user_profile` |
| API endpoints | kebab-case | `/auth/v1/sign-in` |
| Files | kebab-case | `user-profile.service.ts` |
| Environment variables | UPPER_SNAKE_CASE | `DATABASE_URL`, `JWT_SECRET` |
| Path aliases | @scope/name | `@app/auth-utilities` |
| Redis keys | colon-separated | `auth:user:profile:{id}` |
| RabbitMQ queues | dot-separated | `auth.user.created.email-service` |
| RabbitMQ routing keys | dot-separated | `user.created` |

## Database Naming

| Pattern | Convention | Example |
|---------|-----------|---------|
| Primary key | `id` | `id String @id @default(uuid())` |
| Foreign key | `{table}_id` | `user_id`, `organization_id` |
| Timestamps | `{action}_at` | `created_at`, `updated_at`, `deleted_at` |
| Booleans | `is_`, `has_`, `can_` | `is_active`, `has_permission` |
| Audit trail | `{action}_by` | `created_by`, `updated_by`, `deleted_by` |
| Counts | `num_{entity}` | `num_attempts`, `num_logins` |
| URLs | `{entity}_url` | `avatar_url`, `website_url` |

## Redis Key Naming

Format: `{service}:{entity}:{action}:{identifier}`

```
auth:user:profile:550e8400-e29b-41d4-a716-446655440000
auth:attempts:signin:john@example.com
auth:session:refresh:abc123token
auth:rate-limit:api:192.168.1.1
```

## RabbitMQ Naming

| Element | Format | Example |
|---------|--------|---------|
| Exchange | `{service}.events` | `auth.events` |
| Queue | `{service}.{action}.{consumer}` | `auth.user.created.email-service` |
| Routing key | `{entity}.{action}` | `user.created` |
| Dead letter queue | `{service}.dlq.{original}` | `auth.dlq.user-events` |

## Environment Variables

| Variable | Format | Example |
|----------|--------|---------|
| Service config | `UPPER_SNAKE_CASE` | `SERVICE_PREFIX`, `PORT` |
| Database | `UPPER_SNAKE_CASE` | `DATABASE_URL` |
| Secrets | `UPPER_SNAKE_CASE` | `JWT_SECRET`, `JWT_EXPIRES_IN` |
| External services | `{SERVICE}_URL` | `RABBITMQ_URL`, `REDIS_URL` |
| Feature flags | `FEATURE_{NAME}` | `FEATURE_SIGNUP_ENABLED` |

## ENVIRONMENT Constants

Always use typed constants, never raw strings:

```typescript
export const ENVIRONMENT = {
  PORT: 'PORT',
  DATABASE_URL: 'DATABASE_URL',
  JWT_SECRET: 'JWT_SECRET',
  JWT_EXPIRES_IN: 'JWT_EXPIRES_IN',
  SERVICE_PREFIX: 'SERVICE_PREFIX',
  CORS_ORIGIN: 'CORS_ORIGIN',
  REDIS_URL: 'REDIS_URL',
  RABBITMQ_URL: 'RABBITMQ_URL',
};
```
