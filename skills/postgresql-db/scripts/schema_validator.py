#!/usr/bin/env python3
"""
PostgreSQL Schema Validator
Validates table and column names against naming conventions:
- Snake_case for all names
- Project prefix for all tables
- No reserved keywords
"""

import json
import re
import sys
from typing import Dict, List, Set, Any


# PostgreSQL reserved keywords (non-comprehensive list of common ones)
RESERVED_KEYWORDS = {
    # SQL reserved words
    'all', 'analyse', 'analyze', 'and', 'any', 'array', 'as', 'asc', 'asymmetric',
    'both', 'case', 'cast', 'check', 'collate', 'column', 'constraint', 'create',
    'current_catalog', 'current_date', 'current_role', 'current_time', 'current_timestamp',
    'current_user', 'default', 'deferrable', 'desc', 'distinct', 'do', 'else', 'end',
    'except', 'false', 'fetch', 'for', 'foreign', 'from', 'grant', 'group', 'having',
    'in', 'initially', 'intersect', 'into', 'lateral', 'leading', 'limit', 'localtime',
    'localtimestamp', 'not', 'null', 'offset', 'on', 'only', 'or', 'order', 'placing',
    'primary', 'references', 'returning', 'select', 'session_user', 'some', 'symmetric',
    'table', 'then', 'to', 'trailing', 'true', 'union', 'unique', 'user', 'using',
    'variadic', 'when', 'where', 'window', 'with',
    # PostgreSQL specific
    'abort', 'absolute', 'access', 'action', 'add', 'admin', 'after', 'aggregate',
    'also', 'alter', 'always', 'assertion', 'assignment', 'at', 'attribute', 'backward',
    'before', 'begin', 'between', 'by', 'cache', 'called', 'cascade', 'cascaded',
    'catalog', 'chain', 'characteristics', 'checkpoint', 'class', 'close', 'cluster',
    'comment', 'comments', 'commit', 'committed', 'configuration', 'connection',
    'constraints', 'content', 'continue', 'conversion', 'copy', 'cost', 'createdb',
    'createrole', 'createuser', 'cube', 'current', 'cursor', 'cycle', 'data',
    'database', 'day', 'deallocate', 'dec', 'declare', 'defaults', 'deferred',
    'definer', 'delete', 'delimiter', 'delimiters', 'dictionary', 'disable', 'discard',
    'document', 'domain', 'double', 'drop', 'each', 'enable', 'encoding', 'encrypted',
    'end', 'enum', 'escape', 'event', 'exclude', 'excluding', 'exclusive', 'execute',
    'exists', 'explain', 'extension', 'external', 'extract', 'family', 'first', 'follow',
    'force', 'forward', 'function', 'functions', 'global', 'granted', 'greatest',
    'grouping', 'handler', 'header', 'hold', 'hour', 'identity', 'if', 'immediate',
    'immutable', 'implicit', 'import', 'include', 'including', 'increment', 'index',
    'indexes', 'inherit', 'inherits', 'inline', 'inner', 'inout', 'input', 'insensitive',
    'insert', 'instead', 'invoker', 'isolation', 'join', 'key', 'label', 'language',
    'large', 'last', 'lateral', 'leading', 'leakproof', 'least', 'level', 'list',
    'listen', 'load', 'lock', 'locked', 'logged', 'mapping', 'match', 'materialized',
    'maxvalue', 'method', 'minute', 'minvalue', 'mode', 'month', 'move', 'name',
    'names', 'national', 'natural', 'new', 'next', 'no', 'none', 'normalize', 'normalized',
    'nosuperuser', 'nothing', 'notify', 'nowait', 'nullif', 'nulls', 'object', 'of',
    'off', 'oid', 'oids', 'old', 'operator', 'option', 'options', 'ordinality',
    'out', 'outer', 'over', 'overlay', 'owned', 'owner', 'parallel', 'parser', 'partial',
    'partition', 'passing', 'password', 'plans', 'policy', 'position', 'preceding',
    'precision', 'prepare', 'prepared', 'preserve', 'prior', 'privileges', 'procedural',
    'procedure', 'procedures', 'program', 'quote', 'range', 'read', 'reassign', 'recheck',
    'recursive', 'ref', 'references', 'refresh', 'reindex', 'relative', 'release',
    'rename', 'repeatable', 'replace', 'replica', 'reset', 'restart', 'restrict',
    'returns', 'revoke', 'right', 'role', 'roles', 'rollback', 'rollup', 'row', 'rows',
    'rule', 'savepoint', 'schema', 'schemas', 'scroll', 'search', 'second', 'security',
    'sequence', 'sequences', 'serializable', 'server', 'session', 'set', 'setof',
    'share', 'show', 'simple', 'snapshot', 'stable', 'standalone', 'start', 'statement',
    'statistics', 'stdin', 'stdout', 'storage', 'strict', 'strip', 'subscription',
    'substring', 'support', 'sysid', 'system', 'table', 'tables', 'tablesample',
    'tablespace', 'target', 'temp', 'template', 'temporary', 'text', 'then', 'ties',
    'time', 'timestamp', 'trailing', 'transaction', 'treat', 'trigger', 'trim',
    'true', 'truncate', 'trusted', 'type', 'types', 'unbounded', 'uncommitted',
    'unencrypted', 'unique', 'unknown', 'unlisten', 'until', 'update', 'vacuum',
    'valid', 'validate', 'validator', 'value', 'values', 'variadic', 'verbose', 'version',
    'view', 'views', 'volatile', 'whitespace', 'without', 'work', 'wrapper', 'write',
    'xml', 'yes', 'zone',
}


