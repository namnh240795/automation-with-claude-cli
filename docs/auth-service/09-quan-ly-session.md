# Phần 9: Session & Token Management

## 📋 Mục tiêu phần này

Hiểu được:
- ✅ Session lifecycle
- ✅ Refresh token management
- ✅ Token revocation
- ✅ Offline sessions

---

## 🔄 9.1 Session Overview

### Session Types

```
┌─────────────────────────────────────────────────────────┐
│                   Session Types                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1️⃣ Online Session                                     │
│     • User actively logged in                           │
│     • Access token in memory                            │
│     • Refresh token in database                         │
│     • Lifetime: 1 hour (configurable)                   │
│                                                          │
│  2️⃣ Offline Session                                    │
│     • Long-lived sessions                               │
│     • Refresh token persisted                           │
│     • Lifetime: 7 days (configurable)                   │
│     • Used for "Remember Me"                            │
│                                                          │
│  3️⃣ Client Session                                     │
│     • Per-client sessions                               │
│     • Multiple devices per user                         │
│     • Independent revocation                            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 💾 9.2 Refresh Token Storage

### refresh_token Table

```prisma
model refresh_token {
  id         String   @id @default(uuid())
  token      String   @unique
  user_id    String
  expires_at DateTime
  revoked_at DateTime?
  created_at DateTime @default(now())

  user       user    @relation(fields: [user_id], references: [id])
}
```

### Store Refresh Token

```typescript
async storeRefreshToken(userId: string, refreshToken: string) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

  await this.prisma.refresh_token.create({
    data: {
      token: refreshToken,
      user_id: userId,
      expires_at: expiresAt,
    },
  });
}
```

---

## 🔄 9.3 Refresh Token Lifecycle

### Create Refresh Token

```typescript
// During sign in
const refreshToken = await this.jwtService.signAsync(payload, {
  secret: process.env.JWT_REFRESH_SECRET,
  expiresIn: '7d',
});

await this.storeRefreshToken(userId, refreshToken);
```

### Validate Refresh Token

```typescript
async validateRefreshToken(refreshToken: string) {
  // 1. Verify JWT signature
  let payload;
  try {
    payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
  } catch {
    throw new UnauthorizedException('Invalid refresh token');
  }

  // 2. Check database
  const storedToken = await this.prisma.refresh_token.findUnique({
    where: { token: refreshToken },
    include: { user: true },
  });

  if (!storedToken) {
    throw new UnauthorizedException('Refresh token not found');
  }

  // 3. Check if revoked
  if (storedToken.revoked_at) {
    throw new UnauthorizedException('Refresh token revoked');
  }

  // 4. Check if expired
  if (storedToken.expires_at < new Date()) {
    throw new UnauthorizedException('Refresh token expired');
  }

  // 5. Check if user active
  if (!storedToken.user.is_active) {
    throw new UnauthorizedException('User account inactive');
  }

  return { payload, storedToken };
}
```

### Refresh Access Token

```typescript
async refreshAccessToken(refreshToken: string) {
  const { payload, storedToken } = await this.validateRefreshToken(refreshToken);

  // Revoke old token
  await this.revokeRefreshToken(storedToken.id);

  // Generate new tokens
  const newTokens = await this.generateTokens(
    payload.sub,
    storedToken.user.email,
    storedToken.user.first_name,
    storedToken.user.last_name,
  );

  return newTokens;
}
```

### Revoke Refresh Token

```typescript
async revokeRefreshToken(tokenId: string) {
  await this.prisma.refresh_token.update({
    where: { id: tokenId },
    data: { revoked_at: new Date() },
  });
}
```

---

## 🖥️ 9.4 Offline Sessions

### offline_user_session Table

```prisma
model offline_user_session {
  user_session_id      String  @db.VarChar(36)
  user_id              String  @db.VarChar(255)
  realm_id             String  @db.VarChar(36)
  created_on           Int
  offline_flag         String  @db.VarChar(4)
  data                 String?
  last_session_refresh Int     @default(0)
  broker_session_id    String? @db.VarChar(1024)

  @@id([user_session_id, offline_flag])
  @@index([user_id, realm_id, offline_flag])
}
```

### Create Offline Session

```typescript
async createOfflineSession(userId: string, realmId: string) {
  const sessionId = uuid();
  const now = Math.floor(Date.now() / 1000);

  await this.prisma.offline_user_session.create({
    data: {
      user_session_id: sessionId,
      user_id: userId,
      realm_id: realmId,
      created_on: now,
      offline_flag: 'OFFLINE',
      last_session_refresh: now,
      data: JSON.stringify({
        ip: req.ip,
        userAgent: req.headers['user-agent'],
      }),
    },
  });

  return sessionId;
}
```

### Refresh Offline Session

```typescript
async refreshOfflineSession(sessionId: string) {
  const now = Math.floor(Date.now() / 1000);

  await this.prisma.offline_user_session.updateMany({
    where: {
      user_session_id: sessionId,
      offline_flag: 'OFFLINE',
    },
    data: {
      last_session_refresh: now,
    },
  });
}
```

---

## 📱 9.5 Client Sessions

### offline_client_session Table

```prisma
model offline_client_session {
  user_session_id         String  @db.VarChar(36)
  client_id               String  @db.VarChar(255)
  offline_flag            String  @db.VarChar(4)
  timestamp               Int?
  data                    String?
  client_storage_provider String  @default("local") @db.VarChar(36)
  external_client_id      String  @default("local") @db.VarChar(255)
  version                 Int?    @default(0)

  @@id([user_session_id, client_id, client_storage_provider, external_client_id, offline_flag])
}
```

### Usage

Multiple clients (web, mobile) can have separate sessions:
```typescript
// Web session
await createClientSession(userId, 'web-client', 'OFFLINE');

