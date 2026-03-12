#!/usr/bin/env python3
"""
RAG Query Tool - Search indexed content using GLM embeddings

Improved version with:
- CLI options for limit, threshold, and filters
- Multiple query support
- Better output formatting
- Context preview
- Color-coded results
"""
import os
import sys
import subprocess
import json
import argparse
from pathlib import Path
from typing import Optional, List, Dict
import psycopg2
from psycopg2.extras import RealDictCursor

# ANSI color codes
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    END = '\033[0m'
    BOLD = '\033[1m'

def get_embedding_script_path():
    """Get path to embedding script - works from any directory"""
    # Try relative path from this script first
    script_dir = Path(__file__).parent.parent.parent
    relative_path = script_dir / 'rag-indexer' / 'glm_embedding.py'

    if relative_path.exists():
        return str(relative_path)

    # Fall back to absolute path
    return str(Path('/Users/namnguyen/Documents/GitHub/automation-with-claude-cli/tools/rag-indexer/glm_embedding.py'))

def parse_database_url(url: str) -> Dict[str, any]:
    """Parse DATABASE_URL into components"""
    # Format: postgresql://user:password@host:port/database
    parts = url.replace('postgresql://', '').split('/')
    conn_part = parts[0]
    database = parts[1] if len(parts) > 1 else 'rag_db'

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

def generate_embedding(query_text: str, timeout: int = 60) -> Optional[List[float]]:
    """Generate embedding for query using Python script"""
    embedding_script = get_embedding_script_path()

    try:
        result = subprocess.run(
            ['python3', embedding_script, query_text],
            capture_output=True,
            text=True,
            timeout=timeout,
            env={
                **os.environ,
                'ZHIPUAI_API_KEY': os.environ.get('ZHIPUAI_API_KEY', ''),
                'RAG_EMBEDDING_MODEL': os.environ.get('RAG_EMBEDDING_MODEL', 'glm-4.7'),
                'RAG_EMBEDDING_DIMENSIONS': os.environ.get('RAG_EMBEDDING_DIMENSIONS', '1024'),
            }
        )

        if result.returncode != 0:
            print(f"{Colors.RED}Warning: Embedding generation failed: {result.stderr}{Colors.END}")
            return None

        data = json.loads(result.stdout)
        return data.get('embedding')

    except subprocess.TimeoutExpired:
        print(f"{Colors.RED}Warning: Embedding generation timed out after {timeout}s{Colors.END}")
        return None
    except Exception as e:
        print(f"{Colors.RED}Warning: Embedding generation error: {e}{Colors.END}")
        return None

def search_similar(
    query_embedding: List[float],
    limit: int = 10,
    threshold: float = 0.5,
    source_type: Optional[str] = None,
    doc_type: Optional[str] = None,
    min_similarity: Optional[float] = None
) -> List[Dict]:
    """Search for similar chunks in the database"""
    database_url = os.environ.get('RAG_DATABASE_URL',
        'postgresql://postgres:postgres_root_password_change_this@localhost:5432/rag_db')
    params = parse_database_url(database_url)

    try:
        conn = psycopg2.connect(**params)
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        # Convert embedding to string format
        embedding_str = f"[{','.join(map(str, query_embedding))}]"

        # Build WHERE clause for filters
        where_conditions = ["dc.embedding IS NOT NULL"]
        query_params = [embedding_str, embedding_str]

        if source_type:
            where_conditions.append("d.source_type = %s")
            query_params.append(source_type)

        if doc_type:
            where_conditions.append("d.doc_type = %s")
            query_params.append(doc_type)

        # Build WHERE clause
        where_parts = ["dc.embedding IS NOT NULL"]

        if source_type:
            where_parts.append("d.source_type = %s")

        if doc_type:
            where_parts.append("d.doc_type = %s")

        # Use the higher of threshold or min_similarity
        similarity_threshold = max(threshold, min_similarity) if min_similarity else threshold

        where_clause = " AND ".join(where_parts)

        # Build query parameters in exact order of %s placeholders:
        # SELECT: 1 embedding for similarity calculation
        # WHERE: filter params (source_type, doc_type) if present
        # HAVING: 1 embedding for threshold check
        # HAVING: 1 threshold value
        # ORDER BY: 1 embedding
        # LIMIT: 1 limit value
        params = [embedding_str]

        if source_type:
            params.append(source_type)

        if doc_type:
            params.append(doc_type)

        params.extend([embedding_str, similarity_threshold, embedding_str, limit])

        query_sql = f"""
            SELECT
                dc.id,
                dc.content,
                dc.chunk_index,
                ROUND((1 - (dc.embedding <=> %s::vector))::numeric, 3) as similarity,
                d.title,
                d.file_path,
                d.source_type,
                d.doc_type,
                d.metadata
            FROM document_chunk dc
            INNER JOIN document d ON dc.document_id = d.id
            WHERE {where_clause}
              AND (1 - (dc.embedding <=> %s::vector)) >= %s
            ORDER BY dc.embedding <=> %s::vector
            LIMIT %s
        """

        cursor.execute(query_sql, tuple(params))
        results = cursor.fetchall()

        cursor.close()
        conn.close()

        return results

    except Exception as e:
        print(f"{Colors.RED}Database error: {e}{Colors.END}")
        return []

