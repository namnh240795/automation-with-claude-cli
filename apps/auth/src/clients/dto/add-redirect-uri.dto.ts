import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AddRedirectUriDto {
  @ApiProperty({
    description: 'Redirect URI to add',
    example: 'http://localhost:3000/callback',
  })
  @IsString()
  @IsNotEmpty()
  uri: string;
}
