# NestJS Fastify Monorepo

A NestJS monorepo setup using Fastify as the HTTP adapter instead of Express.

## Project Structure

```
workspace/
├── apps/
│   └── api/                 # Main API application
│       ├── src/
│       │   ├── main.ts      # Application entry point with Fastify adapter
│       │   ├── app.module.ts
│       │   ├── app.controller.ts
│       │   └── app.service.ts
│       ├── package.json
│       └── tsconfig.app.json
├── libs/
│   └── common/              # Shared library
│       ├── src/
│       │   ├── index.ts
│       │   └── common.module.ts
│       ├── package.json
│       └── tsconfig.lib.json
├── nest-cli.json            # NestJS CLI configuration with monorepo setup
├── tsconfig.json            # Root TypeScript configuration
└── package.json             # Root package.json with workspaces

```

## Setup

### Install Dependencies

```bash
npm install
```

### Development

```bash
# Start the API in development mode
npm run start:dev

# Build the project
npm run build

# Start in production mode
npm run start:prod
```

### Workspace Management

This monorepo uses npm workspaces. Add new applications in `apps/` and new libraries in `libs/`.

To generate new resources:

```bash
# Generate a new module in the API app
nest g module users --project api

# Generate a new service in the common library
nest g service auth --project common
```

## Fastify Configuration

The application uses Fastify instead of Express. The Fastify adapter is configured in `apps/api/src/main.ts`:

```typescript
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

const app = await NestFactory.create<NestFastifyApplication>(
  AppModule,
  new FastifyAdapter(),
);
```

## Libraries

### @app/common

Shared utilities, modules, and services used across applications.

Import from the common library:

```typescript
import { CommonModule } from '@app/common';
```

## Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:cov
```

## Linting

```bash
# Run ESLint
npm run lint
```
