import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsBoolean, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User username (unique within realm)',
    example: 'john.doe',
  })
  @IsString()
  @MinLength(1)
  username: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: "User's first name",
    example: 'John',
    required: false,
  })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiProperty({
    description: "User's last name",
    example: 'Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiProperty({
    description: 'Whether the user is enabled',
    example: true,
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @ApiProperty({
    description: 'Whether the email is verified',
    example: false,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  email_verified?: boolean;

  @ApiProperty({
    description: 'Federation link',
    required: false,
  })
  @IsOptional()
  @IsString()
  federation_link?: string;
}
