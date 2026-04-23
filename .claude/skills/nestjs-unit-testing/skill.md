# NestJS Unit Testing

A skill for writing comprehensive unit tests in NestJS applications following enterprise testing best practices.

## Test Structure

### File Organization
```
feature/
├── feature.controller.ts
├── feature.controller.spec.ts    # Controller tests
├── feature.service.ts
├── feature.service.spec.ts       # Service tests
├── feature.module.ts
├── feature.module.spec.ts        # Module tests
└── dto/
    ├── create-feature.dto.ts
    └── create-feature.dto.spec.ts # DTO validation tests
```

## Basic Test Setup

### Service Test Template

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MyService } from './my.service';
import { PrismaService } from '../prisma.service';

describe('MyService', () => {
  let service: MyService;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        MyService,
        {
          provide: PrismaService,
          useValue: {
            myModel: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              count: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = app.get<MyService>(MyService);
    prisma = app.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

### Controller Test Template

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MyController } from './my.controller';
import { MyService } from './my.service';

describe('MyController', () => {
  let controller: MyController;
  let service: jest.Mocked<MyService>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MyController],
      providers: [
        {
          provide: MyService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get<MyController>(MyController);
    service = app.get(MyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
```

## Testing Patterns

### AAA Pattern (Arrange, Act, Assert)

```typescript
describe('findOne', () => {
  it('should return a user by ID', async () => {
    // Arrange
    const userId = '123';
    const expectedUser = { id: userId, name: 'John' };
    service.findOne.mockResolvedValue(expectedUser);

    // Act
    const result = await service.findOne(userId);

    // Assert
    expect(result).toEqual(expectedUser);
    expect(service.findOne).toHaveBeenCalledWith(userId);
  });
});
```

### Testing Service Methods

#### Successful Operation
```typescript
describe('findAll', () => {
  it('should return an array of users', async () => {
    // Arrange
    const expectedUsers = [
      { id: '1', name: 'John' },
      { id: '2', name: 'Jane' },
    ];
    prisma.myModel.findMany.mockResolvedValue(expectedUsers);

    // Act
    const result = await service.findAll();

    // Assert
    expect(result).toEqual(expectedUsers);
    expect(prisma.myModel.findMany).toHaveBeenCalledWith({
      where: { deleted_at: null },
    });
  });
});
```

#### Not Found Error
```typescript
describe('findOne', () => {
  it('should throw NotFoundException when user not found', async () => {
    // Arrange
    const userId = 'non-existent';
    prisma.myModel.findUnique.mockResolvedValue(null);

    // Act & Assert
    await expect(service.findOne(userId)).rejects.toThrow(
      new NotFoundException('User not found')
    );
  });
});
```

#### Create with Validation
```typescript
describe('create', () => {
  const createDto = {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'hashedPassword',
  };

  it('should create a new user', async () => {
    // Arrange
    const expectedUser = {
      id: '123',
      ...createDto,
      created_at: new Date(),
    };
    prisma.myModel.create.mockResolvedValue(expectedUser);

    // Act
    const result = await service.create(createDto, 'user-id');

    // Assert
    expect(result).toEqual(expectedUser);
    expect(prisma.myModel.create).toHaveBeenCalledWith({
      data: {
        ...createDto,
        created_by: 'user-id',
        updated_by: 'user-id',
      },
    });
  });

  it('should throw ConflictException for duplicate email', async () => {
    // Arrange
    const error = { code: 'P2002' };
    prisma.myModel.create.mockRejectedValue(error);

    // Act & Assert
    await expect(service.create(createDto, 'user-id')).rejects.toThrow(
      new ConflictException('Email already exists')
    );
  });
});
```

#### Update Operation
```typescript
describe('update', () => {
  it('should update a user', async () => {
    // Arrange
    const userId = '123';
    const updateDto = { email: 'newemail@example.com' };
    const existingUser = { id: userId, email: 'old@example.com' };
    const updatedUser = { ...existingUser, ...updateDto };

    prisma.myModel.findUnique.mockResolvedValue(existingUser);
    prisma.myModel.update.mockResolvedValue(updatedUser);

    // Act
    const result = await service.update(userId, updateDto, 'user-id');

    // Assert
    expect(result).toEqual(updatedUser);
    expect(prisma.myModel.update).toHaveBeenCalledWith({
      where: { id: userId, deleted_at: null },
      data: {
        ...updateDto,
        updated_by: 'user-id',
        updated_at: expect.any(Date),
      },
    });
  });
});
```

#### Soft Delete
```typescript
describe('remove', () => {
  it('should soft delete a user', async () => {
    // Arrange
    const userId = '123';
    const existingUser = { id: userId, deleted_at: null };

    prisma.myModel.findUnique.mockResolvedValue(existingUser);
    prisma.myModel.update.mockResolvedValue({
      ...existingUser,
      deleted_at: new Date(),
      deleted_by: 'user-id',
    });

    // Act
    await service.remove(userId, 'user-id');

    // Assert
    expect(prisma.myModel.update).toHaveBeenCalledWith({
      where: { id: userId },
      data: {
        deleted_at: expect.any(Date),
        deleted_by: 'user-id',
      },
    });
  });
});
```

### Testing Controllers

#### GET Endpoints
```typescript
describe('findAll', () => {
  it('should return an array of users', async () => {
    // Arrange
    const expectedUsers = [
      { id: '1', username: 'john', email: 'john@example.com' },
    ];
    service.findAll.mockResolvedValue(expectedUsers);

    // Act
    const result = await controller.findAll();

    // Assert
    expect(result).toEqual(expectedUsers);
  });
});
```

#### POST with DTO
```typescript
describe('create', () => {
  it('should create a new user', async () => {
    // Arrange
    const createUserDto: CreateUserDto = {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'Password123!',
    };
    const expectedUser = { id: '123', ...createUserDto };
    service.create.mockResolvedValue(expectedUser);

    // Act
    const result = await controller.create(createUserDto);

    // Assert
    expect(result).toEqual(expectedUser);
    expect(service.create).toHaveBeenCalledWith(createUserDto);
  });
});
```

#### With Auth User
```typescript
describe('create', () => {
  it('should create user with authenticated user info', async () => {
    // Arrange
    const createUserDto = { username: 'john', email: 'john@example.com' };
    const authUser: JwtPayloadDto = {
      user_id: 'user-123',
      organization_id: 'org-123',
      organization: 'test-org',
      organization_type: 'FARMER',
      roles: ['USER'],
    };
    const expectedUser = { id: '123', ...createUserDto };
    service.create.mockResolvedValue(expectedUser);

    // Act
    const result = await controller.create(authUser, createUserDto);

    // Assert
    expect(service.create).toHaveBeenCalledWith(authUser, createUserDto);
  });
});
```

### Testing with Guards

```typescript
describe('MyController', () => {
  let controller: MyController;
  let service: jest.Mocked<MyService>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MyController],
      providers: [MyService],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = app.get<MyController>(MyController);
    service = app.get(MyService);
  });

  it('should allow access with valid token', async () => {
    service.findOne.mockResolvedValue({ id: '1' });
    const result = await controller.findOne('1');
    expect(result).toEqual({ id: '1' });
  });
});
```

### Testing Prisma Queries

#### Mock Prisma Service
```typescript
const mockPrismaService = {
  myModel: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    createMany: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
    count: jest.fn(),
    aggregate: jest.fn(),
    groupBy: jest.fn(),
  },
};
```

#### Test Complex Queries
```typescript
it('should find users with pagination and filters', async () => {
  // Arrange
  const query = { search: 'john', page: 1, limit: 10 };
  const expectedUsers = [{ id: '1', username: 'john' }];

  prisma.myModel.findMany.mockResolvedValue(expectedUsers);
  prisma.myModel.count.mockResolvedValue(1);

  // Act
  const result = await service.findAll(query);

  // Assert
  expect(prisma.myModel.findMany).toHaveBeenCalledWith({
    where: {
      deleted_at: null,
      OR: [
        { username: { contains: 'john' } },
        { email: { contains: 'john' } },
      ],
    },
    take: 10,
    skip: 0,
    orderBy: { created_at: 'desc' },
  });
});
```

#### Test Transactions
```typescript
it('should create user and role in transaction', async () => {
  // Arrange
  const userData = { username: 'john', email: 'john@example.com' };
  const transactionCallback = jest.fn().mockImplementation(async (tx) => {
    return { user: { id: '1', ...userData }, role: { id: 'role-1' } };
  });
  prisma.$transaction.mockImplementation(transactionCallback);

  // Act
  const result = await service.createUserWithRole(userData);

  // Assert
  expect(prisma.$transaction).toHaveBeenCalledWith(
    expect.any(Function)
  );
});
```

## DTO Testing

### Test Validation
```typescript
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto', () => {
  it('should validate a valid DTO', async () => {
    // Arrange
    const dto = plainToInstance(CreateUserDto, {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'SecurePass123!',
    });

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors).toHaveLength(0);
  });

  it('should fail validation for invalid email', async () => {
    // Arrange
    const dto = plainToInstance(CreateUserDto, {
      username: 'john_doe',
      email: 'invalid-email',
      password: 'SecurePass123!',
    });

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isEmail');
  });

  it('should fail validation for short password', async () => {
    // Arrange
    const dto = plainToInstance(CreateUserDto, {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'Short1!',
    });

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).toBeGreaterThan(0);
  });
});
```

## Testing Modules

### Module with External Dependencies
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MyModule } from './my.module';
import { MyService } from './my.service';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

describe('MyModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [MyModule, ConfigModule.forRoot()],
    })
      .overrideProvider(ConfigService)
      .useValue({
        get: jest.fn(),
      })
      .compile();
  });

  afterEach(async () => {
    if (module) {
      await module.close();
    }
  });

  it('should compile the module', async () => {
    expect(module).toBeDefined();
    expect(module instanceof TestingModule).toBe(true);
  });

  it('should have MyService loaded', () => {
    const service = module.get<MyService>(MyService);
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(MyService);
  });
});
```

