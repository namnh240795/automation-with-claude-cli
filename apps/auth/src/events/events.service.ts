import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  EventResponseDto,
  EventsPaginatedResponseDto,
  AdminEventsPaginatedResponseDto,
  EventQueryDto,
  AdminEventQueryDto,
} from './dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Log a user event
   */
  async logEvent(data: {
    type?: string;
    realmId?: string;
    userId?: string;
    clientId?: string;
    sessionId?: string;
    ipAddress?: string;
    error?: string;
    detailsJson?: string;
  }): Promise<void> {
    await this.prisma.event_entity.create({
      data: {
        id: crypto.randomUUID(),
        type: data.type,
        realm_id: data.realmId,
        user_id: data.userId,
        client_id: data.clientId,
        session_id: data.sessionId,
        ip_address: data.ipAddress,
        event_time: BigInt(Math.floor(Date.now() / 1000)),
        error: data.error,
        details_json: data.detailsJson,
      },
    });
  }

  /**
   * Log an admin event
   */
  async logAdminEvent(data: {
    operationType?: string;
    realmId?: string;
    resourceType?: string;
    resourcePath?: string;
    authRealmId?: string;
    authClientId?: string;
    authUserId?: string;
    ipAddress?: string;
    error?: string;
    representation?: string;
    detailsJson?: string;
  }): Promise<void> {
    await this.prisma.admin_event_entity.create({
      data: {
        id: crypto.randomUUID(),
        operation_type: data.operationType,
        realm_id: data.realmId,
        resource_type: data.resourceType,
        resource_path: data.resourcePath,
        auth_realm_id: data.authRealmId,
        auth_client_id: data.authClientId,
        auth_user_id: data.authUserId,
        ip_address: data.ipAddress,
        admin_event_time: BigInt(Math.floor(Date.now() / 1000)),
        error: data.error,
        representation: data.representation,
        details_json: data.detailsJson,
      },
    });
  }

  /**
   * Get events with filtering and pagination
   */
  async getEvents(
    realmId: string,
    query?: EventQueryDto,
    page: number = 0,
    limit: number = 50,
  ): Promise<EventsPaginatedResponseDto> {
    const where: any = {
      realm_id: realmId,
    };

    if (query?.user_id) {
      where.user_id = query.user_id;
    }

    if (query?.client_id) {
      where.client_id = query.client_id;
    }

    if (query?.type) {
      where.type = query.type;
    }

    if (query?.date_from || query?.date_to) {
      where.event_time = {};
      if (query.date_from) {
        where.event_time.gte = BigInt(query.date_from);
      }
      if (query.date_to) {
        where.event_time.lte = BigInt(query.date_to);
      }
    }

    const [events, total] = await Promise.all([
      this.prisma.event_entity.findMany({
        where,
        skip: page * limit,
        take: limit,
        orderBy: {
          event_time: 'desc',
        },
      }),
      this.prisma.event_entity.count({ where }),
    ]);

    return {
      data: events.map((event) => ({
        id: event.id,
        type: event.type || undefined,
        realm_id: event.realm_id || undefined,
        user_id: event.user_id || undefined,
        client_id: event.client_id || undefined,
        session_id: event.session_id || undefined,
        ip_address: event.ip_address || undefined,
        event_time: event.event_time
          ? Number(event.event_time)
          : undefined,
        error: event.error || undefined,
        details_json: event.details_json || undefined,
        details_json_long_value: event.details_json_long_value || undefined,
      })),
      total,
    };
  }

  /**
   * Get user events
   */
  async getUserEvents(
    userId: string,
    page: number = 0,
    limit: number = 50,
  ): Promise<EventsPaginatedResponseDto> {
    const [events, total] = await Promise.all([
      this.prisma.event_entity.findMany({
        where: {
          user_id: userId,
        },
        skip: page * limit,
        take: limit,
        orderBy: {
          event_time: 'desc',
        },
      }),
      this.prisma.event_entity.count({
        where: {
          user_id: userId,
        },
      }),
    ]);

    return {
      data: events.map((event) => ({
        id: event.id,
        type: event.type || undefined,
        realm_id: event.realm_id || undefined,
        user_id: event.user_id || undefined,
        client_id: event.client_id || undefined,
        session_id: event.session_id || undefined,
        ip_address: event.ip_address || undefined,
        event_time: event.event_time
          ? Number(event.event_time)
          : undefined,
        error: event.error || undefined,
        details_json: event.details_json || undefined,
        details_json_long_value: event.details_json_long_value || undefined,
      })),
      total,
    };
  }

  /**
   * Get admin events with filtering and pagination
   */
  async getAdminEvents(
    realmId: string,
    query?: AdminEventQueryDto,
    page: number = 0,
    limit: number = 50,
  ): Promise<AdminEventsPaginatedResponseDto> {
    const where: any = {
      realm_id: realmId,
    };

    if (query?.operation_type) {
      where.operation_type = query.operation_type;
    }

    if (query?.resource_type) {
      where.resource_type = query.resource_type;
    }

    if (query?.resource_path) {
      where.resource_path = {
        contains: query.resource_path,
      };
    }

    if (query?.auth_realm_id) {
      where.auth_realm_id = query.auth_realm_id;
    }

    if (query?.date_from || query?.date_to) {
      where.admin_event_time = {};
      if (query.date_from) {
        where.admin_event_time.gte = BigInt(query.date_from);
      }
      if (query.date_to) {
        where.admin_event_time.lte = BigInt(query.date_to);
      }
    }

    const [events, total] = await Promise.all([
      this.prisma.admin_event_entity.findMany({
        where,
        skip: page * limit,
        take: limit,
        orderBy: {
          admin_event_time: 'desc',
        },
      }),
      this.prisma.admin_event_entity.count({ where }),
    ]);

    return {
      data: events.map((event) => ({
        id: event.id,
        operation_type: event.operation_type || undefined,
        realm_id: event.realm_id || undefined,
        resource_type: event.resource_type || undefined,
        resource_path: event.resource_path || undefined,
        auth_realm_id: event.auth_realm_id || undefined,
        auth_client_id: event.auth_client_id || undefined,
        auth_user_id: event.auth_user_id || undefined,
        ip_address: event.ip_address || undefined,
        admin_event_time: event.admin_event_time
          ? Number(event.admin_event_time)
          : undefined,
        error: event.error || undefined,
        representation: event.representation || undefined,
        details_json: event.details_json || undefined,
      })),
      total,
    };
  }

  /**
   * Export events to JSON
   */
  async exportEvents(
    realmId: string,
    query?: EventQueryDto,
  ): Promise<EventResponseDto[]> {
    const where: any = {
      realm_id: realmId,
    };

    if (query?.user_id) {
      where.user_id = query.user_id;
    }

    if (query?.client_id) {
      where.client_id = query.client_id;
    }

    if (query?.type) {
      where.type = query.type;
    }

    if (query?.date_from || query?.date_to) {
      where.event_time = {};
      if (query.date_from) {
        where.event_time.gte = BigInt(query.date_from);
      }
      if (query.date_to) {
        where.event_time.lte = BigInt(query.date_to);
      }
    }

    const events = await this.prisma.event_entity.findMany({
      where,
      orderBy: {
        event_time: 'desc',
      },
      take: 10000, // Limit export to 10k events
    });

    return events.map((event) => ({
      id: event.id,
      type: event.type || undefined,
      realm_id: event.realm_id || undefined,
      user_id: event.user_id || undefined,
      client_id: event.client_id || undefined,
      session_id: event.session_id || undefined,
      ip_address: event.ip_address || undefined,
      event_time: event.event_time
        ? Number(event.event_time)
        : undefined,
      error: event.error || undefined,
      details_json: event.details_json || undefined,
      details_json_long_value: event.details_json_long_value || undefined,
    }));
  }

  /**
   * Delete old events
   */
  async deleteOldEvents(realmId: string, olderThanDays: number = 90): Promise<number> {
    const cutoffTime =
      BigInt(Math.floor(Date.now() / 1000)) - BigInt(olderThanDays * 86400);

    const result = await this.prisma.event_entity.deleteMany({
      where: {
        realm_id: realmId,
        event_time: {
          lt: cutoffTime,
        },
      },
    });

    return result.count;
  }

  /**
   * Delete old admin events
   */
  async deleteOldAdminEvents(
    realmId: string,
    olderThanDays: number = 365,
  ): Promise<number> {
    const cutoffTime =
      BigInt(Math.floor(Date.now() / 1000)) - BigInt(olderThanDays * 86400);

    const result = await this.prisma.admin_event_entity.deleteMany({
      where: {
        realm_id: realmId,
        admin_event_time: {
          lt: cutoffTime,
        },
      },
    });

    return result.count;
  }
}
