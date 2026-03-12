import { IsOptional, IsNumber, IsString, Min, IsEnum, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { source_type, doc_type } from '@rag/prisma-client';

export class SearchRequestDto {
  @ApiProperty({ description: 'Query text to search for' })
  @IsString()
  query: string;

  @ApiPropertyOptional({ description: 'Maximum number of results to return', default: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Minimum similarity threshold (0-1)', default: 0.7 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  threshold?: number = 0.7;

  @ApiPropertyOptional({ description: 'Filter by source type', enum: source_type })
  @IsOptional()
  @IsEnum(source_type)
  source_type?: source_type;

  @ApiPropertyOptional({ description: 'Filter by document type', enum: doc_type })
  @IsOptional()
  @IsEnum(doc_type)
  doc_type?: doc_type;

  @ApiPropertyOptional({ description: 'Keyword filter for hybrid search' })
  @IsOptional()
  @IsString()
  keyword_filter?: string;
}

export class BatchSearchRequestDto {
  @ApiProperty({ description: 'Array of query texts to search for', type: [String] })
  @IsArray()
  @IsString({ each: true })
  queries: string[];

  @ApiPropertyOptional({ description: 'Maximum number of results per query', default: 5 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit_per_query?: number = 5;

  @ApiPropertyOptional({ description: 'Minimum similarity threshold (0-1)', default: 0.7 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  threshold?: number = 0.7;
}
