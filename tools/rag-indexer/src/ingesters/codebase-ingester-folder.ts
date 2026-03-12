import { glob } from 'glob';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as crypto from 'node:crypto';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@rag/prisma-client';
import { source_type, doc_type } from '@rag/prisma-client';
import { EmbeddingService } from '@app/rag-utilities';

/**
 * Folder configuration for indexing
 */
interface FolderConfig {
  path: string;
  priority: number;
  includePatterns: string[];
  excludePatterns?: string[];
  chunkSize?: number;
  chunkOverlap?: number;
  maxFileSize?: number;
  description: string;
  tags?: string[];
}

/**
 * Folder-based indexing strategy
 */
const FOLDER_STRATEGY: Record<string, FolderConfig> = {
  // Core application code (highest priority)
  'apps/api/src': {
    path: 'apps/api/src',
    priority: 1,
    description: 'API service source code',
    includePatterns: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    excludePatterns: ['**/*.spec.ts', '**/*.test.ts', '**/*.e2e.ts', '**/mocks/**'],
    chunkSize: 1000,
    chunkOverlap: 200,
    maxFileSize: 100000,
    tags: ['api', 'core', 'controllers', 'services'],
  },
  'apps/auth/src': {
    path: 'apps/auth/src',
    priority: 2,
    description: 'Auth service source code',
    includePatterns: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    excludePatterns: ['**/*.spec.ts', '**/*.test.ts', '**/*.e2e.ts'],
    chunkSize: 1000,
    chunkOverlap: 200,
    tags: ['auth', 'jwt', 'security'],
  },

  // Shared libraries (high priority)
  'libs/auth-utilities': {
    path: 'libs/auth-utilities/src',
    priority: 3,
    description: 'Authentication utilities library',
    includePatterns: ['**/*.ts'],
    excludePatterns: ['**/*.spec.ts', '**/*.test.ts'],
    chunkSize: 800,
    chunkOverlap: 150,
    tags: ['auth', 'utilities', 'shared'],
  },
  'libs/app-logger': {
    path: 'libs/app-logger/src',
    priority: 4,
    description: 'Application logger library',
    includePatterns: ['**/*.ts'],
    chunkSize: 600,
    tags: ['logging', 'utilities'],
  },
  'libs/caching': {
    path: 'libs/caching/src',
    priority: 5,
    description: 'Caching library',
    includePatterns: ['**/*.ts'],
    chunkSize: 600,
    tags: ['cache', 'redis', 'utilities'],
  },
  'libs/rag-utilities': {
    path: 'libs/rag-utilities/src',
    priority: 6,
    description: 'RAG utilities library',
    includePatterns: ['**/*.ts'],
    chunkSize: 800,
    tags: ['rag', 'embeddings', 'search'],
  },

  // Database schemas (important for understanding data models)
  'apps/*/prisma': {
    path: 'apps',
    priority: 7,
    description: 'Database schemas',
    includePatterns: ['**/prisma/schema.prisma'],
    chunkSize: 500,
    chunkOverlap: 100,
    tags: ['database', 'prisma', 'schema'],
  },

  // Configuration files
  'apps': {
    path: 'apps',
    priority: 8,
    description: 'Application configuration',
    includePatterns: ['**/package.json', '**/tsconfig*.json', '**/.env.example'],
    excludePatterns: ['**/node_modules/**'],
    chunkSize: 400,
    maxFileSize: 50000,
    tags: ['config', 'dependencies'],
  },

  // Documentation (high value for context)
  'docs': {
    path: 'docs',
    priority: 9,
    description: 'Documentation',
    includePatterns: ['**/*.md'],
    chunkSize: 1500,
    chunkOverlap: 300,
    tags: ['docs', 'guides', 'readme'],
  },
  'README.md': {
    path: '.',
    priority: 10,
    description: 'Project README',
    includePatterns: ['README.md', 'CLAUDE.md'],
    chunkSize: 2000,
    chunkOverlap: 400,
    tags: ['docs', 'readme', 'getting-started'],
  },

  // Docker and deployment
  'docker': {
    path: 'docker',
    priority: 11,
    description: 'Docker configuration',
    includePatterns: ['**/Dockerfile', '**/docker-compose*.yml', '**/*.conf'],
    chunkSize: 800,
    tags: ['docker', 'deployment', 'infrastructure'],
  },

  // Tools and scripts (lower priority)
  'tools': {
    path: 'tools',
    priority: 12,
    description: 'Tools and scripts',
    includePatterns: ['**/*.ts', '**/*.py', '**/*.sh'],
    excludePatterns: ['**/node_modules/**', '**/dist/**', '**/*.test.*'],
    chunkSize: 600,
    tags: ['tools', 'scripts', 'automation'],
  },

  // Packages (Prisma clients, etc.)
  'packages': {
    path: 'packages',
    priority: 13,
    description: 'Package configurations',
    includePatterns: ['**/schema.prisma'],
    chunkSize: 500,
    tags: ['packages', 'prisma', 'database'],
  },
};

