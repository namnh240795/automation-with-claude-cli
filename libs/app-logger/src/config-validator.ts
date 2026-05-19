import { Injectable, OnModuleInit, Logger } from '@nestjs/common';

export interface EnvConfig {
  SERVICE_PREFIX: string;
  KAFKA_BROKER?: string;
  OPENSEARCH_URL?: string;
}

export interface ValidateEnvResult {
  valid: boolean;
  missing: string[];
  warnings: string[];
}

@Injectable()
export class ConfigValidator implements OnModuleInit {
  private readonly logger = new Logger(ConfigValidator.name);

  // Required environment variables
  private readonly required: Record<string, string> = {
    SERVICE_PREFIX: 'Service identifier used in log output (e.g., api, auth)',
  };

  // Optional but recommended
  private readonly recommended: Record<string, string> = {
    KAFKA_BROKER:
      'Kafka broker address (default: kafka:9092)',
    OPENSEARCH_URL: 'OpenSearch URL (default: http://opensearch:9200)',
  };

  onModuleInit() {
    const result = this.validate();
    if (!result.valid) {
      this.logger.error(
        `Missing required environment variables: ${result.missing.join(', ')}`,
      );
      throw new Error(
        `Environment validation failed. Missing: ${result.missing.join(', ')}`,
      );
    }
    result.warnings.forEach((w) => this.logger.warn(w));
    this.logger.log('Environment validation passed');
  }

  validate(): ValidateEnvResult {
    const missing: string[] = [];
    const warnings: string[] = [];

    for (const [key] of Object.entries(this.required)) {
      if (!process.env[key]) {
        missing.push(key);
      }
    }

    for (const [key, description] of Object.entries(this.recommended)) {
      if (!process.env[key]) {
        warnings.push(
          `${key} not set. ${description}. Using defaults.`,
        );
      }
    }

    return {
      valid: missing.length === 0,
      missing,
      warnings,
    };
  }

  getConfig(): Partial<EnvConfig> {
    return {
      SERVICE_PREFIX: process.env.SERVICE_PREFIX,
      KAFKA_BROKER: process.env.KAFKA_BROKER || 'kafka:9092',
      OPENSEARCH_URL: process.env.OPENSEARCH_URL || 'http://opensearch:9200',
    };
  }
}