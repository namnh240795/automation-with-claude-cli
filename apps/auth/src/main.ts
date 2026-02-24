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

  // Register multipart plugin for file uploads
  await fastifyAdapter.register(require('@fastify/multipart'), {
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
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

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
    .setTitle(`${servicePrefix.toUpperCase()} API`)
    .setDescription(`API documentation for ${servicePrefix} service`)
    .addBearerAuth()
    .addServer('http://localhost:3001', 'Local')
    .addServer('https://dev-auth-api.example.com', 'Development')
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
}

// Only run bootstrap when this file is executed directly, not when imported for testing
if (require.main === module || process.argv[1].endsWith('/main.js')) {
  bootstrap();
}
