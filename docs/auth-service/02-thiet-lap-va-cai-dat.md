# Phần 2: Thiết lập & Cài đặt

## 📋 Mục tiêu phần này

Hiểu được:
- ✅ Cách cài đặt Auth Service từ đầu
- ✅ Cấu hình environment variables
- ✅ Setup database và chạy migrations
- ✅ Chạy service ở các mode khác nhau

---

## 🛠️ 2.1 Điều kiện tiên quyết

### Required Software

```
┌─────────────────────────────────────────────────────────┐
│                 Required Software                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Node.js:        >= 18.x (Recommend 20.x LTS)          │
│  pnpm:           >= 8.x                                 │
│  PostgreSQL:     >= 14.x                                │
│  Docker:         >= 20.x (cho local DB)                │
│  Docker Compose: >= 2.x                                 │
│  Git:            >= 2.x                                 │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Kiểm tra version

```bash
node --version   # v20.x.x
pnpm --version   # 8.x.x
docker --version # 20.x.x
psql --version   # PostgreSQL 14.x+
```

---

## 📥 2.2 Clone Repository

```bash
# Clone repository
git clone https://github.com/namnh240795/automation-with-claude-cli.git
cd automation-with-claude-cli

# Checkout branch
git checkout feature/simplify-monorepo
```

---

## 🗄️ 2.3 Setup Database

### Option A: Docker (Recommended)

```bash
# Khởi động PostgreSQL
docker-compose -f docker/docker-compose.yml up -d

# Kiểm tra container đang chạy
docker-compose -f docker/docker-compose.yml ps

# Xem logs
docker-compose -f docker/docker-compose.yml logs -f auth-db
```

### Database Connection Details

```
Host:     localhost
Port:     5432
Database: auth_db
User:     auth_user
Password: auth_password

Connection String:
postgresql://auth_user:auth_password@localhost:5432/auth_db
```

### Option B: Local PostgreSQL

```bash
# Tạo database
createdb auth_db

# Tạo user (nếu chưa có)
createuser -P auth_user
# Enter password: auth_password

# Grant privileges
psql -d auth_db -c "GRANT ALL PRIVILEGES ON DATABASE auth_db TO auth_user;"
```

---

## 🔧 2.4 Environment Configuration

### Tạo file .env

```bash
# Tạo .env file từ template
cp apps/auth/.env.example apps/auth/.env
```

### Environment Variables

```bash
# apps/auth/.env

# Service Configuration
SERVICE_PREFIX=auth
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL="postgresql://auth_user:auth_password@localhost:5432/auth_db?schema=public"

# JWT Secrets (⚠️ CHANGE IN PRODUCTION!)
JWT_SECRET="your-super-secret-jwt-key-change-this"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-this"
JWT_EXPIRES_IN="1h"
JWT_REFRESH_EXPIRES_IN="7d"

# CORS
CORS_ORIGIN="http://localhost:3000,http://localhost:3001"
CORS_ORIGIN_REGEX=""

# Logging
LOG_LEVEL="debug"
```

### Generate Secure Secrets (Production)

```bash
# Generate random secrets
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Hoặc dùng OpenSSL
openssl rand -base64 64
```

---

## 📦 2.5 Install Dependencies

```bash
# Install root dependencies
pnpm install

# Verify installation
pnpm list --depth=0
```

### Dependencies Structure

```
node_modules/
├── @nestjs/...           # NestJS framework
├── @fastify/...          # Fastify adapter
├── @prisma/...           # Prisma ORM
├── @scalar/...           # Scalar API docs
├── class-validator       # Validation
├── class-transformer     # Data transformation
├── bcrypt                # Password hashing
├── @nestjs/jwt           # JWT handling
└── ...                   # Other dependencies
```

---

## 🔄 2.6 Prisma Setup

### Generate Prisma Client

```bash
# Di chuyển đến auth service
cd apps/auth

# Generate Prisma client
pnpm prisma:generate

# Hoặc trực tiếp
npx prisma generate
```

### Generate Prisma Client Output

```
✔ Generated Prisma Client to packages/auth-prisma-client/src
```

### Prisma Client Location

```
packages/auth-prisma-client/src/
├── index.d.ts            # Main types
├── index.js              # Runtime
└── ...
```

---

## 🚀 2.7 Run Migrations

### Push Schema (Development)

```bash
# Push schema directly to database (dev only)
cd apps/auth
pnpm prisma:db push

