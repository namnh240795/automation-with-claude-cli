# Multi-Service Routing — NestJS Service Prefix Rules

> Source: Multi-service routing and prefix configuration for this monorepo

## 🛤️ Routing Pattern

### ✅ Each service uses SERVICE_PREFIX for isolation

| Service | Prefix | Port | Endpoints | Swagger Docs |
|---------|--------|------|-----------|-------------|
| Backend | `backend` | 3000 | `/backend/v1/...` | `/backend/api` |
| Station | `station` | 3001 | `/station/v1/...` | `/station/api` |
| Admin | `admin` | 3002 | `/admin/v1/...` | `/admin/api` |
| Auth | `auth` | 3001 | `/auth/v1/...` | `/auth/api` |

### ✅ URL format: `/{SERVICE_PREFIX}/v{version}/{route}`
```
http://localhost:3000/backend/v1/users
http://localhost:3001/auth/v1/signin
```

---

## ⚙️ Bootstrap Configuration

### ✅ Configure SERVICE_PREFIX from environment in main.ts
```typescript
const servicePrefix = configService.get<string>('SERVICE_PREFIX', 'backend');
app.setGlobalPrefix(servicePrefix);
```

### ✅ Full bootstrap pattern
```typescript
export async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter();
  await fastifyAdapter.register(require('@fastify/multipart'), {
    attachFieldsToBody: false,
    limits: { fileSize: 20 * 1024 * 1024, files: 1, fieldSize: 1024 },
  });

  const app = await NestFactory.create(AppModule, fastifyAdapter as any);
  const configService = app.get(ConfigService);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const servicePrefix = configService.get<string>('SERVICE_PREFIX', 'backend');
  app.setGlobalPrefix(servicePrefix);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableVersioning({ type: VersioningType.URI });

  // Swagger at /{service_prefix}/api
  const swaggerConfig = new DocumentBuilder()
    .setTitle(`${servicePrefix.toUpperCase()} API`)
    .setDescription(`API documentation for ${servicePrefix} service`)
    .addBearerAuth()
    .addServer('http://localhost:3000', 'Local')
    .build();

  const document = SwaggerModule.createDocument(app as any, swaggerConfig);
  SwaggerModule.setup(`${servicePrefix}/api`, app as any, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port, '0.0.0.0');
}
```

---

## ⚠️ Critical: No Duplicate Prefixes

### ✅ NEVER repeat SERVICE_PREFIX in @Controller()
```typescript
// ❌ Bad — SERVICE_PREFIX=auth in .env creates /auth/auth/signup
@Controller('auth')
export class AuthController {
  @Post('signup')
  async signUp() {}
}

// ✅ Good — creates /auth/signup
@Controller()
export class AuthController {
  @Post('signup')
  async signUp() {}
}
```

> **Why?** `setGlobalPrefix()` in main.ts already prepends the prefix. Adding it again in `@Controller()` creates a duplicate path.

---

## 🌐 CORS per Service

### ✅ Configure origins via environment
```bash
# .env
SERVICE_PREFIX=backend
PORT=3000
CORS_ORIGIN=http://localhost:3000,https://example.com
CORS_ORIGIN_REGEX=^https://.*\.example\.com$
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h
```

---

## 🐳 Docker Compose Multi-Service

### ✅ Each service gets its own container with SERVICE_PREFIX
```yaml
services:
  backend:
    environment:
      - SERVICE_PREFIX=backend
      - PORT=3000
    ports:
      - "3000:3000"

  auth:
    environment:
      - SERVICE_PREFIX=auth
      - PORT=3001
    ports:
      - "3001:3001"

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    depends_on:
      - backend
      - auth
```

### ✅ Nginx routes by prefix
```nginx
location /backend {
    proxy_pass http://backend:3000;
}

location /auth {
    proxy_pass http://auth:3001;
}
```

---

## 🚫 Checklist

- ❌ Never repeat SERVICE_PREFIX in `@Controller()` decorator
- ❌ Never hardcode service prefix — always use env variable
- ❌ Never share ports between services
- ❌ Never forget to set SERVICE_PREFIX in each service's `.env`
- ✅ Always use `setGlobalPrefix(servicePrefix)` in main.ts
- ✅ Always place Swagger docs at `/{servicePrefix}/api`
- ✅ Always configure CORS per service via environment
