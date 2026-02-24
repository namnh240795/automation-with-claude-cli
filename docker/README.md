# Docker Setup

This directory contains Docker configurations for running the project services.

## Services

### PostgreSQL Database
Single PostgreSQL instance running on port `5432` with separate databases and admin credentials for each service:

| Service | Database | Admin User | Password |
|---------|----------|------------|----------|
| API | `api_db` | `api_admin` | `api_admin_password_change_this` |
| Auth | `auth_db` | `auth_admin` | `auth_admin_password_change_this` |

Each service's admin user has full privileges only on their respective database.

## Usage

Start PostgreSQL:
```bash
cd docker
docker-compose up -d postgres
```

Stop PostgreSQL:
```bash
docker-compose down
```

## Initialization

The `init-postgres.sh` script runs automatically on first startup to:
1. Create separate databases for each service (`api_db`, `auth_db`)
2. Create admin users for each service with full privileges on their database
3. Grant appropriate schema and table privileges

## Database Credentials

**IMPORTANT**: Change the default passwords in:
- `docker/init-postgres.sh` - for database initialization
- `apps/api/.env` - for API service connection
- `apps/auth/.env` - for Auth service connection

