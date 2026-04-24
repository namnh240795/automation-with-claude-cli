# Security — Critical Rules (Never Violate)

> Source: Security standards that must NEVER be violated. For detailed security patterns see the security-and-hardening skill.

## CRITICAL — Never Violate

| Rule | Why |
|------|-----|
| Never commit secrets to git | API keys, passwords, tokens in version history are永久 exposed |
| Never store plain-text passwords | Always use `hashPassword()` from `@app/auth-utilities` |
| Never return `password_hash` in API responses | Always use Prisma `select` to exclude it |
| Never use `process.env` directly | Always use `ConfigService` with `ENVIRONMENT` constants |
| Never disable `ValidationPipe` | All input must be validated at the boundary |
| Never use `origin: '*'` for CORS | Restrict to known origins via env config |
| Never expose stack traces to clients | Wrap all errors in NestJS exception types |
| Never skip JWT validation on protected endpoints | Always use `@UseGuards(JwtAuthGuard)` |

## Authentication Security

- Use `TokenService` for token generation — never `jwt.sign()` directly
- Rate limit all auth endpoints (see `auth-guard-patterns.md`)
- Refresh tokens stored in Redis with TTL matching token expiry
- Revoke refresh tokens on logout

## Input Validation

- All DTOs use class-validator decorators
- `ValidationPipe({ transform: true })` enabled globally
- File uploads limited by `@fastify/multipart` config (20MB, 1 file)
- Never trust client-side validation as the sole security boundary

## Data Protection

- Prisma parameterizes all queries — prevents SQL injection
- Never use `$queryRaw` with string concatenation
- Handle P2002 unique constraint errors with `ConflictException`
- Soft delete only — never hard delete records
- Always filter `deleted_at: null` in queries

## Dependency Security

- Run `pnpm audit` before every release
- Fix critical/high findings immediately
- Add new NestJS/Fastify packages to rspack `externals`
- Never install packages not on the approved tech stack (see `tech-stack.md`)

## Secrets Management

- `.env` files never committed (must be in `.gitignore`)
- `.env.example` committed as template with placeholder values
- Each service has its own `.env` in `apps/<service>/.env`
- Check before committing: `git diff --cached | grep -i "password\|secret\|api_key\|token"`
