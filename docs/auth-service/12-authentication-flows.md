# Phần 12: Authentication Flows

## 📋 Mục tiêu phần này

Hiểu được:
- ✅ Authentication Flow concepts
- ✅ Flow configurations (browser, registration, etc.)
- ✅ Execution steps (authenticators)
- ✅ Custom flow creation

---

## 🔗 12.1 Authentication Flow Overview

### Flow là gì?

```
┌─────────────────────────────────────────────────────────┐
│           Authentication Flow Structure                 │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Flow = Container of execution steps                    │
│                                                          │
│  Browser Flow (Login)                                   │
│  ├─ Execution 1: Identify User (username/email)         │
│  ├─ Execution 2: Verify Password                        │
│  ├─ Execution 3: Check Required Actions                 │
│  └─ Execution 4: Configure TOTP (if enabled)            │
│                                                          │
│  Registration Flow                                      │
│  ├─ Execution 1: Registration Form                      │
│  ├─ Execution 2: Profile Validation                     │
│  ├─ Execution 3: Email Verification                     │
│  └─ Execution 4: Terms Acceptance                       │
│                                                          │
│  Reset Credentials Flow                                 │
│  ├─ Execution 1: Email/Username Input                   │
│  └─ Execution 2: Password Reset Link                    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 12.2 Flow Entities

### authentication_flow Table

```prisma
model authentication_flow {
  id                       String   @id @db.VarChar(36)
  alias                    String?  @db.VarChar(255)
  description              String?  @db.VarChar(255)
  realm_id                 String?  @db.VarChar(36)
  provider_id              String   @default("basic-flow") @db.VarChar(36)
  top_level                Boolean  @default(false)
  built_in                 Boolean  @default(false)

  // Relations
  authentication_execution authentication_execution[]
  realm                    realm?   @relation(fields: [realm_id], references: [id])

  @@index([realm_id])
}
```

### authentication_execution Table

```prisma
model authentication_execution {
  id                  String               @id @db.VarChar(36)
  alias               String?              @db.VarChar(255)
  authenticator       String?              @db.VarChar(36)
  realm_id            String?              @db.VarChar(36)
  flow_id             String?              @db.VarChar(36)
  requirement         Int?
  priority            Int?
  authenticator_flow  Boolean              @default(false)
  auth_flow_id        String?              @db.VarChar(36)
  auth_config         String?              @db.VarChar(36)

  // Relations
  authentication_flow authentication_flow? @relation(fields: [flow_id], references: [id])
  realm               realm?               @relation(fields: [realm_id], references: [id])

  @@index([flow_id])
  @@index([realm_id, flow_id])
}
```

### authenticator_config Table

```prisma
model authenticator_config {
  id       String  @id @db.VarChar(36)
  alias    String? @db.VarChar(255)
  realm_id String? @db.VarChar(36)

  realm    realm?  @relation(fields: [realm_id], references: [id])

  @@index([realm_id])
}
```

---

## 🔧 12.3 Built-in Flows

### Standard Flows

```typescript
enum StandardFlow {
  BROWSER = 'browser',                    // Login flow
  REGISTRATION = 'registration',          // Sign up flow
  DIRECT_GRANT = 'direct_grant',         // Resource owner password
  RESET_CREDENTIALS = 'reset_credentials', // Password reset
  CLIENT_AUTH = 'client_auth',           // Client authentication
  DOCKER_AUTH = 'docker_http_basic',     // Docker authentication
  FIRST_BROKER_LOGIN = 'first_broker_login', // IdP login
}
```

### Default Browser Flow

```typescript
const defaultBrowserFlow = {
  alias: 'browser',
  description: 'Browser-based authentication',
  executions: [
    {
      alias: 'identify-user',
      authenticator: 'auth-username-password-form',
      requirement: 'REQUIRED',
      priority: 10,
    },
    {
      alias: 'auth-password',
      authenticator: 'auth-cookie',
      requirement: 'REQUIRED',
      priority: 20,
    },
  ],
};
```

### Default Registration Flow

```typescript
const defaultRegistrationFlow = {
  alias: 'registration',
  description: 'User registration',
  executions: [
    {
      alias: 'registration-page-form',
      authenticator: 'auth-registration-page-form',
      requirement: 'REQUIRED',
      priority: 10,
    },
    {
      alias: 'registration-user-creation',
      authenticator: 'auth-user-creation',
      requirement: 'REQUIRED',
      priority: 20,
    },
    {
      alias: 'registration-profile-action',
      authenticator: 'auth-profile-page-action',
      requirement: 'DISABLED',
      priority: 30,
    },
  ],
};
```

---

## 📝 12.4 Create Custom Flow

### Request DTO

```typescript
export class CreateFlowDto {
  @IsString()
  @IsNotEmpty()
  alias: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  realm_id?: string = 'master';

