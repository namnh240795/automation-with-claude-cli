import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { ENVIRONMENT } from './environment';

@Injectable()
export class CachingService {
  redis: Redis;
  constructor(private readonly configService: ConfigService) {
    this.redis = new Redis({
      host: this.configService.get(ENVIRONMENT.REDIS_HOST),
      port: this.configService.get(ENVIRONMENT.REDIS_PORT),
      tls:
        this.configService.get(ENVIRONMENT.REDIS_TLS) === 'true'
          ? {}
          : undefined,
    });
  }

  get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  set(
    key: string,
    value: string,
    options?: {
      ttl?: number;
    },
  ): Promise<'OK' | null> {
    if (options?.ttl) {
      return this.redis.set(key, value, 'EX', options.ttl);
    }
    return this.redis.set(key, value);
  }

  del(key: string): Promise<number> {
    return this.redis.del(key);
  }
}
