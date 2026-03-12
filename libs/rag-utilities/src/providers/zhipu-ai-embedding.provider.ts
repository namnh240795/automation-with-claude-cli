import {
  IEmbeddingProvider,
  EmbeddingProviderConfig,
  EmbeddingResult,
  EmbeddingBatchResult,
} from './embedding-provider.interface';
import { spawn } from 'child_process';
import * as path from 'path';

export class ZhipuAIEmbeddingProvider implements IEmbeddingProvider {
  private readonly config: Required<EmbeddingProviderConfig>;
  private readonly pythonScriptPath: string;

  constructor(config: EmbeddingProviderConfig) {
    this.config = {
      apiKey: config.apiKey || process.env.ZHIPUAI_API_KEY || '',
      apiEndpoint: config.apiEndpoint || '',
      modelName: config.modelName || 'glm-4',
      dimensions: config.dimensions || 1024,
      batchSize: config.batchSize || 10,
      maxRetries: config.maxRetries || 3,
      timeout: config.timeout || 30000,
    };

    if (!this.config.apiKey) {
      throw new Error('Zhipu AI API key is required. Set ZHIPUAI_API_KEY environment variable or pass in config.');
    }

    // Find the Python script path
    // Try multiple possible locations
    const possiblePaths = [
      path.join(process.cwd(), 'glm_embedding.py'),
      path.join(__dirname, '../../tools/rag-indexer/glm_embedding.py'),
      '/Users/namnguyen/Documents/GitHub/automation-with-claude-cli/tools/rag-indexer/glm_embedding.py',
    ];

    for (const p of possiblePaths) {
      if (require('fs').existsSync(p)) {
        this.pythonScriptPath = p;
        break;
      }
    }

    if (!this.pythonScriptPath) {
      throw new Error('Could not find glm_embedding.py script');
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

    for (const batch of batches) {
      const embeddings = await this.callPythonEmbeddingAPI(batch);
      allEmbeddings.push(...embeddings);
    }

    return {
      embeddings: allEmbeddings,
      dimensions: this.config.dimensions,
      model: this.config.modelName,
    };
  }

  getDimensions(): number {
    return this.config.dimensions;
  }

  getModelName(): string {
    return this.config.modelName;
  }

  private async callPythonEmbeddingAPI(texts: string[]): Promise<number[][]> {
    return new Promise((resolve, reject) => {
      const python = spawn('python3', [this.pythonScriptPath, '--batch'], {
        env: {
          ...process.env,
          ZHIPUAI_API_KEY: this.config.apiKey,
          RAG_EMBEDDING_MODEL: this.config.modelName,
          RAG_EMBEDDING_DIMENSIONS: this.config.dimensions.toString(),
        },
      });

      let stdout = '';
      let stderr = '';

      python.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      python.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      python.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Python script failed with code ${code}: ${stderr}`));
          return;
        }

        try {
          const result = JSON.parse(stdout);
          const embeddings = result.embeddings || [];

          // Verify dimensions
          if (embeddings.length > 0 && embeddings[0].length !== this.config.dimensions) {
            console.warn(
              `Warning: Expected ${this.config.dimensions} dimensions, got ${embeddings[0].length}`
            );
          }

          resolve(embeddings);
        } catch (error) {
          reject(new Error(`Failed to parse Python output: ${stdout}`));
        }
      });

      python.on('error', (error) => {
        reject(new Error(`Failed to spawn Python process: ${error.message}`));
      });

      // Send texts to Python as JSON
      python.stdin.write(JSON.stringify(texts));
      python.stdin.end();
    });
  }

  private chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
}
