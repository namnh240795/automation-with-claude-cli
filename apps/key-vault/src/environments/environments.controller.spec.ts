import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentsController } from './environments.controller';
import { EnvironmentsService } from './environments.service';
import { JwtAuthGuard } from '@app/auth-utilities';
import { RolesGuard } from '@app/auth-utilities';

describe('EnvironmentsController', () => {
  let controller: EnvironmentsController;
  let service: EnvironmentsService;

  const mockEnvironment = {
    id: 'env-1',
    name: 'production',
    description: 'Production environment',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockUser = {
    sub: 'user-1',
    email: 'admin@example.com',
    roles: ['SUPER_ADMIN'],
    iat: 1234567890,
    exp: 1234567890,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnvironmentsController],
      providers: [
        {
          provide: EnvironmentsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<EnvironmentsController>(EnvironmentsController);
    service = module.get<EnvironmentsService>(EnvironmentsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    it('should create an environment', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockEnvironment as any);

      const result = await controller.create(
        { name: 'production', description: 'Production environment' },
        mockUser as any,
      );

      expect(result).toEqual(mockEnvironment);
      expect(service.create).toHaveBeenCalledWith(
        { name: 'production', description: 'Production environment' },
        'user-1',
      );
    });
  });

  describe('findAll', () => {
    it('should return all environments', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue([mockEnvironment] as any);

      const result = await controller.findAll();

      expect(result).toEqual([mockEnvironment]);
    });
  });

  describe('findOne', () => {
    it('should return an environment by ID', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockEnvironment as any);

      const result = await controller.findOne('env-1');

      expect(result).toEqual(mockEnvironment);
      expect(service.findOne).toHaveBeenCalledWith('env-1');
    });
  });

  describe('update', () => {
    it('should update an environment', async () => {
      const updated = { ...mockEnvironment, name: 'prod' };
      jest.spyOn(service, 'update').mockResolvedValue(updated as any);

      const result = await controller.update(
        'env-1',
        { name: 'prod' },
        mockUser as any,
      );

      expect(result.name).toBe('prod');
      expect(service.update).toHaveBeenCalledWith(
        'env-1',
        { name: 'prod' },
        'user-1',
      );
    });
  });

  describe('remove', () => {
    it('should soft delete an environment', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove('env-1', mockUser as any);

      expect(service.remove).toHaveBeenCalledWith('env-1', 'user-1');
    });
  });
});
