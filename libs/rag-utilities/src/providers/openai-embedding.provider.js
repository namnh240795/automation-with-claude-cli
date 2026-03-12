"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIEmbeddingProvider = void 0;
class OpenAIEmbeddingProvider {
    constructor(config) {
        this.config = {
            apiKey: config.apiKey || process.env.OPENAI_API_KEY || '',
            apiEndpoint: config.apiEndpoint || 'https://api.openai.com/v1/embeddings',
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
                throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
            }
            const data = await response.json();
            if (!data.data || !Array.isArray(data.data)) {
                throw new Error('Invalid response format from OpenAI API');
            }
            const embeddings = data.data
                .sort((a, b) => a.index - b.index)
                .map((item) => item.embedding);
            if (embeddings.length > 0 && embeddings[0].length !== this.config.dimensions) {
                throw new Error(`Embedding dimension mismatch. Expected ${this.config.dimensions}, got ${embeddings[0].length}`);
            }
            return {
                embeddings,
                tokens_used: data.usage?.total_tokens,
            };
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
exports.OpenAIEmbeddingProvider = OpenAIEmbeddingProvider;
//# sourceMappingURL=openai-embedding.provider.js.map