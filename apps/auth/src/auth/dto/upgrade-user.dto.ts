import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { UserType } from './sign-up.dto';

export class UpgradeUserDto {
  @ApiProperty({
    description: 'User type to upgrade to',
    enum: UserType,
    example: 'BUSINESS',
  })
  @IsEnum(UserType)
  user_type: UserType;
}

export class UpgradeUserResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'PERSONAL' })
  user_type: string;

  @ApiProperty({ example: '2026-05-20T10:00:00.000Z' })
  created_at: Date;
}