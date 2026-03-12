# 📁 Folder-Based RAG Indexing Strategy

## Overview

The RAG indexing system now supports a **folder-based strategy** that provides better organization, prioritization, and metadata for indexed content. Instead of treating all files equally, the system now:

1. **Prioritizes important folders** - Core application code is indexed first
2. **Uses folder-specific chunking** - Different chunk sizes for different content types
3. **Adds rich metadata** - Tags and descriptions for better context
4. **Filters intelligently** - Ignores test files, mocks, and large files

## Folder Hierarchy & Priorities

### Priority 1-2: Core Application Code
```
apps/api/src/         (Priority 1) - API service source code
  → Tags: api, core, controllers, services
  → Chunk size: 1000 chars, overlap: 200 chars
  → Max file size: 100KB

apps/auth/src/        (Priority 2) - Auth service source code
  → Tags: auth, jwt, security
  → Chunk size: 1000 chars, overlap: 200 chars
```

### Priority 3-6: Shared Libraries
```
libs/auth-utilities/  (Priority 3) - Authentication utilities
libs/app-logger/     (Priority 4) - Application logger
libs/caching/        (Priority 5) - Caching library
libs/rag-utilities/  (Priority 6) - RAG utilities
  → Tags: [shared], [utilities], [auth], [logging], etc.
  → Smaller chunk sizes (600-800 chars)
```

### Priority 7: Database Schemas
```
apps/*/prisma/        (Priority 7) - Database schemas
  → Tags: [database], [prisma], [schema]
  → Chunk size: 500 chars, overlap: 100 chars
```

### Priority 8-10: Configuration & Documentation
```
apps/                 (Priority 8)  - App configurations
docs/                 (Priority 9)  - Documentation
README.md, CLAUDE.md  (Priority 10) - Project docs
  → Larger chunk sizes for docs (1500-2000 chars)
```

### Priority 11-13: Infrastructure & Tools
```
docker/               (Priority 11) - Docker configs
tools/                (Priority 12) - Tools and scripts
packages/             (Priority 13) - Package configs
```

## Folder Configuration

Each folder has specific settings:

| Folder | Chunk Size | Overlap | Max Size | Tags |
|--------|-----------|---------|----------|------|
| apps/*/src | 1000 | 200 | 100KB | [api, core] |
| libs/* | 600-800 | 150 | 50KB | [shared, utilities] |
| prisma schemas | 500 | 100 | - | [database, schema] |
| docs/ | 1500 | 300 | - | [docs, guides] |
| tools/ | 600 | - | - | [tools, scripts] |

## Usage

### Standard Indexing (Original)
```bash
bash rag-index --source codebase
```

### Folder-Based Indexing (New)
```bash
bash rag-index --source codebase --folder-based
```

### Full Re-index with Folder Strategy
```bash
bash rag-index --full --folder-based
```

## Benefits

### 1. Better Search Results
- **Higher priority** content gets indexed first
- **Tags** enable filtered searches (e.g., "search only API files")
- **Rich metadata** provides better context

### 2. Performance
- **Optimal chunk sizes** per content type
- **Smaller files filtered** (tests, mocks, large configs)
- **Priority-based** indexing for faster initial results

### 3. Organization
- **Clear structure** - know exactly what's indexed
- **Easy to extend** - add new folders to strategy
- **Maintainable** - folder-based configuration

## Adding Custom Folders

To add a new folder to the indexing strategy, edit the `FOLDER_STRATEGY` in `codebase-ingester-folder.ts`:

```typescript
'your-folder': {
  path: 'your-folder',
  priority: 14,
  description: 'Your folder description',
  includePatterns: ['**/*.ts', '**/*.md'],
  excludePatterns: ['**/*.test.ts'],
  chunkSize: 800,
  chunkOverlap: 150,
  tags: ['your', 'tags'],
},
```

## Search by Tags

Once indexed, you can search by folder tags:

```bash
# Search for API-related content
bash rag-search "authentication endpoints"

# Search for database schemas
bash rag-search "Prisma models"

# Search for tools
bash rag-search "deployment scripts"
```

## Indexing Statistics

Check what's been indexed by folder:

```sql
SELECT
  d.metadata->>'folderConfig' as folder,
  d.metadata->>'priority' as priority,
  COUNT(DISTINCT d.id) as documents,
  COUNT(dc.id) as chunks
FROM document d
LEFT JOIN document_chunk dc ON d.id = dc.document_id
GROUP BY d.metadata->>'folderConfig', d.metadata->>'priority'
ORDER BY (d.metadata->>'priority')::int;
```

## Migration from Old Strategy

The old pattern-based strategy is still available. The folder-based strategy is **recommended** for:

- ✅ Better organization
- ✅ More relevant search results
- ✅ Easier to maintain
- ✅ Richer metadata

Switch to folder-based indexing for optimal results!
