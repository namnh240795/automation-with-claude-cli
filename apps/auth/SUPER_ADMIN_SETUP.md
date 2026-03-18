# Super Admin Migration Setup

Hướng dẫn tạo Super Admin user bằng Prisma Migration.

## 🔐 Thông tin Super Admin

```
Email: superadmin@example.com
Password: SuperAdminPass123!
```

**⚠️ QUAN TRỌNG**: Đổi mật khẩu ngay sau lần đăng nhập đầu tiên!

## 📋 Quy trình thực hiện

### Bước 1: Tạo Migration (Đã tạo sẵn) ✅

Migration đã được tạo tại:
```
apps/auth/prisma/migrations/20260318105111_add_super_admin/migration.sql
```

### Bước 2: (Optional) Đổi mật khẩu

Nếu bạn muốn đổi mật khẩu khác, chạy script:

```bash
cd apps/auth
pnpm ts-node scripts/create-super-admin.ts
```

Script sẽ generate bcrypt hash mới. Copy hash và update vào file migration.sql:

```sql
UPDATE "user_entity"
SET "password_hash" = '$2b$10$YourNewHashHere'
WHERE id = '550e8400-e29b-41d4-a716-446655440002';
```

### Bước 3: Chạy Migration

```bash
cd apps/auth

# Chạy migration
pnpm prisma migrate dev

# Hoặc nếu muốn reset database (⚠️ sẽ xóa hết data!)
pnpm prisma migrate reset
```

**Output mong đợi**:
```
Applying migration `20260318105111_add_super_admin`

The following migration(s) have been applied:
apps/auth/prisma/migrations/20260318105111_add_super_admin/
  migration.sql

✔ Generated Prisma Client
```

### Bước 4: Verify Super Admin

```bash
cd apps/auth
pnpm ts-node scripts/verify-super-admin.ts
```

**Output mong đợi**:
```
🔍 Verifying Super Admin Setup...

1️⃣  Checking Master Realm...
   ✅ Master realm exists

2️⃣  Checking Super Admin Role...
   ✅ Super admin role exists

3️⃣  Checking Super Admin User...
   ✅ Super admin user exists

4️⃣  Checking Role Assignment...
   ✅ Super admin role assigned to user

5️⃣  Checking Super Admin Attribute...
   ✅ is_super_admin attribute exists

🎉 All checks passed! Super admin is ready to use.
```

### Bước 5: Test Login

```bash
curl -X POST http://localhost:3001/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "superadmin@example.com",
    "password": "SuperAdminPass123!"
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

---

## 📊 Migration này làm gì?

### 1. Tạo Master Realm

```sql
INSERT INTO "realm" (id, name, enabled, ...)
VALUES ('master', 'master', true, ...)
```

### 2. Tạo Super Admin Role

```sql
INSERT INTO "keycloak_role" (
  id,
  name,
  description,
  realm
) VALUES (
  '550e8400-e29b-41d4-a716-446655440001',
  'super_admin',
  'Super Administrator - Full access to all resources',
  'master'
)
```

### 3. Tạo Super Admin User

```sql
INSERT INTO "user_entity" (
  id,
  email,
  username,
  password_hash,
  enabled,
  email_verified,
  realm_id
) VALUES (
  '550e8400-e29b-41d4-a716-446655440002',
  'superadmin@example.com',
  'superadmin',
  '$2b$10$...',  -- bcrypt hash
  true,
  true,
  'master'
)
```

### 4. Gán Role cho User

```sql
INSERT INTO "user_role_mapping" (
  role_id,
  user_id
) VALUES (
  '550e8400-e29b-41d4-a716-446655440001',  -- super_admin role
  '550e8400-e29b-41d4-a716-446655440002'   -- super admin user
)
```

### 5. Thêm is_super_admin Attribute

```sql
INSERT INTO "user_attribute" (
  user_id,
  name,
  value
) VALUES (
  '550e8400-e29b-41d4-a716-446655440002',
  'is_super_admin',
  'true'
)
```

---

## 🔄 Rollback Migration

Nếu bạn muốn xóa super admin:

```bash
cd apps/auth

# Rollback migration
pnpm prisma migrate resolve --rolled-back 20260318105111_add_super_admin

# Hoặc reset toàn bộ database
pnpm prisma migrate reset
```

---

## 🔒 Security Considerations

### ✅ Đã implement:

- **Bcrypt password hashing** (cost factor: 10)
- **Unique UUIDs** cho tất cả entities
- **Idempotent migrations** (chạy nhiều lần không lỗi)
- **Audit logging** (admin_event_entity)

### ⚠️ Cần bổ sung:

1. **Change password on first login**
   - Thêm `force_password_reset` flag
   - User phải đổi password khi đăng nhập lần đầu

2. **Password complexity requirements**
   - Minimum length: 12 characters
   - Phải có: uppercase, lowercase, number, special char

3. **Rate limiting**
   - Giới hạn số lần login thất bại
   - Lock account sau N lần fail

4. **MFA/2FA**
   - Yêu cầu TOTP cho super admin
   - Dùng Google Authenticator

---

## 🛠️ Scripts Helper

### 1. Generate Password Hash

```bash
pnpm ts-node scripts/create-super-admin.ts
```

### 2. Verify Setup

```bash
pnpm ts-node scripts/verify-super-admin.ts
```

### 3. Test Super Admin APIs

```bash
# Login
curl -X POST http://localhost:3001/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"superadmin@example.com","password":"SuperAdminPass123!"}'

# Get all users (admin endpoint)
curl -X GET http://localhost:3001/auth/v1/users \
  -H "Authorization: Bearer <your-access-token>"

# Create new user
curl -X POST http://localhost:3001/auth/v1/users \
  -H "Authorization: Bearer <your-access-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "Password123!",
    "first_name": "New",
    "last_name": "User"
  }'
```

---

## 📝 Files trong migration này

```
apps/auth/
├── prisma/migrations/
│   └── 20260318105111_add_super_admin/
│       └── migration.sql                    # Migration SQL
└── scripts/
    ├── create-super-admin.ts                # Generate password hash
    └── verify-super-admin.ts               # Verify setup
```

---

## 🐛 Troubleshooting

### Issue: "Migration failed - duplicate key"

**Giải pháp**: Migration đã có `ON CONFLICT DO NOTHING`, chạy lại là được.

### Issue: "Cannot login with super admin"

**Debug**:
```bash
# 1. Verify user exists
pnpm ts-node scripts/verify-super-admin.ts

# 2. Check database trực tiếp
pnpm prisma studio
# Mở http://localhost:5555

# 3. Check migration status
pnpm prisma migrate status
```

### Issue: "Password incorrect"

**Giải pháp**: Tạo hash mới:
```bash
pnpm ts-node scripts/create-super-admin.ts
# Copy hash và update vào migration.sql
# Chạy lại migration
```

---

## 📚 Related Documentation

- **[Prisma Schema Chi Tiết](../../docs/auth-service/prisma-schema-tieng-viet.md)** - Giải thích schema
- **[04 - JWT Authentication](../../docs/auth-service/04-xac-thuc-jwt.md)** - Authentication flow
- **[07 - Roles & Groups](../../docs/auth-service/07-quan-ly-role-group.md)** - RBAC

---

**Last Updated**: 2025-03-18
**Migration Version**: 20260318105111_add_super_admin
