import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsEnum, Length } from 'class-validator';

export enum UserType {
  PERSONAL = 'PERSONAL',
  BUSINESS = 'BUSINESS',
}

export class SignUpDto {
  @ApiProperty({
    description: 'Email address',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password (min 8 characters)',
    example: 'Password123!',
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 100)
  password: string;

  @ApiPropertyOptional({
    description: 'First name',
    example: 'John',
  })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiPropertyOptional({
    description: 'Last name',
    example: 'Doe',
  })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiPropertyOptional({
    description: 'User type (PERSONAL or BUSINESS)',
    enum: UserType,
    default: UserType.PERSONAL,
    example: 'PERSONAL',
  })
  @IsOptional()
  @IsEnum(UserType)
  user_type?: UserType;
}