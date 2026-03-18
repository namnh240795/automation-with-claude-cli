# Phần 10: Required Actions

## 📋 Mục tiêu phần này

Hiểu được:
- ✅ Required Actions là gì
- ✅ Các loại Required Actions
- ✅ Assign actions cho users
- ✅ Execute required actions

---

## ⚠️ 10.1 Required Actions Overview

### Required Actions là gì?

```
┌─────────────────────────────────────────────────────────┐
│              Required Actions Flow                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  User tries to login                                    │
│     │                                                    │
│     ▼                                                    │
│  Check user.required_actions[]                          │
│     │                                                    │
│     ├─▶ EMPTY? → Allow login                           │
│     │                                                    │
│     └─▶ HAS ACTIONS? → Force user to complete          │
│                          │                              │
│                          ├─▶ UPDATE_PASSWORD            │
│                          ├─▶ VERIFY_EMAIL               │
│                          ├─▶ CONFIGURE_TOTP             │
│                          └─▶ UPDATE_PROFILE             │
│                                                          │
│  After completion → Remove from list → Allow login      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Use Cases

- **Password reset**: Force user change password on next login
- **Email verification**: Require email verification before full access
- **MFA setup**: Force user configure 2FA
- **Profile update**: Require user complete profile
- **Terms acceptance**: Force accept new ToS

---

## 📋 10.2 Required Action Entity

### required_action_provider Table

```prisma
model required_action_provider {
  id             String  @id @db.VarChar(36)
  alias          String? @db.VarChar(255)
  name           String? @db.VarChar(255)
  realm_id       String? @db.VarChar(36)
  enabled        Boolean @default(false)
  default_action Boolean @default(false)
  provider_id    String? @db.VarChar(255)
  priority       Int?

  realm          realm?  @relation(fields: [realm_id], references: [id])

  @@index([realm_id])
}
```

### user_required_action Table

```prisma
model user_required_action {
  user_id         String  @db.VarChar(36)
  required_action String  @default(" ") @db.VarChar(255)

  user_entity     user_entity @relation(fields: [user_id], references: [id])

  @@id([required_action, user_id])
  @@index([user_id])
}
```

---

## 📝 10.3 Built-in Required Actions

### Standard Actions

```typescript
enum RequiredAction {
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  VERIFY_EMAIL = 'VERIFY_EMAIL',
  CONFIGURE_TOTP = 'CONFIGURE_TOTP',
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  TERMS_AND_CONDITIONS = 'TERMS_AND_CONDITIONS',
  UPDATE_USER_LOCALE = 'UPDATE_USER_LOCALE',
}
```

### Action Definitions

```typescript
const REQUIRED_ACTIONS = {
  UPDATE_PASSWORD: {
    name: 'Update Password',
    description: 'User must change password on next login',
    priority: 1,
  },
  VERIFY_EMAIL: {
    name: 'Verify Email',
    description: 'User must verify email address',
    priority: 2,
  },
  CONFIGURE_TOTP: {
    name: 'Configure TOTP',
    description: 'User must set up two-factor authentication',
    priority: 3,
  },
  UPDATE_PROFILE: {
    name: 'Update Profile',
    description: 'User must complete profile information',
    priority: 4,
  },
};
```

---

## ➕ 10.4 Create Required Action

### Request DTO

```typescript
export class CreateRequiredActionDto {
  @IsString()
  @IsNotEmpty()
  alias: string;  // e.g., "VERIFY_EMAIL"

  @IsString()
  @IsNotEmpty()
  name: string;  // e.g., "Verify Email Address"

  @IsString()
  @IsOptional()
  realm_id?: string = 'master';

  @IsBoolean()
  @IsOptional()
  enabled?: boolean = true;

  @IsBoolean()
  @IsOptional()
  default_action?: boolean = false;

