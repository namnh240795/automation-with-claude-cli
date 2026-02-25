import { ApiProperty } from '@nestjs/swagger';

export class UserInfoResponseDto {
  @ApiProperty({ description: 'User ID from JWT token' })
  sub: string;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'User first name', required: false })
  first_name?: string;

  @ApiProperty({ description: 'User last name', required: false })
  last_name?: string;

  @ApiProperty({ description: 'Message' })
  message: string;

  @ApiProperty({ description: 'Timestamp' })
  timestamp: Date;
}
