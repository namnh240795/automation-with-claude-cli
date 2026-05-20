# Auth Service

> Port: `3001` | Prefix: `auth` | Database: `auth_db`

## Overview

Centralized authentication service handling user registration, sign-in, JWT token management, and organization membership. Provides JWT-based authentication for all other services.

## Features

- **User Registration & Authentication** — Sign up, sign in, JWT access + refresh tokens
- **User Types** — PERSONAL (default) and BUSINESS (can create organizations)
- **Organizations** — BUSINESS users can create organizations and invite members
- **Organization Roles** — ADMIN and MEMBER per-organization membership
- **Organization Invitations** — Email-based invitation flow with 7-day expiry
- **Audit Logging** — All mutations logged with `@LogActivity()`

## API Endpoints

### Authentication

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/v1/signup` | Public | Register new user |
| POST | `/v1/signin` | Public | Sign in with email/password |
| GET | `/v1/me` | JWT | Get current user profile |
| POST | `/v1/users/upgrade` | JWT | Upgrade user type (PERSONAL→BUSINESS) |

### Organizations

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/v1/organizations` | JWT + BUSINESS | Create organization |
| GET | `/v1/organizations` | JWT | List user's organizations |
| GET | `/v1/organizations/:id` | JWT | Get organization by ID |
| PATCH | `/v1/organizations/:id` | JWT + ORG_ADMIN | Update organization |
| DELETE | `/v1/organizations/:id` | JWT + ORG_ADMIN | Soft delete organization |
| GET | `/v1/organizations/:id/members` | JWT + ORG_MEMBER | List org members |
| POST | `/v1/organizations/:id/members` | JWT + ORG_ADMIN | Add member to org |
| DELETE | `/v1/organizations/:id/members/:userId` | JWT + ORG_ADMIN | Remove member |
| PATCH | `/v1/organizations/:id/members/:userId` | JWT + ORG_ADMIN | Update member role |

### Organization Invitations

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/v1/organizations/:orgId/invitations` | JWT + ORG_ADMIN | Create invitation |
| GET | `/v1/organizations/:orgId/invitations` | JWT + ORG_ADMIN | List pending invitations |
| POST | `/v1/organizations/:orgId/invitations/:id/accept` | JWT | Accept invitation |
| DELETE | `/v1/organizations/:orgId/invitations/:id` | JWT + ORG_ADMIN | Cancel invitation |

## Endpoints Detail

### POST /v1/signup — Register New User
**Request:**
```json
{ "email": "user@example.com", "password": "SecurePass123!", "first_name": "John", "last_name": "Doe" }
```
**Response (201):**
```json
{ "access_token": "eyJ...", "refresh_token": "eyJ...", "user": { "id": "uuid", "email": "user@example.com", "user_type": "PERSONAL" } }
```

### POST /v1/signin — Sign In
**Request:**
```json
{ "email": "user@example.com", "password": "SecurePass123!" }
```
**Response (200):**
```json
{ "access_token": "eyJ...", "refresh_token": "eyJ...", "user": { "id": "uuid", "email": "user@example.com", "user_type": "PERSONAL" } }
```

### POST /v1/organizations — Create Organization
**Request:**
```json
{ "name": "Acme Corporation", "display_id": "acme-corp", "type": "BUSINESS" }
```
**Response (201):**
```json
{ "id": "uuid", "name": "Acme Corporation", "display_id": "acme-corp", "type": "BUSINESS", "is_active": true, "created_at": "..." }
```

### POST /v1/organizations/:orgId/invitations — Create Invitation
**Request:**
```json
{ "email": "newuser@example.com", "role": "MEMBER" }
```
**Response (201):**
```json
{ "id": "uuid", "email": "newuser@example.com", "role": "MEMBER", "expires_at": "2026-05-27T..." }
```

### POST /v1/organizations/:orgId/invitations/:id/accept — Accept Invitation
**Response (200):**
```json
{ "message": "Invitation accepted successfully" }
```

## User Type Upgrade Flow

1. User signs up as `PERSONAL` (default)
2. User calls `POST /v1/users/upgrade` with `user_type: "BUSINESS"`
3. User can now create organizations via `POST /v1/organizations`

## Organization Roles

| Role | Permissions |
|------|-------------|
| ADMIN | Full org management: update settings, manage members, create/delete org secrets |
| MEMBER | Access org secrets, view members list |

## JWT Payload Structure

```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "user_type": "BUSINESS",
  "organizations": [
    { "id": "org-uuid", "role": "ADMIN", "type": "BUSINESS" }
  ],
  "iat": 1747800000,
  "exp": 1747803600
}
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| PORT | No | 3001 | Service port |
| SERVICE_PREFIX | No | auth | URL prefix |
| DATABASE_URL | Yes | - | PostgreSQL connection string |
| JWT_SECRET | Yes | - | JWT signing secret |
| JWT_EXPIRES_IN | No | 1h | Access token expiry |
| REDIS_URL | Yes | - | Redis connection for refresh tokens |
| CORS_ORIGIN | No | * | Allowed origins |

## Architecture

- **Token Strategy**: Access tokens (short-lived, 1h) + Refresh tokens (stored in Redis)
- **Soft Deletes**: All entities use `deleted_at` / `deleted_by` fields; queries filter `deleted_at: null`
- **Organization Model**: Junction table `UserOrganization` connects users to organizations with per-org roles
- **Invitation Flow**: 7-day expiry, email-based, role assigned at acceptance
- **Audit Fields**: `created_by` / `updated_by` on all write operations

## Database Models

### Core Models
- **user** — id, email, password_hash, first_name, last_name, user_type (PERSONAL/BUSINESS)
- **refresh_token** — token hash, user_id, expires_at, revoked_at

### Organization Models
- **organization** — id, name, display_id (unique), type, is_active
- **user_organization** — user_id, organization_id, organization_role (ADMIN/MEMBER), @@unique([user_id, organization_id])
- **organization_invitation** — id, organization_id, email, role, invited_by, expires_at, accepted_at