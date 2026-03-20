import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { randomBytes, createHmac } from 'crypto';
import { JwtPayloadDto } from '@app/auth-utilities';
import { TOKEN_LIFETIMES, TOKEN_TYPES } from './oauth.constants';

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    this.jwtSecret = this.config.get<string>('JWT_SECRET', 'your-jwt-secret-key');
    this.jwtExpiresIn = this.config.get<string>('JWT_EXPIRES_IN', '1h');
  }

  /**
   * Generate access token (JWT)
   */
  async generateAccessToken(data: {
    user_id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    client_id: string;
    scope: string;
  }): Promise<{ token: string; expires_at: Date }> {
    const now = Math.floor(Date.now() / 1000);
    const expiresIn = this.parseExpirationTime(this.jwtExpiresIn);

    const payload: JwtPayloadDto = {
      sub: data.user_id,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      iat: now,
      exp: now + expiresIn,
    };

    // Create JWT token using native Node.js crypto
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    const encodedHeader = this.base64url(JSON.stringify(header));
    const encodedPayload = this.base64url(JSON.stringify(payload));
    const signatureData = `${encodedHeader}.${encodedPayload}`;
    const signature = this.signHMACSHA256(signatureData, this.jwtSecret);
    const token = `${signatureData}.${signature}`;

    const expiresAt = new Date(Date.now() + expiresIn * 1000);

    // Get client ID from database
    const client = await this.prisma.oAuthClient.findUnique({
      where: { client_id: data.client_id },
      select: { id: true, access_token_lifetime: true },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    // Store access token in database
    const accessTokenExpiresAt = new Date(Date.now() + client.access_token_lifetime * 1000);

    await this.prisma.oAuthAccessToken.create({
      data: {
        token,
        client_id: client.id,
        user_id: data.user_id,
        scope: data.scope,
        token_type: TOKEN_TYPES.BEARER,
        expires_at: accessTokenExpiresAt,
      },
    });

    this.logger.log(`Generated access token for user ${data.user_id}, client ${data.client_id}`);

    return { token, expires_at: accessTokenExpiresAt };
  }

  /**
   * Generate refresh token
   */
  async generateRefreshToken(data: {
    user_id: string;
    client_id: string;
    access_token_id: string;
    scope: string;
  }): Promise<{ token: string; expires_at: Date }> {
    // Generate a cryptographically random refresh token
    const token = randomBytes(32).toString('base64url');

    // Get client from database to determine lifetime
    const client = await this.prisma.oAuthClient.findUnique({
      where: { client_id: data.client_id },
      select: { id: true, refresh_token_lifetime: true },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const expiresAt = new Date(Date.now() + client.refresh_token_lifetime * 1000);

    await this.prisma.oAuthRefreshToken.create({
      data: {
        token,
        access_token_id: data.access_token_id,
        client_id: client.id,
        user_id: data.user_id,
        scope: data.scope,
        expires_at: expiresAt,
      },
    });

    this.logger.log(`Generated refresh token for user ${data.user_id}, client ${data.client_id}`);

    return { token, expires_at: expiresAt };
  }

  /**
   * Validate access token
   */
  async validateAccessToken(token: string): Promise<{
    user_id: string;
    client_id: string;
    scope: string;
    expires_at: Date;
  } | null> {
    const accessToken = await this.prisma.oAuthAccessToken.findUnique({
      where: { token },
    });

    if (!accessToken) {
      return null;
    }

    // Check if revoked
    if (accessToken.revoked_at) {
      return null;
    }

    // Check if expired
    if (accessToken.expires_at < new Date()) {
      return null;
    }

    return {
      user_id: accessToken.user_id || '',
      client_id: accessToken.client_id,
      scope: accessToken.scope,
      expires_at: accessToken.expires_at,
    };
  }

  /**
   * Validate refresh token
   */
  async validateRefreshToken(token: string): Promise<{
    user_id: string;
    client_id: string;
    access_token_id: string;
    scope: string;
  } | null> {
    const refreshToken = await this.prisma.oAuthRefreshToken.findUnique({
      where: { token },
      include: {
        client: true,
      },
    });

    if (!refreshToken) {
      return null;
    }

    // Check if revoked
    if (refreshToken.revoked_at) {
      return null;
    }

    // Check if expired
    if (refreshToken.expires_at < new Date()) {
      return null;
    }

    return {
      user_id: refreshToken.user_id || '',
      client_id: refreshToken.client.client_id,
      access_token_id: refreshToken.access_token_id,
      scope: refreshToken.scope,
    };
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken(data: {
    refresh_token: string;
    client_id: string;
  }): Promise<{
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
  }> {
    // Validate refresh token
    const refreshTokenData = await this.validateRefreshToken(data.refresh_token);

    if (!refreshTokenData) {
      throw new BadRequestException('Invalid or expired refresh token');
    }

    // Verify client_id matches
    if (refreshTokenData.client_id !== data.client_id) {
      throw new BadRequestException('Client mismatch');
    }

    // Get user and client details
    const [user, client] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: refreshTokenData.user_id },
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
        },
      }),
      this.prisma.oAuthClient.findUnique({
        where: { client_id: data.client_id },
        select: { id: true, access_token_lifetime: true },
      }),
    ]);

    if (!user || !client) {
      throw new NotFoundException('User or client not found');
    }

    // Revoke old tokens
    await Promise.all([
      this.prisma.oAuthAccessToken.updateMany({
        where: { id: refreshTokenData.access_token_id },
        data: { revoked_at: new Date() },
      }),
      this.prisma.oAuthRefreshToken.updateMany({
        where: { token: data.refresh_token },
        data: { revoked_at: new Date() },
      }),
    ]);

    // Generate new access token
    const { token: accessToken, expires_at: accessTokenExpires } =
      await this.generateAccessToken({
        user_id: user.id,
        email: user.email,
        first_name: user.first_name || undefined,
        last_name: user.last_name || undefined,
        client_id: data.client_id,
        scope: refreshTokenData.scope,
      });

    // Get the new access token ID
    const newAccessToken = await this.prisma.oAuthAccessToken.findUnique({
      where: { token: accessToken },
      select: { id: true },
    });

    if (!newAccessToken) {
      throw new BadRequestException('Failed to create access token');
    }

    // Generate new refresh token
    const { token: newRefreshToken } = await this.generateRefreshToken({
      user_id: user.id,
      client_id: data.client_id,
      access_token_id: newAccessToken.id,
      scope: refreshTokenData.scope,
    });

    const expiresIn = Math.floor((accessTokenExpires.getTime() - Date.now()) / 1000);

    return {
      access_token: accessToken,
      refresh_token: newRefreshToken,
      token_type: TOKEN_TYPES.BEARER,
      expires_in: expiresIn,
      scope: refreshTokenData.scope,
    };
  }

  /**
   * Revoke a token
   */
  async revokeToken(data: {
    token: string;
    token_type_hint?: string;
  }): Promise<void> {
    const { token, token_type_hint } = data;

    // Try to find and revoke the token
    let revoked = false;

    if (token_type_hint === 'refresh_token' || !token_type_hint) {
      const refreshToken = await this.prisma.oAuthRefreshToken.findUnique({
        where: { token },
      });

      if (refreshToken && !refreshToken.revoked_at) {
        await this.prisma.oAuthRefreshToken.update({
          where: { id: refreshToken.id },
          data: { revoked_at: new Date() },
        });
        revoked = true;
      }
    }

    if (!revoked && (token_type_hint === 'access_token' || !token_type_hint)) {
      const accessToken = await this.prisma.oAuthAccessToken.findUnique({
        where: { token },
      });

      if (accessToken && !accessToken.revoked_at) {
        await this.prisma.oAuthAccessToken.update({
          where: { id: accessToken.id },
          data: { revoked_at: new Date() },
        });
        revoked = true;
      }
    }

    this.logger.log(`Token revoked: ${token.substring(0, 10)}...`);
  }

  /**
   * Introspect token (RFC 7662)
   */
  async introspectToken(data: {
    token: string;
    token_type_hint?: string;
  }): Promise<{
    active: boolean;
    scope?: string;
    client_id?: string;
    user_id?: string;
    exp?: number;
  }> {
    // Try access token first
    const accessToken = await this.prisma.oAuthAccessToken.findUnique({
      where: { token: data.token },
      include: { client: true },
    });

    if (accessToken) {
      const isActive =
        !accessToken.revoked_at && accessToken.expires_at > new Date();

      return {
        active: isActive,
        scope: accessToken.scope,
        client_id: accessToken.client.client_id,
        user_id: accessToken.user_id || undefined,
        exp: Math.floor(accessToken.expires_at.getTime() / 1000),
      };
    }

    // Try refresh token
    const refreshToken = await this.prisma.oAuthRefreshToken.findUnique({
      where: { token: data.token },
      include: { client: true },
    });

    if (refreshToken) {
      const isActive =
        !refreshToken.revoked_at && refreshToken.expires_at > new Date();

      return {
        active: isActive,
        scope: refreshToken.scope,
        client_id: refreshToken.client.client_id,
        user_id: refreshToken.user_id || undefined,
        exp: Math.floor(refreshToken.expires_at.getTime() / 1000),
      };
    }

    return { active: false };
  }

  /**
   * Clean up expired tokens
   */
  async cleanupExpiredTokens(): Promise<{
    access_tokens: number;
    refresh_tokens: number;
  }> {
    const [accessTokens, refreshTokens] = await Promise.all([
      this.prisma.oAuthAccessToken.deleteMany({
        where: {
          expires_at: { lt: new Date() },
        },
      }),
      this.prisma.oAuthRefreshToken.deleteMany({
        where: {
          expires_at: { lt: new Date() },
        },
      }),
    ]);

    this.logger.log(
      `Cleaned up ${accessTokens.count} access tokens and ${refreshTokens.count} refresh tokens`,
    );

    return {
      access_tokens: accessTokens.count,
      refresh_tokens: refreshTokens.count,
    };
  }

  /**
   * Get active tokens for a user
   */
  async getUserTokens(userId: string) {
    const [accessTokens, refreshTokens] = await Promise.all([
      this.prisma.oAuthAccessToken.findMany({
        where: {
          user_id: userId,
          revoked_at: null,
          expires_at: { gt: new Date() },
        },
        include: {
          client: {
            select: {
              name: true,
              client_id: true,
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      }),
      this.prisma.oAuthRefreshToken.findMany({
        where: {
          user_id: userId,
          revoked_at: null,
          expires_at: { gt: new Date() },
        },
        include: {
          client: {
            select: {
              name: true,
              client_id: true,
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      }),
    ]);

    return {
      access_tokens: accessTokens,
      refresh_tokens: refreshTokens,
    };
  }

  /**
   * Base64URL encode a string
   */
  private base64url(source: string): string {
    // Convert to base64
    let encoded = Buffer.from(source).toString('base64');
    // Remove padding
    encoded = encoded.replace(/=+$/, '');
    // Replace + and /
    encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_');
    return encoded;
  }

  /**
   * Sign with HMAC SHA256
   */
  private signHMACSHA256(data: string, secret: string): string {
    const hmac = createHmac('sha256', secret);
    hmac.update(data);
    const digest = hmac.digest('base64');
    // Convert to base64url format
    return digest.replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
  }

  /**
   * Parse expiration time (e.g., "1h", "30m", "7d") to seconds
   */
  private parseExpirationTime(exp: string): number {
    const match = exp.match(/^(\d+)([smhd])$/);
    if (!match) {
      // Default to 1 hour (3600 seconds)
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
