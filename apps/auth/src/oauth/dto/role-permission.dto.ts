import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsBoolean,
  IsEmail,
  MinLength,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

// ============================================================
// PERMISSION DTOs
// ============================================================

export class CreatePermissionDto {
  @ApiProperty({
    example: 'users:read',
    description: 'Unique permission name in resource:action format',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiPropertyOptional({ example: 'Read user data' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'users',
    description: 'Resource the permission applies to',
  })
  @IsString()
  @IsNotEmpty()
  resource: string;

  @ApiProperty({
    example: 'read',
    description: 'Action allowed (read, write, delete, admin)',
  })
  @IsString()
  @IsNotEmpty()
  action: string;
}

export class PermissionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  resource: string;

  @ApiProperty()
  action: string;

  @ApiProperty()
  created_at: Date;
}

// ============================================================
// ROLE DTOs
// ============================================================

export class CreateRoleDto {
  @ApiProperty({ example: 'developer' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiPropertyOptional({ example: 'Can read and write user data' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: ['users:read', 'users:write'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permission_names?: string[];
}

export class UpdateRoleDto {
  @ApiPropertyOptional({ example: 'senior-developer' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiPropertyOptional({ example: 'Updated description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

export class AssignPermissionsToRoleDto {
  @ApiProperty({
    isArray: true,
    type: String,
    example: ['users:read', 'users:write'],
  })
  @IsArray()
  @IsString({ each: true })
  permission_names: string[];
}

export class RoleResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty({ isArray: true, type: String })
  permissions: string[];

  @ApiProperty()
  created_at: Date;
}

// ============================================================
// CLIENT ROLE ASSIGNMENT DTOs
// ============================================================

export class AssignRoleToClientDto {
  @ApiProperty({ example: 'developer' })
  @IsString()
  @IsNotEmpty()
  role_name: string;
}

export class ClientRoleResponseDto {
  @ApiProperty()
  client_id: string;

  @ApiProperty()
  role_name: string;

  @ApiProperty()
  created_at: Date;
}

// ============================================================
// SERVICE ACCOUNT (M2M CLIENT) DTOs
// ============================================================

export class CreateServiceAccountDto {
  @ApiProperty({ example: 'billing-service' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiPropertyOptional({ example: 'Service account for billing microservice' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    isArray: true,
    type: String,
    example: ['billing:read', 'billing:write', 'invoices:create'],
    description: 'Permissions to assign to this service account',
  })
  @IsArray()
  @IsString({ each: true })
  permissions: string[];

  @ApiPropertyOptional({
    isArray: true,
    type: String,
    example: ['developer'],
    description: 'Roles to assign to this service account',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  role_names?: string[];

  @ApiPropertyOptional({
    example: 'https://billing.example.com/callback',
    description: 'Redirect URI for this client (optional for M2M)',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  redirect_uris?: string[];
}

export class ServiceAccountResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  client_id: string;

  @ApiProperty()
  client_secret: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty({ isArray: true, type: String })
  permissions: string[];

  @ApiProperty({ isArray: true, type: String })
  roles: string[];

  @ApiProperty()
  created_at: Date;
}

export class UpdateServiceAccountDto {
  @ApiPropertyOptional({ isArray: true, type: String })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissions?: string[];

  @ApiPropertyOptional({ isArray: true, type: String })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  role_names?: string[];

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

// ============================================================
// TOKEN RESPONSE DTOs (with roles/permissions)
// ============================================================

export class TokenWithRbacDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  token_type: string;

  @ApiProperty()
  expires_in: number;

  @ApiPropertyOptional()
  refresh_token?: string;

  @ApiProperty()
  scope: string;

  @ApiProperty({ isArray: true, type: String })
  roles: string[];

  @ApiProperty({ isArray: true, type: String })
  permissions: string[];
}