# Hoặc
npx prisma db push
```

### Create Migration (Production)

```bash
# Create migration
cd apps/auth
pnpm prisma:migrate dev --name init

# Hoặc
npx prisma migrate dev --name init
```

### Migration Output

```
Applying migration `20250318_000000_init`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20250318_000000_init/
    └─ migration.sql

Your database is now in sync with your schema.
```

---

## 🎯 2.8 Seed Database (Optional)

### Create Seed Script

```typescript
// apps/auth/prisma/seed.ts
import { PrismaClient } from '@auth/prisma-client';

const prisma = new PrismaClient();

async function main() {
  // Create default realm
  const realm = await prisma.realm.create({
    data: {
      id: 'master',
      name: 'master',
      enabled: true,
    },
  });

  console.log('Created realm:', realm);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
```

### Run Seed

```bash
cd apps/auth
npx prisma db seed
```

---

## ▶️ 2.9 Run Development Server

### Option A: Rspack Watch Mode (Recommended)

```bash
# From root
pnpm rspack:auth

# Or directly
cd apps/auth && pnpm rspack:dev
```

**Benefits**:
- ✅ Fast rebuilds (~1-2s)
- ✅ Hot reload
- ✅ Better error messages

### Option B: NestJS Watch Mode

```bash
# From root
pnpm dev:auth

# Or directly
cd apps/auth && pnpm watch
```

**Note**: Slower than Rspack (~5-10s rebuilds)

### Verify Service Running

```bash
# Test health endpoint
curl http://localhost:3001/auth/health

# Response
{
  "status": "ok",
  "timestamp": "2025-03-18T10:00:00.000Z"
}
```

### Access Documentation

```
Scalar UI:  http://localhost:3001/reference
Swagger:    http://localhost:3001/auth/api
API JSON:   http://localhost:3001/auth/api-json
```

---

## 🧪 2.10 Test API Endpoints

### 1. Sign Up

```bash
curl -X POST http://localhost:3001/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!",
    "first_name": "Test",
    "last_name": "User"
  }'
```

**Response**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "test@example.com",
  "first_name": "Test",
  "last_name": "User",
  "is_active": true,
  "email_verified": false,
  "created_at": "2025-03-18T10:00:00.000Z",
  "updated_at": "2025-03-18T10:00:00.000Z"
}
```

### 2. Sign In

```bash
curl -X POST http://localhost:3001/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!"
  }'
```

**Response**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### 3. Access Protected Endpoint

```bash
# Copy access_token from sign-in response
ACCESS_TOKEN="your-access-token-here"

curl -X GET http://localhost:3001/auth/profile \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

**Response**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "test@example.com",
  "first_name": "Test",
  "last_name": "User",
  "is_active": true,
  "email_verified": true,
  "created_at": "2025-03-18T10:00:00.000Z",
  "updated_at": "2025-03-18T10:00:00.000Z"
}
```

---

## 🔍 2.11 Prisma Studio (Database GUI)

### Open Prisma Studio

```bash
cd apps/auth
pnpm prisma:studio

# Hoặc
npx prisma studio
```

### Access Studio

```
http://localhost:5555
```

### Features
- ✅ View/Edit data
- ✅ Add records
- ✅ Filter and search
- ✅ View relationships

---

## 🐳 2.12 Docker Development Setup

### Dockerfile cho Auth Service

```dockerfile
# apps/auth/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
COPY packages packages/
COPY apps apps/
COPY .npmrc ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm build:auth

# Production image
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --prod

COPY --from=builder /app/dist ./dist

EXPOSE 3001

CMD ["node", "dist/main"]
```

### Build & Run

```bash
# Build image
docker build -t auth-service:latest -f apps/auth/Dockerfile .

# Run container
docker run -p 3001:3001 \
  -e DATABASE_URL="postgresql://..." \
  -e JWT_SECRET="..." \
  auth-service:latest
```

---

## 🔧 2.13 Troubleshooting

### Issue 1: Database Connection Failed

```
Error: Can't reach database server at `localhost:5432`
```

**Solution**:
```bash
# Check PostgreSQL running
docker-compose -f docker/docker-compose.yml ps

# Restart if needed
docker-compose -f docker/docker-compose.yml restart auth-db

# Check logs
docker-compose -f docker/docker-compose.yml logs auth-db
```

