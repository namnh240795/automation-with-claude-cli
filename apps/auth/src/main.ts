import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors';

export async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter();

  // Register multipart plugin for file uploads BEFORE creating NestJS app
  await fastifyAdapter.getInstance().register(require('@fastify/multipart'), {
    attachFieldsToBody: false,
    limits: {
      fileSize: 20 * 1024 * 1024, // 20MB
      files: 1,
      fieldSize: 1024, // 1KB
    },
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter as any,
  );

  const configService = app.get(ConfigService);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Apply global transform interceptor for Class-Transformer serialization
  app.useGlobalInterceptors(new TransformInterceptor());

  // Get service prefix from environment (default: auth)
  const servicePrefix = configService.get<string>('SERVICE_PREFIX', 'auth');

  // Set global prefix for all routes
  app.setGlobalPrefix(servicePrefix);

  // Enable global validation pipe with transform for DTO auto-parsing
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  // Configure CORS
  const allowedOrigins = configService
    .get<string>('CORS_ORIGIN', 'http://localhost:3000')
    .split(',');

  const rawWildcardOrigins = configService.get<string>(
    'CORS_ORIGIN_REGEX',
  );
  const envWildcardPatterns = rawWildcardOrigins
    ? rawWildcardOrigins
        .split(',')
        .map((pattern) => pattern.trim())
        .filter(Boolean)
        .map((pattern) => {
          try {
            return new RegExp(pattern);
          } catch (err) {
            console.warn(`Invalid CORS origin regex pattern: ${pattern}`, err);
            return null;
          }
        })
        .filter((pattern): pattern is RegExp => Boolean(pattern))
    : [];
  const wildcardOriginPatterns = envWildcardPatterns;

  const corsOriginValidator = (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin) {
      return callback(null, true);
    }

    // Check exact match first
    const exactMatch = allowedOrigins.includes(origin);

    // Check regex patterns
    const regexMatch = wildcardOriginPatterns.some((pattern) =>
      pattern.test(origin),
    );

    if (exactMatch || regexMatch) {
      return callback(null, true);
    }

    console.warn(`CORS blocked origin: ${origin}`);
    callback(new Error('Not allowed by CORS'));
  };

  app.enableCors({
    origin: corsOriginValidator,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  });

  // Enable API versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Configure Swagger documentation
  const config = new DocumentBuilder()
    .setTitle(`${servicePrefix.toUpperCase()} API - Authentication & Identity Management`)
    .setDescription(
      `
# Authentication & IAM API

## Overview

The **${servicePrefix.toUpperCase()} API** provides comprehensive Authentication and Identity Management (IAM) capabilities, built on NestJS with Fastify. This API offers a complete Keycloak-compatible IAM solution for modern applications.

## Features

### 🔐 Authentication
- **User Registration** - Self-service user signup with email verification
- **Authentication** - JWT-based authentication with access and refresh tokens
- **Token Management** - Secure token refresh and revocation
- **Password Management** - Secure password hashing and validation

### 👥 Identity Management
- **Multi-tenant Realms** - Support for multiple isolated realms/tenants
- **User Management** - Complete CRUD operations for user accounts
- **Role-Based Access Control (RBAC)** - Hierarchical role and permission system
- **Group Management** - Organize users into groups for easier management
- **Client Management** - OAuth/OIDC client registration and configuration

### 🔑 OAuth/OIDC Support
- **OAuth 2.0** - Standard OAuth 2.0 authorization flows
- **OpenID Connect** - OIDC 1.0 compliant identity layer
- **Client Registration** - Dynamic OAuth client registration
- **Token Introspection** - Validate tokens and check permissions

### 🌐 API Features
- **RESTful Design** - Clean, intuitive REST API architecture
- **JSON API** - JSON request/response format
- **Pagination** - Efficient pagination for list endpoints
- **Error Handling** - Consistent error responses with detailed messages
- **CORS Support** - Configurable Cross-Origin Resource Sharing

## Base URL

All API endpoints are prefixed with \`/${servicePrefix}\` and versioned with \`/v1\`:

\`\`\`
http://localhost:3001/${servicePrefix}/v1/{endpoint}
\`\`\`

## Authentication

Most endpoints require authentication using a Bearer token:

\`\`\`bash
Authorization: Bearer <your-access-token>
\`\`\`

### Obtaining Tokens

1. **Sign Up** - Create a new account
\`\`\`bash
POST /auth/signup
\`\`\`

2. **Sign In** - Get your access token
\`\`\`bash
POST /auth/signin
{
  "email": "user@example.com",
  "password": "your-password"
}
\`\`\`

3. **Use Token** - Include in Authorization header
\`\`\`bash
Authorization: Bearer <access-token>
\`\`\`

## Response Format

### Success Response
\`\`\`json
{
  "data": { ... },
  "meta": {
    "total": 100,
    "page": 0,
    "limit": 10,
    "total_pages": 10
  }
}
\`\`\`

### Error Response
\`\`\`json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request"
}
\`\`\`

## Pagination

List endpoints support pagination via query parameters:

- \`page\` - Page number (default: 0)
- \`limit\` - Items per page (default: 20, max: 100)

\`\`\`bash
GET /auth/api/v1/realms?page=0&limit=10
\`\`\`

## Rate Limiting

API requests are rate-limited to ensure fair usage:
- Default: 100 requests per minute
- Burst: 200 requests per minute

## Versioning

The API uses URI-based versioning. The current version is \`v1\`.

## Support & Documentation

- 📖 **Scalar UI**: http://localhost:3001/reference
- 📚 **OpenAPI JSON**: http://localhost:3001/api-json
- 🐙 **GitHub**: https://github.com/namnh240795/automation-with-claude-cli
- 📧 **Contact**: support@example.com

## Changelog

### v1.0.0 (Current)
- Initial release with comprehensive IAM features
- Multi-tenant realm support
- User, role, group, and client management
- OAuth/OIDC client registration
- JWT-based authentication
      `.trim(),
    )
    .setVersion('1.0.0')
    .setContact(
      'API Support',
      'https://github.com/namnh240795/automation-with-claude-cli/issues',
      'support@example.com',
    )
    .setLicense(
      'MIT',
      'https://opensource.org/licenses/MIT',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT access token obtained from /auth/signin endpoint',
        name: 'Authorization',
        in: 'header',
      },
      'bearer-auth',
    )
    .addServer('http://localhost:3001', 'Local Development')
    .addServer('https://dev-auth-api.example.com', 'Development')
    .addServer('https://staging-auth-api.example.com', 'Staging')
    .addServer('https://auth-api.example.com', 'Production')
    .addTag(
      'Authentication',
      'User authentication, registration, and token management endpoints',
    )
    .addTag('Realms', 'Multi-tenant realm management endpoints')
    .addTag('Users', 'User account management and profile endpoints')
    .addTag('Roles', 'Role-based access control (RBAC) endpoints')
    .addTag('Groups', 'User group management endpoints')
    .addTag('Clients', 'OAuth/OIDC client registration and management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app as any, config);

  // Setup Swagger JSON endpoint and Scalar UI
  SwaggerModule.setup('api', app as any, document);
  app.use(
    '/reference',
    apiReference({
      url: '/api-json',
      withFastify: true,
    }),
  );

  const port = +configService.get<string>('PORT', '3001') || 3001;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 ${servicePrefix.toUpperCase()} service running on port ${port}`);
  console.log(`📖 Scalar reference: http://localhost:${port}/reference`);
  console.log(`📚 Swagger JSON: http://localhost:${port}/api-json`);
}

// Only run bootstrap when this file is executed directly, not when imported for testing
if (require.main === module || process.argv[1].endsWith('/main.js')) {
  bootstrap();
}
