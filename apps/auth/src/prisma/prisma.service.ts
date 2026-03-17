import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { PrismaClient } from '@auth/prisma-client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Load .env file early to ensure DATABASE_URL is available
// Try multiple possible paths
const envPaths = [
  path.join(process.cwd(), '.env'),
  path.join(process.cwd(), 'apps', 'auth', '.env'),
  path.join(__dirname, '..', '.env'),
];

let loaded = false;
for (const envPath of envPaths) {
  const result = dotenv.config({ path: envPath });
  if (!result.error) {
    loaded = true;
    break;
  }
}

if (!loaded && !process.env.DATABASE_URL) {
  console.warn('Warning: Could not load .env file from any of these paths:', envPaths);
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private readonly pool: Pool;

  constructor() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_URL is not defined. Please check your .env file.');
    }

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    super({ adapter });

    this.pool = pool;
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    if (this.pool) {
      await this.pool.end();
    }
    this.logger.log('Database disconnected');
  }
}
