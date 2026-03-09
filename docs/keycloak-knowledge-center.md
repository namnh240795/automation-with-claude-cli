# Keycloak Knowledge Center

## Table of Contents

- [Overview](#overview)
- [Core Capabilities](#core-capabilities)
- [Authentication Scenarios](#authentication-scenarios)
- [Authorization Scenarios](#authorization-scenarios)
- [Enterprise Use Cases](#enterprise-use-cases)
- [Integration Patterns](#integration-patterns)
- [Security Features](#security-features)
- [Best Practices](#best-practices)
- [Common Implementations](#common-implementations)

## Overview

Keycloak is an open-source identity and access management (IAM) solution that provides:

- **Single Sign-On (SSO)** - One login for multiple applications
- **Identity Brokering** - Federation with external identity providers
- **User Federation** - Integration with existing user directories
- **Admin Console** - Web-based administration interface
- **REST API** - Programmatic access to all features
- **Multi-tenancy** - Support for multiple realms (organizations)
- **Standards Compliance** - OIDC, OAuth 2.0, SAML 2.0

## Core Capabilities

### 1. Authentication

**Password-based Authentication:**
- Traditional username/password login
- Password policies and strength validation
- Account lockout after failed attempts
- Password reset workflows
- Credential rotation

**Multi-factor Authentication (MFA):**
- TOTP (Time-based One-Time Password)
- WebAuthn/FIDO2 (hardware keys, biometrics)
- SMS-based verification
- Email verification codes
- Custom authentication flows

**Social Login:**
- Google, GitHub, Facebook, Twitter
- Microsoft, LinkedIn, Apple
- Any OAuth 2.0 / OpenID Connect provider
- Brandable login pages

### 2. Authorization

**Role-Based Access Control (RBAC):**
- Realm roles (global across applications)
- Client roles (application-specific)
- Composite roles (role hierarchies)
- Role mapping for users and groups

**Attribute-Based Access Control (ABAC):**
- User attributes in access tokens
- Fine-grained permissions based on user data
- Custom claims in JWT tokens
- Dynamic policy evaluation

**Resource-Based Authorization:**
- Protect specific resources/endpoints
- Method-level permissions (GET, POST, etc.)
- Scope-based access control
- Policy enforcers with Keycloak Authorization Services

### 3. User Management

**User Directory:**
- Centralized user store
- User profiles with custom attributes
- Required and optional attributes
- Attribute validation and formatting

**Group Management:**
- Hierarchical group structures
- Nested groups
- Group-based role assignment
- Bulk user operations

**Organization Management:**
- Multiple realms per organization
- Realm-specific policies
- Cross-realm trust relationships
- Organization branding

### 4. Session Management

**Single Sign-On (SSO):**
- Browser-based SSO
- Single Sign-Out (SSO)
- Session timeouts
- Remember me functionality
- Multiple concurrent sessions

**Session Revocation:**
- Logout all sessions
- Revoke specific sessions
- Token revocation
- Backchannel logout

## Authentication Scenarios

### Scenario 1: Web Application SSO

**Use Case:** Users sign in once to access multiple web applications

**Implementation:**
```
┌─────────┐         ┌──────────┐         ┌─────────────┐
│ Browser │────────>│ Keycloak │────────>│ App 1       │
└─────────┘         └──────────┘         └─────────────┘
     │                   │                        │
     │                   │<───────────────────────┘
     │                   │
     │<──────────────────┘ (SSO Session)
     │
     └────────────────────────────────────────────>│ App 2 (already authenticated)
```

**Flow:**
1. User navigates to App 1
2. Redirected to Keycloak login
3. User authenticates with credentials
4. Keycloak issues token and creates SSO session
5. User navigates to App 2
6. App 2 redirects to Keycloak
7. Keycloak recognizes SSO session
8. User is automatically logged in to App 2

**Benefits:**
- Seamless user experience
- Reduced password fatigue
- Centralized session management
- Single sign-out capability

### Scenario 2: Mobile App Authentication

**Use Case:** Mobile apps need secure authentication with offline capabilities

**Implementation:**

**Native App Flow (PKCE):**
1. App opens embedded browser for login
2. User authenticates with Keycloak
3. Keycloak redirects back with authorization code
4. App exchanges code for tokens
4. Tokens stored securely in device keychain

**Token Management:**
- Access tokens (short-lived, 5-15 minutes)
- Refresh tokens (long-lived, days/weeks)
- Silent token refresh in background
- Secure token storage

**Security Considerations:**
- Use PKCE (Proof Key for Code Exchange)
- Enable TLS certificate pinning
- Store tokens in secure storage
- Implement biometric authentication

### Scenario 3: API Authentication

**Use Case:** REST APIs need to authenticate and authorize requests

**Implementation:**

**Bearer Token Authentication:**
```
┌─────────┐         ┌──────────┐         ┌─────────────┐
│ Client  │────────>│ Keycloak │────────>│ API         │
└─────────┘         └──────────┘         └─────────────┘
     │                   │                        │
     │                   │<───────────────────────┘ (Token validation)
     │                   │
     │<──────────────────┘ (Access token)
     │
     └────────────────────────────────────────────>│ API request with Bearer token
```

**Token Validation:**
- API validates JWT signature
- Checks token expiration
- Verifies issuer and audience
- Extracts user claims

**Service Accounts:**
- Machine-to-machine authentication
- Client credentials grant
- No user interaction required
- Suitable for background services

### Scenario 4: Social Login Integration

**Use Case:** Allow users to sign in with existing social accounts

**Implementation:**

**Identity Provider Federation:**
```
┌─────────┐         ┌──────────┐         ┌─────────────┐
│ User    │────────>│ Google   │────────>│ Keycloak    │
└─────────┘         └──────────┘         └─────────────┘
     │                   │                        │
     │                   │<───────────────────────┘ (OIDC)
     │                   │
     │<──────────────────┘ (Social login)
     │
     └────────────────────────────────────────────>│ App (with unified identity)
```

**Benefits:**
- No password management for users
- Faster registration
- Reduced support overhead
- Access to profile data

**Configuration:**
1. Register app with social provider
2. Configure identity provider in Keycloak
3. Map social attributes to Keycloak user profile
4. Enable/disable specific providers

### Scenario 5: Legacy Application Integration

**Use Case:** Integrate legacy apps that can't use modern protocols

**Implementation Options:**

**SAML 2.0 Integration:**
- Support for enterprise SAML IdPs
- SAML-to-OAuth bridging
- Legacy app can consume SAML assertions

**Header-based Authentication:**
- Keycloak validates session
- Sets custom headers (X-Auth-User, X-Roles)
- Reverse proxy routes authenticated requests
- Legacy app reads headers

**Token Translation:**
- Keycloak generates custom tokens
- Legacy format compatibility
- Secure token exchange

## Authorization Scenarios

### Scenario 1: RBAC for Multi-Tenant Application

**Use Case:** SaaS application with multiple organizations and role hierarchies

**Implementation:**

**Realm per Tenant:**
```
realm-tenant1.example.com
realm-tenant2.example.com
realm-tenant3.example.com
```

**Role Structure:**
- `tenant-admin` - Full access to tenant resources
- `tenant-user` - Standard user access
- `tenant-viewer` - Read-only access
- `tenant-manager` - Manage users and billing

**Group Mapping:**
- Groups represent departments
- Roles assigned to groups
- Users inherit group roles
- Simplifies permission management

**Benefits:**
- Complete tenant isolation
- Custom roles per tenant
- Independent user directories
- Tenant-specific branding

### Scenario 2: Microservices Authorization

**Use Case:** Multiple microservices need consistent authorization

**Implementation:**

**Centralized Authorization:**
```
┌─────────────┐         ┌──────────────┐
│ API Gateway │────────>│ Keycloak     │
└─────────────┘         └──────────────┘
     │                           │
     │<──────────────────────────┘ (User info & permissions)
     │
     ├──────────────────────────────────────>│ Service A
     │                           (JWT with roles & scopes)
     ├──────────────────────────────────────>│ Service B
     │                           (JWT with roles & scopes)
     └──────────────────────────────────────>│ Service C
                           (JWT with roles & scopes)
```

**JWT Token Structure:**
```json
{
  "sub": "user-id",
  "email": "user@example.com",
  "realm_access": {
    "roles": ["user", "editor"]
  },
  "resource_access": {
    "service-a": {
      "roles": ["read", "write"]
    },
    "service-b": {
      "roles": ["admin"]
    }
  },
  "scopes": ["openid", "profile", "email"]
}
```

**Benefits:**
- No database calls for authorization
- Consistent permissions across services
- Fine-grained access control
- Performance optimization

### Scenario 3: Delegated Administration

**Use Case:** Department managers manage their own team's access

**Implementation:**

**Fine-Grained Permissions:**
- `admin.users` - Manage all users
- `admin.users.view` - View users only
- `admin.users.group` - Manage specific group
- `admin.users.group.view` - View specific group

**Permission Mapping:**
```
┌──────────────┐         ┌──────────────┐
│ IT Admin     │         │ Dept Manager │
└──────────────┘         └──────────────┘
     │                          │
     │                          │
     └─────────────┬────────────┘
                   │
              ┌────▼────┐
              │Keycloak │
              └────┬────┘
                   │
         ┌─────────┼─────────┐
         │         │         │
    ┌────▼───┐┌───▼────┐┌──▼────┐
    │ All    ││ IT Dept││ Sales │
    │ Users  ││ Users  ││ Users │
    └────────┘└────────┘└───────┘
```

**Benefits:**
- Reduced IT overhead
- Faster access requests
- Department autonomy
- Audit trail of changes

### Scenario 4: Time-Based Access

**Use Case:** Temporary access for contractors, projects, or events

**Implementation:**

**Temporary Roles:**
- Role with expiration date
- Auto-removal after expiry
- Notification before expiration

**Event-Based Access:**
```
User: contractor@example.com
Roles:
  - project-alpha-developer (expires: 2024-03-31)
  - project-beta-viewer (expires: 2024-06-30)
  - temporary-consultant (expires: 2024-12-31)
```

**Benefits:**
- Automatic access revocation
- Compliance requirements met
- Reduced security risk
- Clear access timeline

## Enterprise Use Cases

### Use Case 1: B2B SaaS Platform

**Requirements:**
- Multiple customer organizations
- Custom branding per customer
- Customer manages their own users
- API access for integration

**Keycloak Solution:**

**Architecture:**
```
┌────────────────────────────────────────────┐
│            Keycloak Master Realm           │
│         (Platform Administration)          │
└────────────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
┌───────▼─────┐┌─────▼──────┐┌─────▼──────┐
│  Customer A ││ Customer B ││ Customer C │
│   Realm     ││  Realm     ││  Realm     │
└─────────────┘└────────────┘└────────────┘
```

**Features:**
- Separate realm per customer
- Customer admin manages their users
- Custom themes per customer
- API access with service accounts
- Per-customer SSO configuration

**Implementation:**
1. Create realm for each customer
2. Provision customer admin account
3. Configure custom theme with customer branding
4. Set up identity providers (if needed)
5. Create service account for API access

### Use Case 2: Healthcare Application (HIPAA Compliance)

**Requirements:**
- Strong authentication requirements
- Audit logging of all access
- Role-based access to PHI (Protected Health Information)
- Session timeout and secure logout

**Keycloak Solution:**

**Authentication:**
- MFA required for all users
- Strong password policies
- Session timeout: 15 minutes
- Secure logout with token revocation

**Authorization:**
```
Roles:
  - doctor - Can view patient records assigned to them
  - nurse - Limited view, can update vitals
  - admin - System administration, no patient access
  - receptionist - Schedule and billing only
```

**Audit Logging:**
- Log all authentication events
- Log all authorization decisions
- Log user management actions
- Export logs for compliance reporting

**Implementation:**
1. Configure strict password policies
2. Enable MFA for all users
3. Set up event listeners for audit logging
4. Implement custom authentication flow
5. Configure session timeouts

### Use Case 3: E-Commerce Platform

**Requirements:**
- Customer accounts with social login
- Admin panel for store management
- API for mobile apps
- Guest checkout with account creation

**Keycloak Solution:**

**Customer Authentication:**
- Email/password registration
- Social login (Google, Facebook, Apple)
- Guest checkout → account creation
- Password reset flow

**Admin Authorization:**
```
Realm Roles:
  - customer - Standard customer access
  - support_agent - View orders, respond to tickets
  - store_manager - Manage inventory, orders
  - platform_admin - Full platform access
```

**API Access:**
- Mobile app: Authorization Code flow with PKCE
- Web app: Implicit flow or Authorization Code
- Admin API: Service accounts with client credentials

**Benefits:**
- Unified customer identity
- Social login increases conversion
- Secure admin access control
- Scalable for multi-tenant

### Use Case 4: Education Platform

**Requirements:**
- Student, teacher, and parent accounts
- Class and school-based access
- Privacy protection for student data
- Integration with learning tools

**Keycloak Solution:**

**User Types:**
```
Roles:
  - student - Access to enrolled courses
  - teacher - Manage assigned classes
  - parent - View children's progress
  - school_admin - School-wide administration
  - platform_admin - Platform management
```

**Group Structure:**
```
School A
├── Teachers Group
├── Students Group
│   ├── Class 2024
│   └── Class 2025
└── Parents Group
```

**Privacy Features:**
- Students can only see their own data
- Parents only see their children's data
- Teachers only see their class data
- Audit logging for data access

## Integration Patterns

### Pattern 1: API Gateway Integration

**Architecture:**
```
┌─────────┐         ┌─────────────┐         ┌─────────────┐
│ Client  │────────>│ API Gateway │────────>│ Keycloak    │
└─────────┘         └─────────────┘         └─────────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
     ┌────▼────┐     ┌─────▼────┐    ┌─────▼────┐
     │ Service │     │ Service  │    │ Service  │
     │    A    │     │    B     │    │    C     │
     └─────────┘     └──────────┘    └──────────┘
```

**Flow:**
1. Client sends request to API Gateway
2. Gateway validates JWT with Keycloak
3. Gateway extracts user context
4. Gateway routes to backend service
5. Service receives validated user context

**Benefits:**
- Centralized authentication
- Offloaded authorization logic
- Consistent security policy
- Simplified microservices

### Pattern 2: Service Mesh Integration

**Architecture:**
```
┌──────────────┐         ┌──────────────┐
│ Keycloak     │         │ Service Mesh │
│ (Istio CA)   │────────>│ (Sidecars)   │
└──────────────┘         └──────────────┘
                                │
                    ┌───────────┼───────────┐
                    │           │           │
                ┌───▼────┐  ┌──▼─────┐  ┌──▼─────┐
                │ Service│  │Service │  │Service │
                │   A    │  │   B    │  │   C    │
                └────────┘  └────────┘  └────────┘
```

**Implementation:**
- Keycloak as OIDC provider
- Service mesh validates JWT
- mTLS between services
- Fine-grained network policies

**Benefits:**
- Zero trust security
- Automatic mutual TLS
- Service-to-service auth
- Traffic encryption

### Pattern 3: Legacy System Integration

**Architecture:**
```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│ Legacy App   │<--------│ Reverse      │<--------│ Keycloak     │
│              │         │ Proxy        │         │              │
└──────────────┘         └──────────────┘         └──────────────┘
```

**Authentication Methods:**

**Header Injection:**
```
HTTP Headers:
  X-Auth-User: john.doe
  X-Auth-Email: john@example.com
  X-Auth-Roles: user,editor
  X-Auth-Token: <jwt>
```

**Cookie Translation:**
- Keycloak session → Legacy session cookie
- Token validation → Legacy session check
- Single sign-out → Legacy logout

**Benefits:**
- Modernize authentication without rewriting apps
- Gradual migration path
- Consistent user experience
- Reduced development cost

## Security Features

### 1. Password Security

**Password Policies:**
- Minimum length (default: 12 characters)
- Complexity requirements (uppercase, lowercase, numbers, special chars)
- Password history (prevent reuse)
- Expiration policies
- Hashing with PBKDF2, BCrypt, or Argon2

**Brute Force Protection:**
- Account lockout after failed attempts
- Temporary lockout duration
- CAPTCHA after failed attempts
- IP-based rate limiting

### 2. Token Security

**Token Types:**
- Access tokens (short-lived, 5-15 minutes)
- Refresh tokens (long-lived, days/weeks)
- ID tokens (user identity)
- Offline tokens (long-term access)

**Token Validation:**
- JWT signature verification
- Token expiration checks
- Issuer validation
- Audience validation
- Revocation lists

### 3. Session Security

**Session Management:**
- Secure cookie flags (HttpOnly, Secure, SameSite)
- Session fixation protection
- Concurrent session limits
- Remember me functionality
- Single sign-out

**Attack Prevention:**
- CSRF protection
- Clickjacking protection
- XSS prevention
- Replay attack prevention

### 4. Audit and Compliance

**Event Logging:**
- Login events (success/failure)
- Logout events
- Password changes
- Role assignments
- Authorization decisions

**Compliance Features:**
- GDPR consent tracking
- Data export functionality
- Right to be forgotten
- Audit report generation
- Custom event listeners

## Best Practices

### 1. Realm Design

**Separate Realms For:**
- Different environments (dev, staging, prod)
- Different customer organizations (multi-tenant)
- Different security requirements
- Different user directories

**Realm Naming:**
- Use descriptive, DNS-compatible names
- Include environment: `tenant1-prod`, `tenant2-staging`
- Avoid spaces and special characters

### 2. Client Configuration

**Client Types:**
- `public` - SPAs, mobile apps (no secret)
- `confidential` - Web apps, APIs (has secret)
- `bearer-only` - APIs that only validate tokens

**Access Type:**
- `confidential` - Requires client secret
- `public` - No client secret (mobile/native apps)
- `bearer-only` - Service-to-service only

**Standard Flow:**
- Enable for web applications
- Disable for service accounts
- Configure redirect URIs carefully

### 3. Role Management

**Role Design:**
- Use realm roles for cross-client permissions
- Use client roles for application-specific permissions
- Create composite roles for hierarchies
- Document role permissions

**Role Naming:**
- Use naming convention: `resource:action`
- Examples: `users:read`, `users:write`, `users:delete`
- Group related roles with prefixes

### 4. Token Management

**Token Lifetimes:**
- Access tokens: 5-15 minutes
- Refresh tokens: 1 day - 30 days
- ID tokens: Same as access tokens
- Offline tokens: As long as needed

**Token Size:**
- Minimize claims in access tokens
- Use protocol mappers efficiently
- Consider token size limits (HTTP headers)

### 5. Security Hardening

**HTTPS:**
- Always use HTTPS in production
- Configure proper SSL/TLS certificates
- Enable HSTS headers
- Disable HTTP in production

**CORS:**
- Configure allowed origins carefully
- Use specific origins, not `*`
- Include credentials when needed

**Password Policies:**
- Enforce strong passwords
- Require regular changes
- Implement password history
- Enable account lockout

## Common Implementations

### Implementation 1: Spring Boot Application

**Dependency:**
```xml
<dependency>
    <groupId>org.keycloak</groupId>
    <artifactId>keycloak-spring-boot-starter</artifactId>
</dependency>
```

**Configuration:**
```yaml
keycloak:
  auth-server-url: http://localhost:8080
  realm: myrealm
  resource: my-client
  credentials:
    secret: my-client-secret
  security-constraints:
    - auth-roles:
        - user
      security-collections:
        - patterns:
            - /api/*
```

**Controller:**
```java
@GetMapping("/api/public")
public String publicEndpoint() {
    return "Public access";
}

@GetMapping("/api/protected")
@RolesAllowed("user")
public String protectedEndpoint() {
    return "Protected access";
}
```

### Implementation 2: NestJS Application

**Installation:**
```bash
npm install --save nest-keycloak-connect
```

**Module:**
```typescript
import { Module } from '@nestjs/common';
import { KeycloakConnectModule } from 'nest-keycloak-connect';

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080',
      realm: 'myrealm',
      clientId: 'my-client',
      secret: 'my-client-secret',
    }),
  ],
})
export class AppModule {}
```

**Controller:**
```typescript
import { Controller, Get } from '@nestjs/common';
import { AuthGuard, Roles, Resource } from 'nest-keycloak-connect';

@Controller('api')
@UseGuards(AuthGuard)
export class ApiController {
  @Get('public')
  publicEndpoint() {
    return 'Public access';
  }

  @Get('protected')
  @Roles({ roles: ['user'] })
  protectedEndpoint() {
    return 'Protected access';
  }
}
```

### Implementation 3: React Application

**Installation:**
```bash
npm install keycloak-js
```

**Configuration:**
```typescript
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'myrealm',
  clientId: 'my-client',
});

export default keycloak;
```

**Usage:**
```typescript
import { useEffect, useState } from 'react';
import keycloak from './keycloak';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    keycloak.init({ onLoad: 'login-required' }).then((auth) => {
      setAuthenticated(auth);
    });
  }, []);

  if (!authenticated) return <div>Loading...</div>;

  return <div>Welcome!</div>;
}
```

### Implementation 4: Node.js API with Express

**Installation:**
```bash
npm install express keycloak-connect
```

**Configuration:**
```javascript
const express = require('express');
const Keycloak = require('keycloak-connect');

const app = express();
const keycloak = new Keycloak({}, {
  'auth-server-url': 'http://localhost:8080',
  'realm': 'myrealm',
  'resource': 'my-client',
  'bearer-only': true
});

app.use(keycloak.middleware());

app.get('/public', (req, res) => {
  res.json({ message: 'Public endpoint' });
});

app.get('/protected', keycloak.protect(), (req, res) => {
  res.json({ message: 'Protected endpoint' });
});

app.listen(3000);
```

## Conclusion

Keycloak provides a comprehensive IAM solution for modern applications. Its flexibility and standards-based approach make it suitable for:

- Small to enterprise-scale applications
- Multi-tenant SaaS platforms
- Microservices architectures
- Legacy system modernization
- Mobile and web applications
- API security

By leveraging Keycloak's features effectively, you can:
- Reduce development time
- Improve security posture
- Enhance user experience
- Meet compliance requirements
- Scale your authentication infrastructure

For more information, visit:
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Keycloak GitHub](https://github.com/keycloak/keycloak)
- [Community Forums](https://groups.google.com/g/keycloak-user)
