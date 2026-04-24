# Swagger Scalars — API Property Type Rules

> Source: NestJS Swagger/OpenAPI scalar type definitions for DTOs

## 🏷️ Basic Types

### ✅ Always pair Swagger type with validation decorator
```typescript
// ❌ Bad — no Swagger, no validation
email: string;

// ✅ Good
@ApiProperty({ type: String, format: 'email', example: 'user@example.com' })
@IsEmail()
email: string;
```

---

## 📋 String Formats

| Format | Use For | Example |
|--------|---------|---------|
| `email` | Email addresses | `user@example.com` |
| `uri` | URLs | `https://example.com` |
| `uuid` | UUID identifiers | `550e8400-e29b-...` |
| `date` | ISO date | `2025-01-15` |
| `date-time` | ISO datetime | `2025-01-15T10:30:00.000Z` |
| `password` | Password fields | `********` |
| `binary` | File uploads | (binary data) |
| `byte` | Base64 encoded | `SGVsbG8gV29ybGQ=` |

### ✅ Use format for semantic meaning
```typescript
@ApiProperty({ type: String, format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440000' })
id: string;

@ApiProperty({ type: String, format: 'email', example: 'user@example.com' })
email: string;

@ApiProperty({ type: String, format: 'uri', example: 'https://example.com' })
website: string;
```

---

## 📋 Number Formats

| Format | Use For | Example |
|--------|---------|---------|
| `float` | Decimal numbers | `3.14` |
| `double` | High precision | `3.14159265359` |
| `int32` | Standard integers | `42` |
| `int64` | Large integers | `9223372036854775807` |

### ✅ Always add constraints
```typescript
@ApiProperty({ type: Number, minimum: 0, maximum: 100, example: 85 })
@Type(() => Number)
@IsInt()
@Min(0)
@Max(100)
percentage: number;
```

---

## 📦 Array Types

### ✅ ALWAYS use `isArray: true` — never `type: [DtoName]`
```typescript
// ❌ Bad — breaks Swagger/Scalar UI
@ApiProperty({ type: [String] })
@ApiProperty({ type: [ItemDto] })

// ✅ Good
@ApiProperty({ isArray: true, type: String })
@ApiProperty({ isArray: true, type: ItemDto })
```

### ✅ Array with constraints
```typescript
@ApiProperty({
  isArray: true,
  type: String,
  minItems: 1,
  maxItems: 10,
  uniqueItems: true,
  example: ['admin', 'user'],
})
roles: string[];
```

---

## 🔢 Enum Types

### ✅ Always use `enumName` with TypeScript enums
```typescript
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

// ❌ Bad — no enumName, Swagger shows raw values
@ApiProperty({ enum: UserRole })

// ✅ Good — named enum in Swagger UI
@ApiProperty({ enum: UserRole, enumName: 'UserRole', default: UserRole.USER })
role: UserRole;
```

### ✅ Inline enums for simple cases
```typescript
@ApiProperty({ enum: ['active', 'inactive', 'pending'], example: 'active' })
status: string;
```

---

## 🧱 Object Types

### ✅ Nest DTOs for complex objects
```typescript
// ❌ Bad — inline type, no Swagger schema
address: { street: string; city: string };

// ✅ Good — dedicated DTO
export class AddressDto {
  @ApiProperty()
  street: string;

  @ApiProperty()
  city: string;
}

@ApiProperty({ type: AddressDto })
address: AddressDto;
```

### ✅ Record/Map types
```typescript
@ApiProperty({
  type: 'object',
  additionalProperties: { type: String },
})
metadata: Record<string, string>;
```

---

## 🔀 Nullable & Optional

### ✅ Nullable vs Optional — use the correct one
```typescript
// Nullable — field exists but can be null
@ApiProperty({ type: String, nullable: true })
middle_name: string | null;

// Optional — field may not be present
@ApiPropertyOptional({ type: String })
nickname?: string;
```

### ✅ Default values
```typescript
@ApiProperty({ type: Boolean, default: true })
is_active: boolean;

@ApiProperty({ type: Number, default: 0, required: false })
count: number;
```

---

## 📄 Response DTOs

### ✅ Standalone paginated response — NEVER use generic inheritance
```typescript
// ❌ Bad — generic inheritance breaks Swagger/Scalar UI
export class PaginatedDto<T> {
  data: T[];
  meta: PaginationMetaDto;
}

// ✅ Good — standalone class per resource
export class UsersPaginatedResponseDto {
  @ApiProperty({ isArray: true, type: UserResponseDto })
  data: UserResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}

export class RolesPaginatedResponseDto {
  @ApiProperty({ isArray: true, type: RoleResponseDto })
  data: RoleResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
```

### ✅ Error response DTO
```typescript
export class ErrorResponseDto {
  @ApiProperty({ example: 'Bad Request' })
  message: string;

  @ApiProperty({ example: 400 })
  status_code: number;

  @ApiProperty({ isArray: true, type: ErrorFieldDto, required: false })
  errors?: ErrorFieldDto[];

  @ApiProperty({ example: '2025-01-15T10:30:00.000Z' })
  timestamp: string;
}
```

---

## 📁 File Uploads

### ✅ Use `format: 'binary'` with `@ApiConsumes('multipart/form-data')`
```typescript
export class UploadFileDto {
  @ApiProperty({ type: String, format: 'binary', description: 'File to upload' })
  file: any;
}

// Controller
@Post('upload')
@ApiConsumes('multipart/form-data')
@ApiBody({ type: UploadFileDto })
@UseInterceptors(FileInterceptor('file'))
async uploadFile(@UploadedFile() file: Express.Multer.File) { ... }
```

---

## 🚫 Checklist

- ❌ Never use `type: [DtoName]` for arrays — always `isArray: true, type: DtoName`
- ❌ Never use generic inheritance for paginated responses
- ❌ Never leave properties without `@ApiProperty` or `@ApiPropertyOptional`
- ❌ Never forget `description` and `example` on Swagger properties
- ❌ Never use `nullable: true` when you mean optional — use `@ApiPropertyOptional`
- ✅ Always add `format` for semantic string types (email, uuid, date-time)
- ✅ Always add `enumName` when using TypeScript enums
- ✅ Always create dedicated DTO classes for nested objects
- ✅ Always add constraints (`minimum`, `maximum`, `minLength`, `maxLength`)
- ✅ Always keep Swagger types in sync with class-validator decorators
