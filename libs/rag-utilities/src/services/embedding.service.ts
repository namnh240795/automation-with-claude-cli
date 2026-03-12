import { IEmbeddingProvider } from '../providers/embedding-provider.interface';
import { DocumentChunkerService, DocumentChunk, ChunkOptions } from './document-chunker.service';

export interface EmbeddingServiceConfig {
  provider: IEmbeddingProvider;
  chunkOptions?: ChunkOptions;
  concurrency?: number;
}

export interface EmbeddingJobOptions {
  onProgress?: (current: number, total: number) => void;
}

export class EmbeddingService {
  private readonly provider: IEmbeddingProvider;
  private readonly chunker: DocumentChunkerService;
  private readonly concurrency: number;

  constructor(config: EmbeddingServiceConfig) {
    this.provider = config.provider;
    this.chunker = new DocumentChunkerService(config.chunkOptions);
    this.concurrency = config.concurrency || 5;
  }

  /**
   * Process a document: chunk and generate embeddings
   */
  async processDocument(
    content: string,
    metadata?: Record<string, any>,
    options?: EmbeddingJobOptions
  ): Promise<{ chunks: DocumentChunk[]; embeddings: number[][] }> {
    // Chunk the document
    const chunks = this.chunker.chunkDocument(content, metadata);

    if (options?.onProgress) {
      options.onProgress(0, chunks.length);
    }

    // Generate embeddings for all chunks
    const embeddings = await this.generateEmbeddingsBatch(
      chunks.map(c => c.content),
      options
    );

    return { chunks, embeddings };
  }

  /**
   * Generate embeddings for multiple texts with batching and concurrency
   */
  async generateEmbeddingsBatch(
    texts: string[],
    options?: EmbeddingJobOptions
  ): Promise<number[][]> {
    const batchSize = 100; // Process in batches of 100
    const allEmbeddings: number[][] = [];
    let processed = 0;

    // Split into batches
    const batches: string[][] = [];
    for (let i = 0; i < texts.length; i += batchSize) {
      batches.push(texts.slice(i, i + batchSize));
    }

    // Process batches with concurrency
    const activeBatches: Promise<void>[] = [];

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];

      const batchPromise = (async () => {
        const result = await this.provider.generateEmbeddings(batch);
        allEmbeddings.push(...result.embeddings);
        processed += batch.length;

        if (options?.onProgress) {
          options.onProgress(processed, texts.length);
        }
      })();

      activeBatches.push(batchPromise);

      // Limit concurrency
      if (activeBatches.length >= this.concurrency || batchIndex === batches.length - 1) {
        await Promise.all(activeBatches);
        activeBatches.length = 0;
      }
    }

    // Ensure embeddings are in the correct order
    return texts.map((_, i) => allEmbeddings[i]);
  }

  /**
   * Generate a single embedding
   */
  async generateEmbedding(text: string): Promise<number[]> {
    const result = await this.provider.generateEmbedding(text);
    return result.embedding;
  }

  /**
   * Calculate similarity between two embeddings (cosine similarity)
   */
  calculateSimilarity(embedding1: number[], embedding2: number[]): number {
    if (embedding1.length !== embedding2.length) {
      throw new Error('Embedding dimensions must match');
    }

    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < embedding1.length; i++) {
      dotProduct += embedding1[i] * embedding2[i];
      norm1 += embedding1[i] * embedding1[i];
      norm2 += embedding2[i] * embedding2[i];
    }

    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  }

  /**
   * Get embedding dimensions
   */
  getDimensions(): number {
    return this.provider.getDimensions();
  }

  /**
   * Get model name
   */
  getModelName(): string {
    return this.provider.getModelName();
  }

  /**
   * Estimate total tokens for a batch of texts
   */
  estimateTokens(texts: string[]): number {
    return texts.reduce((total, text) => total + this.chunker.estimateTokenCount(text), 0);
  }
}
