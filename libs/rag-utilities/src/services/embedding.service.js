"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddingService = void 0;
const document_chunker_service_1 = require("./document-chunker.service");
class EmbeddingService {
    constructor(config) {
        this.provider = config.provider;
        this.chunker = new document_chunker_service_1.DocumentChunkerService(config.chunkOptions);
        this.concurrency = config.concurrency || 5;
    }
    async processDocument(content, metadata, options) {
        const chunks = this.chunker.chunkDocument(content, metadata);
        if (options?.onProgress) {
            options.onProgress(0, chunks.length);
        }
        const embeddings = await this.generateEmbeddingsBatch(chunks.map(c => c.content), options);
        return { chunks, embeddings };
    }
    async generateEmbeddingsBatch(texts, options) {
        const batchSize = 100;
        const allEmbeddings = [];
        let processed = 0;
        const batches = [];
        for (let i = 0; i < texts.length; i += batchSize) {
            batches.push(texts.slice(i, i + batchSize));
        }
        const activeBatches = [];
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
            if (activeBatches.length >= this.concurrency || batchIndex === batches.length - 1) {
                await Promise.all(activeBatches);
                activeBatches.length = 0;
            }
        }
        return texts.map((_, i) => allEmbeddings[i]);
    }
    async generateEmbedding(text) {
        const result = await this.provider.generateEmbedding(text);
        return result.embedding;
    }
    calculateSimilarity(embedding1, embedding2) {
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
    getDimensions() {
        return this.provider.getDimensions();
    }
    getModelName() {
        return this.provider.getModelName();
    }
    estimateTokens(texts) {
        return texts.reduce((total, text) => total + this.chunker.estimateTokenCount(text), 0);
    }
}
exports.EmbeddingService = EmbeddingService;
//# sourceMappingURL=embedding.service.js.map