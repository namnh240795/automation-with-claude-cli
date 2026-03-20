declare const module: any;

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

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Configure Swagger documentation
  const config = new DocumentBuilder()
    .setTitle(`${servicePrefix.toUpperCase()} API - Authentication & Identity Management`)
    .setDescription(
      `
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

  // Enable HMR
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  // Graceful shutdown handler
  const gracefulShutdown = async (signal: string) => {
    console.log(`\n🛑 Received ${signal}, shutting down gracefully...`);
    await app.close();
    console.log('✅ Application closed successfully');
    process.exit(0);
  };

  // Handle termination signals
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGHUP', () => gracefulShutdown('SIGHUP'));
}

// Only run bootstrap when this file is executed directly, not when imported for testing
if (require.main === module || process.argv[1].endsWith('/main.js')) {
  bootstrap();
}
