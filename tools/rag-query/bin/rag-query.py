#!/usr/bin/env python3
"""
RAG Query Tool - Search indexed content using GLM embeddings
"""
import os
import sys
import subprocess
import psycopg2
from psycopg2.extras import RealDictCursor

# Configuration
RAG_DATABASE_URL = os.environ.get('RAG_DATABASE_URL',
    'postgresql://postgres:postgres_root_password_change_this@localhost:5432/rag_db')

def parse_database_url(url):
    """Parse DATABASE_URL into components"""
    # Format: postgresql://user:password@host:port/database
    parts = url.replace('postgresql://', '').split('/')
    conn_part = parts[0]
    database = parts[1] if len(parts) > 1 else 'postgres'

    if '@' in conn_part:
        auth_part, host_part = conn_part.split('@')
        user, password = auth_part.split(':')
        if ':' in host_part:
            host, port = host_part.split(':')
            port = int(port)
        else:
            host = host_part
            port = 5432
    else:
        user = 'postgres'
        password = ''
        host = 'localhost'
        port = 5432

    return {
        'host': host,
        'port': port,
        'database': database,
        'user': user,
        'password': password
    }

def generate_embedding(query_text):
    """Generate embedding for query using Python script"""
    # Use absolute path to embedding script
    embedding_script = '/Users/namnguyen/Documents/GitHub/automation-with-claude-cli/tools/rag-indexer/glm_embedding.py'

    try:
        result = subprocess.run(
            ['python3', embedding_script, query_text],
            capture_output=True,
            text=True,
            timeout=60,
            env={
                **os.environ,
                'ZHIPUAI_API_KEY': os.environ.get('ZHIPUAI_API_KEY', ''),
                'RAG_EMBEDDING_MODEL': os.environ.get('RAG_EMBEDDING_MODEL', 'glm-4.7'),
                'RAG_EMBEDDING_DIMENSIONS': os.environ.get('RAG_EMBEDDING_DIMENSIONS', '1024'),
            }
        )

        if result.returncode != 0:
            print(f"Warning: Embedding generation failed: {result.stderr}")
            return None

        import json
        data = json.loads(result.stdout)
        return data.get('embedding')

    except subprocess.TimeoutExpired:
        print("Warning: Embedding generation timed out")
        return None
    except Exception as e:
        print(f"Warning: Embedding generation error: {e}")
        return None

def search_similar(query_embedding, limit=10, threshold=0.5):
    """Search for similar chunks in the database"""
    params = parse_database_url(RAG_DATABASE_URL)

    try:
        conn = psycopg2.connect(**params)
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        # Convert embedding to string format
        embedding_str = f"[{','.join(map(str, query_embedding))}]"

        # Search query
        query_sql = """
            SELECT
                dc.id,
                dc.content,
                ROUND((1 - (dc.embedding <=> %s::vector))::numeric, 3) as similarity,
                d.title,
                d.file_path,
                d.source_type,
                d.doc_type
            FROM document_chunk dc
            INNER JOIN document d ON dc.document_id = d.id
            WHERE dc.embedding IS NOT NULL
              AND (1 - (dc.embedding <=> %s::vector)) >= %s
            ORDER BY dc.embedding <=> %s::vector
            LIMIT %s
        """

        cursor.execute(query_sql, (embedding_str, embedding_str, threshold, embedding_str, limit))
        results = cursor.fetchall()

        cursor.close()
        conn.close()

        return results

    except Exception as e:
        print(f"Database error: {e}")
        return []

def main():
    if len(sys.argv) < 2:
        print("Usage: rag-query.py \"<your search query>\"")
        print("")
        print("Examples:")
        print("  rag-query.py \"JWT authentication\"")
        print("  rag-query.py \"Prisma configuration\"")
        print("  rag-query.py \"NestJS controllers\"")
        sys.exit(1)

    query = sys.argv[1]
    print(f"\n🔍 Searching for: \"{query}\"\n")

    # Generate embedding for query
    print("⏳ Generating embedding for query...")
    query_embedding = generate_embedding(query)

    if not query_embedding:
        print("❌ Failed to generate embedding for query")
        sys.exit(1)

    print(f"✅ Embedding generated ({len(query_embedding)} dimensions)")

    # Search for similar chunks
    print("🔎 Searching database...")
    results = search_similar(query_embedding, limit=10, threshold=0.5)

    if not results:
        print("❌ No results found. Try:")
        print("  - Indexing more content")
        print("  - Lowering the similarity threshold")
        print("  - Using a different search query")
        sys.exit(0)

    print(f"\n✅ Found {len(results)} similar chunks:\n")

    for i, result in enumerate(results, 1):
        title = result.get('title') or os.path.basename(result.get('file_path', 'unknown'))
        similarity = result.get('similarity', 0) * 100
        content = result.get('content', '')
        file_path = result.get('file_path', '')

        print(f"{i}. {title}")
        print(f"   📄 {file_path}")
        print(f"   📊 Similarity: {similarity:.1f}%")
        print(f"   📝 {content[:150]}{'...' if len(content) > 150 else ''}")
        print()

if __name__ == '__main__':
    main()
