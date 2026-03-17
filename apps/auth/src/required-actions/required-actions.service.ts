import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  RequiredActionResponseDto,
  CreateRequiredActionDto,
  UpdateRequiredActionDto,
  UserRequiredActionResponseDto,
  RequiredActionsPaginatedResponseDto,
  SetUserRequiredActionsDto,
} from './dto';

@Injectable()
export class RequiredActionsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get all required actions for a realm
   */
  async getRealmRequiredActions(
    realmId: string,
    page: number = 0,
    limit: number = 20,
  ): Promise<RequiredActionsPaginatedResponseDto> {
    const [actions, total] = await Promise.all([
      this.prisma.required_action_provider.findMany({
        where: {
          realm_id: realmId,
        },
        skip: page * limit,
        take: limit,
        orderBy: {
          priority: 'asc',
        },
      }),
      this.prisma.required_action_provider.count({
        where: {
          realm_id: realmId,
        },
      }),
    ]);

    return {
      data: actions.map((action) => ({
        id: action.id,
        alias: action.alias || undefined,
        name: action.name || undefined,
        provider_id: action.provider_id || undefined,
        enabled: action.enabled,
        default_action: action.default_action,
        priority: action.priority || undefined,
        realm_id: action.realm_id || undefined,
      })),
      total,
    };
  }

  /**
   * Create a new required action
   */
  async createRequiredAction(
    realmId: string,
    createActionDto: CreateRequiredActionDto,
  ): Promise<RequiredActionResponseDto> {
    const action = await this.prisma.required_action_provider.create({
      data: {
        alias: createActionDto.alias,
        name: createActionDto.name,
        provider_id: createActionDto.provider_id,
        enabled: createActionDto.enabled,
        default_action: createActionDto.default_action || false,
        priority: createActionDto.priority,
        realm_id: realmId,
      },
    });

    return {
      id: action.id,
      alias: action.alias || undefined,
      name: action.name || undefined,
      provider_id: action.provider_id || undefined,
      enabled: action.enabled,
      default_action: action.default_action,
      priority: action.priority || undefined,
      realm_id: action.realm_id || undefined,
    };
  }

  /**
   * Get a specific required action
   */
  async getRequiredAction(actionId: string): Promise<RequiredActionResponseDto> {
    const action = await this.prisma.required_action_provider.findUnique({
      where: {
        id: actionId,
      },
    });

    if (!action) {
      throw new NotFoundException('Required action not found');
    }

    return {
      id: action.id,
      alias: action.alias || undefined,
      name: action.name || undefined,
      provider_id: action.provider_id || undefined,
      enabled: action.enabled,
      default_action: action.default_action,
      priority: action.priority || undefined,
      realm_id: action.realm_id || undefined,
    };
  }

  /**
   * Update a required action
   */
  async updateRequiredAction(
    actionId: string,
    updateActionDto: UpdateRequiredActionDto,
  ): Promise<RequiredActionResponseDto> {
    const action = await this.prisma.required_action_provider.update({
      where: {
        id: actionId,
      },
      data: {
        ...(updateActionDto.alias !== undefined && {
          alias: updateActionDto.alias,
        }),
        ...(updateActionDto.name !== undefined && {
          name: updateActionDto.name,
        }),
        ...(updateActionDto.enabled !== undefined && {
          enabled: updateActionDto.enabled,
        }),
        ...(updateActionDto.default_action !== undefined && {
          default_action: updateActionDto.default_action,
        }),
        ...(updateActionDto.priority !== undefined && {
          priority: updateActionDto.priority,
        }),
      },
    });

    return {
      id: action.id,
      alias: action.alias || undefined,
      name: action.name || undefined,
      provider_id: action.provider_id || undefined,
      enabled: action.enabled,
      default_action: action.default_action,
      priority: action.priority || undefined,
      realm_id: action.realm_id || undefined,
    };
  }

  /**
   * Delete a required action
   */
  async deleteRequiredAction(actionId: string): Promise<void> {
    await this.prisma.required_action_provider.delete({
      where: {
        id: actionId,
      },
    });
  }

  /**
   * Get required actions for a user
   */
  async getUserRequiredActions(
    userId: string,
  ): Promise<UserRequiredActionResponseDto[]> {
    const userActions = await this.prisma.user_required_action.findMany({
      where: {
        user_id: userId,
      },
    });

    return userActions.map((action) => ({
      user_id: action.user_id,
      required_action: action.required_action,
    }));
  }

  /**
   * Set required actions for a user
   */
  async setUserRequiredActions(
    userId: string,
    setActionsDto: SetUserRequiredActionsDto,
  ): Promise<UserRequiredActionResponseDto[]> {
    // Delete existing required actions for user
    await this.prisma.user_required_action.deleteMany({
      where: {
        user_id: userId,
      },
    });

    // Create new required actions
    const actions = await Promise.all(
      setActionsDto.required_actions.map((actionName) =>
        this.prisma.user_required_action.create({
          data: {
            user_id: userId,
            required_action: actionName,
          },
        }),
      ),
    );

    return actions.map((action) => ({
      user_id: action.user_id,
      required_action: action.required_action,
    }));
  }

  /**
   * Remove a specific required action from user
   */
  async removeUserRequiredAction(
    userId: string,
    actionName: string,
  ): Promise<void> {
    await this.prisma.user_required_action.deleteMany({
      where: {
        user_id: userId,
        required_action: actionName,
      },
    });
  }

  /**
   * Get all available required action providers (system-wide)
   */
  async getRequiredActionProviders(): Promise<RequiredActionResponseDto[]> {
    const providers = await this.prisma.required_action_provider.findMany({
      where: {
        OR: [{ realm_id: null }, { realm_id: '' }],
      },
      orderBy: {
        priority: 'asc',
      },
    });

    return providers.map((provider) => ({
      id: provider.id,
      alias: provider.alias || undefined,
      name: provider.name || undefined,
      provider_id: provider.provider_id || undefined,
      enabled: provider.enabled,
      default_action: provider.default_action,
      priority: provider.priority || undefined,
      realm_id: provider.realm_id || undefined,
    }));
  }
}
