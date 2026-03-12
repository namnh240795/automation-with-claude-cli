#!/bin/bash
# Workaround script to run RAG indexer by mocking sharp module

# Set environment variables
export RAG_DATABASE_URL="postgresql://postgres:postgres_root_password_change_this@localhost:5432/rag_db"
export RAG_EMBEDDING_PROVIDER="zhipu"
export ZHIPUAI_API_KEY="494bd0e36a55466e842c4be506c8dddb.d1t6Vzc8Xc81DbQY"
export RAG_EMBEDDING_MODEL="glm-4.7"
export RAG_EMBEDDING_DIMENSIONS="1024"
export RAG_EMBEDDING_BATCH_SIZE="10"
export RAG_EMBEDDING_MAX_RETRIES="3"
export RAG_EMBEDDING_TIMEOUT="30000"
export RAG_EMBEDDING_CONCURRENCY="5"
export DATABASE_URL="postgresql://api_admin:api_admin_password_change_this@localhost:5432/api_db"

# Create a mock sharp module to bypass the error
mkdir -p /tmp/sharp-mock/lib
cat > /tmp/sharp-mock/lib/index.js << 'EOF'
module.exports = {
  // Mock sharp exports
  format: {},
  versions: { node: '0.0.0' }
};
EOF

# Create a minimal package.json for the mock
cat > /tmp/sharp-mock/package.json << 'EOF'
{
  "name": "sharp-mock",
  "version": "1.0.0",
  "main": "lib/index.js"
}
EOF

# Preload the mock by modifying NODE_PATH
export NODE_PATH="/tmp/sharp-mock:$NODE_PATH"

# Run the indexer
cd /Users/namnguyen/Documents/GitHub/automation-with-claude-cli/tools/rag-indexer
node dist/index.js "$@"
