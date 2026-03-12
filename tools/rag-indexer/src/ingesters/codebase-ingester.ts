import { glob } from 'glob';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as crypto from 'crypto';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@rag/prisma-client';
import { source_type, doc_type } from '@rag/prisma-client';
import { EmbeddingService } from '@app/rag-utilities';

export interface CodebaseIngesterOptions {
  ragDatabaseUrl: string;
  rootPath: string;
  embeddingService: EmbeddingService;
  includePatterns?: string[];
  excludePatterns?: string[];
  onProgress?: (current: number, total: number) => void;
}

export class CodebaseIngester {
  private readonly ragPrisma: PrismaClient;
  private readonly rootPath: string;
  private readonly embeddingService: EmbeddingService;
  private readonly includePatterns: string[];
  private readonly excludePatterns: string[];
  private readonly onProgress?: (current: number, total: number) => void;

  // File extension to doc_type mapping
  private readonly docTypeMap: Record<string, doc_type> = {
    '.md': doc_type.MARKDOWN,
    '.ts': doc_type.TYPESCRIPT,
    '.tsx': doc_type.TYPESCRIPT,
    '.js': doc_type.JAVASCRIPT,
    '.jsx': doc_type.JAVASCRIPT,
    '.prisma': doc_type.PRISMA_SCHEMA,
    '.json': doc_type.JSON,
    '.yaml': doc_type.YAML,
    '.yml': doc_type.YAML,
    '.txt': doc_type.TEXT,
  };

  constructor(options: CodebaseIngesterOptions) {
    // Create Prisma client with PostgreSQL adapter
    const pool = new Pool({ connectionString: options.ragDatabaseUrl });
    const adapter = new PrismaPg(pool);
    this.ragPrisma = new PrismaClient({ adapter });

    this.rootPath = options.rootPath;
    this.embeddingService = options.embeddingService;
    this.onProgress = options.onProgress;
    this.includePatterns = options.includePatterns || [
      '**/*.md',
      '**/*.ts',
      '**/*.tsx',
      '**/*.js',
      '**/*.jsx',
      '**/*.prisma',
      '**/*.json',
    ];
    this.excludePatterns = options.excludePatterns || [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.git/**',
      '**/coverage/**',
      '**/*.spec.ts',
      '**/*.test.ts',
      '**/*.spec.js',
      '**/*.test.js',
      '**/migrations/**',
    ];
  }

  /**
   * Index all matching files in the codebase
   */
  async indexCodebase(): Promise<{ filesIndexed: number; filesSkipped: number }> {
    const files = await this.findFiles();
    let indexed = 0;
    let skipped = 0;

    for (const file of files) {
      const result = await this.indexFile(file);
      if (result) {
        indexed++;
      } else {
        skipped++;
      }

      if (this.onProgress) {
        this.onProgress(indexed + skipped, files.length);
      }
    }

    return { filesIndexed: indexed, filesSkipped: skipped };
  }

  /**
   * Find all files matching the patterns
   */
  private async findFiles(): Promise<string[]> {
    const allFiles: Set<string> = new Set();

    for (const pattern of this.includePatterns) {
      const matches = await glob(pattern, {
        cwd: this.rootPath,
        absolute: true,
        ignore: this.excludePatterns,
      });

      for (const match of matches) {
        allFiles.add(match);
      }
    }

    return Array.from(allFiles);
  }

  /**
   * Index a single file
   */
  private async indexFile(filePath: string): Promise<boolean> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const relativePath = path.relative(this.rootPath, filePath);
      const fileExtension = path.extname(filePath);
      const docType = this.docTypeMap[fileExtension] || doc_type.TEXT;

      // Determine source type based on file location
      let sourceType: source_type;
      if (relativePath.startsWith('apps/')) {
        sourceType = source_type.CODEBASE_SOURCE;
      } else if (relativePath.startsWith('libs/')) {
        sourceType = source_type.CODEBASE_SOURCE;
      } else if (relativePath.startsWith('docs/')) {
        sourceType = source_type.CODEBASE_MARKDOWN;
      } else {
        sourceType = this.getSourceTypeFromDocType(docType);
      }

      const filePathHash = this.hashString(relativePath);

      // Check if document already exists
      const existing = await this.ragPrisma.document.findUnique({
        where: { file_path_hash: filePathHash },
      });

      if (existing) {
        // Check if content has changed (compare size as a simple check)
        if (content.length === existing.content.length) {
          return false; // Skip, no changes
        }

        // Update existing document
        await this.ragPrisma.document.update({
          where: { id: existing.id },
          data: {
            content,
            updated_at: new Date(),
          },
        });

        // Delete old chunks and recreate
        await this.ragPrisma.document_chunk.deleteMany({
          where: { document_id: existing.id },
        });

        await this.createChunks(existing.id, content, {
          file_path: relativePath,
          file_extension: fileExtension,
        });

        return true;
      }

      // Create new document
      const document = await this.ragPrisma.document.create({
        data: {
          source_type: sourceType,
          doc_type: docType,
          title: path.basename(filePath),
          file_path: relativePath,
          file_path_hash: filePathHash,
          content,
          metadata: {
            file_path: relativePath,
            file_extension: fileExtension,
            size: content.length,
          },
        },
      });

      await this.createChunks(document.id, content, {
        file_path: relativePath,
        file_extension: fileExtension,
      });

      return true;
    } catch (error) {
      console.error(`Error indexing file ${filePath}:`, error);
      return false;
    }
  }

  /**
   * Create chunks for a document
   */
  private async createChunks(
    documentId: string,
    content: string,
    metadata: Record<string, any>
  ): Promise<void> {
    const { chunks, embeddings } = await this.embeddingService.processDocument(content, metadata);

    for (let i = 0; i < chunks.length; i++) {
      // Convert embedding array to string format for pgvector
      const embeddingStr = `[${embeddings[i].join(',')}]`;

      // Use raw SQL for embedding field
      await this.ragPrisma.$executeRaw`
        INSERT INTO document_chunk (id, document_id, chunk_index, content, embedding, metadata, created_at)
        VALUES (
          gen_random_uuid(),
          ${documentId}::uuid,
          ${chunks[i].index},
          ${chunks[i].content},
          ${embeddingStr}::vector,
          ${JSON.stringify(chunks[i].metadata)}::jsonb,
          NOW()
        )
      `;
    }
  }

  /**
   * Get source type from doc type
   */
  private getSourceTypeFromDocType(docType: doc_type): source_type {
    switch (docType) {
      case doc_type.MARKDOWN:
        return source_type.CODEBASE_MARKDOWN;
      case doc_type.TYPESCRIPT:
        return source_type.CODEBASE_TYPESCRIPT;
      case doc_type.JAVASCRIPT:
        return source_type.CODEBASE_JAVASCRIPT;
      case doc_type.PRISMA_SCHEMA:
        return source_type.CODEBASE_PRISMA;
      case doc_type.JSON:
        return source_type.CODEBASE_JSON;
      default:
        return source_type.CODEBASE_SOURCE;
    }
  }

  /**
   * Hash string for file_path_hash
   */
  private hashString(str: string): string {
    return crypto.hash('sha256', str, 'hex');
  }

  /**
   * Disconnect Prisma client
   */
  async disconnect(): Promise<void> {
    await this.ragPrisma.$disconnect();
  }
}