export interface CodebaseIngesterOptions {
  ragDatabaseUrl: string;
  rootPath: string;
  embeddingService: EmbeddingService;
  includePatterns?: string[];
  excludePatterns?: string[];
  folderStrategy?: Record<string, FolderConfig>;
  onProgress?: (current: number, total: number) => void;
}

export class CodebaseIngester {
  private readonly ragPrisma: PrismaClient;
  private readonly rootPath: string;
  private readonly embeddingService: EmbeddingService;
  private readonly folderStrategy: Record<string, FolderConfig>;
  private readonly onProgress?: (current: number, total: number) => void;

  // File extension to doc_type mapping
  private readonly docTypeMap: Record<string, doc_type> = {
    '.md': doc_type.MARKDOWN,
    '.ts': doc_type.TYPESCRIPT,
    '.tsx': doc_type.TYPESCRIPT,
    '.js': doc_type.JAVASCRIPT,
    '.jsx': doc_type.JAVASCRIPT,
    '.prisma': doc_type.PRISMA_SCHEMA,
    '.json': doc_type.JSON,
    '.yaml': doc_type.YAML,
    '.yml': doc_type.YAML,
    '.txt': doc_type.TEXT,
  };

  constructor(options: CodebaseIngesterOptions) {
    // Create Prisma client with PostgreSQL adapter
    const pool = new Pool({ connectionString: options.ragDatabaseUrl });
    const adapter = new PrismaPg(pool);
    this.ragPrisma = new PrismaClient({ adapter });

    this.rootPath = options.rootPath;
    this.embeddingService = options.embeddingService;
    this.folderStrategy = options.folderStrategy || FOLDER_STRATEGY;
    this.onProgress = options.onProgress;
  }

  /**
   * Index all matching files in the codebase using folder strategy
   */
  async indexCodebase(): Promise<{ filesIndexed: number; filesSkipped: number }> {
    // Sort folders by priority
    const sortedFolders = Object.entries(this.folderStrategy)
      .sort(([, a], [, b]) => a.priority - b.priority);

    console.log(`\n📁 Indexing ${sortedFolders.length} folder groups:\n`);

    let totalIndexed = 0;
    let totalSkipped = 0;
    let totalFiles = 0;

    for (const [folderKey, folderConfig] of sortedFolders) {
      console.log(`🔍 Priority ${folderConfig.priority}: ${folderConfig.description}`);

      const files = await this.findFilesInFolder(folderConfig);
      totalFiles += files.length;

      console.log(`   Found ${files.length} files in ${folderConfig.path}\n`);

      for (const file of files) {
        const result = await this.indexFile(file, folderConfig);
        if (result) {
          totalIndexed++;
        } else {
          totalSkipped++;
        }

        if (this.onProgress) {
          this.onProgress(totalIndexed + totalSkipped, totalFiles);
        }
      }
    }

    return { filesIndexed: totalIndexed, filesSkipped: totalSkipped };
  }

  /**
   * Find files in a specific folder configuration
   */
  private async findFilesInFolder(folderConfig: FolderConfig): Promise<string[]> {
    const allFiles: Set<string> = new Set();
    const folderPath = path.join(this.rootPath, folderConfig.path);

    // Check if folder exists
    try {
      await fs.access(folderPath);
    } catch {
      return []; // Folder doesn't exist
    }

    for (const pattern of folderConfig.includePatterns) {
      const matches = await glob(pattern, {
        cwd: path.join(this.rootPath, folderConfig.path),
        absolute: true,
        ignore: folderConfig.excludePatterns || [],
      });

      for (const match of matches) {
        // Check file size if specified
        if (folderConfig.maxFileSize) {
          try {
            const stats = await fs.stat(match);
            if (stats.size > folderConfig.maxFileSize) {
              continue;
            }
          } catch {
            continue;
          }
        }
        allFiles.add(match);
      }
    }

    return Array.from(allFiles);
  }

  /**
   * Index a single file with folder-specific configuration
   */
  private async indexFile(filePath: string, folderConfig?: FolderConfig): Promise<boolean> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const relativePath = path.relative(this.rootPath, filePath);
      const fileExtension = path.extname(filePath);
      const docType = this.docTypeMap[fileExtension] || doc_type.TEXT;

