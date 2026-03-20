import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomBytes, createHash } from 'crypto';
import { TOKEN_LIFETIMES, CODE_CHALLENGE_METHODS } from './oauth.constants';

@Injectable()
export class AuthorizationService {
  private readonly logger = new Logger(AuthorizationService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Generate an authorization code
   */
  async generateAuthorizationCode(data: {
    client_id: string;
    user_id: string;
    redirect_uri: string;
    scope: string;
    state?: string;
    code_challenge?: string;
    code_challenge_method?: string;
    nonce?: string;
  }): Promise<string> {
    // Generate a cryptographically random authorization code
    const code = randomBytes(32).toString('base64url');

    const expiresAt = new Date(Date.now() + TOKEN_LIFETIMES.AUTHORIZATION_CODE * 1000);

    // Get the client ID from database
    const client = await this.prisma.oAuthClient.findUnique({
      where: { client_id: data.client_id },
      select: { id: true },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    await this.prisma.oAuthAuthorizationCode.create({
      data: {
        code,
        client_id: client.id,
        user_id: data.user_id,
        redirect_uri: data.redirect_uri,
        scope: data.scope,
        state: data.state,
        code_challenge: data.code_challenge,
        code_challenge_method: data.code_challenge_method,
        nonce: data.nonce,
        expires_at: expiresAt,
      },
    });

    this.logger.log(`Generated authorization code for user ${data.user_id}, client ${data.client_id}`);

    return code;
  }

  /**
   * Validate and consume an authorization code
   */
  async validateAndConsumeAuthorizationCode(data: {
    code: string;
    client_id: string;
    redirect_uri: string;
    code_verifier?: string;
  }): Promise<{
    user_id: string;
    scope: string;
    nonce?: string;
  }> {
    // Get the client ID from database
    const client = await this.prisma.oAuthClient.findUnique({
      where: { client_id: data.client_id },
      select: { id: true, require_pkce: true, is_public_client: true },
    });

    if (!client) {
      throw new BadRequestException('Invalid client');
    }

    // Find the authorization code
    const authCode = await this.prisma.oAuthAuthorizationCode.findUnique({
      where: { code: data.code },
    });

    if (!authCode) {
      throw new BadRequestException('Invalid authorization code');
    }

    // Check if already consumed
    if (authCode.consumed_at) {
      throw new BadRequestException('Authorization code already used');
    }

    // Check expiration
    if (authCode.expires_at < new Date()) {
      throw new BadRequestException('Authorization code expired');
    }

    // Verify client_id matches
    if (authCode.client_id !== client.id) {
      throw new BadRequestException('Client mismatch');
    }

    // Verify redirect_uri matches
    if (authCode.redirect_uri !== data.redirect_uri) {
      throw new BadRequestException('Redirect URI mismatch');
    }

    // Verify PKCE if required
    if (authCode.code_challenge) {
      if (!data.code_verifier) {
        throw new BadRequestException('code_verifier required');
      }

      if (!this.verifyCodeChallenge(data.code_verifier, authCode.code_challenge, authCode.code_challenge_method)) {
        throw new BadRequestException('Invalid code_verifier');
      }
    } else if (client.require_pkce && client.is_public_client) {
      // Public clients require PKCE by default
      throw new BadRequestException('PKCE required for this client');
    }

    // Mark as consumed
    await this.prisma.oAuthAuthorizationCode.update({
      where: { id: authCode.id },
      data: { consumed_at: new Date() },
    });

    this.logger.log(`Consumed authorization code for user ${authCode.user_id}`);

    return {
      user_id: authCode.user_id!,
      scope: authCode.scope,
      nonce: authCode.nonce || undefined,
    };
  }

  /**
   * Verify PKCE code challenge
   */
  private verifyCodeChallenge(
    codeVerifier: string,
    codeChallenge: string,
    method?: string | null
  ): boolean {
    let expectedChallenge: string;

    if (method === 'plain' || !method) {
      expectedChallenge = codeVerifier;
    } else if (method === CODE_CHALLENGE_METHODS.S256) {
      expectedChallenge = createHash('sha256')
        .update(codeVerifier)
        .digest('base64url');
    } else {
      throw new BadRequestException('Unsupported code_challenge_method');
    }

    // Constant-time comparison to prevent timing attacks
    return this.constantTimeEqual(expectedChallenge, codeChallenge);
  }

  /**
   * Constant-time string comparison to prevent timing attacks
   */
  private constantTimeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return result === 0;
  }

  /**
   * Clean up expired authorization codes
   */
  async cleanupExpiredCodes(): Promise<number> {
    const result = await this.prisma.oAuthAuthorizationCode.deleteMany({
      where: {
        expires_at: {
          lt: new Date(),
        },
      },
    });

    this.logger.log(`Cleaned up ${result.count} expired authorization codes`);

    return result.count;
  }

  /**
   * Get active authorization codes for a user
   */
  async getUserAuthorizationCodes(userId: string) {
    return this.prisma.oAuthAuthorizationCode.findMany({
      where: {
        user_id: userId,
        consumed_at: null,
        expires_at: {
          gt: new Date(),
        },
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
    });
  }
}
