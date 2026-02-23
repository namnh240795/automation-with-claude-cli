# NestJS Swagger Scalars

A skill for defining scalar types in DTOs with Swagger/OpenAPI integration for NestJS applications.

## Related Skills

- **dto-validation** - DTO creation and validation decorators
- **nestjs-conventions** - NestJS patterns and conventions
- **nestjs-helper** - CLI commands and generation

## Basic Setup

```typescript
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User email address', example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ description: 'User full name', example: 'John Doe' })
  @IsOptional()
  @IsString()
  fullName?: string;
}
```

## Common Scalar Types

### String Types

```typescript
export class ExampleDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String, format: 'email' })
  email: string;

  @ApiProperty({ type: String, format: 'uri' })
  website: string;

  @ApiProperty({ type: String, format: 'date' })
  birthDate: string;

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt: string;

  @ApiProperty({ type: String, format: 'uuid' })
  id: string;

  @ApiProperty({ type: String, format: 'binary' })
  file: string;

  @ApiProperty({ type: String, format: 'byte' })
  data: string;

  @ApiProperty({ type: String, format: 'password' })
  password: string;

  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 50,
    pattern: '^[a-zA-Z0-9]+$'
  })
  username: string;

  @ApiProperty({ type: String, enum: ['admin', 'user', 'guest'] })
  role: string;
}
```

### Number Types

```typescript
export class ExampleDto {
  @ApiProperty({ type: Number })
  count: number;

  @ApiProperty({ type: Number, format: 'float' })
  price: number;

  @ApiProperty({ type: Number, format: 'double' })
  amount: number;

  @ApiProperty({ type: Number, format: 'int32' })
  age: number;

  @ApiProperty({ type: Number, format: 'int64' })
  timestamp: number;

  @ApiProperty({ type: Number, minimum: 0, maximum: 100 })
  percentage: number;

  @ApiProperty({ type: Number, exclusiveMinimum: 0, exclusiveMaximum: 1 })
  rate: number;

  @ApiProperty({ type: Number, multipleOf: 0.01 })
  precision: number;

  @ApiProperty({ type: Integer })
  @ApiProperty({ type: 'number' })
  count: number;
}
```

### Boolean Type

```typescript
export class ExampleDto {
  @ApiProperty({ type: Boolean })
  isActive: boolean;

  @ApiPropertyOptional({ type: Boolean, default: false })
  isVerified?: boolean;
}
```

### UUID Type

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class ExampleDto {
  @ApiProperty({
    type: String,
    format: 'uuid',
    description: 'Unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  id: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    description: 'User ID reference',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  })
  userId: string;
}
```

### Date and Time Types

```typescript
export class ExampleDto {
  // ISO 8601 date format (YYYY-MM-DD)
  @ApiProperty({
    type: String,
    format: 'date',
    description: 'Date in ISO format',
    example: '2025-01-15'
  })
  birthDate: string;

  // ISO 8601 date-time format
  @ApiProperty({
    type: String,
    format: 'date-time',
    description: 'DateTime in ISO format',
    example: '2025-01-15T10:30:00.000Z'
  })
  createdAt: string;

  // Unix timestamp
  @ApiProperty({
    type: Number,
    description: 'Unix timestamp',
    example: 1705318200
  })
  timestamp: number;

  // Custom date format (as string)
  @ApiProperty({
    type: String,
    description: 'Custom date format (DD/MM/YYYY)',
    example: '15/01/2025',
    pattern: '^\\d{2}/\\d{2}/\\d{4}$'
  })
  customDate: string;
}
```

## Array Types

### Basic Arrays

```typescript
export class ExampleDto {
  @ApiProperty({ type: [String] })
  tags: string[];

  @ApiProperty({ type: [Number], minItems: 1, maxItems: 10 })
  scores: number[];

  @ApiProperty({ type: String, isArray: true })
  names: string[];

  @ApiProperty({
    type: [String],
    uniqueItems: true,
    example: ['admin', 'user']
  })
  roles: string[];
}
```

### Array of Objects

```typescript
export class ItemDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: number;
}

export class ExampleDto {
  @ApiProperty({ type: [ItemDto] })
  items: ItemDto[];
}
```

### Array with Enum

```typescript
export class ExampleDto {
  @ApiProperty({
    type: [String],
    enum: ['READ', 'WRITE', 'DELETE'],
    enumName: 'Permission'
  })
  permissions: string[];
}
```

## Enum Types

### String Enums

```typescript
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

export class CreateUserDto {
  @ApiProperty({
    enum: UserRole,
    enumName: 'UserRole',
    description: 'User role',
    default: UserRole.USER,
    example: UserRole.USER
  })
  role: UserRole;
}

// Inline enum (no TypeScript enum)
export class ExampleDto {
  @ApiProperty({
    enum: ['active', 'inactive', 'pending'],
    description: 'Status',
    example: 'active'
  })
  status: string;
}
```

### Number Enums

```typescript
export enum Status {
  PENDING = 0,
  ACTIVE = 1,
  INACTIVE = 2
}

export class ExampleDto {
  @ApiProperty({
    enum: Status,
    enumName: 'Status',
    description: 'User status',
    example: Status.ACTIVE
  })
  status: Status;
}
```

## Object Types

### Nested Objects

```typescript
export class AddressDto {
  @ApiProperty()
  street: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  zipCode: string;
}

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: AddressDto })
  address: AddressDto;
}
```

### Record/Map Types

```typescript
export class ExampleDto {
  // Simple key-value map
  @ApiProperty({
    type: 'object',
    additionalProperties: { type: String }
  })
  metadata: Record<string, string>;

