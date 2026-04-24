import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { EnvironmentsService } from './environments.service';
import { PrismaService } from '../prisma/prisma.service';

describe('EnvironmentsService', () => {
  let service: EnvironmentsService;
  let prisma: any;

  const mockEnvironment = {
    id: 'env-1',
    name: 'production',
    description: 'Production environment',
    is_active: true,
    created_at: new Date(),
    created_by: 'user-1',
    updated_at: new Date(),
    updated_by: 'user-1',
    deleted_at: null,
    deleted_by: null,
  };

  beforeEach(async () => {
    prisma = {
      environment: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnvironmentsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<EnvironmentsService>(EnvironmentsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    it('should create an environment', async () => {
      prisma.environment.create.mockResolvedValue(mockEnvironment);

      const result = await service.create(
        { name: 'production', description: 'Production environment' },
        'user-1',
      );

      expect(result).toEqual(mockEnvironment);
      expect(prisma.environment.create).toHaveBeenCalledWith({
        data: {
          name: 'production',
          description: 'Production environment',
          created_by: 'user-1',
          updated_by: 'user-1',
        },
        select: {
          id: true,
          name: true,
          description: true,
          is_active: true,
          created_at: true,
          updated_at: true,
        },
      });
    });

    it('should throw ConflictException on duplicate name (P2002)', async () => {
      prisma.environment.create.mockRejectedValue({ code: 'P2002' });

      await expect(
        service.create({ name: 'production' }, 'user-1'),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return all active environments', async () => {
      prisma.environment.findMany.mockResolvedValue([mockEnvironment]);

      const result = await service.findAll();

      expect(result).toEqual([mockEnvironment]);
      expect(prisma.environment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { deleted_at: null },
        }),
      );
    });
  });

  describe('findOne', () => {
    it('should return an environment by ID', async () => {
      prisma.environment.findUnique.mockResolvedValue(mockEnvironment);

      const result = await service.findOne('env-1');

      expect(result).toEqual(mockEnvironment);
      expect(prisma.environment.findUnique).toHaveBeenCalledWith({
        where: { id: 'env-1', deleted_at: null },
        select: expect.any(Object),
      });
    });

    it('should throw NotFoundException when environment not found', async () => {
      prisma.environment.findUnique.mockResolvedValue(null);

      await expect(service.findOne('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an environment', async () => {
      prisma.environment.findUnique.mockResolvedValue(mockEnvironment);
      prisma.environment.update.mockResolvedValue({
        ...mockEnvironment,
        name: 'prod',
      });

      const result = await service.update('env-1', { name: 'prod' }, 'user-1');

      expect(result.name).toBe('prod');
      expect(prisma.environment.update).toHaveBeenCalledWith({
        where: { id: 'env-1' },
        data: {
          name: 'prod',
          updated_by: 'user-1',
        },
        select: expect.any(Object),
      });
    });

    it('should throw NotFoundException when environment not found', async () => {
      prisma.environment.findUnique.mockResolvedValue(null);

      await expect(
        service.update('nonexistent', { name: 'prod' }, 'user-1'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should soft delete an environment', async () => {
      prisma.environment.findUnique.mockResolvedValue(mockEnvironment);
      prisma.environment.update.mockResolvedValue({
        ...mockEnvironment,
        deleted_at: new Date(),
        deleted_by: 'user-1',
      });

      await service.remove('env-1', 'user-1');

      expect(prisma.environment.update).toHaveBeenCalledWith({
        where: { id: 'env-1' },
        data: {
          deleted_at: expect.any(Date),
          deleted_by: 'user-1',
        },
      });
    });

    it('should throw NotFoundException when environment not found', async () => {
      prisma.environment.findUnique.mockResolvedValue(null);

      await expect(service.remove('nonexistent', 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
