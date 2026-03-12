import { ApiProperty } from '@nestjs/swagger';

export class SearchResultDocumentDto {
  @ApiProperty({ description: 'Document ID' })
  id: string;

  @ApiProperty({ description: 'Document title' })
  title: string;

  @ApiProperty({ description: 'File path' })
  file_path: string;

  @ApiProperty({ description: 'Source type' })
  source_type: string;

  @ApiProperty({ description: 'Document type' })
  doc_type: string;
}

export class SearchResultDto {
  @ApiProperty({ description: 'Chunk ID' })
  chunk_id: string;

  @ApiProperty({ description: 'Chunk content' })
  content: string;

  @ApiProperty({ description: 'Similarity score (0-1)' })
  similarity: number;

  @ApiProperty({ description: 'Chunk metadata', required: false })
  metadata?: Record<string, any>;

  @ApiProperty({ description: 'Document information', type: SearchResultDocumentDto })
  document: SearchResultDocumentDto;
}

export class SearchResponseDto {
  @ApiProperty({ description: 'Search query', required: false })
  query?: string;

  @ApiProperty({ description: 'Number of results returned' })
  count: number;

  @ApiProperty({ description: 'Search results', type: [SearchResultDto] })
  results: SearchResultDto[];
}

export class BatchSearchResponseDto {
  @ApiProperty({ description: 'Array of search results', type: [SearchResponseDto] })
  searches: SearchResponseDto[];
}

export class IndexingStatsDto {
  @ApiProperty({ description: 'Total number of documents' })
  total_documents: number;

  @ApiProperty({ description: 'Total number of chunks' })
  total_chunks: number;

  @ApiProperty({ description: 'Number of documents with embeddings' })
  documents_with_embeddings: number;

  @ApiProperty({ description: 'Number of chunks with embeddings' })
  chunks_with_embeddings: number;

  @ApiProperty({ description: 'Document count by source type' })
  by_source_type: Record<string, number>;

  @ApiProperty({ description: 'Document count by document type' })
  by_doc_type: Record<string, number>;
}