  // Map with complex values
  @ApiProperty({
    type: 'object',
    additionalProperties: {
      type: 'object',
      properties: {
        id: { type: String },
        name: { type: String }
      }
    }
  })
  entities: Record<string, { id: string; name: string }>;
}
```

## Custom Scalar Types

### Custom Date Scalar

```typescript
// Custom Date scalar class
export class CustomDate {
  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2025-01-15T10:30:00.000Z'
  })
  value: Date;
}

export class ExampleDto {
  @ApiProperty({ type: CustomDate })
  createdAt: CustomDate;
}
```

### Custom Money/Decimal Type

```typescript
export class Money {
  @ApiProperty({
    type: Number,
    description: 'Amount in smallest currency unit (cents)',
    example: 10000
  })
  amount: number;

  @ApiProperty({
    type: String,
    description: 'Currency code (ISO 4217)',
    example: 'USD'
  })
  currency: string;
}

export class ExampleDto {
  @ApiProperty({ type: Money })
  price: Money;
}
```

### Custom Buffer Type

```typescript
export class ExampleDto {
  @ApiProperty({
    type: String,
    format: 'byte',
    description: 'Base64 encoded data',
    example: 'SGVsbG8gV29ybGQ='
  })
  data: Buffer;

  @ApiProperty({
    type: String,
    format: 'binary',
    description: 'Binary file upload'
  })
  file: Buffer;
}
```

### JSON/Any Type

```typescript
export class ExampleDto {
  @ApiProperty({
    type: 'object',
    description: 'Any JSON data',
    example: { key: 'value', nested: { item: 1 } }
  })
  metadata: Record<string, any>;

  // Using any type with schema
  @ApiProperty({
    schema: {
      oneOf: [
        { type: 'string' },
        { type: 'number' },
        { type: 'boolean' }
      ]
    }
  })
  value: any;
}
```

## Polymorphic Types

### OneOf (Union Types)

```typescript
export class ExampleDto {
  @ApiProperty({
    oneOf: [
      { type: 'string' },
      { type: 'number' }
    ],
    description: 'String or number value'
  })
  identifier: string | number;

  @ApiProperty({
    oneOf: [
      { $ref: '#/components/schemas/User' },
      { $ref: '#/components/schemas/Organization' }
    ]
  })
  actor: User | Organization;
}
```

### AnyOf

```typescript
export class ExampleDto {
  @ApiProperty({
    anyOf: [
      { type: 'string', format: 'email' },
      { type: 'string', format: 'uuid' }
    ],
    description: 'Email or UUID'
  })
  identifier: string;
}
```

### AllOf

```typescript
export class BaseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;
}

export class ExampleDto {
  @ApiProperty({
    allOf: [
      { $ref: '#/components/schemas/BaseDto' },
      {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' }
        }
      }
    ]
  })
  extended: BaseDto & { name: string; email: string };
}
```

## Nullable and Optional Types

### Nullable

```typescript
export class ExampleDto {
  @ApiProperty({
    type: String,
    nullable: true,
    description: 'Optional field that can be null'
  })
  middleName: string | null;

  @ApiProperty({
    type: Date,
    format: 'date-time',
    nullable: true
  })
  deletedAt: Date | null;
}
```

### Optional

```typescript
export class ExampleDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Optional field'
  })
  nickname?: string;
}
```

### Default Values

```typescript
export class ExampleDto {
  @ApiProperty({
    type: String,
    default: 'anonymous',
    required: false
  })
  username: string;

  @ApiProperty({
    type: Number,
    default: 0,
    required: false
  })
  count: number;

  @ApiProperty({
    type: Boolean,
    default: true
  })
  isActive: boolean;
}
```

## Response DTOs

### Paginated Response

```typescript
export class PaginationMetaDto {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 10 })
  totalPages: number;
}

