import { errorHandler } from './error-handler';

export type CustomLog = {
  input?: any;
  output?: unknown;
  error?: unknown;
  function: string;
  message?: string;
};

export class AppLogger {
  private readonly contextName: string;

  constructor(context: string) {
    this.contextName = context;
  }

  customLog(info: CustomLog): void {
    const logMessage: Record<string, unknown> = {
      input_s: info.hasOwnProperty('input') ? info.input : '',
      output_s: info.hasOwnProperty('output') ? info.output : '',
      error_s: info.error ?? '',
      source_s: `${this.contextName}.${info.function}`,
    };
    if ('message' in info) {
      logMessage.message = info.message;
    }
    console.log(JSON.stringify(logMessage)); // Explicitly log context and message
  }
}

export function LogActivity(): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const logger = new AppLogger(target.constructor.name);
      const logInfo: CustomLog = {
        function: propertyKey.toString(),
        input: args,
      };
      try {
        const output = await originalMethod.apply(this, args);
        logInfo.output = output;
        return output;
      } catch (error) {
        logInfo.error = errorHandler(error);
        throw error;
      } finally {
        logger.customLog(logInfo);
      }
    };
    return descriptor;
  };
}