### Module Metadata Testing (Without Compilation)
```typescript
import 'reflect-metadata';
import { MyModule } from './my.module';
import { MyService } from './my.service';

describe('MyModule', () => {
  it('should be defined', () => {
    expect(MyModule).toBeDefined();
  });

  it('should be a valid NestJS module class', () => {
    expect(typeof MyModule).toBe('function');
    expect(MyModule.constructor).toBe(Function);
  });

  it('should create instance', () => {
    const moduleInstance = new MyModule();
    expect(moduleInstance).toBeInstanceOf(MyModule);
  });
});
```

## Testing Utility Functions

### Testing Standalone Functions
```typescript
import { hashPassword, verifyPassword } from './password';

describe('Password Utilities', () => {
  describe('hashPassword', () => {
    it('should hash a password and return salt:hash format', () => {
      // Arrange
      const password = 'MySecurePassword123!';

      // Act
      const hashedPassword = hashPassword(password);

      // Assert
      expect(hashedPassword).toBeDefined();
      expect(typeof hashedPassword).toBe('string');
      expect(hashedPassword).toContain(':');
      const [salt, hash] = hashedPassword.split(':');
      expect(salt).toBeDefined();
      expect(salt.length).toBe(32); // 16 bytes = 32 hex chars
      expect(hash).toBeDefined();
      expect(hash.length).toBe(128); // 64 bytes = 128 hex chars
    });

    it('should generate different hashes for the same password', () => {
      // Arrange
      const password = 'SamePassword';

      // Act
      const hash1 = hashPassword(password);
      const hash2 = hashPassword(password);

      // Assert
      expect(hash1).not.toBe(hash2); // Different salts
    });
  });

  describe('verifyPassword', () => {
    it('should return true for correct password', () => {
      // Arrange
      const password = 'CorrectPassword123!';
      const hashedPassword = hashPassword(password);

      // Act
      const result = verifyPassword(password, hashedPassword);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false for incorrect password', () => {
      // Arrange
      const correctPassword = 'CorrectPassword123!';
      const wrongPassword = 'WrongPassword456!';
      const hashedPassword = hashPassword(correctPassword);

      // Act
      const result = verifyPassword(wrongPassword, hashedPassword);

      // Assert
      expect(result).toBe(false);
    });

    it('should handle malformed hash gracefully', () => {
      // Arrange
      const password = 'SomePassword123!';
      const malformedHash = 'invalid-hash-format';

      // Act
      const result = verifyPassword(password, malformedHash);

      // Assert
      expect(result).toBe(false);
    });

    it('should verify password with special characters', () => {
      // Arrange
      const password = 'P@$$w0rd!#$%^&*()_+-=[]{}|;:\'",.<>?/~`';
      const hashedPassword = hashPassword(password);

      // Act
      const result = verifyPassword(password, hashedPassword);

      // Assert
      expect(result).toBe(true);
    });
  });
});
```

### Testing Error Handlers with Unknown Return Type
```typescript
import { BadRequestException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { errorHandler } from './error-handler';

describe('errorHandler', () => {
  describe('AxiosError handling', () => {
    it('should handle AxiosError with full config and response', () => {
      // Arrange
      const axiosError = new AxiosError('Request failed');
      axiosError.config = {
        headers: {
          Authorization: 'Bearer secret-token',
          'Ocp-Apim-Subscription-Key': 'secret-key',
          'Content-Type': 'application/json',
        },
      } as any;
      axiosError.code = 'ERR_NETWORK';
      axiosError.response = {
        status: 500,
        statusText: 'Internal Server Error',
        data: { error: 'Something went wrong' },
      } as any;

      // Act
      const result = errorHandler(axiosError);

      // Assert
      expect(result).toEqual({
        message: 'Request failed',
        name: 'AxiosError',
        code: 'ERR_NETWORK',
        config: {
          headers: {
            Authorization: '***********',
            'Ocp-Apim-Subscription-Key': '***********',
            'Content-Type': 'application/json',
          },
        },
        response: {
          status: 500,
          statusText: 'Internal Server Error',
          data: { error: 'Something went wrong' },
        },
        status: 500,
      });
    });

    it('should redact sensitive headers', () => {
      // Arrange
      const axiosError = new AxiosError('Request failed');
      axiosError.config = {
        headers: {
          Authorization: 'Bearer my-secret-token',
          'Ocp-Apim-Subscription-Key': 'my-subscription-key',
          'Content-Type': 'application/json',
        },
      } as any;

      // Act
      const result = errorHandler(axiosError) as { config: { headers: Record<string, string> } };

      // Assert
      expect(result.config.headers.Authorization).toBe('***********');
      expect(result.config.headers['Ocp-Apim-Subscription-Key']).toBe('***********');
      expect(result.config.headers['Content-Type']).toBe('application/json');
    });
  });

  describe('unknown error type', () => {
    it('should handle unknown error type', () => {
      // Arrange
      const unknownError = { custom: 'error object' };

      // Act
      const result = errorHandler(unknownError);

      // Assert
      expect(result).toEqual({
        message: 'Unknown Exception',
      });
    });
  });
});
```

### Testing Response Handlers
```typescript
import { AxiosResponse } from 'axios';
import { responseHandler } from './response-handler';

describe('responseHandler', () => {
  it('should return response data', () => {
    // Arrange
    const data = { message: 'Success', id: 123 };
    const response: AxiosResponse = {
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
    };

    // Act
    const result = responseHandler(response);

    // Assert
    expect(result).toEqual(data);
  });

  it('should return various data types', () => {
    // Test strings, arrays, numbers, booleans, null, undefined
    const testCases = [
      'Plain text response',
      [{ id: 1 }, { id: 2 }],
      42,
      true,
      null,
      undefined,
    ];

    testCases.forEach((data) => {
      const response: AxiosResponse = {
        data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      const result = responseHandler(response);
      expect(result).toEqual(data);
    });
  });
});
```

## Testing Services with ConfigService

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MyService } from './my.service';
import { ConfigService } from '@nestjs/config';

describe('MyService', () => {
  let service: MyService;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MyService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MyService>(MyService);
    configService = module.get(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get config value', () => {
    // Arrange
    const key = 'API_KEY';
    const expectedValue = 'secret-key';
    configService.get.mockReturnValue(expectedValue);

    // Act
    const result = service.getConfig(key);

    // Assert
    expect(result).toBe(expectedValue);
    expect(configService.get).toHaveBeenCalledWith(key);
  });
});
```

## Testing Services with External Clients

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MyService } from './my.service';

describe('MyService', () => {
  let service: MyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MyService,
        {
          provide: ConfigService,
          useValue: { get: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<MyService>(MyService);

    // Mock external client
    service.redis = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
    } as any;
  });

  describe('get', () => {
    it('should get value from redis', async () => {
      // Arrange
      const key = 'test-key';
      const expectedValue = 'test-value';
      (service.redis.get as jest.Mock).mockResolvedValue(expectedValue);

      // Act
      const result = await service.get(key);

      // Assert
      expect(result).toBe(expectedValue);
      expect(service.redis.get).toHaveBeenCalledWith(key);
    });
  });
});
```

## Testing Best Practices

### 1. Test Isolation
Each test should be independent. Use `beforeEach` and `afterEach`:

```typescript
beforeEach(() => {
  // Setup before each test
  jest.clearAllMocks();
});

