# Phần 5: User Management

## 📋 Mục tiêu phần này

Hiểu được:
- ✅ CRUD operations cho users
- ✅ User attributes và profile
- ✅ User status management (active, verified)
- ✅ Pagination và filtering

---

## 👤 5.1 User Entity Structure

### user_entity Schema

```prisma
model user_entity {
  id                  String   @id @db.VarChar(36)
  email               String?  @db.VarChar(255)
  email_constraint     String?  @db.VarChar(255)
  email_verified       Boolean  @default(false)
  enabled              Boolean  @default(false)
  federation_link      String?  @db.VarChar(255)
  first_name           String?  @db.VarChar(255)
  last_name            String?  @db.VarChar(255)
  realm_id             String?  @db.VarChar(255)
  username             String?  @db.VarChar(255)
  created_timestamp    BigInt?
  service_account_client_link String? @db.VarChar(255)
  not_before           Int      @default(0)

  // Relations
  credential           credential[]
  federated_identity   federated_identity[]
  user_attribute       user_attribute[]
  user_consent         user_consent[]
  user_group_membership user_group_membership[]
  user_required_action  user_required_action[]
  user_role_mapping    user_role_mapping[]

  @@unique([realm_id, email_constraint])
  @@unique([realm_id, username])
}
```

---

## 📝 5.2 Create User

### Request DTO

```typescript
// apps/auth/src/users/dto/create-user.dto.ts
import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  realm_id?: string;
}
```

### Service Method

```typescript
// apps/auth/src/users/users.service.ts
@LogActivity()
async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
  const {
    email,
    password,
    first_name,
    last_name,
    username,
    realm_id = 'master', // Default realm
  } = createUserDto;

  // Check existing user
  const existingUser = await this.prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ConflictException('User with this email already exists');
  }

  // Check username uniqueness within realm
  if (username) {
    const existingUsername = await this.prisma.user.findFirst({
      where: { username, realm_id },
    });

    if (existingUsername) {
      throw new ConflictException('Username already taken in this realm');
    }
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create user
  const user = await this.prisma.user.create({
    data: {
      email,
      password_hash: passwordHash,
      first_name,
      last_name,
      username,
      realm_id,
      enabled: true,
      email_verified: false,
    },
  });

  return this.toResponseDto(user);
}
```

### API Endpoint

```bash
POST /auth/v1/users
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "SecurePass123!",
  "first_name": "New",
  "last_name": "User",
  "username": "newuser",
  "realm_id": "master"
}
```

### Response

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "newuser@example.com",
  "username": "newuser",
  "first_name": "New",
  "last_name": "User",
  "email_verified": false,
  "enabled": true,
  "realm_id": "master",
  "created_at": "2025-03-18T10:00:00.000Z",
  "updated_at": "2025-03-18T10:00:00.000Z"
}
```

---

## 📋 5.3 List Users (Paginated)

### Request Parameters

```bash
GET /auth/v1/users?page=0&limit=20&realm_id=master&search=john
```

### Query Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 0 | Page number |
| `limit` | number | 20 | Items per page (max: 100) |
| `realm_id` | string | - | Filter by realm |
| `search` | string | - | Search in email, name |

### Service Method

```typescript
async findAll(
  page: number = 0,
  limit: number = 20,
  realm_id?: string,
  search?: string,
): Promise<UsersPaginatedDto> {
  const skip = page * limit;

  // Build where clause
  const where: any = {};

  if (realm_id) {
    where.realm_id = realm_id;
  }

  if (search) {
    where.OR = [
      { email: { contains: search, mode: 'insensitive' } },
      { first_name: { contains: search, mode: 'insensitive' } },
      { last_name: { contains: search, mode: 'insensitive' } },
      { username: { contains: search, mode: 'insensitive' } },
    ];
  }

  // Get users and count in parallel
  const [users, total] = await Promise.all([
    this.prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { created_timestamp: 'desc' },
      select: {
        id: true,
        email: true,
        username: true,
        first_name: true,
        last_name: true,
        enabled: true,
        email_verified: true,
        realm_id: true,
        created_timestamp: true,
      },
    }),
    this.prisma.user.count({ where }),
  ]);

  const total_pages = Math.ceil(total / limit);

  return {
    data: users.map(user => this.toResponseDto(user)),
    meta: {
      total,
      page,
      limit,
      total_pages,
    },
  };
}
```

### Response

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user1@example.com",
      "username": "user1",
      "first_name": "John",
      "last_name": "Doe",
      "email_verified": true,
      "enabled": true,
      "realm_id": "master",
      "created_at": "2025-03-18T10:00:00.000Z",
      "updated_at": "2025-03-18T10:00:00.000Z"
    }
  ],
  "meta": {
    "total": 100,
    "page": 0,
    "limit": 20,
    "total_pages": 5
  }
}
```

