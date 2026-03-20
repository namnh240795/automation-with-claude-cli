import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomBytes } from 'crypto';
import { TOKEN_LIFETIMES } from './oauth.constants';

@Injectable()
export class DeviceFlowService {
  private readonly logger = new Logger(DeviceFlowService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Generate device code and user code for device authorization flow
   */
  async generateDeviceCode(data: {
    client_id: string;
    scope: string;
  }): Promise<{
    device_code: string;
    user_code: string;
    verification_uri: string;
    verification_uri_complete: string;
    expires_in: number;
    interval: number;
  }> {
    // Get the client ID from database
    const client = await this.prisma.oAuthClient.findUnique({
      where: { client_id: data.client_id },
      select: { id: true },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    // Generate device code (cryptographically random)
    const device_code = randomBytes(32).toString('base64url');

    // Generate user code (human-readable, typically 8 characters)
    const user_code = this.generateUserCode();

    const expiresAt = new Date(Date.now() + TOKEN_LIFETIMES.DEVICE_CODE * 1000);
    const interval = 5; // Polling interval in seconds

    // Store device code in database
    await this.prisma.oAuthDeviceCode.create({
      data: {
        device_code,
        user_code,
        client_id: client.id,
        scope: data.scope,
        expires_at: expiresAt,
        interval,
      },
    });

    this.logger.log(`Generated device code for client ${data.client_id}`);

    // Verification URIs
    const verification_uri = 'http://localhost:3001/auth/oauth/device/verify';
    const verification_uri_complete = `${verification_uri}?user_code=${user_code}`;

    return {
      device_code,
      user_code,
      verification_uri,
      verification_uri_complete,
      expires_in: TOKEN_LIFETIMES.DEVICE_CODE,
      interval,
    };
  }

  /**
   * Get device code by user code (for user verification page)
   */
  async getDeviceCodeByUserCode(user_code: string) {
    const deviceCode = await this.prisma.oAuthDeviceCode.findUnique({
      where: { user_code },
      include: {
        client: {
          select: {
            name: true,
            logo_uri: true,
          },
        },
      },
    });

    if (!deviceCode) {
      throw new NotFoundException('Invalid user code');
    }

    // Check if expired
    if (deviceCode.expires_at < new Date()) {
      throw new BadRequestException('User code has expired');
    }

    // Check if already completed
    if (deviceCode.completed_at) {
      throw new BadRequestException('Device already verified');
    }

    return {
      device_code: deviceCode.device_code,
      user_code: deviceCode.user_code,
      client_name: deviceCode.client.name,
      client_logo_uri: deviceCode.client.logo_uri,
      scope: deviceCode.scope,
      expires_at: deviceCode.expires_at,
    };
  }

  /**
   * Verify device code (user login and consent)
   */
  async verifyDeviceCode(data: {
    user_code: string;
    user_id: string;
  }): Promise<void> {
    const deviceCode = await this.prisma.oAuthDeviceCode.findUnique({
      where: { user_code: data.user_code },
    });

    if (!deviceCode) {
      throw new NotFoundException('Invalid user code');
    }

    // Check if expired
    if (deviceCode.expires_at < new Date()) {
      throw new BadRequestException('User code has expired');
    }

    // Check if already verified
    if (deviceCode.verified) {
      throw new BadRequestException('Device already verified');
    }

    // Update device code with user info
    await this.prisma.oAuthDeviceCode.update({
      where: { id: deviceCode.id },
      data: {
        user_id: data.user_id,
        verified: true,
      },
    });

    this.logger.log(`Device code verified: ${data.user_code}`);
  }

  /**
   * Poll device code status (for token endpoint)
   */
  async pollDeviceStatus(device_code: string): Promise<{
    status: 'pending' | 'authorized' | 'expired' | 'denied';
    user_id?: string;
  }> {
    const deviceCode = await this.prisma.oAuthDeviceCode.findUnique({
      where: { device_code },
      include: {
        client: {
          select: {
            client_id: true,
          },
        },
      },
    });

    if (!deviceCode) {
      return { status: 'expired' };
    }

    // Check if expired
    if (deviceCode.expires_at < new Date()) {
      return { status: 'expired' };
    }

    // Check if verified
    if (!deviceCode.verified) {
      return { status: 'pending' };
    }

    // Check if already completed (tokens already issued)
    if (deviceCode.completed_at) {
      return { status: 'expired' };
    }

    // User has verified - authorized
    return {
      status: 'authorized',
      user_id: deviceCode.user_id || undefined,
    };
  }

  /**
   * Complete device flow (after tokens issued)
   */
  async completeDeviceFlow(device_code: string): Promise<void> {
    await this.prisma.oAuthDeviceCode.update({
      where: { device_code },
      data: {
        completed_at: new Date(),
      },
    });
  }

  /**
   * Get device code info for token exchange
   */
  async getDeviceCodeInfo(device_code: string): Promise<{
    id: string;
    client_id: string;
    user_id?: string;
    scope: string;
    verified: boolean;
    completed_at?: Date;
    expires_at: Date;
  } | null> {
    const deviceCode = await this.prisma.oAuthDeviceCode.findUnique({
      where: { device_code },
    });

    if (!deviceCode) {
      return null;
    }

    return {
      id: deviceCode.id,
      client_id: deviceCode.client_id,
      user_id: deviceCode.user_id || undefined,
      scope: deviceCode.scope,
      verified: deviceCode.verified,
      completed_at: deviceCode.completed_at || undefined,
      expires_at: deviceCode.expires_at,
    };
  }

  /**
   * Deny device code (user rejects authorization)
   */
  async denyDeviceCode(user_code: string): Promise<void> {
    const deviceCode = await this.prisma.oAuthDeviceCode.findUnique({
      where: { user_code },
    });

    if (!deviceCode) {
      throw new NotFoundException('Invalid user code');
    }

    // Mark as completed (without verification) to deny the request
    await this.prisma.oAuthDeviceCode.update({
      where: { id: deviceCode.id },
      data: {
        completed_at: new Date(),
      },
    });

    this.logger.log(`Device code denied: ${user_code}`);
  }

  /**
   * Clean up expired device codes
   */
  async cleanupExpiredDeviceCodes(): Promise<number> {
    const result = await this.prisma.oAuthDeviceCode.deleteMany({
      where: {
        expires_at: {
          lt: new Date(),
        },
      },
    });

    this.logger.log(`Cleaned up ${result.count} expired device codes`);

    return result.count;
  }

  /**
   * Get pending device codes for a user
   */
  async getPendingDeviceCodes(userId: string) {
    return this.prisma.oAuthDeviceCode.findMany({
      where: {
        user_id: userId,
        verified: true,
        completed_at: null,
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

  /**
   * Generate a human-readable user code
   * Format: XXXX-XXXX (8 characters, displayed in groups of 4)
   * Uses a specific character set to avoid ambiguity (no I, L, 1, 0, O)
   */
  private generateUserCode(): string {
    // Character set that avoids ambiguous characters
    const charset = 'BCDFGHJKLMNPQRSTVWXYZbcdfghjkmnpqrstvwxyz23456789';
    const codeLength = 8;
    let code = '';

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      code += charset[randomIndex];

      // Add hyphen after 4 characters
      if (i === 3) {
        code += '-';
      }
    }

    return code;
  }
}
