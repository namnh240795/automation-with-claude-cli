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
./rag-search "user's query"
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

## When to use it

Use this skill when you need to:
- Find how specific features are implemented in the codebase
- Locate code patterns or conventions used in the project
- Search for documentation on architecture, setup, or configuration
- Retrieve relevant code examples without reading through files manually
- Understand the project structure and dependencies

## How to use it

You can ask natural language questions like:
- "Search the RAG database for JWT authentication implementation"
- "How is Prisma 7 configured in this project?"
- "Find code related to Fastify adapter setup"
- "What are the naming conventions for DTOs?"
- "Search for Keycloak integration code"
- "Show me the RAG indexing strategy"
- "Where is the app logger configured?"
- "How are database migrations handled?"

## Technical details

### Search Commands

The RAG system automatically loads environment from `.env.rag`:

```bash
# Basic search - works from any directory
./rag-search "your query"

# Examples
./rag-search "Prisma models"
./rag-search "API endpoints"
./rag-search "database configuration"
./rag-search "Keycloak setup"
```

### Indexing Commands

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

### Folder Strategy

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

## Example queries to try

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

### Documentation searches
- "Project structure overview"
- "Authentication flow documentation"
- "Testing guidelines"
- "RAG system setup"

## Troubleshooting

If search doesn't work:
1. Ensure PostgreSQL is running: `docker ps | grep postgres`
2. Check `.env.rag` exists and has `ZHIPUAI_API_KEY` set
3. Verify RAG database is indexed: `docker exec claude-postgres psql -U postgres -d rag_db -c "SELECT COUNT(*) FROM document;"`
4. Re-index if needed: `./rag-index --folder-based`

## Notes

- The system uses semantic similarity search, not keyword matching
- Results include similarity scores (higher % = more relevant)
- Search works best with specific, descriptive queries
- The index automatically skips unchanged files (incremental updates)
