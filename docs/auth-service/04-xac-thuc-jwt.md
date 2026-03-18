# Phần 4: JWT Authentication Flow

## 📋 Mục tiêu phần này

Hiểu được:
- ✅ JWT token structure và lifecycle
- ✅ Sign up, Sign in flow
- ✅ Access token vs Refresh token
- ✅ Token validation và refresh mechanism

---

## 🔐 4.1 JWT Overview

### JWT là gì?

```
┌─────────────────────────────────────────────────────────┐
│                  JWT Structure                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  JWT = JSON Web Token                                   │
│                                                          │
│  Format:  header.payload.signature                      │
│                                                          │
│  ┌──────────────┬───────────────────┬─────────────────┐ │
│  │   HEADER     │      PAYLOAD      │    SIGNATURE    │ │
│  ├──────────────┼───────────────────┼─────────────────┤ │
│  │ {           │ {                 │ HMACSHA256(     │ │
│  │   "alg":    │   "sub": "uuid",  │   base64Url(    │ │
│  │   "typ":    │   "email": "...", │   header        │ │
│  │   "JWT"     │   "exp": 12345    │ ) + "." +       │ │
│  │ }           │ }                 │ base64Url(      │ │
│  │             │                   │ payload         │ │
│  │             │                   │ )               │ │
│  └──────────────┴───────────────────┴─────────────────┘ │
│                                                          │
│  Signature = Secret-based verification                  │
│  (Server chỉ verify, không decrypt)                     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Access Token vs Refresh Token

```
┌─────────────────────────────────────────────────────────┐
│              Access Token vs Refresh Token              │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ACCESS TOKEN                    REFRESH TOKEN          │
│  ─────────────                   ──────────────         │
│  Lifetime: ~1 hour               Lifetime: ~7 days      │
│  Contains: User info             Contains: User info    │
│  Usage: API requests             Usage: Get new access  │
│  Storage: Memory (Browser)       Storage: HttpOnly     │
│                                   cookie / LocalStorage│
│  Validation: JWT signature       Validation: DB +      │
│  only                            signature             │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📝 4.2 JWT Payload Structure

### JwtPayloadDto Interface

```typescript
// libs/auth-utilities/src/index.ts
export interface JwtPayloadDto {
  sub: string;          // User ID (UUID) - "Subject"
  email: string;        // User email
  first_name?: string;  // First name (optional)
  last_name?: string;   // Last name (optional)
  roles?: string[];     // User roles (optional, future)
  iat: number;          // Issued At - Unix timestamp
  exp: number;          // Expiration - Unix timestamp
}
```

### Example Decoded Token

```json
{
  "sub": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "iat": 1710700800,
  "exp": 1710704400
}
```

**Decode JWT**:
```bash
# Decode JWT payload
echo "your-token-here" | jq -R 'split(".") | .[1] | @base64d | fromjson'
```

---

## 🔄 4.3 Authentication Flows

### Sign Up Flow

```
┌──────────┐      ┌──────────────┐      ┌─────────────┐
│  Client  │─────▶│ Auth Service │─────▶│  Database   │
│          │      │   /signup    │      │   auth_db   │
└──────────┘      └──────────────┘      └─────────────┘
    │                      │                      │
    │ 1. POST /signup     │                      │
    │    {                │                      │
    │      "email":       │                      │
    │      "password":    │                      │
    │      "first_name":  │                      │
    │      "last_name":   │                      │
    │    }                │                      │
    │                      │                      │
    │                      │ 2. Check email       │
    │                      │    exists?           │
    │                      │                      │
    │                      │ 3. Hash password     │
    │                      │    bcrypt(10)        │
    │                      │                      │
    │                      │ 4. Create user       │
    │                      │                      │
    │                      │    INSERT INTO       │
    │                      │    user_entity       │
    │                      │                      │
    │◀─────────────────────│ 5. Return user       │
    │    {                │    profile            │
    │      "id":          │                      │
    │      "email":       │
    │      "is_active":   │
    │      ...            │
    │    }                │                      │
```

