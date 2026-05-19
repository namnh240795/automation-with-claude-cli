import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { LogEvent } from '@app/messaging';

export type CustomLog = {
  input?: any;
  output?: unknown;
  error?: unknown;
  function: string;
  message?: string;
  duration_ms?: number;
};

@Injectable()
export class AppLogger {
  private static logPublisher: { publishLog(event: LogEvent): void } | undefined | null;
  private static serviceName: string;

  constructor(private readonly contextName?: string) {
    // Only set from env if not already set by static setter
    if (!AppLogger.serviceName) {
      AppLogger.serviceName = process.env.SERVICE_PREFIX || 'unknown';
    }
  }

  static setLogPublisher(publisher: { publishLog(event: LogEvent): void } | undefined | null): void {
    AppLogger.logPublisher = publisher;
  }

  static setServiceName(name: string): void {
    AppLogger.serviceName = name;
  }

  customLog(info: CustomLog): void {
    const event: LogEvent = {
      eventId: randomUUID(),
      source: AppLogger.serviceName,
      action: info.function,
      input: info.input !== undefined ? JSON.stringify(info.input) : undefined,
      output: info.output !== undefined ? JSON.stringify(info.output) : undefined,
      error: info.error !== undefined ? String(info.error) : undefined,
      exception: info.error instanceof Error ? info.error.stack : undefined,
      timestamp: new Date().toISOString(),
      duration_ms: info.duration_ms,
    };

    if (AppLogger.logPublisher) {
      AppLogger.logPublisher.publishLog(event);
    } else {
      const logMessage: Record<string, unknown> = {
        eventId: event.eventId,
        input_s: event.input ?? '',
        output_s: event.output ?? '',
        error_s: event.error ?? '',
        exception: event.exception,
        source_s: `${this.contextName ? `${this.contextName}.` : ''}${info.function}`,
        service_name: event.source,
        timestamp: event.timestamp,
        duration_ms: event.duration_ms,
      };
      if ('message' in info) {
        logMessage.message = info.message;
      }
      // Handle BigInt serialization for Prisma/Keycloak schema
      console.log(
        JSON.stringify(logMessage, (_key, value) => {
          return typeof value === 'bigint' ? value.toString() : value;
        }),
      );
    }
  }
}

export function LogActivity(): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const className = target.constructor?.name || 'UnknownClass';
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const startTime = Date.now();
      const logger = new AppLogger(className);
      const logInfo: CustomLog = {
        function: propertyKey.toString(),
        input: args,
      };
      try {
        const output = await originalMethod.apply(this, args);
        logInfo.output = output;
        logInfo.duration_ms = Date.now() - startTime;
        return output;
      } catch (error) {
        logInfo.error = error;
        logInfo.duration_ms = Date.now() - startTime;
        throw error;
      } finally {
        logger.customLog(logInfo);
      }
    };
    return descriptor;
  };
}