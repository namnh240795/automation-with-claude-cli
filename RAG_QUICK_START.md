# 🚀 RAG System Quick Reference

## Setup (One Time)

```bash
# Create environment file from example
cp .env.rag.example .env.rag

# Edit .env.rag and add your ZHIPUAI_API_KEY
nano .env.rag  # or use your preferred editor
```

**Required in .env.rag:**
- `ZHIPUAI_API_KEY` - Your Zhipu AI API key (required)

**Optional settings with defaults:**
- `RAG_DATABASE_URL` - Default: `postgresql://postgres:postgres_root_password_change_this@localhost:5432/rag_db`
- `RAG_EMBEDDING_PROVIDER` - Default: `zhipu`
- `RAG_EMBEDDING_MODEL` - Default: `glm-4.7`
- `RAG_EMBEDDING_DIMENSIONS` - Default: `1024`

## Indexing Commands

### Standard Indexing
```bash
# Index everything
bash rag-index

# Index specific source
bash rag-index --source codebase
bash rag-index --source database
bash rag-index --source all

# Full re-index
bash rag-index --full

# Verbose mode
bash rag-index --verbose
```

### Folder-Based Indexing (Recommended!)
```bash
# Index with folder-based strategy (prioritized, tagged)
./rag-index --folder-based

# Full re-index with folder strategy
./rag-index --full --folder-based
```

## Search Commands

```bash
# Quick search - works from any directory
./rag-search "your query"

# Examples
./rag-search "JWT authentication"
./rag-search "Prisma models"
./rag-search "API endpoints"
./rag-search "database configuration"
./rag-search "Keycloak setup"
```

## Folder Priorities

| Priority | Folder | Description |
|----------|--------|-------------|
| 1 | apps/api/src | API core code |
| 2 | apps/auth/src | Auth core code |
| 3-6 | libs/* | Shared libraries |
| 7 | prisma schemas | Database models |
| 8-10 | docs/, README | Documentation |
| 11-13 | docker/, tools/ | Infrastructure |

## Check Status

```bash
# Check what's indexed
docker exec claude-postgres psql -U postgres -d rag_db -c "
SELECT
  doc_type,
  COUNT(DISTINCT d.id) as documents,
  COUNT(dc.id) as chunks
FROM document d
LEFT JOIN document_chunk dc ON d.id = dc.document_id
GROUP BY doc_type
ORDER BY documents DESC;
"

# Check by folder
docker exec claude-postgres psql -U postgres -d rag_db -c "
SELECT
  d.metadata->>'folderConfig' as folder,
  d.metadata->>'priority' as priority,
  COUNT(*) as files
FROM document d
WHERE d.metadata->>'folderConfig' IS NOT NULL
GROUP BY folder, priority
ORDER BY (priority->>0)::int;
"
```

## Tips

1. **Use folder-based indexing** for better organized, prioritized results
2. **Re-index after changes** to keep search results current
3. **Be specific in queries** for better results
4. **Check similarity scores** - Higher % = more relevant

## Troubleshooting

### Issue: Command not found or file not found errors

**Problem:** When running `bash rag-search` or `bash rag-index`, you get errors like:
- `no such file or directory: .env.rag`
- `Exit code 127`
- File path errors

**Root Cause:** The standard scripts must be run from the **project root directory**

**Solution 1 (Recommended): Use safe scripts**
```bash
# Safe scripts work from ANY directory
./rag-search "your query"
./rag-index --folder-based
```

**Solution 2: Always run from project root**
```bash
# Navigate to project root first
cd /Users/namnguyen/Documents/GitHub/automation-with-claude-cli

# Then run commands
bash rag-search "JWT authentication"
bash rag-index --source codebase --folder-based
```

**Solution 3: Use direct Python command with env vars**
```bash
# Load environment first
source .env.rag

# Then run Python command
RAG_DATABASE_URL="${RAG_DATABASE_URL:-postgresql://postgres:postgres_root_password_change_this@localhost:5432/rag_db}" \
ZHIPUAI_API_KEY="$ZHIPUAI_API_KEY" \
python3 tools/rag-query/bin/rag-query.py "your query"
```

### Issue: Python script not found

**Problem:** `can't open file 'tools/rag-query/bin/rag-query.py': [Errno 2] No such file or directory`

**Solution:** Use the safe scripts or ensure you're in the project root directory
```bash
# Option 1: Use safe script (works from anywhere)
./rag-search "your query"

# Option 2: Navigate to project root
cd /Users/namnguyen/Documents/GitHub/automation-with-claude-cli
bash rag-search "your query"
```

## Folder Strategy Details

See `docs/RAG_INDEXING_STRATEGY.md` for complete documentation on:
- Folder configurations
- Chunk sizes per folder
- Tags and metadata
- Custom folder setup
