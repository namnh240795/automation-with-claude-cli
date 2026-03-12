import { IEmbeddingProvider, EmbeddingProviderConfig } from './embedding-provider.interface';
import { ZhipuAIEmbeddingProvider } from './zhipu-ai-embedding.provider';
import { OpenAIEmbeddingProvider } from './openai-embedding.provider';

export type EmbeddingProviderType = 'zhipu' | 'openai' | 'cohere' | 'ollama';

export interface EmbeddingProviderFactoryConfig {
  type: EmbeddingProviderType;
  config: EmbeddingProviderConfig;
}

export class EmbeddingProviderFactory {
  static create(factoryConfig: EmbeddingProviderFactoryConfig): IEmbeddingProvider {
    const { type, config } = factoryConfig;

    switch (type) {
      case 'zhipu':
        return new ZhipuAIEmbeddingProvider({
          ...config,
          modelName: config.modelName || 'glm-4.7',
          dimensions: config.dimensions || 1024,
        });

      case 'openai':
        return new OpenAIEmbeddingProvider({
          ...config,
          modelName: config.modelName || 'text-embedding-3-small',
          dimensions: config.dimensions || 1536,
        });

      case 'cohere':
        throw new Error('Cohere provider not yet implemented. Use "zhipu" or "openai".');

      case 'ollama':
        throw new Error('Ollama provider not yet implemented. Use "zhipu" or "openai".');

      default:
        throw new Error(`Unsupported embedding provider type: ${type}`);
    }
  }

  static createFromEnv(): IEmbeddingProvider {
    const providerType = (process.env.RAG_EMBEDDING_PROVIDER || 'zhipu') as EmbeddingProviderType;
    const modelName = process.env.RAG_EMBEDDING_MODEL || '';
    const dimensions = parseInt(process.env.RAG_EMBEDDING_DIMENSIONS || '1024', 10);

    const config: EmbeddingProviderFactoryConfig = {
      type: providerType,
      config: {
        modelName,
        dimensions,
        batchSize: parseInt(process.env.RAG_EMBEDDING_BATCH_SIZE || '10', 10),
        maxRetries: parseInt(process.env.RAG_EMBEDDING_MAX_RETRIES || '3', 10),
        timeout: parseInt(process.env.RAG_EMBEDDING_TIMEOUT || '30000', 10),
      },
    };

    return this.create(config);
  }
}
