import {
  IEmbeddingProvider,
  EmbeddingProviderConfig,
  EmbeddingResult,
  EmbeddingBatchResult,
} from './embedding-provider.interface';

export class OpenAIEmbeddingProvider implements IEmbeddingProvider {
  private readonly config: Required<EmbeddingProviderConfig>;

  constructor(config: EmbeddingProviderConfig) {
    this.config = {
      apiKey: config.apiKey || process.env.OPENAI_API_KEY || '',
      apiEndpoint: config.apiEndpoint ||
        (process.env.OPENAI_BASE_URL ? `${process.env.OPENAI_BASE_URL}/embeddings` : 'https://api.openai.com/v1/embeddings'),
      modelName: config.modelName,
      dimensions: config.dimensions,
      batchSize: config.batchSize || 100,
      maxRetries: config.maxRetries || 3,
      timeout: config.timeout || 30000,
    };

    if (!this.config.apiKey) {
      throw new Error('OpenAI API key is required. Set OPENAI_API_KEY environment variable or pass in config.');
    }
  }

  async generateEmbedding(text: string): Promise<EmbeddingResult> {
    const result = await this.generateEmbeddings([text]);
    return {
      embedding: result.embeddings[0],
      dimensions: result.dimensions,
      model: result.model,
    };
  }

  async generateEmbeddings(texts: string[]): Promise<EmbeddingBatchResult> {
    const batches = this.chunkArray(texts, this.config.batchSize);
    const allEmbeddings: number[][] = [];
    let totalTokens = 0;

    for (const batch of batches) {
      const response = await this.callEmbeddingAPI(batch);
      allEmbeddings.push(...response.embeddings);
      totalTokens += response.tokens_used || 0;
    }

    return {
      embeddings: allEmbeddings,
      dimensions: this.config.dimensions,
      model: this.config.modelName,
      tokens_used: totalTokens,
    };
  }

  getDimensions(): number {
    return this.config.dimensions;
  }

  getModelName(): string {
    return this.config.modelName;
  }

  private async callEmbeddingAPI(texts: string[]): Promise<{ embeddings: number[][]; tokens_used?: number }> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model: this.config.modelName,
          input: texts,
          encoding_format: 'float',
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (!data.data || !Array.isArray(data.data)) {
        throw new Error('Invalid response format from OpenAI API');
      }

      // Extract embeddings from response (sorted by index)
      const embeddings: number[][] = data.data
        .sort((a: any, b: any) => a.index - b.index)
        .map((item: any) => item.embedding);

      // Verify dimensions
      if (embeddings.length > 0 && embeddings[0].length !== this.config.dimensions) {
        throw new Error(
          `Embedding dimension mismatch. Expected ${this.config.dimensions}, got ${embeddings[0].length}`
        );
      }

      return {
        embeddings,
        tokens_used: data.usage?.total_tokens,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  private chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
}
