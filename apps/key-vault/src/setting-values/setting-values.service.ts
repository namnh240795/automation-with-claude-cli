import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../encryption/encryption.service';
import { SettingType } from '../common/enum';
import { SetValueDto } from './dto';

const VALUE_SELECT = {
  id: true,
  setting_id: true,
  environment_id: true,
  value: true,
  version: true,
  change_reason: true,
  created_at: true,
};

@Injectable()
export class SettingValuesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async setValue(
    settingId: string,
    environmentId: string,
    dto: SetValueDto,
    userId: string,
  ) {
    // Verify setting exists
    const setting = await this.prisma.setting.findUnique({
      where: { id: settingId, deleted_at: null },
    });
    if (!setting) {
      throw new NotFoundException(`Setting with ID "${settingId}" not found`);
    }

    // Verify environment exists
    const environment = await this.prisma.environment.findUnique({
      where: { id: environmentId, deleted_at: null },
    });
    if (!environment) {
      throw new NotFoundException(`Environment with ID "${environmentId}" not found`);
    }

    // Encrypt value if SECURE type
    const storedValue = setting.type === SettingType.SECURE
      ? this.encryptionService.encrypt(dto.value)
      : dto.value;

    // Check if value already exists for this setting+env
    const existing = await this.prisma.setting_value.findFirst({
      where: { setting_id: settingId, environment_id: environmentId },
      orderBy: { version: 'desc' },
    });

    return this.prisma.$transaction(async (tx) => {
      if (existing) {
        // Archive current value to history
        await tx.setting_value_history.create({
          data: {
            setting_id: existing.setting_id,
            environment_id: existing.environment_id,
            value: existing.value,
            version: existing.version,
            change_reason: existing.change_reason,
            created_by: existing.created_by,
          },
        });

        // Delete current value (will be replaced)
        await tx.setting_value.delete({ where: { id: existing.id } });
      }

      // Create new value with incremented version
      const nextVersion = existing ? existing.version + 1 : 1;

      const newValue = await tx.setting_value.create({
        data: {
          setting_id: settingId,
          environment_id: environmentId,
          value: storedValue,
          version: nextVersion,
          change_reason: dto.change_reason,
          created_by: userId,
        },
        select: VALUE_SELECT,
      });

      // Mask SECURE values in response
      if (setting.type === SettingType.SECURE) {
        newValue.value = this.encryptionService.mask();
      }

      return newValue;
    });
  }

  async getValue(
    settingId: string,
    environmentId: string,
    reveal: boolean = false,
  ) {
    const setting = await this.prisma.setting.findUnique({
      where: { id: settingId, deleted_at: null },
    });
    if (!setting) {
      throw new NotFoundException(`Setting with ID "${settingId}" not found`);
    }

    const value = await this.prisma.setting_value.findFirst({
      where: { setting_id: settingId, environment_id: environmentId },
      orderBy: { version: 'desc' },
      select: VALUE_SELECT,
    });

    if (!value) {
      throw new NotFoundException(
        `No value found for setting "${settingId}" in environment "${environmentId}"`,
      );
    }

    // Handle SECURE masking/decryption
    value.value = this.encryptionService.decryptIfNeeded(
      value.value,
      setting.type,
      reveal,
    );

    return value;
  }

  async getHistory(settingId: string, environmentId: string) {
    const setting = await this.prisma.setting.findUnique({
      where: { id: settingId, deleted_at: null },
    });
    if (!setting) {
      throw new NotFoundException(`Setting with ID "${settingId}" not found`);
    }

    const history = await this.prisma.setting_value_history.findMany({
      where: { setting_id: settingId, environment_id: environmentId },
      orderBy: { version: 'desc' },
      select: {
        id: true,
        setting_id: true,
        environment_id: true,
        value: true,
        version: true,
        change_reason: true,
        created_at: true,
      },
    });

    // Mask SECURE values in history
    if (setting.type === SettingType.SECURE) {
      for (const entry of history) {
        entry.value = this.encryptionService.mask();
      }
    }

    return history;
  }

  async rollback(
    settingId: string,
    environmentId: string,
    targetVersion: number,
    userId: string,
  ) {
    const setting = await this.prisma.setting.findUnique({
      where: { id: settingId, deleted_at: null },
    });
    if (!setting) {
      throw new NotFoundException(`Setting with ID "${settingId}" not found`);
    }

    // Find the target version in history
    const targetEntry = await this.prisma.setting_value_history.findFirst({
      where: {
        setting_id: settingId,
        environment_id: environmentId,
        version: targetVersion,
      },
    });

    if (!targetEntry) {
      throw new NotFoundException(
        `Version ${targetVersion} not found in history`,
      );
    }

    // Use setValue to create a new version with the old value
    return this.setValue(settingId, environmentId, {
      value: setting.type === SettingType.SECURE
        ? targetEntry.value // Already encrypted in history
        : targetEntry.value,
      change_reason: `Rolled back to version ${targetVersion}`,
    }, userId);
  }
}
