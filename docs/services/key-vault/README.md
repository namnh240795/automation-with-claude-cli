# Key Vault Service

> Port: `3002` | Prefix: `key-vault` | Database: `key_vault_db`

## Overview

Centralized, secure key-value store for configuration and secrets. Only SUPER_ADMIN users can manage settings; other services consume settings via a read-only REST endpoint.

## Features

- **SECURE settings** — AES-256-GCM encrypted at rest, masked in API responses
- **STATIC settings** — Plain text values for non-sensitive configuration
- **Custom environments** — dev, staging, production, etc.
- **Version history** — Every change is archived with version tracking
- **Rollback** — Restore any previous version from history
- **Service consumption** — Read-only endpoint for external services (JWT auth, no role required)

## API Endpoints

### Environments

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/v1/environments` | JWT + SUPER_ADMIN | Create environment |
| GET | `/v1/environments` | JWT + SUPER_ADMIN | List all environments |
| GET | `/v1/environments/:id` | JWT + SUPER_ADMIN | Get environment by ID |
| PATCH | `/v1/environments/:id` | JWT + SUPER_ADMIN | Update environment |
| DELETE | `/v1/environments/:id` | JWT + SUPER_ADMIN | Soft delete environment |

### Settings

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/v1/settings` | JWT + SUPER_ADMIN | Create setting |
| GET | `/v1/settings` | JWT + SUPER_ADMIN | List settings (filters: service_name, type, search) |
| GET | `/v1/settings/:id` | JWT + SUPER_ADMIN | Get setting with current values |
| PATCH | `/v1/settings/:id` | JWT + SUPER_ADMIN | Update setting |
| DELETE | `/v1/settings/:id` | JWT + SUPER_ADMIN | Soft delete setting |

### Setting Values

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| PUT | `/v1/settings/:settingId/values/:environmentId` | JWT + SUPER_ADMIN | Set/update value |
| GET | `/v1/settings/:settingId/values/:environmentId` | JWT + SUPER_ADMIN | Get current value (?reveal=true) |
| GET | `/v1/settings/:settingId/values/:environmentId/history` | JWT + SUPER_ADMIN | Version history |
| POST | `/v1/settings/:settingId/values/:environmentId/rollback/:version` | JWT + SUPER_ADMIN | Rollback to version |

### Service Consumption

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/v1/service/:serviceName/settings?environment=dev` | JWT | Get all STATIC settings for a service |
| GET | `/v1/service/:serviceName/settings/:key?environment=dev` | JWT | Get single STATIC setting by key |

## Endpoints Detail

### POST /v1/environments — Create Environment
**Request:**
```json
{ "name": "production", "description": "Production environment" }
```
**Response (201):**
```json
{ "id": "uuid", "name": "production", "description": "Production environment", "is_active": true, "created_at": "..." }
```

### POST /v1/settings — Create Setting
**Request:**
```json
{ "service_name": "auth", "key": "SMTP_PASSWORD", "type": "SECURE", "description": "SMTP password" }
```
**Response (201):**
```json
{ "id": "uuid", "service_name": "auth", "key": "SMTP_PASSWORD", "type": "SECURE", "is_active": true, "created_at": "..." }
```

### PUT /v1/settings/:settingId/values/:environmentId — Set Value
**Request:**
```json
{ "value": "my-secret-password", "change_reason": "Rotated for Q2 2026" }
```
**Response (200):**
```json
{ "id": "uuid", "setting_id": "uuid", "environment_id": "uuid", "value": "••••••••", "version": 2, "change_reason": "Rotated for Q2 2026" }
```

### GET /v1/service/:serviceName/settings?environment=production — Service Consumption
**Response (200):**
```json
{ "service_name": "auth", "environment": "production", "settings": [{ "key": "SMTP_HOST", "value": "smtp.mailtrap.io" }] }
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| PORT | No | 3002 | Service port |
| SERVICE_PREFIX | No | key-vault | URL prefix |
| DATABASE_URL | Yes | - | PostgreSQL connection string |
| ENCRYPTION_KEY | Yes | - | 64-char hex key for AES-256-GCM |
| JWT_SECRET | Yes | - | JWT signing secret (shared with auth service) |

## Architecture

- **Encryption**: AES-256-GCM with random IV per encryption. Stored as base64 (IV + ciphertext + authTag).
- **Versioning**: Each `setValue` archives the current value to `setting_value_history` before creating the new version.
- **Soft deletes**: All entities use `deleted_at` / `deleted_by` fields; queries filter `deleted_at: null`.
- **RBAC**: Management endpoints require `SUPER_ADMIN` role; consumption endpoint requires only JWT auth.
