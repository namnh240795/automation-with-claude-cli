import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnvironmentDto, UpdateEnvironmentDto } from './dto';

const SELECT = {
  id: true,
  name: true,
  description: true,
  is_active: true,
  created_at: true,
  updated_at: true,
};

@Injectable()
export class EnvironmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEnvironmentDto, userId: string) {
    try {
      return await this.prisma.environment.create({
        data: {
          name: dto.name,
          description: dto.description,
          created_by: userId,
          updated_by: userId,
        },
        select: SELECT,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(`Environment with name "${dto.name}" already exists`);
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.environment.findMany({
      where: { deleted_at: null },
      select: SELECT,
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: string) {
    const environment = await this.prisma.environment.findUnique({
      where: { id, deleted_at: null },
      select: SELECT,
    });

    if (!environment) {
      throw new NotFoundException(`Environment with ID "${id}" not found`);
    }

    return environment;
  }

  async update(id: string, dto: UpdateEnvironmentDto, userId: string) {
    await this.findOne(id);

    return this.prisma.environment.update({
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

    await this.prisma.environment.update({
      where: { id },
      data: {
        deleted_at: new Date(),
        deleted_by: userId,
      },
    });
  }
}
