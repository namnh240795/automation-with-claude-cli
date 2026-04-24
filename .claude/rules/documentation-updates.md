# Documentation Updates — Keep Docs in Sync with Code

> Source: Documentation maintenance rules for this monorepo

## 🔄 When to Update Docs

### ✅ After completing ANY of these, update the related docs section

| Action Completed | Docs to Update |
|------------------|---------------|
| New API endpoint | `docs/services/<service>/README.md` |
| New service created | `docs/services/<service>/README.md` + `docs/architecture/README.md` |
| New database model/migration | `docs/appendix/README.md` (ER diagram) |
| New business flow | `docs/business/README.md` |
| New shared library | `docs/architecture/README.md` |
| Auth/guard changes | `docs/services/auth/README.md` |
| Frontend route/page added | `docs/services/<web>/README.md` |
| Deployment/infra change | `docs/architecture/README.md` |
| Breaking API change | All affected service READMEs |

---

## 📋 What to Update per Section

### `docs/services/<service>/README.md`
When adding or modifying an API endpoint:

```markdown
## API Endpoints

### Users

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/v1/users` | Public | Create user |
| GET | `/v1/users/:id` | JWT | Get user by ID |
| PATCH | `/v1/users/:id` | JWT + Owner | Update user |
| DELETE | `/v1/users/:id` | JWT + Admin | Soft delete user |

### POST /v1/users — Create User
**Request:**
```json
{ "email": "user@example.com", "password": "****", "full_name": "John" }
```
**Response (201):**
```json
{ "id": "uuid", "email": "user@example.com", "created_at": "..." }
```

> Add diagram if the flow is complex:
> ![User CRUD](diagrams/user-crud-sequence.svg)
```

### `docs/architecture/README.md`
When adding a new service or shared library:

```markdown
## Services

| Service | Port | Prefix | Database | Description |
|---------|------|--------|----------|-------------|
| auth | 3001 | auth | auth_db | Authentication & JWT |
| billing | 3002 | billing | billing_db | Payment processing |

## Shared Libraries

| Library | Alias | Purpose |
|---------|-------|---------|
| auth-utilities | @app/auth-utilities | JWT guards, decorators |
| billing-client | @app/billing-client | Billing service client |
```

### `docs/business/README.md`
When adding a new business flow:

```markdown
## User Registration Flow

1. User submits email + password
2. Auth service validates and hashes password
3. User record created in auth_db
4. Welcome email queued
5. JWT access + refresh tokens returned

> ![Registration Flow](diagrams/user-registration-flow.svg)
```

### `docs/appendix/README.md`
When adding or modifying database models:

```markdown
## Database Schema — auth_db

### user table
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK, default uuid() |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password_hash | VARCHAR(255) | NOT NULL |
| is_active | BOOLEAN | default true |
| created_at | TIMESTAMP | default now() |

> ![ER Diagram](diagrams/er-diagram.svg)
```

---

## 🔀 Workflow: Code Change → Doc Update

### ✅ After completing a feature with passing tests
```
1. Code complete ✓
2. Tests passing ✓
3. NOW → Update docs:
   ├── Identify which docs sections are affected
   ├── Update the service README with new endpoint(s)
   ├── Add/update diagrams if flow changed
   ├── Update architecture README if structure changed
   └── Update appendix if DB schema changed
```

### ✅ Self-check before marking task complete
```
- [ ] New endpoint documented in docs/services/<service>/README.md
- [ ] Request/response examples added
- [ ] Auth requirements listed (Public / JWT / JWT + Role)
- [ ] Diagram updated if flow changed
- [ ] Architecture README updated if new service/library added
- [ ] Appendix ER diagram updated if DB schema changed
```

---

## 🏗️ Service README Template

### ✅ Use this template when creating `docs/services/<name>/README.md`
```markdown
# <Service Name> Service

> Port: `<port>` | Prefix: `<prefix>` | Database: `<db_name>`

## Overview
Brief description of what this service does.

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| ... | ... | ... | ... |

## Endpoints Detail

### <METHOD> <path> — <description>
**Request:**
```json
{ ... }
```
**Response (<status>):**
```json
{ ... }
```

## Diagrams

> ![<name>](diagrams/<name>.svg)

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| PORT | No | 3000 | Service port |
| DATABASE_URL | Yes | - | PostgreSQL connection |
| JWT_SECRET | Yes | - | JWT signing secret |
```

---

## 🚫 Checklist

- ❌ Never mark a task complete without updating affected docs
- ❌ Never add an API endpoint without documenting it in the service README
- ❌ Never create a new service without adding a docs section and architecture entry
- ❌ Never modify the DB schema without updating the appendix ER diagram
- ❌ Never add a complex flow without a diagram
- ✅ Always update the service README after adding/modifying endpoints
- ✅ Always include request/response examples in endpoint docs
- ✅ Always list auth requirements (Public / JWT / JWT + Role)
- ✅ Always update architecture README when structural changes occur
- ✅ Always add a diagram when a new flow is introduced
