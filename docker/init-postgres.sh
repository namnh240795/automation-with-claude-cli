#!/bin/bash
set -e

# PostgreSQL initialization script
# Creates separate databases and admin users for each service

echo "Initializing databases and users..."

# Auth Service Database and User (with Keycloak schema)
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create Auth service database and admin user
    -- This database uses Keycloak's database schema for custom auth implementation
    CREATE DATABASE keycloak_db;

    -- Create admin user for Auth service (access to Keycloak schema)
    CREATE USER keycloak_admin WITH PASSWORD 'keycloak_admin_password_change_this';

    -- Grant all privileges on keycloak_db to keycloak_admin
    GRANT ALL PRIVILEGES ON DATABASE keycloak_db TO keycloak_admin;

    -- Connect to keycloak_db and grant schema privileges
    \c keycloak_db
    GRANT ALL ON SCHEMA public TO keycloak_admin;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO keycloak_admin;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO keycloak_admin;

    -- Also create auth_db for backwards compatibility
    CREATE DATABASE auth_db;
    CREATE USER auth_admin WITH PASSWORD 'auth_admin_password_change_this';
    GRANT ALL PRIVILEGES ON DATABASE auth_db TO auth_admin;
    \c auth_db
    GRANT ALL ON SCHEMA public TO auth_admin;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO auth_admin;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO auth_admin;
EOSQL

echo "Auth service database created with Keycloak schema (keycloak_db) and legacy auth_db."

# RAG Service Database and User
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create RAG service database
    CREATE DATABASE rag_db;

    -- Connect to rag_db and enable pgvector extension
    \c rag_db
    CREATE EXTENSION IF NOT EXISTS vector;

    -- Create vector similarity search function for cosine distance
    CREATE OR REPLACE FUNCTION cosine_distance(vector, vector)
    RETURNS float8 AS $$
    SELECT 1 - (x <=> y)
    $$ LANGUAGE sql IMMUTABLE PARALLEL SAFE STRICT;
EOSQL

echo "RAG service database created with pgvector extension."

echo "Database initialization complete!"
