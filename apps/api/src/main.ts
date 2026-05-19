import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

const ENVIRONMENT = {
  PORT: 'PORT',
  SERVICE_PREFIX: 'SERVICE_PREFIX',
  CORS_ORIGIN: 'CORS_ORIGIN',
  CORS_ORIGIN_REGEX: 'CORS_ORIGIN_REGEX',
  AUTH_SERVICE_URL: 'AUTH_SERVICE_URL',
};

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter();

  await fastifyAdapter.register(import('@fastify/multipart'), {
    attachFieldsToBody: false,
    limits: { fileSize: 20 * 1024 * 1024, files: 1, fieldSize: 1024 },
  });

  const app = await NestFactory.create(AppModule, fastifyAdapter as any);
  const configService = app.get(ConfigService);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const servicePrefix = configService.get<string>(ENVIRONMENT.SERVICE_PREFIX, 'api');
  app.setGlobalPrefix(servicePrefix);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

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

  const port = configService.get<number>(ENVIRONMENT.PORT, 3000);
  await app.listen(port, '0.0.0.0');
}

bootstrap();