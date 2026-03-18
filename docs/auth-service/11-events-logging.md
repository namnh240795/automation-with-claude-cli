# Phần 11: Event & Audit Logging

## 📋 Mục tiêu phần này

Hiểu được:
- ✅ Event logging cho audit trail
- ✅ Admin event logging
- ✅ Event types và levels
- ✅ Query và filter events

---

## 📊 11.1 Event Logging Overview

### Event Types

```
┌─────────────────────────────────────────────────────────┐
│                    Event Types                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  USER EVENTS                                            │
│  ├─ LOGIN                                               │
│  ├─ LOGOUT                                              │
│  ├─ REGISTER                                            │
│  ├─ UPDATE_PASSWORD                                     │
│  ├─ RESET_PASSWORD                                      │
│  ├─ VERIFY_EMAIL                                        │
│  └─ UPDATE_PROFILE                                      │
│                                                          │
│  ADMIN EVENTS                                           │
│  ├─ CREATE_REALM                                        │
│  ├─ UPDATE_REALM                                        │
│  ├─ DELETE_REALM                                        │
│  ├─ CREATE_USER                                         │
│  ├─ UPDATE_USER                                         │
│  ├─ DELETE_USER                                         │
│  ├─ ASSIGN_ROLE                                         │
│  └─ REVOKE_TOKEN                                        │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📝 11.2 Event Entities

### event_entity (User Events)

```prisma
model event_entity {
  id               String  @id @db.VarChar(36)
  type             String?  @db.VarChar(255)
  realm_id         String?  @db.VarChar(255)
  client_id        String?  @db.VarChar(255)
  user_id          String?  @db.VarChar(255)
  session_id       String?  @db.VarChar(255)
  ip_address       String?  @db.VarChar(255)
  event_time       BigInt?
  error            String?  @db.VarChar(255)
  details_json     String?  @db.VarChar(2550)
  details_json_long_value String?

  @@index([realm_id, event_time])
}
```

### admin_event_entity (Admin Events)

```prisma
model admin_event_entity {
  id               String  @id @db.VarChar(36)
  realm_id         String?  @db.VarChar(255)
  operation_type   String?  @db.VarChar(255)
  resource_type    String?  @db.VarChar(64)
  resource_path    String?  @db.VarChar(2550)
  auth_user_id     String?  @db.VarChar(255)
  ip_address       String?  @db.VarChar(255)
  admin_event_time BigInt?
  representation   String?
  error            String?  @db.VarChar(255)
  details_json     String?

  @@index([realm_id, admin_event_time])
}
```

---

## 📋 11.3 Event Types Enum

### User Events

```typescript
enum UserEventType {
  LOGIN = 'LOGIN',
  LOGIN_ERROR = 'LOGIN_ERROR',
  LOGOUT = 'LOGOUT',
  REGISTER = 'REGISTER',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  UPDATE_PASSWORD_ERROR = 'UPDATE_PASSWORD_ERROR',
  RESET_PASSWORD = 'RESET_PASSWORD',
  VERIFY_EMAIL = 'VERIFY_EMAIL',
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  GRANT_CONSENT = 'GRANT_CONSENT',
  REVOKE_CONSENT = 'REVOKE_CONSENT',
  CODE_TO_TOKEN = 'CODE_TO_TOKEN',
  CODE_TO_TOKEN_ERROR = 'CODE_TO_TOKEN_ERROR',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}
```

### Admin Events

```typescript
enum AdminEventType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  READ = 'READ',
  IMPLICIT_ACTION = 'IMPLICIT_ACTION',
}
```

### Resource Types

```typescript
enum ResourceType {
  REALM = 'realm',
  USER = 'user',
  ROLE = 'role',
  GROUP = 'group',
  CLIENT = 'client',
  IDENTITY_PROVIDER = 'identityProvider',
}
```

---

## 📝 11.4 Log User Event

### Event Logger Service

```typescript
@Injectable()
export class EventLoggerService {
  constructor(private readonly prisma: PrismaService) {}

