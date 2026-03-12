# 🔧 RAG System Troubleshooting Guide

## Common Issues & Solutions

### 1. "no such file or directory: .env.rag"
**Cause:** Running scripts from wrong directory

**Quick Fix:**
```bash
# Use safe scripts (recommended)
./rag-search "your query"
./rag-index --folder-based
```

---

### 2. "Exit code 127" or "command not found"
**Cause:** Script not executable or wrong directory

**Quick Fix:**
```bash
# Make scripts executable
chmod +x rag-search-safe rag-index-safe

# Use safe scripts
./rag-search "your query"
```

---

### 3. "can't open file 'tools/rag-query/bin/rag-query.py'"
**Cause:** Not in project root directory

**Quick Fix:**
```bash
# Option 1: Use safe script (works from anywhere)
./rag-search "your query"

# Option 2: Navigate to project root
cd /Users/namnguyen/Documents/GitHub/automation-with-claude-cli
bash rag-search "your query"
```

---

### 4. Database connection errors
**Cause:** PostgreSQL not running or wrong connection string

**Quick Fix:**
```bash
# Start PostgreSQL
docker-compose up -d postgres

# Check connection
docker exec claude-postgres psql -U postgres -d rag_db -c "SELECT 1"
```

---

### 5. "TypeError: crypto.createHash is not a function"
**Cause:** Old compiled code with outdated crypto API

**Quick Fix:**
```bash
# Rebuild the indexer
cd tools/rag-indexer
pnpm build
cd ../..

# Try again
./rag-index --folder-based
```

---

### 6. Missing ZHIPUAI_API_KEY
**Cause:** API key not set in .env.rag

**Quick Fix:**
```bash
# Create .env.rag from example
cp .env.rag.example .env.rag

# Edit and add your API key
nano .env.rag
# Add: ZHIPUAI_API_KEY="your_api_key_here"
```

---

## Quick Reference

### Safe Scripts (Work from Any Directory)
```bash
./rag-search "your query"        # Search
./rag-index --folder-based       # Index with folder strategy
./rag-index --full --folder-based # Full re-index
```

### Standard Scripts (Must Be in Project Root)
```bash
cd /Users/namnguyen/Documents/GitHub/automation-with-claude-cli
bash rag-search "your query"
bash rag-index --folder-based
```

### Direct Python Command
```bash
# Load environment first
source .env.rag

# Then run with environment variables
RAG_DATABASE_URL="${RAG_DATABASE_URL:-postgresql://postgres:postgres_root_password_change_this@localhost:5432/rag_db}" \
ZHIPUAI_API_KEY="$ZHIPUAI_API_KEY" \
python3 tools/rag-query/bin/rag-query.py "your query"
```

---

## Check System Status

```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Check RAG database exists
docker exec claude-postgres psql -U postgres -d rag_db -c "\dt"

# Check what's indexed
docker exec claude-postgres psql -U postgres -d rag_db -c "
SELECT doc_type, COUNT(*) FROM document GROUP BY doc_type;
"

# Check indexer build status
ls -la tools/rag-indexer/dist/index.js
```

---

## Getting Help

If issues persist:
1. Check you're using Node.js 18+ and Python 3.8+
2. Verify PostgreSQL is running: `docker ps`
3. Check .env.rag file exists and has correct values
4. Try rebuilding: `cd tools/rag-indexer && pnpm build`
