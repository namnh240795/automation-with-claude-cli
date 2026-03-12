"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZhipuAIEmbeddingProvider = void 0;
class ZhipuAIEmbeddingProvider {
    constructor(config) {
        this.config = {
            apiKey: config.apiKey || process.env.ZHIPUAI_API_KEY || '',
            apiEndpoint: config.apiEndpoint || 'https://open.bigmodel.cn/api/paas/v4/embeddings',
            modelName: config.modelName,
            dimensions: config.dimensions,
            batchSize: config.batchSize || 100,
            maxRetries: config.maxRetries || 3,
            timeout: config.timeout || 30000,
        };
        if (!this.config.apiKey) {
            throw new Error('Zhipu AI API key is required. Set ZHIPUAI_API_KEY environment variable or pass in config.');
        }
    }
    async generateEmbedding(text) {
        const result = await this.generateEmbeddings([text]);
        return {
            embedding: result.embeddings[0],
            dimensions: result.dimensions,
            model: result.model,
        };
    }
    async generateEmbeddings(texts) {
        const batches = this.chunkArray(texts, this.config.batchSize);
        const allEmbeddings = [];
        for (const batch of batches) {
            const response = await this.callEmbeddingAPI(batch);
            allEmbeddings.push(...response);
        }
        return {
            embeddings: allEmbeddings,
            dimensions: this.config.dimensions,
            model: this.config.modelName,
        };
    }
    getDimensions() {
        return this.config.dimensions;
    }
    getModelName() {
        return this.config.modelName;
    }
    async callEmbeddingAPI(texts) {
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
                throw new Error(`Zhipu AI API error: ${response.status} - ${errorText}`);
            }
            const data = await response.json();
            if (!data.data || !Array.isArray(data.data)) {
                throw new Error('Invalid response format from Zhipu AI API');
            }
            const embeddings = data.data.map((item) => item.embedding);
            if (embeddings.length > 0 && embeddings[0].length !== this.config.dimensions) {
                throw new Error(`Embedding dimension mismatch. Expected ${this.config.dimensions}, got ${embeddings[0].length}`);
            }
            return embeddings;
        }
        catch (error) {
            clearTimeout(timeoutId);
            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            throw error;
        }
    }
    chunkArray(array, chunkSize) {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }
}
exports.ZhipuAIEmbeddingProvider = ZhipuAIEmbeddingProvider;
//# sourceMappingURL=zhipu-ai-embedding.provider.js.map