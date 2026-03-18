# Auth Service - Tài liệu Hướng dẫn Toàn diện

## 📚 Mục lục

Tài liệu này được chia thành các phần để bạn dễ dàng theo dõi:

1. **[01-kien-truc-tong-quan.md](./01-kien-truc-tong-quan.md)** - Kiến trúc tổng quan và thiết kế hệ thống
2. **[02-thiet-lap-va-cai-dat.md](./02-thiet-lap-va-cai-dat.md)** - Hướng dẫn cài đặt và cấu hình
3. **[03-prisma-7-va-database.md](./03-prisma-7-va-database.md)** - Database schema và Prisma 7
4. **[04-xac-thuc-jwt.md](./04-xac-thuc-jwt.md)** - JWT Authentication flow
5. **[05-quan-ly-user.md](./05-quan-ly-user.md)** - User Management
6. **[06-quan-ly-realm.md](./06-quan-ly-realm.md)** - Multi-tenant Realm Management
7. **[07-quan-ly-role-group.md](./07-quan-ly-role-group.md)** - Roles & Groups (RBAC)
8. **[08-quan-ly-client.md](./08-quan-ly-client.md)** - OAuth/OIDC Client Management
9. **[09-quan-ly-session.md](./09-quan-ly-session.md)** - Session & Token Management
10. **[10-required-actions.md](./10-required-actions.md)** - Required Actions (Password reset, Email verification)
11. **[11-events-logging.md](./11-events-logging.md)** - Event & Audit Logging
12. **[12-authentication-flows.md](./12-authentication-flows.md)** - Authentication Flows Configuration
13. **[13-identity-providers.md](./13-identity-providers.md)** - Identity Providers & Social Login
14. **[14-api-reference.md](./14-api-reference.md)** - API Reference và Examples

---

## 🚀 Bắt đầu nhanh

### Điều kiện tiên quyết

- Node.js >= 18.x
- pnpm >= 8.x
- PostgreSQL >= 14.x
- Docker & Docker Compose (cho local database)

### Chạy service trong 2 phút

```bash
# 1. Khởi động database
docker-compose -f docker/docker-compose.yml up -d

# 2. Cài đặt dependencies
pnpm install

# 3. Generate Prisma client
cd apps/auth && pnpm prisma:generate

# 4. Chạy migrations
pnpm prisma:migrate

# 5. Khởi động service (watch mode)
pnpm rspack:auth

# Service sẽ chạy tại: http://localhost:3001
# Scalar UI: http://localhost:3001/reference
```

### Test API đầu tiên

```bash
# Đăng ký user mới
curl -X POST http://localhost:3001/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!",
    "first_name": "John",
    "last_name": "Doe"
  }'

# Đăng nhập
curl -X POST http://localhost:3001/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'
```

---

## 📖 Tài liệu chi tiết

Hãy bắt đầu từ phần **[01 - Kiến trúc tổng quan](./01-kien-truc-tong-quan.md)** để hiểu rõ cách hệ thống hoạt động trước khi đi sâu vào chi tiết từng phần.

---

## 🔗 Liên kết hữu ích

- **Scalar UI (API Documentation)**: http://localhost:3001/reference
- **Swagger JSON**: http://localhost:3001/api-json
- **Prisma Studio**: `pnpm prisma:studio` (từ apps/auth)
- **GitHub Repository**: https://github.com/namnh240795/automation-with-claude-cli

---

## ❓ Cần hỗ trợ?

Nếu bạn có câu hỏi hoặc gặp vấn đề:
1. Kiểm tra phần FAQ ở cuối mỗi document
2. Xem log lỗi trong console
3. Kiểm tra database connection trong Prisma Studio

---

**Document Version**: 1.0.0
**Last Updated**: 2025-03-18
**Author**: Auth Service Team