**Code**:
```typescript
// apps/auth/src/auth/auth.service.ts
@LogActivity()
async signUp(signUpDto: SignUpDto): Promise<SignupResponseDto> {
  const { email, password, first_name, last_name } = signUpDto;

  // 1. Check existing user
  const existingUser = await this.prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ConflictException('User with this email already exists');
  }

  // 2. Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // 3. Create user
  const user = await this.prisma.user.create({
    data: {
      email,
      password_hash: passwordHash,
      first_name,
      last_name,
      is_active: true,
      email_verified: false,
    },
    select: {
      id: true,
      email: true,
      first_name: true,
      last_name: true,
      is_active: true,
      email_verified: true,
      created_at: true,
      updated_at: true,
    },
  });

  return user;
}
```

### Sign In Flow

```
┌──────────┐      ┌──────────────┐      ┌─────────────┐      ┌─────────────┐
│  Client  │─────▶│ Auth Service │─────▶│  Database   │─────▶│   bcrypt    │
│          │      │   /signin    │      │   auth_db   │      │ comparison  │
└──────────┘      └──────────────┘      └─────────────┘      └─────────────┘
    │                      │                      │                      │
    │ 1. POST /signin     │                      │                      │
    │    {                │                      │                      │
    │      "email":       │                      │                      │
    │      "password":    │                      │                      │
    │    }                │                      │                      │
    │                      │                      │                      │
    │                      │ 2. Find user by     │                      │
    │                      │    email            │                      │
    │                      │                      │                      │
    │                      │ 3. Get user +       │                      │
    │                      │    password_hash    │                      │
    │                      │                      │                      │
    │                      │ 4. Compare password │─────────────▶         │
    │                      │    bcrypt.compare(  │                      │
    │                      │    password, hash)  │                      │
    │                      │                      │                      │
    │                      │ 5. Check user       │                      │
    │                      │    active?          │                      │
    │                      │                      │                      │
    │                      │ 6. Generate JWT:    │                      │
    │                      │    - Access Token   │                      │
    │                      │    - Refresh Token  │                      │
    │                      │                      │                      │
    │                      │ 7. Store refresh    │                      │
    │                      │    token in DB      │                      │
    │                      │                      │                      │
    │◀─────────────────────│ 8. Return tokens    │                      │
    │    {                │                      │                      │
    │      "access_token": │                      │
    │      "refresh_token":│                      │
    │      "token_type":   │                      │
    │      "expires_in":   │                      │
    │    }                │                      │
```

**Code**:
```typescript
@LogActivity()
async signIn(signInDto: SignInDto): Promise<TokenResponseDto> {
  const { email, password } = signInDto;

  // 1. Find user
  const user = await this.prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  // 2. Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid credentials');
  }

  // 3. Check user active
  if (!user.is_active) {
    throw new UnauthorizedException('User account is inactive');
  }

  // 4. Generate tokens
  const tokens = await this.generateTokens(
    user.id,
    user.email,
    user.first_name,
    user.last_name,
  );

  return tokens;
}
```

### Token Generation

```typescript
private async generateTokens(
  userId: string,
  email: string,
  first_name?: string,
  last_name?: string,
): Promise<TokenResponseDto> {
  const payload = {
    sub: userId,
    email,
    first_name,
    last_name,
  };

  // Generate Access Token (1 hour)
  const accessToken = await this.jwtService.signAsync(payload, {
    secret: process.env.JWT_SECRET,
    expiresIn: (process.env.JWT_EXPIRES_IN || '1h') as any,
  });

  // Generate Refresh Token (7 days)
  const refreshToken = await this.jwtService.signAsync(payload, {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any,
  });

  // Store refresh token in database
  const refreshTokenExpiry = new Date();
  refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 7);

  await this.prisma.refresh_token.create({
    data: {
      token: refreshToken,
      user_id: userId,
      expires_at: refreshTokenExpiry,
    },
  });

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    token_type: 'Bearer',
    expires_in: 3600, // 1 hour in seconds
  };
}
```

---

## 🔄 4.4 Token Refresh Flow