---

## 🔍 5.4 Get User by ID

### Service Method

```typescript
async findOne(id: string): Promise<UserResponseDto> {
  const user = await this.prisma.user.findUnique({
    where: { id },
    include: {
      user_attribute: true,
      user_role_mapping: {
        include: {
          role: true,
        },
      },
      user_group_membership: {
        include: {
          group: true,
        },
      },
    },
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  return this.toResponseDto(user);
}
```

### API Endpoint

```bash
GET /auth/v1/users/:id
Authorization: Bearer <token>
```

---

## ✏️ 5.5 Update User

### Update DTO

```typescript
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @IsOptional()
  @IsBoolean()
  email_verified?: boolean;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string; // For password change
}
```

### Service Method

```typescript
@LogActivity()
async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
  const { password, ...updateData } = updateUserDto;

  // Hash new password if provided
  if (password) {
    updateData['password_hash'] = await bcrypt.hash(password, 10);
  }

  const user = await this.prisma.user.update({
    where: { id },
    data: updateData,
  });

  return this.toResponseDto(user);
}
```

### API Endpoint

```bash
PATCH /auth/v1/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "first_name": "Updated",
  "email_verified": true
}
```

---

## 🗑️ 5.6 Delete User

### Service Method

```typescript
@LogActivity()
async remove(id: string): Promise<void> {
  // Check user exists
  const user = await this.prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  // Delete user (cascade delete configured in Prisma)
  await this.prisma.user.delete({
    where: { id },
  });
}
```

### API Endpoint

```bash
DELETE /auth/v1/users/:id
Authorization: Bearer <admin-token>
```

---

## 🏷️ 5.7 User Attributes

### Structure

```prisma
model user_attribute {
  id                      String      @id @default
  name                    String      @db.VarChar(255)
  value                   String?     @db.VarChar(255)
  user_id                 String      @db.VarChar(36)
  long_value              String?
  long_value_hash         Bytes?
  long_value_hash_lower_case Bytes?

  user_entity             user_entity @relation(fields: [user_id], references: [id])

  @@index([user_id])
  @@index([name, value])
}
```

### Add/Update Attribute

```typescript
async setAttribute(userId: string, name: string, value: string) {
  await this.prisma.user_attribute.upsert({
    where: {
      id: `${userId}-${name}`, // Assuming composite key
    },
    create: {
      user_id: userId,
      name,
      value,
    },
    update: {
      value,
    },
  });
}
```

### Common Attributes

```typescript
// Example custom attributes
await usersService.setAttribute(userId, 'phone_number', '+1234567890');
await usersService.setAttribute(userId, 'country', 'VN');
await usersService.setAttribute(userId, 'preferences', '{ "theme": "dark" }');
```

---

## 📊 5.8 User Statistics

### Get User Count

```typescript
async getStats(realm_id?: string) {
  const where = realm_id ? { realm_id } : {};

  const [total, enabled, verified] = await Promise.all([
    this.prisma.user.count({ where }),
    this.prisma.user.count({ where: { ...where, enabled: true } }),
    this.prisma.user.count({ where: { ...where, email_verified: true } }),
  ]);

  return {
    total,
    enabled,
    verified,
    disabled: total - enabled,
    unverified: total - verified,
  };
}
```

---

## ❓ FAQ

### Q1: Làm sao để reset user password?

**A**: Admin có thể update password qua update endpoint:
```bash
PATCH /auth/v1/users/:id
{ "password": "NewSecurePass123!" }
```

### Q2: User bị disable thì login được không?

**A**: Không, sign in service sẽ check `enabled = true`:
```typescript
if (!user.is_active) {
  throw new UnauthorizedException('User account is inactive');
}
```

### Q3: Làm sao để search user theo nhiều criteria?

**A**: Kết hợp multiple filters:
```typescript
where: {
  AND: [
    { realm_id: 'master' },
    { enabled: true },
    { OR: [
      { email: { contains: search } },
      { username: { contains: search } },
    ]},
  ],
}
```

---

## 🎯 Summary

### CRUD Operations

| Operation | Endpoint | Auth Required |
|-----------|----------|---------------|
| List | `GET /users` | ✅ |
| Create | `POST /users` | ✅ Admin |
| Get by ID | `GET /users/:id` | ✅ |
| Update | `PATCH /users/:id` | ✅ Admin or Self |
| Delete | `DELETE /users/:id` | ✅ Admin |

### Next Steps

- **[Phần 6: Realm Management](./06-quan-ly-realm.md)** - Multi-tenant configuration

---

**Document Version**: 1.0.0
**Last Updated**: 2025-03-18
