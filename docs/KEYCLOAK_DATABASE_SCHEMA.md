# Keycloak Database Schema Reference

**Database:** keycloak_db
**Total Tables:** 87
**Owner:** keycloak_admin

## Core Authentication Tables

### 1. user_entity
**Purpose:** Stores user account information

| Column | Type | Description |
|--------|------|-------------|
| id | varchar(36) | Primary key (UUID) |
| email | varchar(255) | User email |
| email_verified | boolean | Email verification status (default: false) |
| enabled | boolean | Account enabled status (default: false) |
| username | varchar(255) | Username (unique per realm) |
| first_name | varchar(255) | First name |
| last_name | varchar(255) | Last name |
| realm_id | varchar(255) | Foreign key to realm |
| created_timestamp | bigint | Creation timestamp |
| not_before | integer | Password change timestamp |

**Indexes:**
- PRIMARY KEY: id
- UNIQUE: (realm_id, email_constraint)
- UNIQUE: (realm_id, username)
- INDEX: email
- INDEX: (realm_id, service_account_client_link)

**Relations:**
- user_attribute
- credential
- user_role_mapping
- user_group_membership
- user_consent
- user_required_action
- federated_identity

### 2. credential
**Purpose:** Stores user credentials (passwords, OTP, etc.)

| Column | Type | Description |
|--------|------|-------------|
| id | varchar(36) | Primary key (UUID) |
| user_id | varchar(36) | Foreign key to user_entity |
| type | varchar(255) | Credential type (password, otp, etc.) |
| secret_data | text | Encrypted secret data |
| credential_data | text | Additional credential data |
| salt | bytea | Password salt |
| created_date | bigint | Creation timestamp |
| user_label | varchar(255) | User-defined label |
| priority | integer | Credential priority |

**Indexes:**
- PRIMARY KEY: id
- INDEX: user_id

### 3. client
**Purpose:** OAuth/OIDC client applications

| Column | Type | Description |
|--------|------|-------------|
| id | varchar(36) | Primary key (UUID) |
| client_id | varchar(255) | Client identifier (unique per realm) |
| secret | varchar(255) | Client secret (if confidential) |
| name | varchar(255) | Client name |
| description | varchar(255) | Client description |
| realm_id | varchar(36) | Foreign key to realm |
| enabled | boolean | Client enabled status |
| public_client | boolean | Public or confidential client |
| protocol | varchar(255) | Protocol (openid-connect, saml) |
| standard_flow_enabled | boolean | Authorization code flow |
| implicit_flow_enabled | boolean | Implicit flow |
| direct_access_grants_enabled | boolean | Client credentials flow |
| service_accounts_enabled | boolean | Service accounts |
| bearer_only | boolean | Bearer-only client |
| consent_required | boolean | Require user consent |
| frontchannel_logout | boolean | Front-channel logout |
| base_url | varchar(255) | Base URL |
| root_url | varchar(255) | Root URL |
| management_url | varchar(255) | Management URL |
| registration_token | varchar(255) | Registration token |

**Indexes:**
- PRIMARY KEY: id
- UNIQUE: (realm_id, client_id)
- INDEX: client_id

## Authorization & RBAC Tables

### 4. keycloak_role
**Purpose:** Role definitions

| Column | Type | Description |
|--------|------|-------------|
| id | varchar(36) | Primary key |
| name | varchar(255) | Role name |
| description | text | Role description |
| realm_id | varchar(255) | Foreign key to realm |
| client_id | varchar(36) | Client-specific role (optional) |

### 5. user_role_mapping
**Purpose:** User-role assignments

| Column | Type | Description |
|--------|------|-------------|
| user_id | varchar(36) | Foreign key to user_entity |
| role_id | varchar(36) | Foreign key to keycloak_role |
| realm_id | varchar(255) | Foreign key to realm |

### 6. keycloak_group
**Purpose:** Group definitions

| Column | Type | Description |
|--------|------|-------------|
| id | varchar(36) | Primary key |
| name | varchar(255) | Group name |
| realm_id | varchar(255) | Foreign key to realm |
| parent_id | varchar(36) | Parent group (for hierarchy) |

### 7. user_group_membership
**Purpose:** User-group assignments

| Column | Type | Description |
|--------|------|-------------|
| user_id | varchar(36) | Foreign key to user_entity |
| group_id | varchar(36) | Foreign key to keycloak_group |
| realm_id | varchar(255) | Foreign key to realm |

## Realm & Configuration Tables

### 8. realm
**Purpose:** Realm (tenant) configuration

