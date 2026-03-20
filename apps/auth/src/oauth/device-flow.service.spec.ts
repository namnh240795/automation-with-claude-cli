import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DeviceFlowService } from './device-flow.service';
import { PrismaService } from '../prisma/prisma.service';
import { randomBytes } from 'crypto';
import { TOKEN_LIFETIMES } from './oauth.constants';

jest.mock('../prisma/prisma.service');
jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomBytes: jest.fn(),
}));

describe('DeviceFlowService', () => {
  let service: DeviceFlowService;
  let prismaService: any;

  const mockClient = {
    id: 'client-id-1',
    name: 'Test Device Client',
    logo_uri: 'https://example.com/logo.png',
  };

  const mockDeviceCode = {
    id: 'device-code-id-1',
    device_code: 'device-code-123456789',
    user_code: 'ABCD-1234',
    client_id: 'client-id-1',
    user_id: 'user-id-1',
    scope: 'openid email',
    expires_at: new Date(Date.now() + TOKEN_LIFETIMES.DEVICE_CODE * 1000),
    interval: 5,
    verified: false,
    completed_at: null,
    created_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceFlowService,
        {
          provide: PrismaService,
          useValue: {
            oAuthClient: {
              findUnique: jest.fn(),
            },
            oAuthDeviceCode: {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              deleteMany: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<DeviceFlowService>(DeviceFlowService);
    prismaService = module.get(PrismaService);

    // Mock randomBytes
    (randomBytes as jest.Mock).mockImplementation((size: number) => {
      if (size === 32) {
        return {
          toString: (encoding: string) => {
            if (encoding === 'base64url') return 'device-code-123456789';
            return 'device-code-123456789';
          },
        } as any;
      }
      // For user code (8 characters + hyphen)
      return {
        toString: () => 'ABCD1234',
      } as any;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateDeviceCode', () => {
    it('should generate device code successfully', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue(mockClient);
      prismaService.oAuthDeviceCode.create.mockResolvedValue(mockDeviceCode);

      const data = {
        client_id: 'test-client-id',
        scope: 'openid email',
      };

      // Act
      const result = await service.generateDeviceCode(data);

      // Assert
      expect(result).toBeDefined();
      expect(result.device_code).toBe('device-code-123456789');
      expect(result.user_code).toMatch(/^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}$/);
      expect(result.verification_uri).toBe('http://localhost:3001/auth/oauth/device/verify');
      expect(result.verification_uri_complete).toContain(result.user_code);
      expect(result.expires_in).toBe(TOKEN_LIFETIMES.DEVICE_CODE);
      expect(result.interval).toBe(5);
    });

    it('should throw NotFoundException if client not found', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue(null);

      const data = {
        client_id: 'non-existent',
        scope: 'openid',
      };

      // Act & Assert
      await expect(service.generateDeviceCode(data)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getDeviceCodeByUserCode', () => {
    it('should return device code by user code', async () => {
      // Arrange
      prismaService.oAuthDeviceCode.findUnique.mockResolvedValue({
        ...mockDeviceCode,
        client: mockClient,
      });

      // Act
      const result = await service.getDeviceCodeByUserCode('ABCD-1234');

      // Assert
      expect(result).toBeDefined();
      expect(result.device_code).toBe('device-code-123456789');
      expect(result.user_code).toBe('ABCD-1234');
      expect(result.client_name).toBe('Test Device Client');
    });

    it('should throw NotFoundException for invalid user code', async () => {
      // Arrange
      prismaService.oAuthDeviceCode.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(service.getDeviceCodeByUserCode('INVALID')).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException for expired device code', async () => {
      // Arrange
      prismaService.oAuthDeviceCode.findUnique.mockResolvedValue({
        ...mockDeviceCode,
        expires_at: new Date(Date.now() - 1000),
      });

      // Act & Assert
      await expect(service.getDeviceCodeByUserCode('ABCD-1234')).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for already completed device code', async () => {
      // Arrange
      prismaService.oAuthDeviceCode.findUnique.mockResolvedValue({
        ...mockDeviceCode,
        completed_at: new Date(),
      });

      // Act & Assert
      await expect(service.getDeviceCodeByUserCode('ABCD-1234')).rejects.toThrow(BadRequestException);
    });
  });

  describe('verifyDeviceCode', () => {
    it('should verify device code successfully', async () => {
      // Arrange
      prismaService.oAuthDeviceCode.findUnique.mockResolvedValue(mockDeviceCode);
      prismaService.oAuthDeviceCode.update.mockResolvedValue({
        ...mockDeviceCode,
        verified: true,
      });

      // Act
      await service.verifyDeviceCode({
        user_code: 'ABCD-1234',
        user_id: 'user-id-1',
      });

      // Assert
      expect(prismaService.oAuthDeviceCode.update).toHaveBeenCalledWith({
        where: { id: 'device-code-id-1' },
        data: {
          user_id: 'user-id-1',
          verified: true,
        },
      });
    });

    it('should throw NotFoundException for invalid user code', async () => {
      // Arrange
      prismaService.oAuthDeviceCode.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(
        service.verifyDeviceCode({
          user_code: 'INVALID',
          user_id: 'user-id-1',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('denyDeviceCode', () => {
    it('should mark device code as completed (denied)', async () => {
      // Arrange
      prismaService.oAuthDeviceCode.findUnique.mockResolvedValue(mockDeviceCode);
      prismaService.oAuthDeviceCode.update.mockResolvedValue({
        ...mockDeviceCode,
        completed_at: new Date(),
      });

      // Act
      await service.denyDeviceCode('ABCD-1234');

      // Assert
      expect(prismaService.oAuthDeviceCode.update).toHaveBeenCalledWith({
        where: { id: 'device-code-id-1' },
        data: {
          completed_at: expect.any(Date),
        },
      });
    });
  });

  describe('pollDeviceStatus', () => {
    it('should return pending status for unverified device code', async () => {
      // Arrange
      prismaService.oAuthDeviceCode.findUnique.mockResolvedValue({
        ...mockDeviceCode,
        client: mockClient,
      });

      // Act
      const result = await service.pollDeviceStatus('device-code-123456789');

      // Assert
      expect(result).toEqual({
        status: 'pending',
      });
    });

    it('should return authorized status for verified device code', async () => {
      // Arrange
      prismaService.oAuthDeviceCode.findUnique.mockResolvedValue({
        ...mockDeviceCode,
        verified: true,
        user_id: 'user-id-1',
        client: mockClient,
      });

      // Act
      const result = await service.pollDeviceStatus('device-code-123456789');

      // Assert
      expect(result).toEqual({
        status: 'authorized',
        user_id: 'user-id-1',
      });
    });

    it('should return expired status for expired device code', async () => {
      // Arrange
      prismaService.oAuthDeviceCode.findUnique.mockResolvedValue(null);

      // Act
      const result = await service.pollDeviceStatus('device-code-123456789');

      // Assert
      expect(result).toEqual({
        status: 'expired',
      });
    });

    it('should return expired status for completed device code', async () => {
      // Arrange
      prismaService.oAuthDeviceCode.findUnique.mockResolvedValue({
        ...mockDeviceCode,
        verified: true,
        completed_at: new Date(),
        client: mockClient,
      });

      // Act
      const result = await service.pollDeviceStatus('device-code-123456789');

      // Assert
      expect(result).toEqual({
        status: 'expired',
      });
    });
  });

  describe('completeDeviceFlow', () => {
    it('should mark device flow as completed', async () => {
      // Arrange
      prismaService.oAuthDeviceCode.update.mockResolvedValue({
        ...mockDeviceCode,
        completed_at: new Date(),
      });

      // Act
      await service.completeDeviceFlow('device-code-123456789');

      // Assert
      expect(prismaService.oAuthDeviceCode.update).toHaveBeenCalledWith({
        where: { device_code: 'device-code-123456789' },
        data: {
          completed_at: expect.any(Date),
        },
      });
    });
  });

  describe('getDeviceCodeInfo', () => {
    it('should return device code info', async () => {
      // Arrange
      prismaService.oAuthDeviceCode.findUnique.mockResolvedValue(mockDeviceCode);

      // Act
      const result = await service.getDeviceCodeInfo('device-code-123456789');

      // Assert
      expect(result).toBeDefined();
      expect(result?.id).toBe('device-code-id-1');
      expect(result?.client_id).toBe('client-id-1');
    });

    it('should return null for non-existent device code', async () => {
      // Arrange
      prismaService.oAuthDeviceCode.findUnique.mockResolvedValue(null);

      // Act
      const result = await service.getDeviceCodeInfo('non-existent');

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('cleanupExpiredDeviceCodes', () => {
    it('should delete expired device codes', async () => {
      // Arrange
      prismaService.oAuthDeviceCode.deleteMany.mockResolvedValue({ count: 3 });

      // Act
      const result = await service.cleanupExpiredDeviceCodes();

      // Assert
      expect(result).toBe(3);
      expect(prismaService.oAuthDeviceCode.deleteMany).toHaveBeenCalledWith({
        where: {
          expires_at: {
            lt: expect.any(Date),
          },
        },
      });
    });
  });

  describe('getPendingDeviceCodes', () => {
    it('should return pending device codes for user', async () => {
      // Arrange
      const deviceCodes = [
        { ...mockDeviceCode, client: mockClient },
      ];
      prismaService.oAuthDeviceCode.findMany.mockResolvedValue(deviceCodes);

      // Act
      const result = await service.getPendingDeviceCodes('user-id-1');

      // Assert
      expect(result).toEqual(deviceCodes);
      expect(prismaService.oAuthDeviceCode.findMany).toHaveBeenCalledWith({
        where: {
          user_id: 'user-id-1',
          verified: true,
          completed_at: null,
          expires_at: {
            gt: expect.any(Date),
          },
        },
        include: {
          client: {
            select: {
              name: true,
              client_id: true,
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      });
    });
  });
});
