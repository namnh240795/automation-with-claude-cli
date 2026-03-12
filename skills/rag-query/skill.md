# RAG Query Skill

Search and retrieve information from the RAG (Retrieval-Augmented Generation) database using semantic search.

## IMPORTANT: When to automatically use this skill

**ALWAYS use RAG search FIRST when the user asks questions about:**

- Implementation details: "How does X work?", "Where is Y implemented?"
- Code patterns: "How are controllers/guards/services implemented?"
- Configuration: "What is the timeout setting?", "How is Prisma configured?"
- Architecture: "What's the authentication flow?", "How do services communicate?"
- Finding code: "Find the login page", "Where is JWT validation?"
- Documentation: "Show me docs about X", "How do I set up Y?"
- Any question about the codebase structure, implementation, or configuration

**Command to use:**
```bash
./rag-search "user's query" [options]
```

**Example:**
User asks: "What is the timeout error?"
You run: `./rag-search "timeout error configuration"`

Do NOT try to answer from memory or read files manually - ALWAYS search RAG first for codebase questions!

---

## What it does

This skill enables natural language queries against the entire indexed codebase, including:
- **Source code** - TypeScript, JavaScript, React components
- **Documentation** - Markdown files, README guides
- **Configuration** - Prisma schemas, Docker configs, package.json files
- **Libraries** - Shared utilities, services, and modules

## Search Commands

### Basic Search

```bash
# Simple search - works from any directory
./rag-search "your query"

# Examples
./rag-search "Prisma models"
./rag-search "API endpoints"
./rag-search "database configuration"
./rag-search "Keycloak setup"
```

### Advanced Options

```bash
# Limit number of results
./rag-search "query" --limit 5

# Minimum similarity threshold (0-1)
./rag-search "query" --threshold 0.8

# Alternative minimum similarity (uses higher of threshold/min-similarity)
./rag-search "query" --min-similarity 0.9

# Filter by source type
./rag-search "query" --source-type CODEBASE_SOURCE

# Filter by document type
./rag-search "query" --doc-type TYPESCRIPT

# Show full context around matches
./rag-search "query" --context

# Number of context lines (requires --context)
./rag-search "query" --context --context-lines 5

# Disable colored output
./rag-search "query" --no-color
```

### Information Commands

```bash
# Show database statistics
./rag-search --stats

# List available filter values
./rag-search --list-filters
```

## Output Features

### Color-Coded Similarity
- 🟢 **Green (85%+)**: High relevance - very similar to query
- 🔵 **Cyan (75-84%)**: Good relevance - moderately similar
- 🟡 **Yellow (<75%)**: Lower relevance - somewhat similar

### Result Information
Each result shows:
- **Title** - Document or file name
- **File path** - Location in codebase
- **Similarity %** - How well it matches the query
- **Folder** - Which folder strategy it belongs to
- **Tags** - Tags from folder-based indexing
- **Content preview** - Snippet of the matched content

## Indexing Commands

```bash
# Folder-based indexing (recommended)
./rag-index --folder-based

# Full re-index (rebuilds everything)
./rag-index --full --folder-based

# Index specific sources
./rag-index --source codebase --folder-based
./rag-index --source database --folder-based

# Verbose mode
./rag-index --folder-based --verbose
```

## Folder Strategy

The codebase is indexed with 13 priority levels:

| Priority | Folder | Description |
|----------|--------|-------------|
| 1 | apps/api/src | API core code |
| 2 | apps/auth/src | Auth core code |
| 3-6 | libs/* | Shared libraries |
| 7 | prisma schemas | Database models |
| 8-10 | docs/, README | Documentation |
| 11-13 | docker/, tools/ | Infrastructure |

## Environment setup

Required in `.env.rag`:
```bash
# Required
ZHIPUAI_API_KEY="your_api_key_here"

# Optional (with defaults)
RAG_DATABASE_URL="postgresql://postgres:postgres_root_password_change_this@localhost:5432/rag_db"
RAG_EMBEDDING_PROVIDER="zhipu"
RAG_EMBEDDING_MODEL="glm-4.7"
RAG_EMBEDDING_DIMENSIONS="1024"
```

## Example Use Cases

### Implementation searches
- "How are JWT tokens validated?"
- "Find the Prisma 7 adapter configuration"
- "Search for Fastify server setup"
- "Where is the Keycloak service defined?"

### Pattern searches
- "Show me controller patterns used in this project"
- "Find examples of DTO validation"
- "How are guards implemented?"
- "Search for decorator patterns"

### Configuration searches
- "Database configuration in this project"
- "Docker services setup"
- "Environment variable handling"
- "Rspack configuration for apps"

### Filtered searches
```bash
# Only TypeScript files
./rag-search "authentication" --doc-type TYPESCRIPT

# Only documentation
./rag-search "setup" --doc-type MARKDOWN

# Only core codebase (not docs)
./rag-search "API" --source-type CODEBASE_SOURCE

# High similarity results only
./rag-search "database" --threshold 0.85

# Top 3 results with full context
./rag-search "Prisma" --limit 3 --context
```

## Troubleshooting

If search doesn't work:
1. Ensure PostgreSQL is running: `docker ps | grep postgres`
2. Check `.env.rag` exists and has `ZHIPUAI_API_KEY` set
3. Verify RAG database is indexed: `./rag-search --stats`
4. Check available filters: `./rag-search --list-filters`
5. Try lowering threshold: `./rag-search "query" --threshold 0.3`
6. Re-index if needed: `./rag-index --folder-based`

## Notes

- The system uses semantic similarity search, not keyword matching
- Results include similarity scores (higher % = more relevant)
- Search works best with specific, descriptive queries
- The index automatically skips unchanged files (incremental updates)
- Filters help narrow down results to specific file types or sources
- Use `--stats` to see what's currently indexed
- Use `--list-filters` to see available filter options