  @IsInt()
  @IsOptional()
  priority?: number = 0;
}
```

### Service Method

```typescript
@LogActivity()
async createAction(
  createDto: CreateRequiredActionDto,
): Promise<RequiredActionResponseDto> {
  const action = await this.prisma.required_action_provider.create({
    data: {
      ...createDto,
      provider_id: createDto.alias,  // Use alias as provider_id
    },
  });

  return this.toResponseDto(action);
}
```

---

## 👤 10.5 Assign Required Action to User

### Add Action to User

```typescript
async addRequiredAction(userId: string, actionAlias: string) {
  await this.prisma.user_required_action.create({
    data: {
      user_id: userId,
      required_action: actionAlias,
    },
  });
}
```

### Add Multiple Actions

```typescript
async addRequiredActions(userId: string, actions: string[]) {
  await this.prisma.user_required_action.createMany({
    data: actions.map(action => ({
      user_id: userId,
      required_action: action,
    })),
    skipDuplicates: true,
  });
}
```

### Remove Action from User

```typescript
async removeRequiredAction(userId: string, actionAlias: string) {
  await this.prisma.user_required_action.deleteMany({
    where: {
      user_id: userId,
      required_action: actionAlias,
    },
  });
}
```

---

## 🔍 10.6 Check Required Actions

### Get User Required Actions

```typescript
async getUserRequiredActions(userId: string) {
  const actions = await this.prisma.user_required_action.findMany({
    where: { user_id: userId },
  });

  return actions.map(a => a.required_action);
}
```

### Check if User Has Required Actions

```typescript
async hasRequiredActions(userId: string): Promise<boolean> {
  const count = await this.prisma.user_required_action.count({
    where: { user_id: userId },
  });

  return count > 0;
}
```

### Modify Sign In Flow

```typescript
async signIn(signInDto: SignInDto) {
  // ... authenticate user ...

  // Check required actions
  const requiredActions = await this.getUserRequiredActions(user.id);

  if (requiredActions.length > 0) {
    return {
      requires_action: true,
      actions: requiredActions,
      // Don't return tokens yet
    };
  }

  // No required actions, generate tokens
  return this.generateTokens(user);
}
```

---

## ✅ 10.7 Execute Required Action

### Update Password Action

```typescript
async executeUpdatePassword(userId: string, newPassword: string) {
  // Hash new password
  const passwordHash = await bcrypt.hash(newPassword, 10);

  // Update password
  await this.prisma.user.update({
    where: { id: userId },
    data: { password_hash: passwordHash },
  });

  // Remove required action
  await this.removeRequiredAction(userId, 'UPDATE_PASSWORD');

  return { success: true };
}
```

### Verify Email Action

```typescript
async executeVerifyEmail(userId: string, token: string) {
  // Verify token
  const isValid = await this.verifyEmailToken(token);

  if (!isValid) {
    throw new UnauthorizedException('Invalid verification token');
  }

  // Mark email as verified
  await this.prisma.user.update({
    where: { id: userId },
    data: { email_verified: true },
  });

  // Remove required action
  await this.removeRequiredAction(userId, 'VERIFY_EMAIL');

  return { success: true };
}
```

### Configure TOTP Action

```typescript
async executeConfigureTotp(userId: string, totpSecret: string, code: string) {
  // Verify TOTP code
  const isValid = await this.verifyTotp(totpSecret, code);

  if (!isValid) {
    throw new UnauthorizedException('Invalid TOTP code');
  }

  // Store TOTP credential
  await this.prisma.credential.create({
    data: {
      user_id: userId,
      type: 'totp',
      secret_data: JSON.stringify({ secret: totpSecret }),
    },
  });

  // Remove required action
  await this.removeRequiredAction(userId, 'CONFIGURE_TOTP');

  return { success: true };
}
```

---

## 🔁 10.8 Password Reset Flow

### Initiate Password Reset

```typescript
async initiatePasswordReset(email: string, realmId: string) {
  const user = await this.prisma.user.findFirst({
    where: { email, realm_id: realmId },
  });

  if (!user) {
    // Don't reveal user existence
    return { success: true };
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Store token with expiry
  await this.prisma.password_reset_token.create({
    data: {
      token: resetToken,
      user_id: user.id,
      expires_at: new Date(Date.now() + 3600000), // 1 hour
    },
  });

  // Send email
  await this.sendPasswordResetEmail(user.email, resetToken);

  return { success: true };
}
```

### Complete Password Reset

```typescript
async completePasswordReset(token: string, newPassword: string) {
  // Verify token
  const resetToken = await this.prisma.password_reset_token.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!resetToken || resetToken.expires_at < new Date()) {
    throw new UnauthorizedException('Invalid or expired reset token');
  }

  // Update password
  const passwordHash = await bcrypt.hash(newPassword, 10);

  await this.prisma.user.update({
    where: { id: resetToken.user_id },
    data: { password_hash: passwordHash },
  });

  // Delete reset token
  await this.prisma.password_reset_token.delete({
    where: { token },
  });

  // Remove UPDATE_PASSWORD action if exists
  await this.removeRequiredAction(resetToken.user_id, 'UPDATE_PASSWORD');

  return { success: true };
}
```

---

## 📧 10.9 Email Verification Flow

### Send Verification Email

```typescript
async sendVerificationEmail(userId: string) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.email_verified) {
    return { success: true };
  }

  // Generate verification token
  const verificationToken = crypto.randomBytes(32).toString('hex');

  // Store token
  await this.prisma.email_verification_token.create({
    data: {
      token: verificationToken,
      user_id: userId,
      expires_at: new Date(Date.now() + 86400000), // 24 hours
    },
  });

  // Send email
  await this.sendVerificationEmail(user.email, verificationToken);

  return { success: true };
}
```

### Verify Email

```typescript
async verifyEmail(token: string) {
  const verificationToken = await this.prisma.email_verification_token.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!verificationToken || verificationToken.expires_at < new Date()) {
    throw new UnauthorizedException('Invalid or expired verification token');
  }

  // Mark email as verified
  await this.prisma.user.update({
    where: { id: verificationToken.user_id },
    data: { email_verified: true },
  });

  // Delete token
  await this.prisma.email_verification_token.delete({
    where: { token },
  });

  // Remove VERIFY_EMAIL action if exists
  await this.removeRequiredAction(verificationToken.user_id, 'VERIFY_EMAIL');

  return { success: true };
}
```

---

## ❓ FAQ

### Q1: Required Action execution order?

**A**: Execute by priority:
```typescript
const actions = await getUserRequiredActions(userId);
const sortedActions = actions.sort((a, b) => a.priority - b.priority);
```

### Q2: User có thể skip required action không?

**A**: Không, user PHẢI complete tất cả actions trước khi login được. Block tất cả API calls.

### Q3: Làm sao để add required action cho tất cả users?

**A**: Bulk operation:
```typescript
await this.prisma.user_required_action.createMany({
  data: allUserIds.map(userId => ({
    user_id: userId,
    required_action: 'UPDATE_PASSWORD',
  })),
  skipDuplicates: true,
});
```

---

## 🎯 Summary

### Required Actions Flow

```
Admin adds action → User logs in → Check actions
                                 │
                                 └─▶ Has actions?
                                      │
                                      ├─ Yes → Block login
                                      │         Show action UI
                                      │         Complete action
                                      │         Remove from list
                                      │         Allow login
                                      │
                                      └─ No → Allow login
```

### Common Actions

| Action | Use Case |
|--------|----------|
| UPDATE_PASSWORD | Password reset, expired password |
| VERIFY_EMAIL | New user registration |
| CONFIGURE_TOTP | Enable MFA |
| UPDATE_PROFILE | Incomplete profile |
| TERMS_AND_CONDITIONS | Updated ToS |

### Next Steps

- **[Phần 11: Event Logging](./11-events-logging.md)** - Audit & compliance

---

**Document Version**: 1.0.0
**Last Updated**: 2025-03-18
