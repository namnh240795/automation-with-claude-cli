import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SnakeCaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Don't transform null, undefined, or primitives
        if (data === null || data === undefined || typeof data !== 'object') {
          return data;
        }

        // Handle arrays
        if (Array.isArray(data)) {
          return data.map((item) => this.toSnakeCase(item));
        }

        return this.toSnakeCase(data);
      }),
    );
  }

  private toSnakeCase(obj: any): any {
    if (obj === null || obj === undefined || typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.toSnakeCase(item));
    }

    const transformed: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Convert camelCase to snake_case
        const snakeKey = key.replace(
          /[A-Z]/g,
          (letter) => `_${letter.toLowerCase()}`,
        );

        // Recursively transform nested objects
        transformed[snakeKey] = this.toSnakeCase(obj[key]);
      }
    }

    return transformed;
  }
}
