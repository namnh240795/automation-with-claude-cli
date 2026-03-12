#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import ora, { Ora } from 'ora';
import * as path from 'path';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { DatabaseIngester } from './ingesters/database-ingester';
import { CodebaseIngester } from './ingesters/codebase-ingester';
import { CodebaseIngester as CodebaseIngesterFolder } from './ingesters/codebase-ingester-folder';
import { EmbeddingProviderFactory } from '@app/rag-utilities';
import { PrismaClient } from '@rag/prisma-client';

const program = new Command();

// Helper function to create Prisma client with PostgreSQL adapter
function createRagPrismaClient(databaseUrl: string) {
  const pool = new Pool({ connectionString: databaseUrl });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

// Load environment variables
const RAG_DATABASE_URL = process.env.RAG_DATABASE_URL ||
  'postgresql://postgres:postgres_root_password_change_this@localhost:5432/rag_db';

const API_DATABASE_URL = process.env.DATABASE_URL ||
  'postgresql://api_admin:api_admin_password_change_this@localhost:5432/api_db';

const ROOT_PATH = process.cwd();

program
  .name('rag-index')
  .description('RAG Indexer - Index database and codebase for semantic search')
  .version('0.0.1');

program
  .command('index')
  .description('Index content into the RAG database')
  .option('-f, --full', 'Perform full re-index')
  .option('-s, --source <source>', 'Source to index (database, codebase, or all)', 'all')
  .option('--folder-based', 'Use folder-based indexing strategy (recommended)')
  .option('-v, --verbose', 'Verbose output')
  .action(async (options) => {
    const spinner = ora('Starting RAG indexer...').start();

    try {
      // Initialize embedding provider
      spinner.text = 'Initializing embedding provider...';
      const embeddingProvider = EmbeddingProviderFactory.createFromEnv();

      const { EmbeddingService } = await import('@app/rag-utilities');
      const embeddingService = new EmbeddingService({
        provider: embeddingProvider,
        concurrency: parseInt(process.env.RAG_EMBEDDING_CONCURRENCY || '5', 10),
      });

      // Initialize Prisma client with PostgreSQL adapter
      const ragPrisma = createRagPrismaClient(RAG_DATABASE_URL);

      // Create indexing job record
      const job = await ragPrisma.indexing_job.create({
        data: {
          status: 'IN_PROGRESS',
          source: options.source,
        },
      });

      let documentsIndexed = 0;
      let chunksCreated = 0;

      // Index database content
      if (options.source === 'all' || options.source === 'database') {
        spinner.text = 'Indexing database content...';
        const dbIngester = new DatabaseIngester({
          apiDatabaseUrl: API_DATABASE_URL,
          ragDatabaseUrl: RAG_DATABASE_URL,
          embeddingService,
          onProgress: (current, total) => {
            if (options.verbose) {
              spinner.text = `Indexing database: ${current}/${total}`;
            }
          },
        });

        try {
          const indexed = await dbIngester.indexPosts();
          documentsIndexed += indexed;

          // Get chunks count
          const chunks = await ragPrisma.document_chunk.count();
          chunksCreated = chunks;
        } catch (error) {
          spinner.fail(chalk.red(`Database indexing failed: ${error}`));
          await dbIngester.disconnect();
          await ragPrisma.$disconnect();
          process.exit(1);
        }

        await dbIngester.disconnect();
      }

      // Index codebase
      if (options.source === 'all' || options.source === 'codebase') {
        spinner.text = 'Indexing codebase...';

        // Use folder-based ingester if flag is set
        const IngesterClass = options.folderBased ? CodebaseIngesterFolder : CodebaseIngester;

        const codebaseIngester = new IngesterClass({
          ragDatabaseUrl: RAG_DATABASE_URL,
          rootPath: ROOT_PATH,
          embeddingService,
          onProgress: (current, total) => {
            if (options.verbose) {
              spinner.text = `Indexing codebase: ${current}/${total} files`;
            }
          },
        });

        try {
          const result = await codebaseIngester.indexCodebase();
          documentsIndexed += result.filesIndexed;

          // Get chunks count
          const chunks = await ragPrisma.document_chunk.count();
          chunksCreated = chunks;
        } catch (error) {
          spinner.fail(chalk.red(`Codebase indexing failed: ${error}`));
          await codebaseIngester.disconnect();
          await ragPrisma.$disconnect();
          process.exit(1);
        }

        await codebaseIngester.disconnect();
      }

      // Update job record
      await ragPrisma.indexing_job.update({
        where: { id: job.id },
        data: {
          status: 'COMPLETED',
          documents_indexed: documentsIndexed,
          chunks_created: chunksCreated,
          completed_at: new Date(),
        },
      });

      await ragPrisma.$disconnect();

      spinner.succeed(chalk.green(`Indexing complete! ${documentsIndexed} documents indexed, ${chunksCreated} chunks created`));
    } catch (error) {
      spinner.fail(chalk.red(`Indexing failed: ${error}`));
      process.exit(1);
    }
  });

program
  .command('status')
  .description('Show RAG indexing status')
  .action(async () => {
    try {
      const ragPrisma = createRagPrismaClient(RAG_DATABASE_URL);

      const stats = await ragPrisma.document.aggregate({
        _count: { id: true },
      });

      const chunks = await ragPrisma.document_chunk.aggregate({
        _count: { id: true },
      });

      const lastJobs = await ragPrisma.indexing_job.findMany({
        orderBy: { started_at: 'desc' },
        take: 5,
      });

      console.log(chalk.bold('\nRAG Index Status:'));
      console.log(`  Documents: ${chalk.cyan(stats._count.id)}`);
      console.log(`  Chunks: ${chalk.cyan(chunks._count.id)}`);

      if (lastJobs.length > 0) {
        console.log(chalk.bold('\nRecent Jobs:'));
        for (const job of lastJobs) {
          const statusColor = job.status === 'COMPLETED' ? chalk.green : job.status === 'FAILED' ? chalk.red : chalk.yellow;
          console.log(`  [${statusColor(job.status)}] ${job.source} - ${job.documents_indexed} docs, ${job.chunks_created} chunks - ${job.started_at}`);
        }
      }

      await ragPrisma.$disconnect();
    } catch (error) {
      console.error(chalk.red(`Failed to get status: ${error}`));
      process.exit(1);
    }
  });

program
  .command('clear')
  .description('Clear all indexed data')
  .option('-f, --force', 'Force clear without confirmation')
  .action(async (options) => {
    if (!options.force) {
      console.log(chalk.yellow('This will delete all indexed data. Use --force to confirm.'));
      process.exit(0);
    }

    const spinner = ora('Clearing RAG database...').start();

    try {
      const ragPrisma = createRagPrismaClient(RAG_DATABASE_URL);

      await ragPrisma.document_chunk.deleteMany({});
      await ragPrisma.document.deleteMany({});
      await ragPrisma.indexing_job.deleteMany({});

      await ragPrisma.$disconnect();

      spinner.succeed(chalk.green('RAG database cleared'));
    } catch (error) {
      spinner.fail(chalk.red(`Failed to clear database: ${error}`));
      process.exit(1);
    }
  });

program.parse();