def format_output(result: Dict, show_context: bool = False, context_lines: int = 2) -> str:
    """Format a single result for display"""
    title = result.get('title') or Path(result.get('file_path', 'unknown')).name
    similarity = result.get('similarity', 0) * 100
    content = result.get('content', '')
    file_path = result.get('file_path', '')
    metadata = result.get('metadata', {}) or {}

    # Color code similarity
    if similarity >= 85:
        similarity_color = Colors.GREEN
    elif similarity >= 75:
        similarity_color = Colors.CYAN
    else:
        similarity_color = Colors.YELLOW

    output = []
    output.append(f"{Colors.BOLD}{title}{Colors.END}")
    output.append(f"   {Colors.BLUE}📄 {file_path}{Colors.END}")
    output.append(f"   {similarity_color}📊 Similarity: {similarity:.1f}%{Colors.END}")

    # Show metadata if available
    if metadata.get('folderConfig'):
        output.append(f"   {Colors.CYAN}📁 Folder: {metadata['folderConfig']}{Colors.END}")
    if metadata.get('tags'):
        tags = ', '.join(metadata['tags'])
        output.append(f"   {Colors.CYAN}🏷️  Tags: {tags}{Colors.END}")

    # Show content preview
    if show_context:
        output.append(f"   {Colors.YELLOW}📝 Content:{Colors.END}")
        lines = content.split('\n')
        preview_lines = min(len(lines), context_lines * 2 + 1)
        for line in lines[:preview_lines]:
            output.append(f"      {line}")
        if len(lines) > preview_lines:
            output.append(f"      ... ({len(lines) - preview_lines} more lines)")
    else:
        preview_length = 200
        if len(content) > preview_length:
            output.append(f"   {Colors.YELLOW}📝 {content[:preview_length]}...{Colors.END}")
        else:
            output.append(f"   {Colors.YELLOW}📝 {content}{Colors.END}")

    return '\n'.join(output)

def print_statistics():
    """Print database statistics"""
    database_url = os.environ.get('RAG_DATABASE_URL',
        'postgresql://postgres:postgres_root_password_change_this@localhost:5432/rag_db')
    params = parse_database_url(database_url)

    try:
        conn = psycopg2.connect(**params)
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        # Get document count
        cursor.execute("SELECT COUNT(*) as count FROM document")
        doc_count = cursor.fetchone()['count']

        # Get chunk count
        cursor.execute("SELECT COUNT(*) as count FROM document_chunk")
        chunk_count = cursor.fetchone()['count']

        # Get by source type
        cursor.execute("""
            SELECT source_type, COUNT(*) as count
            FROM document
            GROUP BY source_type
            ORDER BY count DESC
        """)
        source_counts = cursor.fetchall()

        # Get by doc type
        cursor.execute("""
            SELECT doc_type, COUNT(*) as count
            FROM document
            GROUP BY doc_type
            ORDER BY count DESC
        """)
        doc_type_counts = cursor.fetchall()

        cursor.close()
        conn.close()

        print(f"\n{Colors.BOLD}📊 RAG Database Statistics{Colors.END}")
        print(f"   Documents: {Colors.CYAN}{doc_count}{Colors.END}")
        print(f"   Chunks: {Colors.CYAN}{chunk_count}{Colors.END}")

        print(f"\n{Colors.BOLD}By Source Type:{Colors.END}")
        for row in source_counts:
            print(f"   {Colors.BLUE}{row['source_type']}{Colors.END}: {row['count']}")

        print(f"\n{Colors.BOLD}By Document Type:{Colors.END}")
        for row in doc_type_counts:
            print(f"   {Colors.BLUE}{row['doc_type']}{Colors.END}: {row['count']}")

    except Exception as e:
        print(f"{Colors.RED}Error fetching statistics: {e}{Colors.END}")