afterEach(() => {
  // Cleanup after each test
});

// For modules with cleanup
afterEach(async () => {
  if (module) {
    await module.close();
  }
});
```

### 2. Descriptive Test Names
```typescript
// Good
it('should return user when valid ID is provided', async () => {
});

// Bad
it('test 1', async () => {
});
```

### 3. Test One Thing
```typescript
// Good - tests single scenario
it('should throw NotFoundException when user not found', async () => {
});

// Good - tests success case
it('should return user when found', async () => {
});
```

### 4. Use Matchers
```typescript
// Object matching
expect(result).toEqual({ id: '1', name: 'John' });

// Partial matching
expect(result).toMatchObject({ name: 'John' });

// Array contains
expect(users).toContainEqual({ id: '1', name: 'John' });

// Property exists
expect(result).toHaveProperty('id');

// String contains
expect(result.message).toContain('success');

// Throws error
await expect(asyncOperation()).rejects.toThrow(NotFoundException);

// Async resolves
await expect(promise).resolves.toBeDefined();
```

### 5. Mock External Dependencies
```typescript
beforeEach(async () => {
  const module = await Test.createTestingModule({
    providers: [MyService],
  })
    .useMocker((token) => {
      if (token === PrismaService) {
        return mockDeep<PrismaService>();
      }
      return {};
    })
    .compile();
});
```

### 6. Type Casting for Unknown Return Types
When testing functions that return `unknown`, use type casting:

```typescript
const result = errorHandler(error) as { config: { headers: Record<string, string> }; status: number };
expect(result.config.headers.Authorization).toBe('***********');
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run specific test file
npm test -- app.controller.spec.ts