  async logUserEvent(data: {
    type: UserEventType;
    realm_id?: string;
    user_id?: string;
    client_id?: string;
    session_id?: string;
    ip_address?: string;
    error?: string;
    details?: any;
  }) {
    await this.prisma.event_entity.create({
      data: {
        id: uuid(),
        type: data.type,
        realm_id: data.realm_id,
        user_id: data.user_id,
        client_id: data.client_id,
        session_id: data.session_id,
        ip_address: data.ip_address,
        event_time: BigInt(Date.now()),
        error: data.error,
        details_json: data.details ? JSON.stringify(data.details) : null,
      },
    });
  }
}
```

### Usage Examples

```typescript
// Login event
await eventLogger.logUserEvent({
  type: UserEventType.LOGIN,
  realm_id: user.realm_id,
  user_id: user.id,
  client_id: client_id,
  session_id: sessionId,
  ip_address: req.ip,
});

// Login error
await eventLogger.logUserEvent({
  type: UserEventType.LOGIN_ERROR,
  realm_id: realmId,
  user_id: userId,
  ip_address: req.ip,
  error: 'Invalid password',
});

// Password update
await eventLogger.logUserEvent({
  type: UserEventType.UPDATE_PASSWORD,
  realm_id: user.realm_id,
  user_id: user.id,
  ip_address: req.ip,
  details: { changed_by: 'user' },
});
```

---

## 📝 11.5 Log Admin Event

### Admin Event Logger

```typescript
async logAdminEvent(data: {
  operation_type: AdminEventType;
  resource_type: ResourceType;
  resource_path: string;
  auth_user_id: string;
  realm_id?: string;
  representation?: string;
  ip_address?: string;
  error?: string;
  details?: any;
}) {
  await this.prisma.admin_event_entity.create({
    data: {
      id: uuid(),
      operation_type: data.operation_type,
      resource_type: data.resource_type,
      resource_path: data.resource_path,
      auth_user_id: data.auth_user_id,
      realm_id: data.realm_id,
      ip_address: data.ip_address,
      admin_event_time: BigInt(Date.now()),
      representation: data.representation,
      error: data.error,
      details_json: data.details ? JSON.stringify(data.details) : null,
    },
  });
}
```

### Usage Examples

```typescript
// Create user
await eventLogger.logAdminEvent({
  operation_type: AdminEventType.CREATE,
  resource_type: ResourceType.USER,
  resource_path: `/users/${newUser.id}`,
  auth_user_id: admin.id,
  realm_id: admin.realm_id,
  ip_address: req.ip,
  representation: JSON.stringify({ email: newUser.email }),
});

// Delete role
await eventLogger.logAdminEvent({
  operation_type: AdminEventType.DELETE,
  resource_type: ResourceType.ROLE,
  resource_path: `/roles/${roleId}`,
  auth_user_id: admin.id,
  realm_id: admin.realm_id,
  ip_address: req.ip,
  representation: JSON.stringify({ name: role.name }),
});

