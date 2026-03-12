import { PrismaClient } from '@rag/prisma-client';

export interface VectorSearchOptions {
  limit?: number;
  threshold?: number;
  sourceType?: string;
  docType?: string;
}

export interface SearchResult {
  document_id: string;
  chunk_id: string;
  content: string;
  similarity: number;
  metadata?: Record<string, any>;
  document: {
    id: string;
    title: string;
    file_path: string;
    source_type: string;
    doc_type: string;
  };
}

export class VectorSearchService {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * Perform vector similarity search using pgvector
   */
  async search(
    queryEmbedding: number[],
    options: VectorSearchOptions = {}
  ): Promise<SearchResult[]> {
    const limit = options.limit || 10;
    const threshold = options.threshold || 0.7;

    // Convert embedding to pgvector format
    const vectorString = this.formatVector(queryEmbedding);

    // Build WHERE clause conditions
    const whereConditions: string[] = [];
    const params: any[] = [];

    if (options.sourceType) {
      whereConditions.push("d.source_type = $2");
      params.push(options.sourceType);
    }

    if (options.docType) {
      const paramIndex = params.length + 2;
      whereConditions.push(`d.doc_type = $${paramIndex}`);
      params.push(options.docType);
    }

    const whereClause = whereConditions.length > 0 ? `AND ${whereConditions.join(' AND ')}` : '';

    // Use raw query for vector similarity search
    const query = `
      SELECT
        dc.id as chunk_id,
        dc.content,
        dc.metadata,
        1 - (dc.embedding <=> $1::vector) as similarity,
        d.id as document_id,
        d.title,
        d.file_path,
        d.source_type,
        d.doc_type
      FROM document_chunk dc
      INNER JOIN document d ON dc.document_id = d.id
      WHERE dc.embedding IS NOT NULL
        ${whereClause}
      ORDER BY dc.embedding <=> $1::vector
      LIMIT $${params.length + 2}
    `;

    params.push(vectorString, limit);

    const results = await this.prisma.$queryRawUnsafe<any[]>(query, ...params);

    // Filter by threshold and format results
    return results
      .filter(row => row.similarity >= threshold)
      .map(row => ({
        chunk_id: row.chunk_id,
        content: row.content,
        similarity: parseFloat(row.similarity),
        metadata: row.metadata,
        document_id: row.document_id,
        document: {
          id: row.document_id,
          title: row.title,
          file_path: row.file_path,
          source_type: row.source_type,
          doc_type: row.doc_type,
        },
      }));
  }

  /**
   * Search by document type
   */
  async searchByDocType(
    queryEmbedding: number[],
    docType: string,
    options: Omit<VectorSearchOptions, 'docType'> = {}
  ): Promise<SearchResult[]> {
    return this.search(queryEmbedding, { ...options, docType });
  }

  /**
   * Search by source type
   */
  async searchBySourceType(
    queryEmbedding: number[],
    sourceType: string,
    options: Omit<VectorSearchOptions, 'sourceType'> = {}
  ): Promise<SearchResult[]> {
    return this.search(queryEmbedding, { ...options, sourceType });
  }

  /**
   * Hybrid search: combine vector search with keyword filtering
   */
  async hybridSearch(
    queryEmbedding: number[],
    keywordFilter: string,
    options: VectorSearchOptions = {}
  ): Promise<SearchResult[]> {
    const limit = options.limit || 10;
    const threshold = options.threshold || 0.7;

    const vectorString = this.formatVector(queryEmbedding);

    const query = `
      SELECT
        dc.id as chunk_id,
        dc.content,
        dc.metadata,
        1 - (dc.embedding <=> $1::vector) as similarity,
        d.id as document_id,
        d.title,
        d.file_path,
        d.source_type,
        d.doc_type
      FROM document_chunk dc
      INNER JOIN document d ON dc.document_id = d.id
      WHERE dc.embedding IS NOT NULL
        AND (dc.content ILIKE $2 OR d.title ILIKE $2 OR d.file_path ILIKE $2)
      ORDER BY dc.embedding <=> $1::vector
      LIMIT $3
    `;

    const results = await this.prisma.$queryRawUnsafe<any[]>(
      query,
      vectorString,
      `%${keywordFilter}%`,
      limit
    );

    return results
      .filter(row => row.similarity >= threshold)
      .map(row => ({
        chunk_id: row.chunk_id,
        content: row.content,
        similarity: parseFloat(row.similarity),
        metadata: row.metadata,
        document_id: row.document_id,
        document: {
          id: row.document_id,
          title: row.title,
          file_path: row.file_path,
          source_type: row.source_type,
          doc_type: row.doc_type,
        },
      }));
  }

  /**
   * Get document by ID with all chunks
   */
  async getDocumentWithChunks(documentId: string): Promise<any> {
    return this.prisma.document.findUnique({
      where: { id: documentId },
      include: {
        chunks: {
          orderBy: { chunk_index: 'asc' },
        },
      },
    });
  }

  /**
   * Get chunks by document ID
   */
  async getChunksByDocumentId(documentId: string): Promise<any[]> {
    return this.prisma.document_chunk.findMany({
      where: { document_id: documentId },
      orderBy: { chunk_index: 'asc' },
    });
  }

  /**
   * Format embedding array as pgvector string
   */
  private formatVector(embedding: number[]): string {
    return `[${embedding.join(',')}]`;
  }

  /**
   * Get statistics about indexed documents
   */
  async getStats(): Promise<{
    totalDocuments: number;
    totalChunks: number;
    documentsWithEmbeddings: number;
    chunksWithEmbeddings: number;
    bySourceType: Record<string, number>;
    byDocType: Record<string, number>;
  }> {
    const [
      totalDocuments,
      totalChunks,
      documentsWithEmbeddingsResult,
      chunksWithEmbeddingsResult,
      sourceTypeStats,
      docTypeStats,
    ] = await Promise.all([
      this.prisma.document.count(),
      this.prisma.document_chunk.count(),
      // Use raw query for documents with embeddings
      this.prisma.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(DISTINCT d.id) as count
        FROM document d
        INNER JOIN document_chunk dc ON d.id = dc.document_id
        WHERE dc.embedding IS NOT NULL
      `,
      // Use raw query for chunks with embeddings
      this.prisma.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(*) as count
        FROM document_chunk
        WHERE embedding IS NOT NULL
      `,
      this.prisma.document.groupBy({
        by: ['source_type'],
        _count: true,
      }),
      this.prisma.document.groupBy({
        by: ['doc_type'],
        _count: true,
      }),
    ]);

    const bySourceType: Record<string, number> = {};
    for (const stat of sourceTypeStats) {
      bySourceType[stat.source_type] = stat._count;
    }

    const byDocType: Record<string, number> = {};
    for (const stat of docTypeStats) {
      byDocType[stat.doc_type] = stat._count;
    }

    return {
      totalDocuments,
      totalChunks,
      documentsWithEmbeddings: Number(documentsWithEmbeddingsResult[0]?.count || 0),
      chunksWithEmbeddings: Number(chunksWithEmbeddingsResult[0]?.count || 0),
      bySourceType,
      byDocType,
    };
  }
}
