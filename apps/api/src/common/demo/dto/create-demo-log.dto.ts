import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateDemoLogDto {
  @ApiProperty({ example: 'api-service', description: 'Source service name' })
  @IsString()
  @IsNotEmpty()
  source: string;

  @ApiProperty({ example: 'createDemoLog', description: 'Action/method name' })
  @IsString()
  @IsNotEmpty()
  action: string;

  @ApiPropertyOptional({ example: '{"user_id": "123"}', description: 'Input data as JSON string' })
  @IsOptional()
  @IsString()
  input?: string;

  @ApiPropertyOptional({ example: '{"result": "success"}', description: 'Output data as JSON string' })
  @IsOptional()
  @IsString()
  output?: string;
}