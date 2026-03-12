"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorSearchService = void 0;
class VectorSearchService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async search(queryEmbedding, options = {}) {
        const limit = options.limit || 10;
        const threshold = options.threshold || 0.7;
        const vectorString = this.formatVector(queryEmbedding);
        const whereConditions = [];
        const params = [];
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
        const results = await this.prisma.$queryRawUnsafe(query, ...params);
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
    async searchByDocType(queryEmbedding, docType, options = {}) {
        return this.search(queryEmbedding, { ...options, docType });
    }
    async searchBySourceType(queryEmbedding, sourceType, options = {}) {
        return this.search(queryEmbedding, { ...options, sourceType });
    }
    async hybridSearch(queryEmbedding, keywordFilter, options = {}) {
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
        const results = await this.prisma.$queryRawUnsafe(query, vectorString, `%${keywordFilter}%`, limit);
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
    async getDocumentWithChunks(documentId) {
        return this.prisma.document.findUnique({
            where: { id: documentId },
            include: {
                chunks: {
                    orderBy: { chunk_index: 'asc' },
                },
            },
        });
    }
    async getChunksByDocumentId(documentId) {
        return this.prisma.document_chunk.findMany({
            where: { document_id: documentId },
            orderBy: { chunk_index: 'asc' },
        });
    }
    formatVector(embedding) {
        return `[${embedding.join(',')}]`;
    }
    async getStats() {
        const [totalDocuments, totalChunks, documentsWithEmbeddings, chunksWithEmbeddings, sourceTypeStats, docTypeStats,] = await Promise.all([
            this.prisma.document.count(),
            this.prisma.document_chunk.count(),
            this.prisma.document.count({
                where: {
                    chunks: {
                        some: {
                            embedding: { not: null },
                        },
                    },
                },
            }),
            this.prisma.document_chunk.count({
                where: { embedding: { not: null } },
            }),
            this.prisma.document.groupBy({
                by: ['source_type'],
                _count: true,
            }),
            this.prisma.document.groupBy({
                by: ['doc_type'],
                _count: true,
            }),
        ]);
        const bySourceType = {};
        for (const stat of sourceTypeStats) {
            bySourceType[stat.source_type] = stat._count;
        }
        const byDocType = {};
        for (const stat of docTypeStats) {
            byDocType[stat.doc_type] = stat._count;
        }
        return {
            totalDocuments,
            totalChunks,
            documentsWithEmbeddings,
            chunksWithEmbeddings,
            bySourceType,
            byDocType,
        };
    }
}
exports.VectorSearchService = VectorSearchService;
//# sourceMappingURL=vector-search.service.js.map