// Mobile session
await createClientSession(userId, 'mobile-client', 'OFFLINE');
```

---

## 🚪 9.6 Logout & Session Revocation

### Logout (Single Device)

```typescript
async logout(refreshToken: string) {
  await this.prisma.refresh_token.updateMany({
    where: { token: refreshToken },
    data: { revoked_at: new Date() },
  });
}
```

### Logout All Devices

```typescript
async logoutAllDevices(userId: string) {
  await this.prisma.refresh_token.updateMany({
    where: { user_id: userId },
    data: { revoked_at: new Date() },
  });

  await this.prisma.offline_user_session.updateMany({
    where: { user_id: userId },
    data: { offline_flag: 'LOGGED_OUT' },
  });
}
```

### Revoke Session by ID

```typescript
async revokeSession(sessionId: string) {
  await this.prisma.offline_user_session.updateMany({
    where: { user_session_id: sessionId },
    data: { offline_flag: 'REVOKED' },
  });
}
```

---

## 📊 9.7 Session Listing

### Get User Sessions

```typescript
async getUserSessions(userId: string) {
  const [refreshTokens, offlineSessions] = await Promise.all([
    this.prisma.refresh_token.findMany({
      where: {
        user_id: userId,
        revoked_at: null,
        expires_at: { gte: new Date() },
      },
      include: { user: true },
      orderBy: { created_at: 'desc' },
    }),
    this.prisma.offline_user_session.findMany({
      where: {
        user_id: userId,
        offline_flag: 'OFFLINE',
      },
      orderBy: { last_session_refresh: 'desc' },
    }),
  ]);

  return {
    active_sessions: refreshTokens.map(t => ({
      id: t.id,
      created_at: t.created_at,
      expires_at: t.expires_at,
    })),
    offline_sessions: offlineSessions.map(s => ({
      id: s.user_session_id,
      created_on: s.created_on,
      last_refresh: s.last_session_refresh,
      data: JSON.parse(s.data || '{}'),
    })),
  };
}
```

---

## 🧹 9.8 Session Cleanup

### Cleanup Expired Tokens

```typescript
@Cron('0 0 * * *')  // Run daily at midnight
async cleanupExpiredTokens() {
  await this.prisma.refresh_token.deleteMany({
    where: {
      OR: [
        { expires_at: { lt: new Date() } },
        { revoked_at: { not: null } },
      ],
    },
  });
}
```

### Cleanup Old Offline Sessions

```typescript
@Cron('0 0 * * *')  // Run daily
async cleanupOldSessions() {
  const thirtyDaysAgo = Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000);

  await this.prisma.offline_user_session.deleteMany({
    where: {
      last_session_refresh: { lt: thirtyDaysAgo },
    },
  });
}
```

---

## ❓ FAQ

### Q1: Session vs JWT token khác gì nhau?

**A**:
- **JWT Token**: Stateless, self-contained
- **Session**: Stateful, stored in database

Auth Service uses BOTH:
- JWT for API access (stateless)
- Refresh token in DB for token renewal (stateful)

### Q2: Làm sao để detect suspicious activity?

**A**: Track session metadata:
```typescript
data: JSON.stringify({
  ip: req.ip,
  userAgent: req.headers['user-agent'],
  location: geoLookup(req.ip),
})
```

Then check for anomalies (multiple IPs, unusual user agents).

### Q3: Token rotation khi refresh?

**A**: Yes, best practice:
```typescript
// Old token gets revoked
await revokeRefreshToken(oldToken.id);

// New token created
const newToken = await generateRefreshToken(userId);
```

---

## 🎯 Summary

### Key Concepts

1. ✅ **Refresh Token**: Long-lived, stored in DB
2. ✅ **Access Token**: Short-lived, in memory
3. ✅ **Offline Session**: For "Remember Me"
4. ✅ **Client Session**: Per-device tracking
5. ✅ **Token Rotation**: Revoke old, issue new

### Session Lifecycle

```
Sign In
  ↓
Create Refresh Token (DB)
Create Access Token (Memory)
  ↓
Use Access Token (API calls)
  ↓
Access Token Expired (1h)
  ↓
Use Refresh Token to get new Access Token
  ↓
Refresh Token Expired (7 days)
  ↓
Login Again
```

### Next Steps

- **[Phần 10: Required Actions](./10-required-actions.md)** - Password reset, email verification

---

**Document Version**: 1.0.0
**Last Updated**: 2025-03-18
