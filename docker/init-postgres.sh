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

# Discord Bot Service Database and User
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create Discord Bot service database and admin user
    CREATE DATABASE discord_bot_db;

    -- Create admin user for Discord Bot service
    CREATE USER discord_bot_admin WITH PASSWORD 'discord_bot_admin_password_change_this';

    -- Grant all privileges on discord_bot_db to discord_bot_admin
    GRANT ALL PRIVILEGES ON DATABASE discord_bot_db TO discord_bot_admin;

    -- Connect to discord_bot_db and grant schema privileges
    \c discord_bot_db
    GRANT ALL ON SCHEMA public TO discord_bot_admin;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO discord_bot_admin;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO discord_bot_admin;

    -- Enable pgvector extension for vector similarity search
    CREATE EXTENSION IF NOT EXISTS vector;
EOSQL

echo "Discord Bot service database and user created."

# Keycloak Service Database and User
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create Keycloak database and admin user
    CREATE DATABASE keycloak_db;

    -- Create admin user for Keycloak
    CREATE USER keycloak_admin WITH PASSWORD 'keycloak_admin_password_change_this';

    -- Grant all privileges on keycloak_db to keycloak_admin
    GRANT ALL PRIVILEGES ON DATABASE keycloak_db TO keycloak_admin;

    -- Connect to keycloak_db and grant schema privileges
    \c keycloak_db
    GRANT ALL ON SCHEMA public TO keycloak_admin;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO keycloak_admin;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO keycloak_admin;
EOSQL

echo "Keycloak service database and user created."

# CMS Service Database and User
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create CMS service database and admin user
    CREATE DATABASE cms_db;

    -- Create admin user for CMS service
    CREATE USER cms_admin WITH PASSWORD 'cms_admin_password_change_this';

    -- Grant all privileges on cms_db to cms_admin
    GRANT ALL PRIVILEGES ON DATABASE cms_db TO cms_admin;

    -- Connect to cms_db and grant schema privileges
    \c cms_db
    GRANT ALL ON SCHEMA public TO cms_admin;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO cms_admin;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO cms_admin;
EOSQL

echo "CMS service database and user created."

# Admin Service Database and User
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create Admin service database and admin user
    CREATE DATABASE admin_db;

    -- Create admin user for Admin service
    CREATE USER admin_admin WITH PASSWORD 'admin_admin_password_change_this';

    -- Grant all privileges on admin_db to admin_admin
    GRANT ALL PRIVILEGES ON DATABASE admin_db TO admin_admin;

    -- Connect to admin_db and grant schema privileges
    \c admin_db
    GRANT ALL ON SCHEMA public TO admin_admin;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO admin_admin;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO admin_admin;
EOSQL

echo "Admin service database and user created."

echo "Database initialization complete!"
