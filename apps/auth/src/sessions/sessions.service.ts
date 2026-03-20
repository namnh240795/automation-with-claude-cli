import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  UserSessionResponseDto,
  ClientSessionResponseDto,
  SessionsListResponseDto,
} from './dto';

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get all offline user sessions for a realm
   */
  async getRealmSessions(realmId: string): Promise<SessionsListResponseDto> {
    const sessions = await this.prisma.offline_user_session.findMany({
      where: {
        realm_id: realmId,
      },
      orderBy: {
        last_session_refresh: 'desc',
      },
      take: 100,
    });

    return {
      data: sessions.map((session) => ({
        user_session_id: session.user_session_id,
        user_id: session.user_id,
        realm_id: session.realm_id,
        created_on: session.created_on,
        last_session_refresh: session.last_session_refresh,
        broker_session_id: session.broker_session_id || undefined,
        data: session.data || undefined,
      })),
      total: sessions.length,
    };
  }

  /**
   * Get all sessions for a specific user
   */
  async getUserSessions(
    realmId: string,
    userId: string,
  ): Promise<SessionsListResponseDto> {
    const sessions = await this.prisma.offline_user_session.findMany({
      where: {
        realm_id: realmId,
        user_id: userId,
      },
      orderBy: {
        last_session_refresh: 'desc',
      },
    });

    return {
      data: sessions.map((session) => ({
        user_session_id: session.user_session_id,
        user_id: session.user_id,
        realm_id: session.realm_id,
        created_on: session.created_on,
        last_session_refresh: session.last_session_refresh,
        broker_session_id: session.broker_session_id || undefined,
        data: session.data || undefined,
      })),
      total: sessions.length,
    };
  }

  /**
   * Get client sessions for a user
   */
  async getUserClientSessions(
    realmId: string,
    userId: string,
  ): Promise<ClientSessionResponseDto[]> {
    // First get user sessions
    const userSessions = await this.prisma.offline_user_session.findMany({
      where: {
        realm_id: realmId,
        user_id: userId,
      },
      select: {
        user_session_id: true,
      },
    });

    const userSessionIds = userSessions.map((s) => s.user_session_id);

    // Get client sessions for these user sessions
    const clientSessions = await this.prisma.offline_client_session.findMany({
      where: {
        user_session_id: {
          in: userSessionIds,
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
    });

    return clientSessions.map((session) => ({
      user_session_id: session.user_session_id,
      client_id: session.client_id,
      timestamp: session.timestamp || undefined,
      data: session.data || undefined,
      client_storage_provider: session.client_storage_provider,
      external_client_id: session.external_client_id,
      offline_flag: session.offline_flag,
    }));
  }

  /**
   * Terminate a specific user session
   */
  async terminateSession(sessionId: string, offlineFlag: string = 'Offline'): Promise<void> {
    const session = await this.prisma.offline_user_session.findUnique({
      where: {
        user_session_id_offline_flag: {
          user_session_id: sessionId,
          offline_flag: offlineFlag,
        },
      },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    await this.prisma.offline_user_session.delete({
      where: {
        user_session_id_offline_flag: {
          user_session_id: sessionId,
          offline_flag: offlineFlag,
        },
      },
    });
  }

  /**
   * Terminate all sessions for a user
   */
  async terminateAllUserSessions(realmId: string, userId: string): Promise<number> {
    const result = await this.prisma.offline_user_session.deleteMany({
      where: {
        realm_id: realmId,
        user_id: userId,
      },
    });

    return result.count;
  }

  /**
   * Revoke a token by adding it to the revoked_token table
   */
  async revokeToken(tokenId: string, expiration: number): Promise<void> {
    // Check if token is already revoked
    const existing = await this.prisma.revoked_token.findUnique({
      where: {
        id: tokenId,
      },
    });

    if (existing) {
      throw new BadRequestException('Token is already revoked');
    }

    await this.prisma.revoked_token.create({
      data: {
        id: tokenId,
        expire: BigInt(expiration),
      },
    });
  }

  /**
   * Check if a token is revoked
   */
  async isTokenRevoked(tokenId: string): Promise<boolean> {
    const revoked = await this.prisma.revoked_token.findUnique({
      where: {
        id: tokenId,
      },
    });

    return !!revoked;
  }

  /**
   * Clean up expired revoked tokens
   */
  async cleanupExpiredTokens(): Promise<number> {
    const now = BigInt(Math.floor(Date.now() / 1000));

    const result = await this.prisma.revoked_token.deleteMany({
      where: {
        expire: {
          lt: now,
        },
      },
    });

    return result.count;
  }
}
