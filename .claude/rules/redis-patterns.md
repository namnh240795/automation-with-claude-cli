# Redis Patterns — Caching, Sessions, and Rate Limiting

> Source: Redis/ioredis usage patterns for this monorepo

## Connection Setup

### Use the @app/caching library
```typescript
import { CacheModule, CacheService } from '@app/caching';

@Module({
  imports: [CacheModule.forRoot({ ttl: 300 })], // 5 min default TTL
  providers: [MyService],
})
export class MyModule {}
```

### Never create your own ioredis instance
```typescript
// Bad — bypasses shared caching library
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

// Good — use CacheService from @app/caching
constructor(private readonly cacheService: CacheService) {}
```

---

## Key Naming Conventions

### Format: `{service}:{entity}:{identifier}`
```
auth:user:profile:550e8400-e29b-41d4-a716-446655440000
auth:attempts:signin:john@example.com
auth:session:refresh:abc123token
auth:rate-limit:api:192.168.1.1
```

| Pattern | Purpose | TTL |
|---------|---------|-----|
| `{service}:user:profile:{user_id}` | User profile cache | 5 min |
| `{service}:attempts:{action}:{identifier}` | Rate limiting | 15 min |
| `{service}:session:refresh:{token}` | Refresh token store | Token expiry |
| `{service}:rate-limit:{endpoint}:{ip}` | API rate limiting | 1 min |
| `{service}:config:{key}` | Configuration cache | 10 min |

### Use ENVIRONMENT constants for key prefixes
```typescript
const key = `${SERVICE_NAME}:user:profile:${userId}`;
```

---

## Cache Patterns

### Cache-Aside (Most Common)
```typescript
async getUserProfile(userId: string): Promise<UserProfile> {
  const cacheKey = `auth:user:profile:${userId}`;

  // Try cache first
  const cached = await this.cacheService.get<UserProfile>(cacheKey);
  if (cached) return cached;

  // Cache miss — fetch from DB
  const user = await this.prisma.user.findUnique({
    where: { id: userId, deleted_at: null },
    select: { id: true, email: true, first_name: true, last_name: true },
  });

  if (!user) throw new NotFoundException('User not found');

  // Store in cache
  await this.cacheService.set(cacheKey, user, 300); // 5 min TTL
  return user;
}
```

### Cache Invalidation on Write
```typescript
async updateUser(userId: string, dto: UpdateUserDto): Promise<User> {
  const updated = await this.prisma.user.update({
    where: { id: userId, deleted_at: null },
    data: { ...dto, updated_at: new Date() },
  });

  // Invalidate cache after write
  await this.cacheService.del(`auth:user:profile:${userId}`);
  return updated;
}
```

### Cache Invalidation on Related Changes
```typescript
async deleteOrganization(orgId: string, user: JwtPayloadDto): Promise<void> {
  await this.prisma.$transaction(async (tx) => {
    await tx.organization.update({
      where: { id: orgId },
      data: { deleted_at: new Date(), deleted_by: user.sub },
    });
  });

  // Invalidate all organization-related caches
  await this.cacheService.del(`auth:org:${orgId}`);
  await this.cacheService.del(`auth:org:${orgId}:members`);
}
```

---

## Rate Limiting

### Per-Endpoint Rate Limiting
```typescript
private readonly rateLimits = {
  signin: { max: 5, window: 15 * 60 },      // 5 attempts per 15 min
  signup: { max: 3, window: 60 * 60 },       // 3 signups per hour
  refreshToken: { max: 10, window: 15 * 60 }, // 10 refreshes per 15 min
};

async checkRateLimit(action: string, identifier: string): Promise<void> {
  const limit = this.rateLimits[action];
  const key = `auth:attempts:${action}:${identifier}`;

  const attempts = await this.cacheService.get<number>(key) ?? 0;
  if (attempts >= limit.max) {
    throw new TooManyRequestsException(`Too many ${action} attempts. Try again later.`);
  }

  await this.cacheService.set(key, attempts + 1, limit.window);
}
```

---

## Session / Token Storage

### Refresh Token Storage
```typescript
async storeRefreshToken(token: string, userId: string, expiresIn: number): Promise<void> {
  const key = `auth:session:refresh:${token}`;
  await this.cacheService.set(key, { userId, createdAt: Date.now() }, expiresIn);
}

async validateRefreshToken(token: string): Promise<{ userId: string } | null> {
  return this.cacheService.get<{ userId: string }>(`auth:session:refresh:${token}`);
}

async revokeRefreshToken(token: string): Promise<void> {
  await this.cacheService.del(`auth:session:refresh:${token}`);
}
```

---

## Error Handling

```typescript
// Redis failures should not break the app — degrade gracefully
async getUserProfile(userId: string): Promise<UserProfile> {
  try {
    const cached = await this.cacheService.get<UserProfile>(`auth:user:profile:${userId}`);
    if (cached) return cached;
  } catch {
    // Cache failure — log and continue to DB
    this.logger.warn(`Cache read failed for user ${userId}`);
  }

  return this.prisma.user.findUnique({
    where: { id: userId, deleted_at: null },
    select: { id: true, email: true, first_name: true, last_name: true },
  });
}
```

---

## Testing Redis Interactions

```typescript
const mockCacheService = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
};

beforeEach(async () => {
  const module = await Test.createTestingModule({
    providers: [
      MyService,
      { provide: CacheService, useValue: mockCacheService },
    ],
  }).compile();

  service = module.get<MyService>(MyService);
});

afterEach(() => jest.clearAllMocks());

it('returns cached user profile without DB query', async () => {
  const cachedUser = { id: '1', email: 'test@example.com' };
  mockCacheService.get.mockResolvedValue(cachedUser);

  const result = await service.getUserProfile('1');

  expect(result).toEqual(cachedUser);
  expect(mockCacheService.get).toHaveBeenCalledWith('auth:user:profile:1');
  expect(prisma.user.findUnique).not.toHaveBeenCalled();
});
```

---

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| Storing large objects (>100KB) | Redis is memory-bound, high eviction risk | Store only IDs or summaries |
| No TTL on keys | Memory leak, stale data | Always set TTL |
| Using Redis as primary store | Data loss on restart (unless AOF/RDB) | PostgreSQL is primary, Redis is cache |
| Cache stampede | Many requests miss cache simultaneously | Use lock or staggered TTL |
| Not handling Redis failures | App crashes when Redis is down | Degrade gracefully, fall back to DB |

---

## Checklist

- Always use `@app/caching` CacheService — never create raw ioredis instances
- Always use `{service}:{entity}:{identifier}` key format
- Always set TTL on cached data
- Always invalidate cache on write operations
- Always handle Redis failures gracefully (fall back to DB)
- Never store sensitive data (passwords, tokens) in cache without encryption
- Never use Redis as the primary data store
