# Multi-Service Routing

A skill for configuring NestJS applications with multiple service paths and Swagger documentation routing.

## Pattern Overview

Services are served under specific prefixes with their API docs at a consistent path:
- **Backend API**: `https://domain.com/backend/v1/...` → Docs at `/backend/api`
- **Station API**: `https://domain.com/station/v1/...` → Docs at `/station/api`
- **Admin API**: `https://domain.com/admin/v1/...` → Docs at `/admin/api`

## Bootstrap Configuration

### main.ts Pattern

```typescript
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

export async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter();

  // Register multipart for file uploads
  await fastifyAdapter.register(require('@fastify/multipart'), {
    attachFieldsToBody: false,
    limits: {
      fileSize: 20 * 1024 * 1024,
      files: 1,
      fieldSize: 1024,
    },
  });

  const app = await NestFactory.create(AppModule, fastifyAdapter as any);

  const configService = app.get(ConfigService);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Get service prefix from environment (default: backend)
  const servicePrefix = configService.get<string>('SERVICE_PREFIX', 'backend');

  // Set global prefix
  app.setGlobalPrefix(servicePrefix);

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Configure CORS
  const allowedOrigins = configService
    .get<string>('CORS_ORIGIN', 'http://localhost:3000')
    .split(',');

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  });

  // Enable API versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Configure Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle(`${servicePrefix.toUpperCase()} API`)
    .setDescription(`API documentation for ${servicePrefix} service`)
    .addBearerAuth()
    .addServer('http://localhost:3000', 'Local')
    .addServer(`https://dev-origin-api.example.com`, 'Development')
    .addServer(`https://api.example.com`, 'Production')
    .build();

  const document = SwaggerModule.createDocument(app as any, swaggerConfig);

  // Swagger docs at /{service_prefix}/api
  SwaggerModule.setup(`${servicePrefix}/api`, app as any, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 ${servicePrefix.toUpperCase()} service running on port ${port}`);
  console.log(`📚 Swagger docs: http://localhost:${port}/${servicePrefix}/api`);
}

if (require.main === module) {
  bootstrap();
}
```

## Environment Configuration

### .env Pattern

```bash
# Service Configuration
SERVICE_PREFIX=backend          # backend, station, admin, etc.
PORT=3000

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,https://example.com
CORS_ORIGIN_REGEX=^https://.*\\.example\\.com$

# Database
DATABASE_URL=postgresql://...

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h
```

## Service-Specific Examples

### Backend Service

**.env**:
```bash
SERVICE_PREFIX=backend
PORT=3000
```

**Result**:
- API endpoints: `http://localhost:3000/backend/v1/users`
- Swagger docs: `http://localhost:3000/backend/api`

### Station Service

**.env**:
```bash
SERVICE_PREFIX=station
PORT=3001
```

**Result**:
- API endpoints: `http://localhost:3000/station/v1/sensors`
- Swagger docs: `http://localhost:3000/station/api`

### Admin Service

**.env**:
```bash
SERVICE_PREFIX=admin
PORT=3002
```

**Result**:
- API endpoints: `http://localhost:3000/admin/v1/dashboard`
- Swagger docs: `http://localhost:3000/admin/api`

## Docker Compose Multi-Service Setup

### docker-compose.yml Pattern

```yaml
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: backend-service
    environment:
      - SERVICE_PREFIX=backend
      - PORT=3000
      - DATABASE_URL=${DATABASE_URL}
    ports:
      - "3000:3000"
    volumes:
      - ./apps/backend:/app
      - ./libs:/app/libs

  station:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: station-service
    environment:
      - SERVICE_PREFIX=station
      - PORT=3001
      - DATABASE_URL=${DATABASE_URL}
    ports:
      - "3001:3001"
    volumes:
      - ./apps/station:/app
      - ./libs:/app/libs

  admin:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: admin-service
    environment:
      - SERVICE_PREFIX=admin
      - PORT=3002
      - DATABASE_URL=${DATABASE_URL}
    ports:
      - "3002:3002"
    volumes:
      - ./apps/admin:/app
      - ./libs:/app/libs

  # Reverse proxy (Nginx)
  nginx:
    image: nginx:alpine
    container_name: api-gateway
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - backend
      - station
      - admin
```

## Nginx Gateway Configuration

### nginx.conf Pattern

```nginx
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server backend:3000;
    }

    upstream station {
        server station:3001;
    }

    upstream admin {
        server admin:3002;
    }

    server {
        listen 80;
        server_name api.example.com;

        # Backend service
        location /backend {
            rewrite ^/backend/(.*)$ /$1 break;
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        # Station service
        location /station {
            rewrite ^/station/(.*)$ /$1 break;
            proxy_pass http://station;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        # Admin service
        location /admin {
            rewrite ^/admin/(.*)$ /$1 break;
            proxy_pass http://admin;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

## Controller Pattern

Controllers automatically inherit the global prefix:

```typescript
import { Controller, Get, Version } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get all users' })
  async findAll() {
    // Accessible at: /{SERVICE_PREFIX}/v1/users
    return [];
  }
}
```

**Results with SERVICE_PREFIX=backend**:
- Endpoint: `http://localhost:3000/backend/v1/users`

**Results with SERVICE_PREFIX=station**:
- Endpoint: `http://localhost:3000/station/v1/users`

## Config Service Pattern

Create an enum for environment variables:

```typescript
// common/enum/environment.ts
export const ENVIRONMENT = {
  SERVICE_PREFIX: 'SERVICE_PREFIX',
  PORT: 'PORT',
  CORS_ORIGIN: 'CORS_ORIGIN',
  CORS_ORIGIN_REGEX: 'CORS_ORIGIN_REGEX',
  DATABASE_URL: 'DATABASE_URL',
  JWT_SECRET: 'JWT_SECRET',
  JWT_EXPIRES_IN: 'JWT_EXPIRES_IN',
};
```

## Testing Services

### Test Each Service

```bash
# Backend service
curl http://localhost:3000/backend/v1/users
curl http://localhost:3000/backend/api  # Swagger UI

# Station service
curl http://localhost:3000/station/v1/sensors
curl http://localhost:3000/station/api  # Swagger UI

# Admin service
curl http://localhost:3000/admin/v1/dashboard
curl http://localhost:3000/admin/api  # Swagger UI
```

## Benefits

1. **Service Isolation**: Each service has its own prefix
2. **Consistent Docs**: Swagger UI always at `/{service}/api`
3. **Easy Routing**: Nginx/LB can route by prefix
4. **Versioning**: URI versioning works seamlessly
5. **Multi-Tenant**: Each service can be deployed independently

## Quick Start

1. **Set environment variable**:
   ```bash
   export SERVICE_PREFIX=backend
   ```

2. **Run service**:
   ```bash
   npm run start:dev
   ```

3. **Access API**:
   ```
   API: http://localhost:3000/backend/v1/...
   Docs: http://localhost:3000/backend/api
   ```