class PostgreSQLSchemaValidator:
    """Validate PostgreSQL schema naming conventions."""

    def __init__(self, project_prefix: str = ""):
        self.project_prefix = project_prefix.lower().replace('-', '_').replace(' ', '_')
        self.errors = []
        self.warnings = []

    def validate_name(self, name: str, name_type: str, require_prefix: bool = False) -> bool:
        """Validate a single name against conventions."""
        issues = []

        # Check if reserved keyword
        if name.lower() in RESERVED_KEYWORDS:
            issues.append(f"is a PostgreSQL reserved keyword")

        # Check snake_case
        if not re.match(r'^[a-z][a-z0-9_]*$', name):
            issues.append(f"must use snake_case (lowercase with underscores)")

        # Check for double underscores
        if '__' in name:
            issues.append(f"should not contain double underscores")

        # Check for trailing underscore
        if name.endswith('_'):
            issues.append(f"should not end with underscore")

        # Check for starting with number
        if name[0].isdigit():
            issues.append(f"should not start with a number")

        # Check prefix for tables
        if require_prefix and self.project_prefix:
            if not name.startswith(f"{self.project_prefix}_"):
                issues.append(f"must start with project prefix '{self.project_prefix}_'")

        if issues:
            error_msg = f"{name_type} '{name}': {', '.join(issues)}"
            if name.lower() in RESERVED_KEYWORDS:
                self.errors.append(error_msg)
            else:
                self.warnings.append(error_msg)
            return False

        return True

    def validate_table(self, table_name: str) -> bool:
        """Validate table name."""
        return self.validate_name(table_name, "Table", require_prefix=True)

    def validate_column(self, column_name: str) -> bool:
        """Validate column name."""
        return self.validate_name(column_name, "Column", require_prefix=False)

    def validate_schema(self, schema: Dict[str, Any]) -> bool:
        """Validate entire schema."""
        valid = True

        for table_name, table_def in schema.get('tables', {}).items():
            if not self.validate_table(table_name):
                valid = False

            for column in table_def.get('columns', []):
                col_name = column.get('name', '')
                if not self.validate_column(col_name):
                    valid = False

            for fk in table_def.get('foreign_keys', []):
                fk_table = fk.get('references', {}).get('table', '')
                if fk_table and not self.validate_table(fk_table):
                    valid = False

        return valid

    def suggest_name(self, name: str, name_type: str) -> str:
        """Suggest a corrected name."""
        suggested = name.lower()

        # Replace hyphens and spaces with underscores
        suggested = suggested.replace('-', '_').replace(' ', '_')

        # Remove consecutive underscores
        while '__' in suggested:
            suggested = suggested.replace('__', '_')

        # Remove trailing underscore
        suggested = suggested.rstrip('_')

        # Remove leading numbers
        suggested = suggested.lstrip('0123456789')

        # Ensure starts with letter
        if suggested and suggested[0].isdigit():
            suggested = f"col_{suggested}"

        # Add prefix for tables
        if name_type == "table" and self.project_prefix and not suggested.startswith(f"{self.project_prefix}_"):
            suggested = f"{self.project_prefix}_{suggested}"

        return suggested if suggested else name


def main():
    """CLI interface."""
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Usage: schema_validator.py '<json_schema>' [project_prefix]"}))
        sys.exit(1)

    schema = json.loads(sys.argv[1])
    prefix = sys.argv[2] if len(sys.argv) > 2 else ""

    validator = PostgreSQLSchemaValidator(prefix)
    is_valid = validator.validate_schema(schema)

    result = {
        "valid": is_valid,
        "errors": validator.errors,
        "warnings": validator.warnings,
        "prefix_used": prefix
    }

    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
