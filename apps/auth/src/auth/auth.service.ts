import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { hashPassword, verifyPassword } from '@app/auth-utilities';
import { LogActivity } from '@app/app-logger';
import { SignUpDto, SignInDto } from './dto';
import { AuthResponseDto, UserResponseDto } from './dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;
  private readonly accessTokenLifetime = 3600; // 1 hour in seconds
  private readonly refreshTokenLifetime = 2592000; // 30 days in seconds

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>(
      'JWT_SECRET',
      'your-jwt-secret-key',
    );
    this.jwtExpiresIn = this.configService.get<string>('JWT_EXPIRES_IN', '1h');
  }

  async signup(dto: SignUpDto): Promise<AuthResponseDto> {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: { id: true },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const passwordHash = hashPassword(dto.password);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password_hash: passwordHash,
        first_name: dto.first_name,
        last_name: dto.last_name,
        role: 'USER',
        user_type: dto.user_type ?? 'PERSONAL',
        is_active: true,
        email_verified: false,
      },
    });

    this.logger.log(`User created: ${user.id}`);

    // Generate tokens
    return this.generateAuthResponse(user.id, user.email);
  }

  async signin(dto: SignInDto): Promise<AuthResponseDto> {
    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (!user.is_active) {
      throw new UnauthorizedException('Account is disabled');
    }

    // Verify password
    const isPasswordValid = verifyPassword(dto.password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.log(`User signed in: ${user.id}`);

    // Generate tokens
    return this.generateAuthResponse(user.id, user.email);
  }

  async getProfile(userId: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        role: true,
        is_active: true,
        created_at: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  @LogActivity()
  async upgradeUser(
    userId: string,
    userType: 'PERSONAL' | 'BUSINESS',
  ): Promise<{ user_id: string; user_type: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, user_type: true },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.user_type === 'BUSINESS') {
      throw new BadRequestException('User is already a BUSINESS user');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { user_type: userType },
    });

    this.logger.log(`User ${userId} upgraded to ${userType}`);

    return { user_id: userId, user_type: userType };
  }

  private async generateAuthResponse(
    userId: string,
    email: string,
  ): Promise<AuthResponseDto> {
    // Get user for token generation
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        role: true,
        user_type: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Get user's organizations (only for BUSINESS users)
    let organizations: { id: string; display_id: string; name: string; role: string }[] = [];
    if (user.user_type === 'BUSINESS') {
      const memberships = await this.prisma.userOrganization.findMany({
        where: {
          user_id: userId,
          deleted_at: null,
          is_active: true,
        },
        select: {
          organization_id: true,
          organization_role: true,
        },
      });

      if (memberships.length > 0) {
        const orgIds = memberships.map(m => m.organization_id);
        const orgs = await this.prisma.organization.findMany({
          where: {
            id: { in: orgIds },
            deleted_at: null,
            is_active: true,
          },
          select: {
            id: true,
            display_id: true,
            name: true,
          },
        });

        organizations = memberships.map(m => {
          const org = orgs.find(o => o.id === m.organization_id);
          return {
            id: m.organization_id,
            display_id: org?.display_id ?? '',
            name: org?.name ?? '',
            role: m.organization_role,
          };
        });
      }
    }

    // Generate access token (JWT)
    const accessToken = this.generateJwt({
      sub: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      user_type: user.user_type as 'PERSONAL' | 'BUSINESS',
      roles: [user.role],
      organizations: organizations.length > 0 ? organizations : undefined,
    });

    // Generate refresh token
    const refreshToken = randomBytes(32).toString('base64url');
    const refreshTokenExpiresAt = new Date(
      Date.now() + this.refreshTokenLifetime * 1000,
    );

    // Store refresh token in database
    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        user_id: user.id,
        expires_at: refreshTokenExpiresAt,
      },
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'Bearer',
      expires_in: this.accessTokenLifetime,
    };
  }

  private generateJwt(payload: {
    sub: string;
    email: string;
    first_name?: string | null;
    last_name?: string | null;
    user_type: 'PERSONAL' | 'BUSINESS';
    roles: string[];
    organizations?: {
      id: string;
      display_id: string;
      name: string;
      role: string;
    }[];
  }): string {
    const now = Math.floor(Date.now() / 1000);
    const expiresIn = this.parseExpirationTime(this.jwtExpiresIn);

    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    const tokenPayload = {
      sub: payload.sub,
      email: payload.email,
      first_name: payload.first_name,
      last_name: payload.last_name,
      user_type: payload.user_type,
      roles: payload.roles,
      ...(payload.organizations && payload.organizations.length > 0
        ? { organizations: payload.organizations }
        : {}),
      iat: now,
      exp: now + expiresIn,
    };

    const encodedHeader = this.base64url(JSON.stringify(header));
    const encodedPayload = this.base64url(JSON.stringify(tokenPayload));
    const signatureData = `${encodedHeader}.${encodedPayload}`;
    const signature = this.signHMACSHA256(signatureData, this.jwtSecret);

    return `${signatureData}.${signature}`;
  }

  private base64url(source: string): string {
    let encoded = Buffer.from(source).toString('base64');
    encoded = encoded.replace(/=+$/, '');
    encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_');
    return encoded;
  }

  private signHMACSHA256(data: string, secret: string): string {
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(data);
    const digest = hmac.digest('base64');
    return digest.replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
  }

  private parseExpirationTime(exp: string): number {
    const match = exp.match(/^(\d+)([smhd])$/);
    if (!match) {
      return 3600;
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case 's':
        return value;
      case 'm':
        return value * 60;
      case 'h':
        return value * 60 * 60;
      case 'd':
        return value * 24 * 60 * 60;
      default:
        return 3600;
    }
  }
}