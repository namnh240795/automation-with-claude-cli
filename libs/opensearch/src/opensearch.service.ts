import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Client } from '@opensearch-project/opensearch';

@Injectable()
export class OpenSearchService implements OnModuleInit {
  private readonly logger = new Logger(OpenSearchService.name);
  private client!: Client;
  private readonly indexName = 'workflow-logs';

  async onModuleInit() {
    const nodeUrl = process.env.OPENSEARCH_URL || 'http://localhost:9200';
    this.client = new Client({
      node: nodeUrl,
    });

    try {
      await this.createIndexIfNotExists();
    } catch (error) {
      this.logger.warn(`Failed to connect to OpenSearch at ${nodeUrl}: ${error}. Logging will use console fallback.`);
    }
  }

  private async createIndexIfNotExists() {
    try {
      const exists = await this.client.indices.exists({ index: this.indexName });

      if (!exists) {
        await this.client.indices.create({
          index: this.indexName,
          body: {
            mappings: {
              properties: {
                eventId: { type: 'keyword' },
                source: { type: 'keyword' },
                action: { type: 'keyword' },
                input: { type: 'text' },
                output: { type: 'text' },
                error: { type: 'text' },
                exception: { type: 'text' },
                timestamp: { type: 'date' },
                duration_ms: { type: 'long' },
              },
            },
          },
        });
        this.logger.log(`Created index: ${this.indexName}`);
      }
    } catch (error) {
      this.logger.warn(`Index check/create failed: ${error}`);
    }
  }

  async indexLog(log: Record<string, unknown>): Promise<void> {
    await this.client.index({
      index: this.indexName,
      id: log.eventId as string,
      body: log,
      refresh: true,
    });
  }

  async searchLogs(
    query: string,
    from: number,
    size: number,
  ): Promise<{
    hits: Array<{ _source: Record<string, unknown> }>;
    total: number;
  }> {
    const result = await this.client.search({
      index: this.indexName,
      body: {
        query: {
          multi_match: {
            query,
            fields: ['input', 'output', 'error', 'exception'],
            fuzziness: 'AUTO',
          },
        },
        sort: [{ timestamp: { order: 'desc' } }],
        from,
        size,
      },
    });

    const hits = result.body.hits.hits;
    const total =
      typeof result.body.hits.total === 'number'
        ? result.body.hits.total
        : result.body.hits.total.value;

    return { hits, total };
  }
}