| Column | Type | Description |
|--------|------|-------------|
| id | varchar(36) | Primary key (UUID) |
| name | varchar(255) | Realm name (unique) |
| display_name | text | Display name |
| enabled | boolean | Realm enabled status |
| ssl_required | varchar(255) | SSL requirement |
| registration_allowed | boolean | Allow user registration |
| login_with_email_allowed | boolean | Allow email login |
| duplicate_emails_allowed | boolean | Allow duplicate emails |
| reset_password_allowed | boolean | Allow password reset |
| edit_username_allowed | boolean | Allow username editing |
| brute_force_protected | boolean | Brute force protection |

### 9. component
**Purpose:** Fine-grained configuration components

| Column | Type | Description |
|--------|------|-------------|
| id | varchar(36) | Primary key |
| name | varchar(255) | Component name |
| provider_id | varchar(255) | Provider type |
| provider_type | varchar(255) | Provider type |
| parent_id | varchar(36) | Parent component |
| realm_id | varchar(255) | Foreign key to realm |
| sub_type | varchar(255) | Sub-type |

## Session Management Tables

### 10. user_session
**Purpose:** Active user sessions

| Column | Type | Description |
|--------|------|-------------|
| id | varchar(36) | Primary key |
| user_id | varchar(36) | Foreign key to user_entity |
| realm_id | varchar(255) | Foreign key to realm |
| last_session_refresh | bigint | Last activity timestamp |

### 11. offline_user_session
**Purpose:** Offline token sessions

| Column | Type | Description |
|--------|------|-------------|
| user_id | varchar(36) | Foreign key to user_entity |
| offline_token | varchar(255) | Offline session token |

## Authentication Flow Tables

### 12. authentication_flow
**Purpose:** Authentication flow definitions

| Column | Type | Description |
|--------|------|-------------|
| id | varchar(36) | Primary key |
| realm_id | varchar(255) | Foreign key to realm |
| alias | varchar(255) | Flow alias |
| description | text | Flow description |
| provider_id | varchar(255) | Flow provider |
| top_level | boolean | Top-level flow |

### 13. authentication_execution
**Purpose:** Execution steps in flows

| Column | Type | Description |
|--------|------|-------------|
| id | varchar(36) | Primary key |
| authenticator | varchar(255) | Authenticator type |
| flow_id | varchar(36) | Foreign key to authentication_flow |
| requirement | varchar(255) | Requirement level |
| priority | integer | Execution priority |
| authenticator_config | varchar(255) | Configuration |

## Event & Audit Tables

### 14. admin_event_entity
**Purpose:** Administrative audit events

| Column | Type | Description |
|--------|------|-------------|
| id | varchar(36) | Primary key |
| admin_event_time | bigint | Event timestamp |
| realm_id | varchar(255) | Foreign key to realm |
| operation_type | varchar(255) | Operation type |
| resource_type | varchar(64) | Resource type |
| resource_path | varchar(2550) | Resource path |
| representation | text | Event representation |
| error | varchar(255) | Error message |
| ip_address | varchar(255) | Source IP |
| auth_realm_id | varchar(255) | Auth realm |
| auth_user_id | varchar(255) | Admin user |
| auth_client_id | varchar(255) | Client ID |

### 15. event_entity
**Purpose:** User events

| Column | Type | Description |
|--------|------|-------------|
| id | varchar(36) | Primary key |
| event_time | bigint | Event timestamp |
| realm_id | varchar(255) | Foreign key to realm |
| type | varchar(255) | Event type |
| user_id | varchar(36) | Foreign key to user_entity |
| client_id | varchar(36) | Foreign key to client |
| details_json | text | Event details |
| ip_address | varchar(255) | Source IP |

## Key Relationships

```
realm (1) ───┬── (N) user_entity
             ├── (N) client
             ├── (N) keycloak_role
             ├── (N) keycloak_group
             └── (N) authentication_flow

user_entity (1) ───┬── (N) credential
                    ├── (N) user_role_mapping ──── keycloak_role
                    ├── (N) user_group_membership ─── keycloak_group
                    └── (N) user_consent ──────────── client

client (1) ───┬── (N) protocol_mapper
              └── (N) scope_mapping
```

## Summary

**Key Points:**
1. **Multi-tenancy:** All tables are scoped by `realm_id` for isolation
2. **UUID Primary Keys:** All tables use UUID (varchar(36))
3. **Soft Deletes:** No built-in soft delete, use enabled flags
4. **Audit Trail:** Comprehensive event logging in admin_event_entity and event_entity
5. **Flexible Auth:** Pluggable authentication via authentication_flow
6. **RBAC:** Role-based access control via user_role_mapping
7. **Group Support:** Hierarchical groups via keycloak_group
8. **OAuth/OIDC:** Full support via client table with multiple grant types

**Important for Auth Module:**
- Use `user_entity` for user CRUD
- Use `credential` for password management
- Use `user_role_mapping` for role assignments
- Use `client` for OAuth client management
- Use `realm` for multi-tenant configuration