# Run tests matching pattern
npm test -- --testNamePattern="should return"
```

## Coverage Goals

- **Lines**: >80%
- **Branches**: >75%
- **Functions**: >80%
- **Statements**: >80%

## Common Matchers Reference

```typescript
// Equality
expect(value).toBe(expected)           // Strict equality
expect(value).toEqual(expected)        // Deep equality
expect(value).toStrictEqual(expected)  // Deep equality, strict types

// Truthiness
expect(value).toBeTruthy()
expect(value).toBeFalsy()
expect(value).toBeNull()
expect(value).toBeUndefined()

// Numbers
expect(value).toBeGreaterThan(5)
expect(value).toBeLessThan(10)
expect(value).toBeCloseTo(3.14, 1)

// Strings
expect(str).toMatch(/regex/)
expect(str).toContain('substring')

// Arrays
expect(arr).toHaveLength(3)
expect(arr).toContain(item)
expect(arr).toContainEqual({ id: '1' })

// Objects
expect(obj).toHaveProperty('key')
expect(obj).toHaveProperty('key', 'value')
expect(obj).toMatchObject({ key: 'value' })

// Async
await expect(promise).resolves.toBe(value)
await expect(promise).rejects.toThrow(Error)

// Functions
expect(fn).toHaveBeenCalled()
expect(fn).toHaveBeenCalledTimes(1)
expect(fn).toHaveBeenCalledWith(arg1, arg2)
expect(fn).lastCalledWith(arg1, arg2)
```