### Issue 2: Prisma Client Not Generated

```
Error: Cannot find module '@auth/prisma-client'
```

**Solution**:
```bash
cd apps/auth
pnpm prisma:generate
```

### Issue 3: Migration Conflicts

```
Error: Migration failed. Database is not in sync with schema.
```

**Solution**:
```bash
# Reset database (⚠️ deletes all data)
cd apps/auth
npx prisma migrate reset

# Or force push schema
npx prisma db push --force-reset
```

### Issue 4: Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::3001
```

**Solution**:
```bash
# Find process using port
lsof -ti:3001

# Kill process
kill -9 $(lsof -ti:3001)

# Or change port
PORT=3002 pnpm rspack:auth
```

### Issue 5: JWT Verification Failed

```
Error: jwt verification failed
```

**Solution**:
```bash
# Check JWT_SECRET matches between sign-in and verify
# Verify .env file is loaded correctly

# Debug JWT payload
echo "your-token" | jq -R 'split(".") | .[1] | @base64d | fromjson'
```

---

## 📝 2.14 Production Checklist

### Before Deploying to Production

- [ ] Change `JWT_SECRET` and `JWT_REFRESH_SECRET`
- [ ] Set `NODE_ENV=production`
- [ ] Configure production `DATABASE_URL`
- [ ] Set appropriate `CORS_ORIGIN`
- [ ] Enable SSL/HTTPS
- [ ] Configure rate limiting
- [ ] Setup database backups
- [ ] Configure logging (Winston, etc.)
- [ ] Enable monitoring (APM, etc.)
- [ ] Setup CI/CD pipeline
- [ ] Configure health checks
- [ ] Setup secrets management (Vault, AWS Secrets Manager)

### Environment Variables (Production)

```bash
# apps/auth/.env.production

NODE_ENV=production
SERVICE_PREFIX=auth
PORT=3001

# Database with SSL
DATABASE_URL="postgresql://user:pass@host:5432/db?schema=public&sslmode=require"

# JWT
JWT_SECRET="${JWT_SECRET}"  # From secrets manager
JWT_REFRESH_SECRET="${JWT_REFRESH_SECRET}"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# CORS - Specific domains only
CORS_ORIGIN="https://app.example.com,https://admin.example.com"

# Logging
LOG_LEVEL="info"
SENTRY_DSN="${SENTRY_DSN}"

# Rate Limiting
RATE_LIMIT_TTL=60
RATE_LIMIT_LIMIT=100
```

---

## ❓ FAQ

### Q1: Tôi có thể dùng MySQL thay vì PostgreSQL không?

**A**: Hiện tại schema được thiết kế cho PostgreSQL với các kiểu dữ liệu đặc thù (`@db.VarChar`, `@db.Timestamp`, etc.). Để dùng MySQL, cần sửa schema để tương thích.

### Q2: Tại sao phải generate Prisma client sau mỗi lần đổi schema?

**A**: Prisma client được auto-generated từ schema. Khi schema thay đổi, client phải được regenerate để có type definitions và methods mới.

### Q3: Rspack vs NestJS watch mode, chọn cái nào?

**A**:
- **Development**: Dùng Rspack (nhanh hơn)
- **Debugging**: Dùng NestJS watch mode (dễ debug hơn)
- **Production**: Build với `pnpm build:auth`

### Q4: Làm sao để reset database?

**A**:
```bash
# Xóa tất cả data và re-run migrations
cd apps/auth
npx prisma migrate reset

# Hoặc xóa database và tạo lại
npx prisma migrate reset --force
```

---

## 🎯 Summary

### Key Commands

```bash
# Setup
docker-compose -f docker/docker-compose.yml up -d
pnpm install
cd apps/auth && pnpm prisma:generate
pnpm prisma:migrate

# Development
pnpm rspack:auth          # Fast rebuild
pnpm dev:auth             # NestJS watch

# Database
pnpm prisma:studio        # GUI
pnpm prisma:db push       # Sync schema
pnpm prisma:migrate       # Create migration

# Testing
pnpm test                 # All tests
pnpm test:watch           # Watch mode
pnpm test:cov             # Coverage
```

### Next Steps

- **[Phần 3: Prisma 7 & Database](./03-prisma-7-va-database.md)** - Tìm hiểu chi tiết về database schema

---

**Document Version**: 1.0.0
**Last Updated**: 2025-03-18
