# RAG Query Skill

Search and retrieve information from the RAG (Retrieval-Augmented Generation) database.

## What it does

This skill enables natural language queries against indexed content from:
- Database posts and comments
- Source code files
- Documentation (markdown, TypeScript, JavaScript, Prisma schemas, etc.)

## When to use it

Use this skill when you need to:
- Find information about how something is implemented in the codebase
- Locate specific features or patterns in the code
- Search for documentation on specific topics
- Retrieve relevant code examples

## How to use it

You can ask questions like:
- "Search the RAG database for JWT authentication implementation"
- "How is Prisma 7 configured in this project?"
- "Find code related to Fastify setup"
- "What are the naming conventions used in this project?"
- "Search for user profile implementation"
- "Show me code about database migrations"

## Technical details

The RAG system uses:
- PostgreSQL with pgvector extension for similarity search
- Zhipu AI or OpenAI embeddings for semantic understanding
- Automatic indexing of codebase and database content

To access the raw query tool:
```bash
# Basic search
pnpm rag:search "your query"

# With options
pnpm rag:search -l 5 -t 0.8 "your query"

# Show statistics
pnpm rag:search --stats

# List available filters
pnpm rag:search --list-sources
pnpm rag:search --list-doc-types
```

## Environment variables

- `RAG_DATABASE_URL`: PostgreSQL connection string for rag_db
- `RAG_EMBEDDING_PROVIDER`: Embedding provider (zhipu, openai)
- `RAG_EMBEDDING_MODEL`: Model name for embeddings
- `RAG_EMBEDDING_DIMENSIONS`: Embedding dimensions (default: 1536)

## Indexing content

To index new content:
```bash
# Full re-index
pnpm rag:index:full

# Index only database
pnpm rag:index --source database

# Index only codebase
pnpm rag:index --source codebase

# Check status
pnpm rag:status
```
