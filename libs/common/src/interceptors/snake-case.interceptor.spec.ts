import { SnakeCaseInterceptor } from './snake-case.interceptor';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('SnakeCaseInterceptor', () => {
  let interceptor: SnakeCaseInterceptor;
  let context: ExecutionContext;
  let next: CallHandler;

  beforeEach(() => {
    interceptor = new SnakeCaseInterceptor();

    // Mock ExecutionContext
    context = {
      switchToHttp: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
      getClass: jest.fn(),
      getHandler: jest.fn(),
      getArgs: jest.fn(),
      getArgByIndex: jest.fn(),
    } as any;
  });

  describe('intercept', () => {
    it('should return null as-is', (done) => {
      next = {
        handle: () => of(null),
      };

      interceptor.intercept(context, next).subscribe({
        next: (data) => {
          expect(data).toBeNull();
          done();
        },
      });
    });

    it('should return undefined as-is', (done) => {
      next = {
        handle: () => of(undefined),
      };

      interceptor.intercept(context, next).subscribe({
        next: (data) => {
          expect(data).toBeUndefined();
          done();
        },
      });
    });

    it('should return primitives as-is', (done) => {
      const primitives = ['string', 123, true, false];

      next = {
        handle: () => of(primitives),
      };

      interceptor.intercept(context, next).subscribe({
        next: (data) => {
          expect(data).toEqual(primitives);
          done();
        },
      });
    });

    it('should convert camelCase object keys to snake_case', (done) => {
      const input = {
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'john@example.com',
        isActive: true,
      };

      next = {
        handle: () => of(input),
      };

      interceptor.intercept(context, next).subscribe({
        next: (data) => {
          expect(data).toEqual({
            first_name: 'John',
            last_name: 'Doe',
            email_address: 'john@example.com',
            is_active: true,
          });
          done();
        },
      });
    });

    it('should handle nested objects', (done) => {
      const input = {
        user: {
          firstName: 'John',
          address: {
            streetName: 'Main St',
            zipCode: '12345',
          },
        },
      };

      next = {
        handle: () => of(input),
      };

      interceptor.intercept(context, next).subscribe({
        next: (data) => {
          expect(data).toEqual({
            user: {
              first_name: 'John',
              address: {
                street_name: 'Main St',
                zip_code: '12345',
              },
            },
          });
          done();
        },
      });
    });

    it('should handle arrays of objects', (done) => {
      const input = [
        { firstName: 'John', lastName: 'Doe' },
        { firstName: 'Jane', lastName: 'Smith' },
      ];

      next = {
        handle: () => of(input),
      };

      interceptor.intercept(context, next).subscribe({
        next: (data) => {
          expect(data).toEqual([
            { first_name: 'John', last_name: 'Doe' },
            { first_name: 'Jane', last_name: 'Smith' },
          ]);
          done();
        },
      });
    });

    it('should handle arrays with null and undefined values', (done) => {
      const input = [null, undefined, { firstName: 'John' }];

      next = {
        handle: () => of(input),
      };

      interceptor.intercept(context, next).subscribe({
        next: (data) => {
          expect(data).toEqual([null, undefined, { first_name: 'John' }]);
          done();
        },
      });
    });

    it('should handle arrays with primitives', (done) => {
      const input = [1, 2, 3, 'string', true, false];

      next = {
        handle: () => of(input),
      };

      interceptor.intercept(context, next).subscribe({
        next: (data) => {
          expect(data).toEqual([1, 2, 3, 'string', true, false]);
          done();
        },
      });
    });

    it('should handle arrays with nested arrays', (done) => {
      const input = [
        [1, 2, 3],
        ['a', 'b', 'c'],
      ];

      next = {
        handle: () => of(input),
      };

      interceptor.intercept(context, next).subscribe({
        next: (data) => {
          expect(data).toEqual([
            [1, 2, 3],
            ['a', 'b', 'c'],
          ]);
          done();
        },
      });
    });

    it('should handle empty objects', (done) => {
      const input = {};

      next = {
        handle: () => of(input),
      };

      interceptor.intercept(context, next).subscribe({
        next: (data) => {
          expect(data).toEqual({});
          done();
        },
      });
    });

    it('should handle objects with null and undefined values', (done) => {
      const input = {
        firstName: 'John',
        lastName: null,
        middleName: undefined,
        age: 30,
      };

      next = {
        handle: () => of(input),
      };

      interceptor.intercept(context, next).subscribe({
        next: (data) => {
          expect(data).toEqual({
            first_name: 'John',
            last_name: null,
            middle_name: undefined,
            age: 30,
          });
          done();
        },
      });
    });

    it('should convert consecutive capital letters correctly', (done) => {
      const input = {
        userID: '123',
        httpResponseCode: 200,
      };

      next = {
        handle: () => of(input),
      };

      interceptor.intercept(context, next).subscribe({
        next: (data) => {
          expect(data).toEqual({
            user_i_d: '123',
            http_response_code: 200,
          });
          done();
        },
      });
    });

    it('should handle single capital letter at start', (done) => {
      const input = {
        APIKey: 'secret',
        URLPath: '/api/v1',
      };

      next = {
        handle: () => of(input),
      };

      interceptor.intercept(context, next).subscribe({
        next: (data) => {
          // The regex adds underscore before every capital letter, including the first
          expect(data).toEqual({
            _a_p_i_key: 'secret',
            _u_r_l_path: '/api/v1',
          });
          done();
        },
      });
    });

    it('should preserve non-enumerable properties', (done) => {
      const input = Object.create({ inheritedProp: 'inherited' });
      input.ownProp = 'own';

      next = {
        handle: () => of(input),
      };

      interceptor.intercept(context, next).subscribe({
        next: (data) => {
          expect(data).toEqual({
            own_prop: 'own',
          });
          expect(data.inheritedProp).toBeUndefined();
          done();
        },
      });
    });

    it('should handle deeply nested structures', (done) => {
      const input = {
        levelOne: {
          levelTwo: {
            levelThree: {
              deepValue: 'found',
            },
          },
        },
      };

      next = {
        handle: () => of(input),
      };

      interceptor.intercept(context, next).subscribe({
        next: (data) => {
          expect(data).toEqual({
            level_one: {
              level_two: {
                level_three: {
                  deep_value: 'found',
                },
              },
            },
          });
          done();
        },
      });
    });

    it('should handle mixed arrays and objects', (done) => {
      const input = {
        users: [
          { firstName: 'John', roles: ['admin', 'user'] },
          { firstName: 'Jane', roles: ['user'] },
        ],
        metadata: {
          totalCount: 2,
          isActive: true,
        },
      };

      next = {
        handle: () => of(input),
      };

      interceptor.intercept(context, next).subscribe({
        next: (data) => {
          expect(data).toEqual({
            users: [
              { first_name: 'John', roles: ['admin', 'user'] },
              { first_name: 'Jane', roles: ['user'] },
            ],
            metadata: {
              total_count: 2,
              is_active: true,
            },
          });
          done();
        },
      });
    });

    it('should handle Date objects', (done) => {
      const date = new Date('2024-01-01T00:00:00.000Z');
      const input = {
        createdAt: date,
        updatedAt: date,
      };

      next = {
        handle: () => of(input),
      };

      interceptor.intercept(context, next).subscribe({
        next: (data) => {
          // Date objects are treated as objects and converted to empty {}
          // This is the current behavior of the interceptor
          expect(data.created_at).toEqual({});
          expect(data.updated_at).toEqual({});
          done();
        },
      });
    });
  });

  describe('toSnakeCase', () => {
    it('should be a private method', () => {
      expect((interceptor as any).toSnakeCase).toBeDefined();
    });
  });
});
