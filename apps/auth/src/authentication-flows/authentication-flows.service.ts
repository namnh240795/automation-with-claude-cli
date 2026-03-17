import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LogActivity } from '@app/app-logger';
import {
  CreateAuthenticationFlowDto,
  UpdateAuthenticationFlowDto,
  CreateAuthenticationExecutionDto,
  UpdateAuthenticationExecutionDto,
  CreateAuthenticatorConfigDto,
  UpdateAuthenticatorConfigDto,
  AuthenticationFlowResponseDto,
  AuthenticationFlowsPaginatedResponseDto,
  AuthenticationExecutionResponseDto,
  AuthenticationExecutionsPaginatedResponseDto,
  AuthenticatorConfigResponseDto,
  Requirement,
} from './dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly prisma: PrismaService) {}

  // ==================== Authentication Flows ====================

  @LogActivity()
  async getRealmFlows(
    realmId: string,
    page: number = 0,
    limit: number = 20,
  ): Promise<AuthenticationFlowsPaginatedResponseDto> {
    const [flows, total] = await Promise.all([
      this.prisma.authentication_flow.findMany({
        where: { realm_id: realmId },
        skip: page * limit,
        take: limit,
        orderBy: { alias: 'asc' },
      }),
      this.prisma.authentication_flow.count({
        where: { realm_id: realmId },
      }),
    ]);

    return {
      flows: flows.map((flow) => ({
        id: flow.id,
        alias: flow.alias,
        description: flow.description,
        realm_id: flow.realm_id,
        provider_id: flow.provider_id,
        top_level: flow.top_level,
        built_in: flow.built_in,
      })),
      total,
    };
  }

  @LogActivity()
  async getFlow(flowId: string): Promise<AuthenticationFlowResponseDto> {
    const flow = await this.prisma.authentication_flow.findUnique({
      where: { id: flowId },
    });

    if (!flow) {
      throw new NotFoundException('Authentication flow not found');
    }

    return {
      id: flow.id,
      alias: flow.alias,
      description: flow.description,
      realm_id: flow.realm_id,
      provider_id: flow.provider_id,
      top_level: flow.top_level,
      built_in: flow.built_in,
    };
  }

  @LogActivity()
  async createFlow(
    realmId: string,
    createFlowDto: CreateAuthenticationFlowDto,
  ): Promise<AuthenticationFlowResponseDto> {
    // Check if flow with alias already exists
    const existingFlow = await this.prisma.authentication_flow.findFirst({
      where: {
        realm_id: realmId,
        alias: createFlowDto.alias,
      },
    });

    if (existingFlow) {
      throw new ConflictException('Flow with this alias already exists');
    }

    const flow = await this.prisma.authentication_flow.create({
      data: {
        id: crypto.randomUUID(),
        alias: createFlowDto.alias,
        description: createFlowDto.description,
        realm_id: realmId,
        provider_id: createFlowDto.provider_id || 'basic-flow',
        top_level: createFlowDto.top_level ?? false,
        built_in: false,
      },
    });

    return {
      id: flow.id,
      alias: flow.alias,
      description: flow.description,
      realm_id: flow.realm_id,
      provider_id: flow.provider_id,
      top_level: flow.top_level,
      built_in: flow.built_in,
    };
  }

  @LogActivity()
  async updateFlow(
    flowId: string,
    updateFlowDto: UpdateAuthenticationFlowDto,
  ): Promise<AuthenticationFlowResponseDto> {
    const flow = await this.prisma.authentication_flow.findUnique({
      where: { id: flowId },
    });

    if (!flow) {
      throw new NotFoundException('Authentication flow not found');
    }

    // Cannot update built-in flows
    if (flow.built_in) {
      throw new ConflictException('Cannot update built-in flows');
    }

    const updatedFlow = await this.prisma.authentication_flow.update({
      where: { id: flowId },
      data: {
        ...(updateFlowDto.alias !== undefined && { alias: updateFlowDto.alias }),
        ...(updateFlowDto.description !== undefined && { description: updateFlowDto.description }),
        ...(updateFlowDto.provider_id !== undefined && { provider_id: updateFlowDto.provider_id }),
        ...(updateFlowDto.top_level !== undefined && { top_level: updateFlowDto.top_level }),
      },
    });

    return {
      id: updatedFlow.id,
      alias: updatedFlow.alias,
      description: updatedFlow.description,
      realm_id: updatedFlow.realm_id,
      provider_id: updatedFlow.provider_id,
      top_level: updatedFlow.top_level,
      built_in: updatedFlow.built_in,
    };
  }

  @LogActivity()
  async deleteFlow(flowId: string): Promise<void> {
    const flow = await this.prisma.authentication_flow.findUnique({
      where: { id: flowId },
    });

    if (!flow) {
      throw new NotFoundException('Authentication flow not found');
    }

    // Cannot delete built-in flows
    if (flow.built_in) {
      throw new ConflictException('Cannot delete built-in flows');
    }

    // Delete all executions first
    await this.prisma.authentication_execution.deleteMany({
      where: { flow_id: flowId },
    });

    // Delete the flow
    await this.prisma.authentication_flow.delete({
      where: { id: flowId },
    });
  }

  // ==================== Authentication Executions ====================

  @LogActivity()
  async getFlowExecutions(
    flowId: string,
    page: number = 0,
    limit: number = 20,
  ): Promise<AuthenticationExecutionsPaginatedResponseDto> {
    const [executions, total] = await Promise.all([
      this.prisma.authentication_execution.findMany({
        where: { flow_id: flowId },
        skip: page * limit,
        take: limit,
        orderBy: [{ priority: 'asc' }, { alias: 'asc' }],
      }),
      this.prisma.authentication_execution.count({
        where: { flow_id: flowId },
      }),
    ]);

    return {
      executions: executions.map((exec) => ({
        id: exec.id,
        alias: exec.alias,
        authenticator: exec.authenticator,
        realm_id: exec.realm_id,
        flow_id: exec.flow_id,
        requirement: exec.requirement,
        priority: exec.priority,
        authenticator_flow: exec.authenticator_flow,
        auth_flow_id: exec.auth_flow_id,
        auth_config: exec.auth_config,
      })),
      total,
    };
  }

  @LogActivity()
  async addExecution(
    flowId: string,
    realmId: string,
    createExecutionDto: CreateAuthenticationExecutionDto,
  ): Promise<AuthenticationExecutionResponseDto> {
    // Verify flow exists
    const flow = await this.prisma.authentication_flow.findUnique({
      where: { id: flowId },
    });

    if (!flow) {
      throw new NotFoundException('Authentication flow not found');
    }

    // Map requirement enum to number
    const requirementMap: Record<Requirement, number> = {
      [Requirement.REQUIRED]: 0,
      [Requirement.OPTIONAL]: 1,
      [Requirement.DISABLED]: 2,
      [Requirement.ALTERNATIVE]: 3,
      [Requirement.CONDITIONAL]: 4,
    };

    const execution = await this.prisma.authentication_execution.create({
      data: {
        id: crypto.randomUUID(),
        alias: createExecutionDto.alias,
        authenticator: createExecutionDto.authenticator,
        realm_id: realmId,
        flow_id: flowId,
        requirement: requirementMap[createExecutionDto.requirement],
        priority: createExecutionDto.priority,
        authenticator_flow: createExecutionDto.authenticator_flow ?? false,
        auth_flow_id: createExecutionDto.auth_flow_id,
        auth_config: createExecutionDto.auth_config,
      },
    });

    return {
      id: execution.id,
      alias: execution.alias,
      authenticator: execution.authenticator,
      realm_id: execution.realm_id,
      flow_id: execution.flow_id,
      requirement: execution.requirement,
      priority: execution.priority,
      authenticator_flow: execution.authenticator_flow,
      auth_flow_id: execution.auth_flow_id,
      auth_config: execution.auth_config,
    };
  }

  @LogActivity()
  async updateExecution(
    executionId: string,
    updateExecutionDto: UpdateAuthenticationExecutionDto,
  ): Promise<AuthenticationExecutionResponseDto> {
    const execution = await this.prisma.authentication_execution.findUnique({
      where: { id: executionId },
    });

    if (!execution) {
      throw new NotFoundException('Authentication execution not found');
    }

    // Map requirement enum to number if provided
    let requirementValue = undefined;
    if (updateExecutionDto.requirement) {
      const requirementMap: Record<Requirement, number> = {
        [Requirement.REQUIRED]: 0,
        [Requirement.OPTIONAL]: 1,
        [Requirement.DISABLED]: 2,
        [Requirement.ALTERNATIVE]: 3,
        [Requirement.CONDITIONAL]: 4,
      };
      requirementValue = requirementMap[updateExecutionDto.requirement];
    }

    const updatedExecution = await this.prisma.authentication_execution.update({
      where: { id: executionId },
      data: {
        ...(updateExecutionDto.alias !== undefined && { alias: updateExecutionDto.alias }),
        ...(updateExecutionDto.authenticator !== undefined && { authenticator: updateExecutionDto.authenticator }),
        ...(requirementValue !== undefined && { requirement: requirementValue }),
        ...(updateExecutionDto.priority !== undefined && { priority: updateExecutionDto.priority }),
        ...(updateExecutionDto.authenticator_flow !== undefined && { authenticator_flow: updateExecutionDto.authenticator_flow }),
        ...(updateExecutionDto.auth_flow_id !== undefined && { auth_flow_id: updateExecutionDto.auth_flow_id }),
        ...(updateExecutionDto.auth_config !== undefined && { auth_config: updateExecutionDto.auth_config }),
      },
    });

    return {
      id: updatedExecution.id,
      alias: updatedExecution.alias,
      authenticator: updatedExecution.authenticator,
      realm_id: updatedExecution.realm_id,
      flow_id: updatedExecution.flow_id,
      requirement: updatedExecution.requirement,
      priority: updatedExecution.priority,
      authenticator_flow: updatedExecution.authenticator_flow,
      auth_flow_id: updatedExecution.auth_flow_id,
      auth_config: updatedExecution.auth_config,
    };
  }

  @LogActivity()
  async deleteExecution(executionId: string): Promise<void> {
    const execution = await this.prisma.authentication_execution.findUnique({
      where: { id: executionId },
    });

    if (!execution) {
      throw new NotFoundException('Authentication execution not found');
    }

    await this.prisma.authentication_execution.delete({
      where: { id: executionId },
    });
  }

  // ==================== Authenticator Configs ====================

  @LogActivity()
  async getRealmConfigs(
    realmId: string,
    page: number = 0,
    limit: number = 20,
  ): Promise<AuthenticatorConfigsPaginatedResponseDto> {
    const configs = await this.prisma.authenticator_config.findMany({
      where: { realm_id: realmId },
      skip: page * limit,
      take: limit,
      orderBy: { alias: 'asc' },
    });

    const total = await this.prisma.authenticator_config.count({
      where: { realm_id: realmId },
    });

    // Fetch config entries for each config
    const configsWithEntries = await Promise.all(
      configs.map(async (config) => {
        const entries = await this.prisma.authenticator_config_entry.findMany({
          where: { authenticator_id: config.id },
        });

        const configObj: Record<string, string> = {};
        entries.forEach((entry) => {
          if (entry.value) {
            configObj[entry.name] = entry.value;
          }
        });

        return {
          id: config.id,
          alias: config.alias,
          realm_id: config.realm_id,
          config: configObj,
        };
      }),
    );

    return {
      configs: configsWithEntries,
      total,
    };
  }

  @LogActivity()
  async createConfig(
    realmId: string,
    createConfigDto: CreateAuthenticatorConfigDto,
  ): Promise<AuthenticatorConfigResponseDto> {
    const configId = crypto.randomUUID();

    const config = await this.prisma.authenticator_config.create({
      data: {
        id: configId,
        alias: createConfigDto.alias,
        realm_id: realmId,
      },
    });

    // Create config entries if provided
    if (createConfigDto.config && Object.keys(createConfigDto.config).length > 0) {
      const entries = Object.entries(createConfigDto.config).map(([name, value]) => ({
        authenticator_id: configId,
        name,
        value,
      }));

      await this.prisma.authenticator_config_entry.createMany({
        data: entries,
      });
    }

    return {
      id: config.id,
      alias: config.alias,
      realm_id: config.realm_id,
      config: createConfigDto.config,
    };
  }

  @LogActivity()
  async updateConfig(
    configId: string,
    updateConfigDto: UpdateAuthenticatorConfigDto,
  ): Promise<AuthenticatorConfigResponseDto> {
    const config = await this.prisma.authenticator_config.findUnique({
      where: { id: configId },
    });

    if (!config) {
      throw new NotFoundException('Authenticator config not found');
    }

    // Update config alias if provided
    if (updateConfigDto.alias) {
      await this.prisma.authenticator_config.update({
        where: { id: configId },
        data: { alias: updateConfigDto.alias },
      });
    }

    // Update config entries if provided
    let configObj: Record<string, string> = {};
    if (updateConfigDto.config) {
      // Delete existing entries
      await this.prisma.authenticator_config_entry.deleteMany({
        where: { authenticator_id: configId },
      });

      // Create new entries
      const entries = Object.entries(updateConfigDto.config).map(([name, value]) => ({
        authenticator_id: configId,
        name,
        value,
      }));

      await this.prisma.authenticator_config_entry.createMany({
        data: entries,
      });

      configObj = updateConfigDto.config;
    } else {
      // Fetch existing entries
      const entries = await this.prisma.authenticator_config_entry.findMany({
        where: { authenticator_id: configId },
      });

      entries.forEach((entry) => {
        if (entry.value) {
          configObj[entry.name] = entry.value;
        }
      });
    }

    return {
      id: config.id,
      alias: updateConfigDto.alias ?? config.alias,
      realm_id: config.realm_id,
      config: configObj,
    };
  }

  @LogActivity()
  async deleteConfig(configId: string): Promise<void> {
    const config = await this.prisma.authenticator_config.findUnique({
      where: { id: configId },
    });

    if (!config) {
      throw new NotFoundException('Authenticator config not found');
    }

    // Delete config entries first
    await this.prisma.authenticator_config_entry.deleteMany({
      where: { authenticator_id: configId },
    });

    // Delete config
    await this.prisma.authenticator_config.delete({
      where: { id: configId },
    });
  }
}
