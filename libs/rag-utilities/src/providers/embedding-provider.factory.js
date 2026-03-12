"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddingProviderFactory = void 0;
const zhipu_ai_embedding_provider_1 = require("./zhipu-ai-embedding.provider");
const openai_embedding_provider_1 = require("./openai-embedding.provider");
class EmbeddingProviderFactory {
    static create(factoryConfig) {
        const { type, config } = factoryConfig;
        switch (type) {
            case 'zhipu':
                return new zhipu_ai_embedding_provider_1.ZhipuAIEmbeddingProvider({
                    ...config,
                    modelName: config.modelName || 'embedding-3',
                    dimensions: config.dimensions || 1024,
                });
            case 'openai':
                return new openai_embedding_provider_1.OpenAIEmbeddingProvider({
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
    static createFromEnv() {
        const providerType = (process.env.RAG_EMBEDDING_PROVIDER || 'zhipu');
        const modelName = process.env.RAG_EMBEDDING_MODEL || '';
        const dimensions = parseInt(process.env.RAG_EMBEDDING_DIMENSIONS || '1536', 10);
        const config = {
            type: providerType,
            config: {
                modelName,
                dimensions,
                batchSize: parseInt(process.env.RAG_EMBEDDING_BATCH_SIZE || '100', 10),
                maxRetries: parseInt(process.env.RAG_EMBEDDING_MAX_RETRIES || '3', 10),
                timeout: parseInt(process.env.RAG_EMBEDDING_TIMEOUT || '30000', 10),
            },
        };
        return this.create(config);
    }
}
exports.EmbeddingProviderFactory = EmbeddingProviderFactory;
//# sourceMappingURL=embedding-provider.factory.js.map