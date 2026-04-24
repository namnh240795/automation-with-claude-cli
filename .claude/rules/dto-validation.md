# DTO & Validation — NestJS Data Transfer Object Rules

> Source: Monorepo DTO creation and validation patterns with class-validator

## 📦 Naming Convention

### ✅ All DTO properties MUST use snake_case
```typescript
// ❌ Bad — camelCase in DTOs
export class UserResponseDto {
  firstName?: string;
  isActive: boolean;
  createdAt: Date;
}

// ✅ Good — snake_case in DTOs
export class UserResponseDto {
  first_name?: string;
  is_active: boolean;
  created_at: Date;
}
```

> **Note:** TypeScript variables in service code still use `camelCase`. Only DTO properties are `snake_case`.

---

## 📁 DTO Folder Structure

### ✅ Every feature has a `dto/` folder with barrel export
```
feature/
├── dto/
│   ├── create-feature.dto.ts
│   ├── update-feature.dto.ts
│   ├── feature-response.dto.ts
│   └── index.ts         ← barrel export
```

```typescript
// dto/index.ts
export * from './create-feature.dto';
export * from './update-feature.dto';
export * from './feature-response.dto';
```

---

## ✅ Validation Decorators

### ✅ Always pair validation with Swagger decorators
```typescript
// ❌ Bad — no Swagger, no constraints
export class CreateUserDto {
  username: string;
  email: string;
}

// ✅ Good — validated + documented
export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'Username' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'Full name' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  full_name: string;
}
```

---

## 📋 Validation Quick Reference

### String
```typescript
@IsString()
@IsNotEmpty()
@Length(1, 255)
@Matches(/^[a-z0-9-]+$/)
```

### Email
```typescript
@IsEmail()
@IsNotEmpty()
```

### Number — always use `@Type(() => Number)`
```typescript
// ❌ Bad — missing @Type, query params stay as string
@IsInt()
@Min(0)
limit: number;

// ✅ Good
@Type(() => Number)
@IsInt()
@Min(0)
@Max(100)
limit: number;
```

### Boolean — always use `@Type(() => Boolean)`
```typescript
@IsBoolean()
@IsOptional()
@Type(() => Boolean)
is_active?: boolean;
```

### Enum
```typescript
@IsEnum(OrganizationType)
@IsNotEmpty()
type: OrganizationType;
```

### Date
```typescript
@IsDateString()
@IsOptional()
created_at?: string;
```

### Array
```typescript
@IsArray()
@ArrayNotEmpty()
@IsString({ each: true })
roles: string[];
```

### Optional fields — use `@ApiPropertyOptional` + `@IsOptional`
```typescript
// ❌ Bad
@ApiProperty({ required: false })
address?: string;

// ✅ Good
@ApiPropertyOptional({ example: '123 Farm St' })
@IsOptional()
@IsString()
@Length(0, 500)
address?: string;
```

### Conditional validation
```typescript
@ValidateIf(o => o.sendEmail === true)
@IsEmail()
@IsNotEmpty()
email_address?: string;
```

---

## 📐 DTO Type Patterns

### ✅ Create DTO — all required fields
```typescript
export class CreateFeatureDto {
  @ApiProperty({ example: 'feature_name' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @ApiProperty({ example: '+1234567890', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  terms_and_conditions: boolean;
}
```

### ✅ Update DTO — all fields optional
```typescript
export class UpdateFeatureDto {
  @ApiPropertyOptional({ example: 'new_name' })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @ApiPropertyOptional({ example: '+9876543210' })
  @IsOptional()
  @IsString()
  phone?: string;
}
```

### ✅ Response DTO — document every field
```typescript
export class FeatureResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty({ type: () => OrganizationDto })
  organization: OrganizationDto;    // nest complex objects

  @ApiProperty()
  created_at: Date;
}
```

### ✅ Pagination DTO
```typescript
export class PaginationDto {
  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}
```

### ✅ Query DTO with enums for sorting
```typescript
export enum SortBy {
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  NAME = 'name',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class QueryDto {
  @ApiPropertyOptional({ example: 'search term' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: SortBy, default: SortBy.CREATED_AT })
  @IsOptional()
  @IsEnum(SortBy)
  sort_by?: SortBy = SortBy.CREATED_AT;

  @ApiPropertyOptional({ enum: SortOrder, default: SortOrder.DESC })
  @IsOptional()
  @IsEnum(SortOrder)
  sort_order?: SortOrder = SortOrder.DESC;
}
```

---

## 🔧 Custom Validators

### ✅ Use ValidatorConstraint for reusable validation logic
```typescript
@ValidatorConstraint({ name: 'isStrongPassword', async: false })
export class IsStrongPasswordConstraint implements ValidatorConstraintInterface {
  validate(password: string) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  defaultMessage() {
    return 'Password must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 number';
  }
}

// Usage
export class CreateUserDto {
  @Validate(IsStrongPasswordConstraint)
  password: string;
}
```

---

## 🚫 Checklist

- ❌ Never use camelCase for DTO properties — always snake_case
- ❌ Never skip `@ApiProperty` / `@ApiPropertyOptional` on DTO fields
- ❌ Never forget `@Type(() => Number)` on numeric query params
- ❌ Never forget `@Type(() => Boolean)` on boolean fields
- ❌ Never add length constraints without `@Length()` on strings
- ❌ Never create a DTO folder without a barrel `index.ts`
- ✅ Always pair `@IsOptional()` with `@ApiPropertyOptional()`
- ✅ Always use `@IsEnum()` for fixed sets of values
- ✅ Always nest response DTOs for complex objects
- ✅ Always use `@ValidateIf()` for conditional validation
- ✅ Always add `@IsArray()` with `each: true` validators for arrays