```
┌──────────┐      ┌──────────────┐      ┌─────────────┐
│  Client  │─────▶│ Auth Service │─────▶│  Database   │
│          │      │   /refresh   │      │   auth_db   │
└──────────┘      └──────────────┘      └─────────────┘
    │                      │                      │
    │ 1. POST /refresh    │                      │
    │    {                │                      │
    │      "refreshToken"│                      │
    │    }                │                      │
    │                      │                      │
    │                      │ 2. Verify JWT       │
    │                      │    signature        │
    │                      │                      │
    │                      │ 3. Find refresh     │
    │                      │    token in DB      │
    │                      │                      │
    │                      │ 4. Check:           │
    │                      │    - Not revoked?   │
    │                      │    - Not expired?   │
    │                      │    - User active?   │
    │                      │                      │
    │                      │ 5. Revoke old       │
    │                      │    refresh token    │
    │                      │                      │
    │                      │ 6. Generate new     │
    │                      │    tokens           │
    │                      │                      │
    │◀─────────────────────│ 7. Return new       │
    │    {                │    tokens            │
    │      "access_token": │                      │
    │      "refresh_token":│                      │
    │      ...             │                      │
    │    }                │                      │
```

**Code**:
```typescript
async refreshAccessToken(refreshToken: string): Promise<TokenResponseDto> {
  // 1. Verify JWT signature
  let payload;
  try {
    payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
  } catch {
    throw new UnauthorizedException('Invalid refresh token');
  }

  // 2. Check refresh token exists in DB
  const storedToken = await this.prisma.refresh_token.findUnique({
    where: { token: refreshToken },
    include: { user: true },
  });

  if (!storedToken || storedToken.revoked_at) {
    throw new UnauthorizedException('Invalid refresh token');
  }

  // 3. Check token expired
  if (storedToken.expires_at < new Date()) {
    throw new UnauthorizedException('Refresh token expired');
  }

  // 4. Check user active
  if (!storedToken.user.is_active) {
    throw new UnauthorizedException('User account is inactive');
  }

  // 5. Revoke old refresh token
  await this.prisma.refresh_token.update({
    where: { id: storedToken.id },
    data: { revoked_at: new Date() },
  });

  // 6. Generate new tokens
  return this.generateTokens(
    payload.sub,
    storedToken.user.email,
    storedToken.user.first_name,
    storedToken.user.last_name,
  );
}
```

---

## 🚪 4.5 Logout Flow

```
┌──────────┐      ┌──────────────┐      ┌─────────────┐
│  Client  │─────▶│ Auth Service │─────▶│  Database   │
│          │      │   /logout    │      │   auth_db   │
└──────────┘      └──────────────┘      └─────────────┘
    │                      │                      │
    │ 1. POST /logout      │                      │
    │    {                │                      │
    │      "refreshToken" │                      │
    │    }                │                      │
    │                      │                      │
    │                      │ 2. Mark refresh     │
    │                      │    token as revoked  │
    │                      │                      │
    │                      │    UPDATE            │
    │                      │    refresh_token     │
    │                      │    SET revoked_at    │
    │                      │    = NOW()           │
    │                      │                      │
    │◀─────────────────────│ 3. Return 200 OK     │
    │                      │                      │
```

**Code**:
```typescript
async logout(refreshToken: string): Promise<void> {
  await this.prisma.refresh_token.updateMany({
    where: { token: refreshToken },
    data: { revoked_at: new Date() },
  });
}
```

---

## 🛡️ 4.6 JWT Guard & Strategy

### JWT Strategy

```typescript
// apps/auth/src/auth/strategies/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    if (!payload.sub) {
      throw new UnauthorizedException();
    }

    return {
      sub: payload.sub,
      email: payload.email,
      first_name: payload.first_name,
      last_name: payload.last_name,
    };
  }
}
```

### JWT Auth Guard

```typescript
// libs/auth-utilities/src/guards/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

### Usage in Controller

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, AuthUser, JwtPayloadDto } from '@app/auth-utilities';

@Controller('users')
export class UsersController {
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()  // Swagger documentation
  async getProfile(@AuthUser() user: JwtPayloadDto) {
    // user contains JWT payload - NO DB lookup!
    return {
      user_id: user.sub,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };
  }
}
```

---

## 🔑 4.7 @AuthUser() Decorator

### Purpose

Trích xuất JWT payload từ request - không cần DB lookup!

```typescript
// libs/auth-utilities/src/index.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayloadDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as JwtPayloadDto;
  },
);
```

### Usage Examples

```typescript
// Get full user payload
@Get('profile')
@UseGuards(JwtAuthGuard)
async getProfile(@AuthUser() user: JwtPayloadDto) {
  // user = { sub, email, first_name, last_name, iat, exp }
  return user;
}

// Get specific field
@Get('email')
@UseGuards(JwtAuthGuard)
async getEmail(@AuthUser('email') email: string) {
  return { email };
}
```

