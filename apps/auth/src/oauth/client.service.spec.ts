import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ClientService } from './client.service';
import { PrismaService } from '../prisma/prisma.service';
import { hashPassword } from '@app/auth-utilities';
import { randomBytes } from 'crypto';

jest.mock('../prisma/prisma.service');
jest.mock('@app/auth-utilities', () => ({
  hashPassword: jest.fn(),
  verifyPassword: jest.fn(),
}));
jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomBytes: jest.fn(),
}));

describe('ClientService', () => {
  let service: ClientService;
  let prismaService: any;

  // Mock data
  const mockClient = {
    id: 'client-id-1',
    client_id: 'test-client-id',
    client_secret: 'secret-123',
    client_secret_hash: 'hashed-secret',
    name: 'Test Client',
    redirect_uris: ['https://example.com/callback'],
    scopes: ['openid', 'email'],
    grant_types: ['authorization_code', 'refresh_token'],
    is_confidential: true,
    is_public_client: false,
    require_pkce: false,
    access_token_lifetime: 3600,
    refresh_token_lifetime: 2592000,
    allowed_origins: ['https://example.com'],
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const publicClient = {
    ...mockClient,
    client_id: 'public-client-id',
    client_secret: null,
    client_secret_hash: null,
    is_confidential: false,
    is_public_client: true,
    require_pkce: true,
  };

  const inactiveClient = {
    ...mockClient,
    is_active: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: PrismaService,
          useValue: {
            oAuthClient: {
              create: jest.fn(),
              findUnique: jest.fn(),
              findMany: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    prismaService = module.get(PrismaService);

    // Mock randomBytes
    (randomBytes as jest.Mock).mockImplementation((size: number) => {
      const buffer = Buffer.alloc(size);
      buffer.fill('a');
      return buffer;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerClient', () => {
    it('should register a confidential client successfully', async () => {
      // Arrange
      const hashedSecret = 'hashed-secret';
      (hashPassword as jest.Mock).mockReturnValue(hashedSecret);
      const mockBuffer = Buffer.from('random-client-id');
      const mockSecretBuffer = Buffer.from('generated-secret-12345');
      (randomBytes as jest.Mock)
        .mockReturnValueOnce(mockBuffer)
        .mockReturnValueOnce(mockSecretBuffer);

      prismaService.oAuthClient.create.mockResolvedValue(mockClient);

      const registerDto = {
        name: 'Test Client',
        redirect_uris: ['https://example.com/callback'],
        scopes: ['openid', 'email'],
        grant_types: ['authorization_code'],
      };

      // Act
      const result = await service.registerClient(registerDto as any);

      // Assert
      expect(result).toBeDefined();
      expect(result.client_id).toBeDefined();
      expect(result.client_secret).toBeDefined();
      expect(prismaService.oAuthClient.create).toHaveBeenCalled();
    });

    it('should register a public client successfully', async () => {
      // Arrange
      const mockBuffer = Buffer.from('public-client-id');
      (randomBytes as jest.Mock).mockReturnValueOnce(mockBuffer);

      prismaService.oAuthClient.create.mockResolvedValue(publicClient);

      const registerDto = {
        name: 'Public Client',
        redirect_uris: ['https://example.com/callback'],
        scopes: ['openid'],
        grant_types: ['authorization_code'],
        is_confidential: false,
      };

      // Act
      const result = await service.registerClient(registerDto as any);

      // Assert
      expect(result).toBeDefined();
      expect(result.client_secret).toBeNull();
    });

    it('should throw BadRequestException for invalid scopes', async () => {
      // Arrange
      const mockBuffer = Buffer.from('test-client-id');
      (randomBytes as jest.Mock).mockReturnValueOnce(mockBuffer);

      const registerDto = {
        name: 'Test Client',
        redirect_uris: ['https://example.com/callback'],
        scopes: ['openid', 'email', 'invalid_scope'],
        grant_types: ['authorization_code'],
      };

      // Act & Assert
      await expect(service.registerClient(registerDto as any)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findByClientId', () => {
    it('should find client by client_id', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue(mockClient);

      // Act
      const result = await service.findByClientId('test-client-id');

      // Assert
      expect(result).toEqual(mockClient);
      expect(prismaService.oAuthClient.findUnique).toHaveBeenCalledWith({
        where: { client_id: 'test-client-id' },
      });
    });

    it('should throw NotFoundException if client not found', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findByClientId('non-existent')).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if client is inactive', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue(inactiveClient);

      // Act & Assert
      await expect(service.findByClientId('test-client-id')).rejects.toThrow(BadRequestException);
    });
  });

  describe('validateClient', () => {
    it('should validate confidential client with correct secret', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue(mockClient);
      const { verifyPassword } = require('@app/auth-utilities');
      (verifyPassword as jest.Mock).mockReturnValue(true);

      // Act
      const result = await service.validateClient('test-client-id', 'secret-123');

      // Assert
      expect(result).toBe(true);
    });

    it('should validate public client without secret', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue(publicClient);

      // Act
      const result = await service.validateClient('public-client-id', undefined);

      // Assert
      expect(result).toBe(true);
    });

    it('should reject confidential client with wrong secret', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue(mockClient);
      const { verifyPassword } = require('@app/auth-utilities');
      (verifyPassword as jest.Mock).mockReturnValue(false);

      // Act
      const result = await service.validateClient('test-client-id', 'wrong-secret');

      // Assert
      expect(result).toBe(false);
    });

    it('should reject non-existent client', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue(null);

      // Act
      const result = await service.validateClient('non-existent', 'secret');

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('validateRedirectUri', () => {
    it('should validate exact redirect URI match', () => {
      // Act
      const result = service.validateRedirectUri(mockClient, 'https://example.com/callback');

      // Assert
      expect(result).toBe(true);
    });

    it('should reject mismatched redirect URI', () => {
      // Act
      const result = service.validateRedirectUri(mockClient, 'https://evil.com/callback');

      // Assert
      expect(result).toBe(false);
    });

    it('should reject if redirect_uri not in list', () => {
      // Act
      const result = service.validateRedirectUri(mockClient, 'https://other.com/callback');

      // Assert
      expect(result).toBe(false);
    });

    it('should handle empty redirect_uris', () => {
      // Arrange
      const clientNoUris = { ...mockClient, redirect_uris: [] };

      // Act
      const result = service.validateRedirectUri(clientNoUris, 'https://example.com/callback');

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('supportsGrantType', () => {
    it('should return true for supported grant type', () => {
      // Act
      const result = service.supportsGrantType(mockClient, 'authorization_code');

      // Assert
      expect(result).toBe(true);
    });

    it('should return false for unsupported grant type', () => {
      // Act
      const result = service.supportsGrantType(mockClient, 'client_credentials');

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('supportsScope', () => {
    it('should return true for supported scope', () => {
      // Act
      const result = service.supportsScope(mockClient, 'openid email');

      // Assert
      expect(result).toBe(true);
    });

    it('should return true for subset of scopes', () => {
      // Act
      const result = service.supportsScope(mockClient, 'openid');

      // Assert
      expect(result).toBe(true);
    });

    it('should return false for unsupported scope', () => {
      // Act
      const result = service.supportsScope(mockClient, 'openid invalid');

      // Assert
      expect(result).toBe(false);
    });

    it('should handle empty scopes', () => {
      // Act
      const result = service.supportsScope(mockClient, '');

      // Assert
      expect(result).toBe(true);
    });
  });

  describe('listClients', () => {
    it('should return all clients', async () => {
      // Arrange
      const clients = [mockClient, publicClient];
      prismaService.oAuthClient.findMany.mockResolvedValue(clients);

      // Act
      const result = await service.listClients();

      // Assert
      expect(result).toEqual(clients);
    });
  });

  describe('getClientInfo', () => {
    it('should return client info without secret', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue(mockClient);

      // Act
      const result = await service.getClientInfo('test-client-id');

      // Assert
      expect(result).toBeDefined();
      expect(result.client_id).toBe('test-client-id');
      expect(result).not.toHaveProperty('client_secret');
    });

    it('should throw NotFoundException for non-existent client', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(service.getClientInfo('non-existent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteClient', () => {
    it('should delete client successfully', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue(mockClient);
      prismaService.oAuthClient.delete.mockResolvedValue(mockClient);

      // Act
      const result = await service.deleteClient('test-client-id');

      // Assert
      expect(result).toEqual({ message: 'Client deleted successfully' });
    });

    it('should throw NotFoundException for non-existent client', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(service.deleteClient('non-existent')).rejects.toThrow(NotFoundException);
    });
  });
});