def list_available_filters():
    """List available filter values"""
    database_url = os.environ.get('RAG_DATABASE_URL',
        'postgresql://postgres:postgres_root_password_change_this@localhost:5432/rag_db')
    params = parse_database_url(database_url)

    try:
        conn = psycopg2.connect(**params)
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        # Get source types
        cursor.execute("SELECT DISTINCT source_type FROM document ORDER BY source_type")
        source_types = [row['source_type'] for row in cursor.fetchall()]

        # Get doc types
        cursor.execute("SELECT DISTINCT doc_type FROM document ORDER BY doc_type")
        doc_types = [row['doc_type'] for row in cursor.fetchall()]

        cursor.close()
        conn.close()

        print(f"\n{Colors.BOLD}📋 Available Filters{Colors.END}")

        print(f"\n{Colors.CYAN}Source Types:{Colors.END}")
        for st in source_types:
            print(f"   - {st}")

        print(f"\n{Colors.CYAN}Document Types:{Colors.END}")
        for dt in doc_types:
            print(f"   - {dt}")

    except Exception as e:
        print(f"{Colors.RED}Error fetching filters: {e}{Colors.END}")

def main():
    parser = argparse.ArgumentParser(
        description='RAG Query - Search indexed content using semantic search',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s "JWT authentication"
  %(prog)s "Prisma configuration" --limit 5
  %(prog)s "database" --threshold 0.8 --source-type CODEBASE_SOURCE
  %(prog)s --stats
  %(prog)s --list-filters
        """
    )

    parser.add_argument('query', nargs='?', help='Search query')
    parser.add_argument('-l', '--limit', type=int, default=10,
                       help='Maximum number of results (default: 10)')
    parser.add_argument('-t', '--threshold', type=float, default=0.5,
                       help='Minimum similarity threshold 0-1 (default: 0.5)')
    parser.add_argument('--min-similarity', type=float,
                       help='Alternative minimum similarity (higher of threshold/min-similarity used)')
    parser.add_argument('-s', '--source-type',
                       help='Filter by source type (use --list-filters to see options)')
    parser.add_argument('-d', '--doc-type',
                       help='Filter by document type (use --list-filters to see options)')
    parser.add_argument('-c', '--context', action='store_true',
                       help='Show full context around matches')
    parser.add_argument('--context-lines', type=int, default=2,
                       help='Number of context lines to show (default: 2, requires --context)')
    parser.add_argument('--stats', action='store_true',
                       help='Show database statistics and exit')
    parser.add_argument('--list-filters', action='store_true',
                       help='List available filter values and exit')
    parser.add_argument('--timeout', type=int, default=60,
                       help='Embedding generation timeout in seconds (default: 60)')
    parser.add_argument('--no-color', action='store_true',
                       help='Disable colored output')

    args = parser.parse_args()

    # Disable colors if requested
    if args.no_color:
        for attr in dir(Colors):
            if not attr.startswith('_'):
                setattr(Colors, attr, '')

    # Show statistics
    if args.stats:
        print_statistics()
        return

    # List filters
    if args.list_filters:
        list_available_filters()
        return

    # Require query if not showing stats or filters
    if not args.query:
        parser.print_help()
        sys.exit(1)

    print(f"\n{Colors.BOLD}🔍 Searching for: \"{args.query}\"{Colors.END}\n")

    # Show active filters
    filters = []
    if args.source_type:
        filters.append(f"source_type={args.source_type}")
    if args.doc_type:
        filters.append(f"doc_type={args.doc_type}")
    if args.min_similarity:
        filters.append(f"min_similarity={args.min_similarity}")

    if filters:
        print(f"{Colors.CYAN}Filters: {', '.join(filters)}{Colors.END}\n")

    # Generate embedding for query
    print(f"⏳ Generating embedding for query...")
    query_embedding = generate_embedding(args.query, timeout=args.timeout)

    if not query_embedding:
        print(f"{Colors.RED}❌ Failed to generate embedding for query{Colors.END}")
        sys.exit(1)

    print(f"{Colors.GREEN}✅ Embedding generated ({len(query_embedding)} dimensions){Colors.END}")

    # Search for similar chunks
    print(f"🔎 Searching database...")
    results = search_similar(
        query_embedding,
        limit=args.limit,
        threshold=args.threshold,
        source_type=args.source_type,
        doc_type=args.doc_type,
        min_similarity=args.min_similarity
    )

    if not results:
        print(f"{Colors.YELLOW}❌ No results found. Try:{Colors.END}")
        print(f"   - Indexing more content: ./rag-index --folder-based")
        print(f"   - Lowering the threshold: --threshold 0.3")
        print(f"   - Using a different search query")
        print(f"   - Checking available filters: --list-filters")
        sys.exit(0)

    print(f"\n{Colors.GREEN}✅ Found {len(results)} similar chunks:{Colors.END}\n")

    for i, result in enumerate(results, 1):
        print(f"{i}. ", end='')
        print(format_output(result, show_context=args.context, context_lines=args.context_lines))
        print()

if __name__ == '__main__':
    main()
