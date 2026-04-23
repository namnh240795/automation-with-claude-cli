# DTO & Validation Patterns

A skill for creating Data Transfer Objects and validation following traceability-backend API conventions.

## Naming Convention: snake_case Properties

**IMPORTANT:** All DTO properties use `snake_case` naming (not camelCase).

This convention ensures consistency with:
- Database field names (also `snake_case`)
- API response/request format
- Frontend integration

```typescript
// Correct - snake_case properties
export class UserResponseDto {
  id: string;
  email: string;
  first_name?: string;     // ✅ snake_case
  last_name?: string;      // ✅ snake_case
  is_active: boolean;      // ✅ snake_case
  email_verified: boolean; // ✅ snake_case
  created_at: Date;        // ✅ snake_case
  updated_at: Date;        // ✅ snake_case
}

// Incorrect - camelCase properties
export class UserResponseDto {
  firstName?: string;      // ❌ Don't use camelCase
  isActive: boolean;       // ❌ Don't use camelCase
  emailVerified: boolean;  // ❌ Don't use camelCase
  createdAt: Date;         // ❌ Don't use camelCase
}
```

**Note:** TypeScript variables in service code still use `camelCase` (standard JS convention), but DTO properties are `snake_case`.

## DTO Structure

Place DTOs in `dto/` subfolder within each feature:
```
feature/
├── dto/
│   ├── create-feature.dto.ts
│   ├── update-feature.dto.ts
│   ├── feature-response.dto.ts
│   └── index.ts (barrel export)
```

## Common Imports

```typescript
import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsInt,
  IsBoolean,
  IsDateString,
  IsArray,
  ArrayNotEmpty,
  Min,
  Max,
  Length,
  Matches,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
```

## Basic DTO Example

```typescript
import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

## Common Validation Patterns

### String Validation
```typescript
@IsString()
@IsNotEmpty()
@Length(1, 255)        // Min and max length
@Matches(/^[a-z0-9-]+$/) // Regex pattern
```

### Email Validation
```typescript
@IsEmail()
@IsNotEmpty()
```

### Number Validation
```typescript
@IsInt()
@Min(0)
@Max(100)
@Type(() => Number)    // Transform string to number
```

### Boolean Validation
```typescript
@IsBoolean()
@IsOptional()
@Type(() => Boolean)
```

### Enum Validation
```typescript
export enum OrganizationType {
  FARMER = 'FARMER',
  COLLECTOR = 'COLLECTOR',
  ADMIN = 'ADMIN'
}

@IsEnum(OrganizationType)
@IsNotEmpty()
type: OrganizationType;
```

### Date Validation
```typescript
@IsDateString()
@IsOptional()
created_at?: string;
```

### Array Validation
```typescript
@IsArray()
@ArrayNotEmpty()
@IsString({ each: true })
roles: string[];
```

### Optional Fields
```typescript
@ApiPropertyOptional({ example: 'Optional address' })
@IsOptional()
@IsString()
@Length(0, 500)
address?: string;
```

### Conditional Validation
```typescript
@ValidateIf(o => o.sendEmail === true)
@IsEmail()
@IsNotEmpty()
emailAddress?: string;
```

## Complete DTO Examples

### Create DTO
```typescript
import { IsString, IsEmail, IsNotEmpty, Length, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFarmerDto {
  @ApiProperty({ example: 'farmer_john' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  username: string;

  @ApiProperty({ example: 'john@farm.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'John Farmer' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: '+1234567890', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: '123 Farm St', required: false })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  address?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  terms_and_conditions: boolean;
}
```

### Update DTO
```typescript
import { IsString, IsOptional, Length, IsEmail } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateFarmerDto {
  @ApiPropertyOptional({ example: 'john@newemail.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'John Updated Farmer' })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  full_name?: string;

  @ApiPropertyOptional({ example: '+9876543210' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(0, 500)
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(0, 100)
  city?: string;
}
```

### Response DTO
```typescript
import { ApiProperty } from '@nestjs/swagger';
import { OrganizationType } from '../../common/enum/organization-type';

export class FarmerResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  full_name: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  is_verified: boolean;

  @ApiProperty({ type: [String] })
  roles: string[];

  @ApiProperty({ type: () => OrganizationDto })
  organization: OrganizationDto;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

class OrganizationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: OrganizationType })
  type: OrganizationType;
}
```

### Pagination DTO
```typescript
import { IsInt, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

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

### Query DTO
```typescript
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum UserSortBy {
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  USERNAME = 'username',
  FULL_NAME = 'full_name'
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export class UserQueryDto {
  @ApiPropertyOptional({ example: 'john' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: UserSortBy, default: UserSortBy.CREATED_AT })
  @IsOptional()
  @IsEnum(UserSortBy)
  sortBy?: UserSortBy = UserSortBy.CREATED_AT;

  @ApiPropertyOptional({ enum: SortOrder, default: SortOrder.DESC })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;
}
```

## Barrel Export

Create an `index.ts` in your `dto/` folder:
```typescript
export * from './create-farmer.dto';
export * from './update-farmer.dto';
export * from './farmer-response.dto';
```

## Using DTOs in Controller

```typescript
import { CreateFarmerDto, UpdateFarmerDto, FarmerResponseDto } from './dto';

@Controller('farmers')
export class FarmerController {
  @Post()
  async create(@Body() dto: CreateFarmerDto): Promise<FarmerResponseDto> {
    return this.service.create(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FarmerResponseDto> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateFarmerDto
  ): Promise<FarmerResponseDto> {
    return this.service.update(id, dto);
  }
}
```

## Custom Validators

### Create custom validator
```typescript
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isStrongPassword', async: false })
export class IsStrongPasswordConstraint implements ValidatorConstraintInterface {
  validate(password: string) {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  defaultMessage() {
    return 'Password must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 number';
  }
}

// Use in DTO
import { IsStrongPasswordConstraint } from './validators/is-strong-password';

export class CreateUserDto {
  @Validate(IsStrongPasswordConstraint)
  password: string;
}
```

## Best Practices

1. **Always use `class-transformer`** `@Type()` for numbers and dates
2. **Provide `@ApiProperty` examples** for Swagger docs
3. **Mark optional fields** with `@IsOptional()`
4. **Use barrel exports** (`index.ts`) for clean imports
5. **Keep DTOs focused** on single responsibility
6. **Nest response DTOs** for complex objects
7. **Use enums** for fixed sets of values
8. **Add length constraints** to string fields
9. **Validate arrays** with `@IsArray()` + individual validators
10. **Use `@ValidateIf`** for conditional validation