  @IsBoolean()
  @IsOptional()
  top_level?: boolean = false;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExecutionDto)
  executions: CreateExecutionDto[];
}

export class CreateExecutionDto {
  @IsString()
  @IsNotEmpty()
  alias: string;

  @IsString()
  @IsOptional()
  authenticator?: string;

  @IsEnum(['REQUIRED', 'OPTIONAL', 'DISABLED', 'ALTERNATIVE', 'CONDITIONAL'])
  requirement?: string = 'REQUIRED';

  @IsInt()
  @IsOptional()
  priority?: number = 0;

  @IsBoolean()
  @IsOptional()
  authenticator_flow?: boolean = false;
}
```

### Service Method

```typescript
@LogActivity()
async createFlow(createFlowDto: CreateFlowDto): Promise<FlowResponseDto> {
  const { alias, description, realm_id, top_level, executions } = createFlowDto;

  // Create flow
  const flow = await this.prisma.authentication_flow.create({
    data: {
      id: uuid(),
      alias,
      description,
      realm_id,
      provider_id: 'basic-flow',
      top_level,
      built_in: false,
    },
  });

  // Create executions
  await this.prisma.authentication_execution.createMany({
    data: executions.map(exec => ({
      id: uuid(),
      alias: exec.alias,
      authenticator: exec.authenticator,
      realm_id,
      flow_id: flow.id,
      requirement: exec.requirement,
      priority: exec.priority,
      authenticator_flow: exec.authenticator_flow || false,
    })),
  });

  return this.toResponseDto(flow);
}
```

---

## 🔍 12.5 Get Flow Details

### Service Method

```typescript
async getFlow(flowId: string) {
  const flow = await this.prisma.authentication_flow.findUnique({
    where: { id: flowId },
    include: {
      authentication_execution: {
        orderBy: { priority: 'asc' },
      },
    },
  });

  if (!flow) {
    throw new NotFoundException('Flow not found');
  }

  return {
    ...this.toResponseDto(flow),
    executions: flow.authentication_execution.map(exec => ({
      id: exec.id,
      alias: exec.alias,
      authenticator: exec.authenticator,
      requirement: exec.requirement,
      priority: exec.priority,
      authenticator_flow: exec.authenticator_flow,
    })),
  };
}
```

---

## 🔧 12.6 Configure Realm Flows

### Bind Flow to Realm

```typescript
async bindFlowToRealm(realmId: string, flowType: StandardFlow, flowId: string) {
  const flowField = {
    [StandardFlow.BROWSER]: 'browser_flow',
    [StandardFlow.REGISTRATION]: 'registration_flow',
    [StandardFlow.DIRECT_GRANT]: 'direct_grant_flow',
    [StandardFlow.RESET_CREDENTIALS]: 'reset_credentials_flow',
    [StandardFlow.CLIENT_AUTH]: 'client_auth_flow',
    [StandardFlow.DOCKER_AUTH]: 'docker_auth_flow',
  }[flowType];

  await this.prisma.realm.update({
    where: { id: realmId },
    data: {
      [flowField]: flowId,
    },
  });
}
```

### Example: Set Custom Browser Flow

```typescript
// Create custom flow
const flow = await createFlow({
  alias: 'custom-browser',
  realm_id: 'acme',
  executions: [
    {
      alias: 'social-login',
      authenticator: 'auth-social-login',
      requirement: 'ALTERNATIVE',
      priority: 10,
    },
    {
      alias: 'password-login',
      authenticator: 'auth-username-password-form',
      requirement: 'REQUIRED',
      priority: 20,
    },
  ],
});

// Bind to realm
await bindFlowToRealm('acme', StandardFlow.BROWSER, flow.id);
```

---

## 🎨 12.7 Authenticator Types

### Built-in Authenticators

```typescript
enum Authenticator {
  // Form-based
  USERNAME_PASSWORD_FORM = 'auth-username-password-form',
  REGISTRATION_PAGE_FORM = 'auth-registration-page-form',