export class PaginatedDto<T> {
  @ApiProperty({ isArray: true })
  data: T[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}

// Usage with generic
export class UsersResponseDto extends PaginatedDto<UserDto> {
  @ApiProperty({ type: [UserDto] })
  data: UserDto[];
}
```

### Error Response

```typescript
export class ErrorFieldDto {
  @ApiProperty()
  field: string;

  @ApiProperty()
  message: string;
}

export class ErrorResponseDto {
  @ApiProperty({
    example: 'Bad Request',
    description: 'Error message'
  })
  message: string;

  @ApiProperty({
    example: 400,
    description: 'HTTP status code'
  })
  statusCode: number;

  @ApiProperty({
    type: [ErrorFieldDto],
    required: false,
    description: 'Validation errors'
  })
  errors?: ErrorFieldDto[];

  @ApiProperty({
    example: '2025-01-15T10:30:00.000Z',
    description: 'Timestamp of error'
  })
  timestamp: string;
}
```

### Success Response

```typescript
export class SuccessResponseDto<T> {
  @ApiProperty({
    example: true,
    description: 'Success status'
  })
  success: boolean;

  @ApiProperty({
    example: 'Operation completed successfully',
    required: false
  })
  message?: string;

  @ApiProperty()
  data: T;
}
```

## Validation and Swagger Together

```typescript
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  MaxLength,
  IsUUID,
  IsEnum,
  IsInt,
  Min,
  Max,
  IsDateString,
  IsBoolean
} from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique identifier (UUID)',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'User email address',
    format: 'email',
    example: 'user@example.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    format: 'password',
    minLength: 8,
    maxLength: 128,
    example: 'SecurePass123!'
  })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;

  @ApiProperty({
    description: 'User full name',
    minLength: 2,
    maxLength: 100,
    example: 'John Doe'
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fullName: string;

  @ApiPropertyOptional({
    description: 'User age',
    minimum: 18,
    maximum: 120,
    example: 30
  })
  @IsOptional()
  @IsInt()
  @Min(18)
  @Max(120)
  age?: number;

  @ApiPropertyOptional({
    enum: UserRole,
    enumName: 'UserRole',
    description: 'User role',
    default: UserRole.USER,
    example: UserRole.USER
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({
    type: Boolean,
    description: 'Is account active',
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    type: [String],
    description: 'User tags',
    uniqueItems: true,
    example: ['developer', 'nestjs']
  })
  @IsOptional()
  @IsString({ each: true })
  tags?: string[];
}
```

## File Upload Types

### Single File Upload

```typescript
export class UploadFileDto {
  @ApiProperty({
    type: String,
    format: 'binary',
    description: 'File to upload'
  })
  file: any;
}

// Controller
@ApiOperation({ summary: 'Upload a file' })
@ApiConsumes('multipart/form-data')
@ApiBody({ type: UploadFileDto })
@UseInterceptors(FileInterceptor('file'))
async uploadFile(@UploadedFile() file: Express.Multer.File) {
  // handler
}
```

### Multiple Files Upload

```typescript
export class UploadFilesDto {
  @ApiProperty({
    type: String,
    format: 'binary',
    description: 'Files to upload',
    isArray: true
  })
  files: any[];
}

// Controller
@ApiOperation({ summary: 'Upload multiple files' })
@ApiConsumes('multipart/form-data')
@ApiBody({ type: UploadFilesDto })
@UseInterceptors(FilesInterceptor('files'))
async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
  // handler
}
```

## Common Scalar Formats

| Type | Format | Example |
|------|--------|---------|
| String | `email` | `user@example.com` |
| String | `uri` | `https://example.com` |
| String | `uuid` | `550e8400-e29b-41d4-a716-446655440000` |
| String | `date` | `2025-01-15` |
| String | `date-time` | `2025-01-15T10:30:00.000Z` |
| String | `password` | `********` |
| String | `binary` | File upload |
| String | `byte` | Base64 encoded |
| Number | `float` | `3.14` |
| Number | `double` | `3.14159265359` |
| Number | `int32` | `42` |
| Number | `int64` | `9223372036854775807` |

## Best Practices

1. **Always add description**: Provide clear descriptions for all properties
2. **Use meaningful examples**: Include realistic example values
3. **Match validation**: Keep Swagger types in sync with class-validator decorators
4. **Use enums**: Prefer enums over magic strings/numbers
5. **Document constraints**: Use `minimum`, `maximum`, `minLength`, `maxLength` in Swagger
6. **Nullable vs Optional**: Use `nullable: true` for null values, `@ApiPropertyOptional` for optional
7. **Use proper types**: Specify exact types instead of `any`
8. **Document arrays**: Use `minItems`, `maxItems`, `uniqueItems`
9. **Reference schemas**: Use `$ref` for complex nested objects
10. **Response DTOs**: Create separate DTOs for responses vs requests
