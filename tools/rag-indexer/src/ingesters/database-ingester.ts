import { PrismaClient as ApiPrismaClient } from '@api/prisma-client';
import { PrismaClient as RagPrismaClient, source_type, doc_type } from '@rag/prisma-client';
import * as crypto from 'crypto';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { EmbeddingService } from '@app/rag-utilities';

export interface DatabaseIngesterOptions {
  apiDatabaseUrl: string;
  ragDatabaseUrl: string;
  embeddingService: EmbeddingService;
  onProgress?: (current: number, total: number) => void;
}

export class DatabaseIngester {
  private readonly apiPrisma: ApiPrismaClient;
  private readonly ragPrisma: RagPrismaClient;
  private readonly embeddingService: EmbeddingService;
  private readonly onProgress?: (current: number, total: number) => void;

  constructor(options: DatabaseIngesterOptions) {
    // Create API Prisma client with adapter
    const apiPool = new Pool({ connectionString: options.apiDatabaseUrl });
    const apiAdapter = new PrismaPg(apiPool);
    this.apiPrisma = new ApiPrismaClient({ adapter: apiAdapter });

    // Create RAG Prisma client with adapter
    const ragPool = new Pool({ connectionString: options.ragDatabaseUrl });
    const ragAdapter = new PrismaPg(ragPool);
    this.ragPrisma = new RagPrismaClient({ adapter: ragAdapter });

    this.embeddingService = options.embeddingService;
    this.onProgress = options.onProgress;
  }

  /**
   * Index posts from api_db
   */
  async indexPosts(): Promise<number> {
    try {
      // Check if post table exists
      const posts = await this.apiPrisma.post.findMany({
        where: { published: true }, // Use 'published' instead of 'is_published'
        include: {
          author: true,
        },
      });

      let indexed = 0;

      for (const post of posts) {
        await this.indexPost(post);
        indexed++;

        if (this.onProgress) {
          this.onProgress(indexed, posts.length);
        }
      }

      return indexed;
    } catch (error) {
      // Table doesn't exist or no data yet
      console.log('No posts to index or post table does not exist yet.');
      return 0;
    }
  }

  /**
   * Index a single post
   */
  private async indexPost(post: any): Promise<void> {
    const content = this.formatPostContent(post);
    const filePath = `database://posts/${post.id}`;
    const filePathHash = this.hashString(filePath);

    // Check if document already exists
    const existing = await this.ragPrisma.document.findUnique({
      where: { file_path_hash: filePathHash },
    });

    if (existing) {
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
        post_id: post.id,
        author_id: post.author_id,
        author_name: post.author?.username,
      });
    } else {
      // Create new document
      const document = await this.ragPrisma.document.create({
        data: {
          source_type: source_type.DATABASE_POST,
          doc_type: doc_type.MARKDOWN,
          title: post.title,
          file_path: filePath,
          file_path_hash: filePathHash,
          content,
          metadata: {
            post_id: post.id,
            author_id: post.author_id,
            author_name: post.author?.username,
            created_at: post.created_at,
            updated_at: post.updated_at,
          },
        },
      });

      await this.createChunks(document.id, content, {
        post_id: post.id,
        author_id: post.author_id,
        author_name: post.author?.username,
      });
    }
  }

  /**
   * Format post content for indexing
   */
  private formatPostContent(post: any): string {
    return `# ${post.title}

**Author:** ${post.author?.username || 'Unknown'}
**Published:** ${post.published_at || post.created_at}

${post.excerpt ? `> ${post.excerpt}\n\n` : ''}${post.content}`;
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
      // Use raw SQL for embedding field
      await this.ragPrisma.$executeRaw`
        INSERT INTO document_chunk (id, document_id, chunk_index, content, embedding, metadata, created_at)
        VALUES (
          gen_random_uuid(),
          ${documentId}::uuid,
          ${chunks[i].index},
          ${chunks[i].content},
          '[${embeddings[i].join(',')}]'::vector,
          ${JSON.stringify(chunks[i].metadata)}::jsonb,
          NOW()
        )
      `;
    }
  }

  /**
   * Hash string for file_path_hash
   */
  private hashString(str: string): string {
    return crypto.createHash('sha256').update(str).digest('hex');
  }

  /**
   * Disconnect Prisma clients
   */
  async disconnect(): Promise<void> {
    await this.apiPrisma.$disconnect();
    await this.ragPrisma.$disconnect();
  }
}