  // Cookie-based
  COOKIE = 'auth-cookie',

  // User creation
  USER_CREATION = 'auth-user-creation',

  // OTP/TOTP
  TOTP_FORM = 'auth-totp-form',
  TOTP_BROKER = 'auth-totp-broker',

  // Social login
  SOCIAL_LOGIN = 'auth-social-login',
  IDP_REDIRECTOR = 'identity-provider-redirector',

  // X.509 certificate
  X509_CLIENT_CERT = 'auth-x509-client-cert',

  // WebAuthn
  WEBAUTHN_BROWSER = 'auth-webauthn-browser-authenticator',
  WEBAUTHN_BROWSER_AUTHPLEASE = 'auth-webauthn-browser-authentication-please',
  WEBAUTHN_REGISTER = 'auth-webauthn-register',
}
```

---

## 🔄 12.8 Requirement Types

### Requirement Options

```
┌─────────────────────────────────────────────────────────┐
│               Requirement Types                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  REQUIRED     ──▶ Must complete                         │
│  OPTIONAL     ──▶ Can skip                              │
│  DISABLED     ──▶ Not executed                          │
│  ALTERNATIVE  ──▶ Complete one of alternatives          │
│  CONDITIONAL  ──▶ Execute based on condition            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Example: Alternative Requirement

```typescript
executions: [
  {
    alias: 'social-login',
    requirement: 'ALTERNATIVE',
    priority: 10,
  },
  {
    alias: 'password-login',
    requirement: 'ALTERNATIVE',
    priority: 20,
  },
]
```

User can choose EITHER social login OR password login.

### Example: Conditional Requirement

```typescript
executions: [
  {
    alias: 'mfa-check',
    requirement: 'CONDITIONAL',
    requirementCondition: 'user.hasTotpEnabled',
    priority: 30,
  },
]
```

Only execute if user has TOTP enabled.

---

## 🚀 12.9 Execute Flow

### Execute Authentication Flow

```typescript
async executeFlow(flowId: string, context: any) {
  const flow = await this.getFlow(flowId);

  for (const execution of flow.executions) {
    // Check requirement
    if (execution.requirement === 'DISABLED') {
      continue;
    }

    if (execution.requirement === 'CONDITIONAL') {
      const shouldExecute = await this.evaluateCondition(
        execution.requirementCondition,
        context,
      );
      if (!shouldExecute) {
        continue;
      }
    }

    // Execute authenticator
    const result = await this.executeAuthenticator(
      execution.authenticator,
      context,
    );

    if (result.status === 'FAILURE') {
      if (execution.requirement === 'REQUIRED') {
        // Stop execution
        return { status: 'FAILED', execution: execution.alias };
      } else if (execution.requirement === 'ALTERNATIVE') {
        // Try next alternative
        continue;
      }
    }

    // Update context
    context = { ...context, ...result.context };
  }

  return { status: 'SUCCESS', context };
}
```

---

## ❓ FAQ

### Q1: Flow khác Required Actions thế nào?

**A**:
- **Flow**: Defines login/authentication process
- **Required Actions**: Post-login actions user must complete

Example:
- Flow: Login with password
- Required Action: Update password on first login

### Q2: Làm sao để add custom authenticator?

**A**: Implement authenticator interface:
```typescript
interface Authenticator {
  authenticate(context: any): Promise<AuthResult>;
  requiresUser(): boolean;
  configuredFor(key: string): Promise<boolean>;
}
```

### Q3: Priority trong execution ảnh hưởng gì?

**A**: Executions sorted by priority (ascending):
- Lower priority = Execute first
- Same priority = Parallel execution (for alternatives)

---

## 🎯 Summary

### Flow Structure

```
Flow (Container)
  └─ Execution 1 (Step 1)
  └─ Execution 2 (Step 2)
  └─ Execution 3 (Step 3)
  └─ ...
```

### Standard Flows

| Flow | Purpose |
|------|---------|
| Browser | Login flow |
| Registration | Sign up flow |
| Direct Grant | Password-based auth |
| Reset Credentials | Forgot password |
| Client Auth | OAuth client auth |

### Next Steps

- **[Phần 13: Identity Providers](./13-identity-providers.md)** - Social login & SSO

---

**Document Version**: 1.0.0
**Last Updated**: 2025-03-18
