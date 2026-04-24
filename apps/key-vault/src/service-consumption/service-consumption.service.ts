import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SettingType } from '../common/enum';

@Injectable()
export class ServiceConsumptionService {
  constructor(private readonly prisma: PrismaService) {}

  async getServiceSettings(serviceName: string, environment: string) {
    if (!environment) {
      throw new BadRequestException('Environment query parameter is required');
    }

    const env = await this.prisma.environment.findFirst({
      where: { name: environment, deleted_at: null },
      select: { id: true },
    });

    if (!env) {
      throw new NotFoundException(`Environment "${environment}" not found`);
    }

    const settings = await this.prisma.setting.findMany({
      where: {
        service_name: serviceName,
        type: SettingType.STATIC,
        deleted_at: null,
      },
      select: {
        key: true,
        type: true,
        setting_values: {
          where: { environment_id: env.id },
          select: { value: true },
          orderBy: { version: 'desc' },
          take: 1,
        },
      },
    });

    if (settings.length === 0) {
      throw new NotFoundException(
        `No STATIC settings found for service "${serviceName}"`,
      );
    }

    return {
      service_name: serviceName,
      environment,
      settings: settings.map((s) => ({
        key: s.key,
        value: s.setting_values[0]?.value ?? null,
      })),
    };
  }

  async getSingleSetting(
    serviceName: string,
    key: string,
    environment: string,
  ) {
    if (!environment) {
      throw new BadRequestException('Environment query parameter is required');
    }

    const env = await this.prisma.environment.findFirst({
      where: { name: environment, deleted_at: null },
      select: { id: true },
    });

    if (!env) {
      throw new NotFoundException(`Environment "${environment}" not found`);
    }

    const settings = await this.prisma.setting.findMany({
      where: {
        service_name: serviceName,
        deleted_at: null,
      },
      select: {
        key: true,
        type: true,
        setting_values: {
          where: { environment_id: env.id },
          select: { value: true },
          orderBy: { version: 'desc' },
          take: 1,
        },
      },
    });

    const found = settings.find((s) => s.key === key);

    if (!found || found.type === SettingType.SECURE) {
      throw new NotFoundException(
        `Setting "${key}" not found for service "${serviceName}"`,
      );
    }

    return {
      key: found.key,
      value: found.setting_values[0]?.value ?? null,
    };
  }
}