---

## 🔒 4.8 Password Hashing

### bcrypt Configuration

```typescript
// Hash password (sign up)
const passwordHash = await bcrypt.hash(password, 10);

// Verify password (sign in)
const isPasswordValid = await bcrypt.compare(password, user.password_hash);
```

### Salt Rounds

```
┌─────────────────────────────────────────────────────────┐
│                 bcrypt Salt Rounds                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  4:   Fast, but weak (~0.02s)                           │
│  8:   Moderate (default) (~0.2s)                        │
│  10:  Good balance (~0.5s)  ← CURRENT                  │
│  12:  Strong (~1.5s)                                    │
│  14:  Very strong (~3s)                                 │
│                                                          │
│  Tradeoff: Security vs Performance                     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Why bcrypt?

- ✅ Automatic salt generation
- ✅ Adaptive cost factor
- ✅ Slow hash (brute-force resistant)
- ✅ Battle-tested algorithm

---

## 🌐 4.9 Token Usage in Frontend

### Store Tokens

```typescript
// After sign in
const response = await fetch('/auth/signin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});

const { access_token, refresh_token } = await response.json();

// Store access token in memory (Redux, Zustand, etc.)
setAccessToken(access_token);

// Store refresh token in httpOnly cookie (server sets)
// OR localStorage for SPA
localStorage.setItem('refresh_token', refresh_token);
```

### Use Access Token

```typescript
// Include in Authorization header
const response = await fetch('/auth/profile', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
  },
});
```

### Refresh Access Token

```typescript
// When access token expires
const refreshToken = localStorage.getItem('refresh_token');

const response = await fetch('/auth/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refreshToken }),
});

const { access_token, refresh_token: newRefreshToken } = await response.json();

// Update tokens
setAccessToken(access_token);
localStorage.setItem('refresh_token', newRefreshToken);
```

---

## ❓ FAQ

### Q1: Access token expired phải làm sao?

**A**: Client tự động gọi `/auth/refresh` để lấy access token mới:
```typescript
// Axios interceptor example
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Refresh token
      const newToken = await refreshAccessToken();
      // Retry original request
      error.config.headers['Authorization'] = `Bearer ${newToken}`;
      return axios(error.config);
    }
    return Promise.reject(error);
  }
);
```

### Q2: Refresh token bị mất thì sao?

**A**: User phải đăng nhập lại:
- Không thể recover refresh token (đó là lý do expired lâu)
- User phải sign in lại

### Q3: Tại sao validate JWT không cần DB?

**A**: JWT signature đảm bảo:
- Token chưa bị thay đổi (tamper-proof)
- Secret chỉ server biết
- Chỉ cần verify signature, không cần lookup

**Payload verification**:
```typescript
// Server side
const payload = await jwt.verify(token, JWT_SECRET);
// ↑ No DB query!
```

### Q4: Token bị lộ thì sao?

**A**:
- **Access Token (1h)**: Risk limited bởi short lifetime
- **Refresh Token (7d)**: Có thể revoke trong DB

**Best practices**:
- Use HTTPS
- HttpOnly cookies cho refresh token
- Implement token rotation

---

## 🎯 Summary

### Key Points

1. ✅ **JWT Access Token** chứa user info, validate không cần DB
2. ✅ **Refresh Token** lưu trong DB để revoke và refresh
3. ✅ **Password hashing** với bcrypt (salt rounds: 10)
4. ✅ **@AuthUser() decorator** trích xuất payload từ JWT
5. ✅ **Guards** bảo vệ endpoints

### Authentication Flow Summary

```
Sign Up
  ↓
Hash password (bcrypt)
  ↓
Create user in DB
  ↓
Return user profile

Sign In
  ↓
Verify password
  ↓
Generate JWT tokens
  ↓
Store refresh token in DB
  ↓
Return tokens

Use API
  ↓
Include Authorization header
  ↓
JWT Guard validates signature
  ↓
@AuthUser() extracts payload
  ↓
No DB lookup!

Refresh
  ↓
Verify + check DB
  ↓
Revoke old token
  ↓
Generate new tokens
```

### Next Steps

- **[Phần 5: User Management](./05-quan-ly-user.md)** - CRUD operations cho users

---

**Document Version**: 1.0.0
**Last Updated**: 2025-03-18
