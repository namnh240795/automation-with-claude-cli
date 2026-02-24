#!/bin/bash
set -e

# PostgreSQL initialization script
# Creates separate databases and admin users for each service

echo "Initializing databases and users..."

# API Service Database and User
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create API service database and admin user
    CREATE DATABASE api_db;

    -- Create admin user for API service
    CREATE USER api_admin WITH PASSWORD 'api_admin_password_change_this';

    -- Grant all privileges on api_db to api_admin
    GRANT ALL PRIVILEGES ON DATABASE api_db TO api_admin;

    -- Connect to api_db and grant schema privileges
    \c api_db
    GRANT ALL ON SCHEMA public TO api_admin;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO api_admin;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO api_admin;
EOSQL

echo "API service database and user created."

# Auth Service Database and User
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create Auth service database and admin user
    CREATE DATABASE auth_db;

    -- Create admin user for Auth service
    CREATE USER auth_admin WITH PASSWORD 'auth_admin_password_change_this';

    -- Grant all privileges on auth_db to auth_admin
    GRANT ALL PRIVILEGES ON DATABASE auth_db TO auth_admin;

    -- Connect to auth_db and grant schema privileges
    \c auth_db
    GRANT ALL ON SCHEMA public TO auth_admin;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO auth_admin;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO auth_admin;
EOSQL

echo "Auth service database and user created."

echo "Database initialization complete!"