// Update realm (error)
await eventLogger.logAdminEvent({
  operation_type: AdminEventType.UPDATE,
  resource_type: ResourceType.REALM,
  resource_path: `/realms/${realmId}`,
  auth_user_id: admin.id,
  realm_id: admin.realm_id,
  ip_address: req.ip,
  error: 'Invalid realm configuration',
});
```

---

## 🔍 11.6 Query Events

### List User Events

```typescript
async listUserEvents(filters: {
  realm_id?: string;
  user_id?: string;
  type?: UserEventType;
  from_date?: Date;
  to_date?: Date;
  page?: number;
  limit?: number;
}) {
  const { realm_id, user_id, type, from_date, to_date, page = 0, limit = 20 } = filters;

  const where: any = {};

  if (realm_id) where.realm_id = realm_id;
  if (user_id) where.user_id = user_id;
  if (type) where.type = type;
  if (from_date || to_date) {
    where.event_time = {};
    if (from_date) where.event_time.gte = BigInt(from_date.getTime());
    if (to_date) where.event_time.lte = BigInt(to_date.getTime());
  }

  const [events, total] = await Promise.all([
    this.prisma.event_entity.findMany({
      where,
      skip: page * limit,
      take: limit,
      orderBy: { event_time: 'desc' },
    }),
    this.prisma.event_entity.count({ where }),
  ]);

  return {
    data: events.map(event => ({
      id: event.id,
      type: event.type,
      realm_id: event.realm_id,
      user_id: event.user_id,
      client_id: event.client_id,
      ip_address: event.ip_address,
      timestamp: new Date(Number(event.event_time)),
      error: event.error,
      details: event.details_json ? JSON.parse(event.details_json) : null,
    })),
    meta: {
      total,
      page,
      limit,
      total_pages: Math.ceil(total / limit),
    },
  };
}
```

### List Admin Events

```typescript
async listAdminEvents(filters: {
  realm_id?: string;
  auth_user_id?: string;
  operation_type?: AdminEventType;
  resource_type?: ResourceType;
  from_date?: Date;
  to_date?: Date;
  page?: number;
  limit?: number;
}) {
  // Similar to user events but with admin-specific filters
  // ...
}
```

---

## 📈 11.7 Event Statistics

### Get User Login History

```typescript
async getUserLoginHistory(userId: string, days: number = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const events = await this.prisma.event_entity.findMany({
    where: {
      user_id: userId,
      type: { in: [UserEventType.LOGIN, UserEventType.LOGOUT] },
      event_time: { gte: BigInt(since.getTime()) },
    },
    orderBy: { event_time: 'desc' },
  });

  return events.map(event => ({
    type: event.type,
    timestamp: new Date(Number(event.event_time)),
    ip_address: event.ip_address,
    client_id: event.client_id,
  }));
}
```

### Get Failed Login Attempts

```typescript
async getFailedLoginAttempts(userId: string, hours: number = 24) {
  const since = new Date();
  since.setHours(since.getHours() - hours);

  const count = await this.prisma.event_entity.count({
    where: {
      user_id: userId,
      type: UserEventType.LOGIN_ERROR,
      event_time: { gte: BigInt(since.getTime()) },
    },
  });

  return { count, hours };
}
```

---

## 🧹 11.8 Event Retention & Cleanup

### Cleanup Old Events

```typescript
@Cron('0 0 * * *')  // Daily at midnight
async cleanupOldEvents() {
  // Delete user events older than 90 days
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  await this.prisma.event_entity.deleteMany({
    where: {
      event_time: {
        lt: BigInt(ninetyDaysAgo.getTime()),
      },
    },
  });

  // Keep admin events longer (365 days)
  const oneYearAgo = new Date();
  oneYearAgo.setDate(oneYearAgo.getDate() - 365);

  await this.prisma.admin_event_entity.deleteMany({
    where: {
      admin_event_time: {
        lt: BigInt(oneYearAgo.getTime()),
      },
    },
  });
}
```

---

## 🔐 11.9 Event Security

### Sensitive Data Handling

```typescript
// Don't log sensitive data
function sanitizeDetails(details: any): any {
  const sanitized = { ...details };

  // Remove sensitive fields
  delete sanitized.password;
  delete sanitized.password_hash;
  delete sanitized.secret;
  delete sanitized.token;

  // Mask email
  if (sanitized.email) {
    sanitized.email = maskEmail(sanitized.email);
  }

  return sanitized;
}

function maskEmail(email: string): string {
  const [name, domain] = email.split('@');
  return `${name[0]}***@${domain}`;
}
```

---

## ❓ FAQ

### Q1: Events stored trong bao lâu?

**A**: Configurable retention:
- User events: 90 days (default)
- Admin events: 365 days (default)

### Q2: Làm sao để export logs?

**A**: Export to CSV/JSON:
```typescript
const events = await listUserEvents({ user_id, limit: 10000 });
const csv = convertToCSV(events.data);
await fs.writeFile('events.csv', csv);
```

### Q3: Events có thể track trong real-time không?

**A**: Yes, use WebSocket or Server-Sent Events to stream events:
```typescript
@Sse('/events-stream')
async streamEvents() {
  return observable((observer) => {
    // Stream new events as they're created
  });
}
```

---

## 🎯 Summary

### Event Logging Flow

```
User/Admin Action
  ↓
Service Layer
  ↓
Event Logger
  ↓
Database (event_entity / admin_event_entity)
  ↓
Query/Analytics
```

### Key Points

1. ✅ **User Events**: LOGIN, LOGOUT, REGISTER, etc.
2. ✅ **Admin Events**: CREATE, UPDATE, DELETE operations
3. ✅ **Retention**: 90 days (user), 365 days (admin)
4. ✅ **Security**: Don't log sensitive data
5. ✅ **Compliance**: Full audit trail for regulations

### Next Steps

- **[Phần 12: Authentication Flows](./12-authentication-flows.md)** - Flow configuration

---

**Document Version**: 1.0.0
**Last Updated**: 2025-03-18
