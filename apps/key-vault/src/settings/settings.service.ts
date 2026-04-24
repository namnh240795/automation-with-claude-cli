import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto, UpdateSettingDto } from './dto';

const SELECT = {
  id: true,
  service_name: true,
  key: true,
  type: true,
  description: true,
  is_active: true,
  created_at: true,
  updated_at: true,
};

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSettingDto, userId: string) {
    try {
      return await this.prisma.setting.create({
        data: {
          service_name: dto.service_name,
          key: dto.key,
          type: dto.type,
          description: dto.description,
          created_by: userId,
          updated_by: userId,
        },
        select: SELECT,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          `Setting with key "${dto.key}" already exists for service "${dto.service_name}"`,
        );
      }
      throw error;
    }
  }

  async findAll(filters?: {
    service_name?: string;
    type?: string;
    search?: string;
  }) {
    const where: any = { deleted_at: null };

    if (filters?.service_name) {
      where.service_name = filters.service_name;
    }
    if (filters?.type) {
      where.type = filters.type;
    }
    if (filters?.search) {
      where.OR = [
        { key: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { service_name: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.setting.findMany({
      where,
      select: SELECT,
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: string) {
    const setting = await this.prisma.setting.findUnique({
      where: { id, deleted_at: null },
      select: {
        ...SELECT,
        setting_values: {
          select: {
            id: true,
            environment_id: true,
            value: true,
            version: true,
            change_reason: true,
            created_at: true,
          },
          orderBy: { version: 'desc' },
        },
      },
    });

    if (!setting) {
      throw new NotFoundException(`Setting with ID "${id}" not found`);
    }

    return setting;
  }

  async update(id: string, dto: UpdateSettingDto, userId: string) {
    await this.findOne(id);

    return this.prisma.setting.update({
      where: { id },
      data: {
        ...dto,
        updated_by: userId,
      },
      select: SELECT,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id);

    await this.prisma.setting.update({
      where: { id },
      data: {
        deleted_at: new Date(),
        deleted_by: userId,
      },
    });
  }
}