      // Determine source type based on file location
      let sourceType: source_type;
      if (relativePath.startsWith('apps/')) {
        sourceType = source_type.CODEBASE_SOURCE;
      } else if (relativePath.startsWith('libs/')) {
        sourceType = source_type.CODEBASE_SOURCE;
      } else if (relativePath.startsWith('docs/')) {
        sourceType = source_type.CODEBASE_MARKDOWN;
      } else if (relativePath.startsWith('tools/')) {
        sourceType = source_type.CODEBASE_SOURCE;
      } else {
        sourceType = this.getSourceTypeFromDocType(docType);
      }

      const filePathHash = this.hashString(relativePath);

      // Check if document already exists
      const existing = await this.ragPrisma.document.findUnique({
        where: { file_path_hash: filePathHash },
      });

      if (existing) {
        // Check if content has changed
        if (content.length === existing.content.length) {
          return false; // Skip unchanged files
        }

        // Delete old chunks before re-indexing
        await this.ragPrisma.document_chunk.deleteMany({
          where: { document_id: existing.id },
        });
      }

      // Create or update document
      const document = await this.ragPrisma.document.upsert({
        where: { file_path_hash: filePathHash },
        create: {
          source_type: sourceType,
          doc_type: docType,
          title: this.generateTitle(relativePath),
          file_path: relativePath,
          file_path_hash: filePathHash,
          content: content,
          metadata: {
            folderConfig: folderConfig?.description,
            priority: folderConfig?.priority,
            tags: folderConfig?.tags,
            chunkSize: folderConfig?.chunkSize,
          },
        },
        update: {
          content: content,
          updated_at: new Date(),
          metadata: {
            folderConfig: folderConfig?.description,
            priority: folderConfig?.priority,
            tags: folderConfig?.tags,
            chunkSize: folderConfig?.chunkSize,
          },
        },
      });

      // Create chunks with folder-specific configuration
      await this.createChunks(
        document.id,
        content,
        {
          relativePath,
          fileExtension,
          folderConfig,
        }
      );

      return true;
    } catch (error) {
      console.error(`Error indexing file ${filePath}:`, error);
      return false;
    }
  }

  /**
   * Create chunks for a document
   */
  private async createChunks(
    documentId: string,
    content: string,
    metadata: Record<string, any>
  ): Promise<void> {
    const chunkSize = metadata.folderConfig?.chunkSize || 1000;
    const chunkOverlap = metadata.folderConfig?.chunkOverlap || 200;

    const { chunks, embeddings } = await this.embeddingService.processDocument(
      content,
      { ...metadata, chunkSize, chunkOverlap }
    );

    for (let i = 0; i < chunks.length; i++) {
      // Convert embedding array to string format for pgvector
      const embeddingStr = `[${embeddings[i].join(',')}]`;

      // Use raw SQL for embedding field
      await this.ragPrisma.$executeRaw`
        INSERT INTO document_chunk (id, document_id, chunk_index, content, embedding, metadata, created_at)
        VALUES (
          gen_random_uuid(),
          ${documentId}::uuid,
          ${chunks[i].index},
          ${chunks[i].content},
          ${embeddingStr}::vector,
          ${JSON.stringify(chunks[i].metadata)}::jsonb,
          NOW()
        )
      `;
    }
  }

  /**
   * Get source type from document type
   */
  private getSourceTypeFromDocType(docType: doc_type): source_type {
    switch (docType) {
      case doc_type.MARKDOWN:
        return source_type.CODEBASE_MARKDOWN;
      case doc_type.TYPESCRIPT:
      case doc_type.JAVASCRIPT:
        return source_type.CODEBASE_SOURCE;
      case doc_type.PRISMA_SCHEMA:
        return source_type.CODEBASE_SOURCE;
      case doc_type.JSON:
      case doc_type.YAML:
        return source_type.CODEBASE_SOURCE;
      default:
        return source_type.CODEBASE_SOURCE;
    }
  }

  /**
   * Generate a title from file path
   */
  private generateTitle(filePath: string): string {
    const parts = filePath.split('/');
    const filename = parts[parts.length - 1];
    const dirname = parts[parts.length - 2] || '';

    if (dirname === 'src') {
      return filename;
    }

    return `${dirname}/${filename}`;
  }

  /**
   * Hash a string for deduplication
   */
  private hashString(str: string): string {
    return crypto.hash('sha256', str, 'hex');
  }

  /**
   * Disconnect from database
   */
  async disconnect(): Promise<void> {
    await this.ragPrisma.$disconnect();
  }
}
