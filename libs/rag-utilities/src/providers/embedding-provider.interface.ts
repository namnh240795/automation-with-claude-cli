export interface EmbeddingResult {
  embedding: number[];
  dimensions: number;
  model: string;
}

export interface EmbeddingBatchResult {
  embeddings: number[][];
  dimensions: number;
  model: string;
  tokens_used?: number;
}

export interface EmbeddingProviderConfig {
  apiKey?: string;
  apiEndpoint?: string;
  modelName: string;
  dimensions: number;
  batchSize?: number;
  maxRetries?: number;
  timeout?: number;
}

export interface IEmbeddingProvider {
  /**
   * Generate embedding for a single text
   */
  generateEmbedding(text: string): Promise<EmbeddingResult>;

  /**
   * Generate embeddings for multiple texts (batch processing)
   */
  generateEmbeddings(texts: string[]): Promise<EmbeddingBatchResult>;

  /**
   * Get the dimensions of the embedding vectors
   */
  getDimensions(): number;

  /**
   * Get the model name
   */
  getModelName(): string;
}
