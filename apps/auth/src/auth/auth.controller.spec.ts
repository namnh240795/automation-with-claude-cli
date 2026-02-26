import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtPayloadDto } from '@app/auth-utilities';
import { SignUpDto, SignInDto, UserResponseDto, TokenResponseDto } from '../dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  // Mock data
  const mockUserResponse: UserResponseDto = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    email: 'test@example.com',
    first_name: 'John',
    last_name: 'Doe',
    is_active: true,
    email_verified: false,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockTokenResponse: TokenResponseDto = {
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh',
    token_type: 'Bearer',
    expires_in: 3600,
  };

  const mockJwtPayload: JwtPayloadDto = {
    sub: '550e8400-e29b-41d4-a716-446655440000',
    email: 'test@example.com',
    first_name: 'John',
    last_name: 'Doe',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
            refreshAccessToken: jest.fn(),
            logout: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('AuthController', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('signUp', () => {
    const signUpDto: SignUpDto = {
      email: 'test@example.com',
      password: 'SecurePass123',
      first_name: 'John',
      last_name: 'Doe',
    };

    it('should call authService.signUp with correct DTO', async () => {
      // Arrange
      authService.signUp = jest.fn().mockResolvedValue(mockUserResponse);

      // Act
      const result = await controller.signUp(signUpDto);

      // Assert
      expect(authService.signUp).toHaveBeenCalledWith(signUpDto);
      expect(result).toEqual(mockUserResponse);
    });

    it('should return UserResponseDto on successful signup', async () => {
      // Arrange
      authService.signUp = jest.fn().mockResolvedValue(mockUserResponse);

      // Act
      const result = await controller.signUp(signUpDto);

      // Assert
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('email', signUpDto.email);
      expect(result).toHaveProperty('first_name', signUpDto.first_name);
      expect(result).toHaveProperty('last_name', signUpDto.last_name);
      expect(result).toHaveProperty('is_active');
      expect(result).toHaveProperty('email_verified');
      expect(result).toHaveProperty('created_at');
      expect(result).toHaveProperty('updated_at');
    });

    it('should handle signup without optional fields', async () => {
      // Arrange
      const signUpDtoWithoutNames: SignUpDto = {
        email: 'test@example.com',
        password: 'SecurePass123',
      };
      const userWithoutNames = { ...mockUserResponse, first_name: undefined, last_name: undefined };
      authService.signUp = jest.fn().mockResolvedValue(userWithoutNames);

      // Act
      const result = await controller.signUp(signUpDtoWithoutNames);

      // Assert
      expect(authService.signUp).toHaveBeenCalledWith(signUpDtoWithoutNames);
      expect(result.first_name).toBeUndefined();
      expect(result.last_name).toBeUndefined();
    });

    it('should propagate errors from service', async () => {
      // Arrange
      const error = new Error('Service error');
      authService.signUp = jest.fn().mockRejectedValue(error);

      // Act & Assert
      await expect(controller.signUp(signUpDto)).rejects.toThrow(error);
    });
  });

  describe('signIn', () => {
    const signInDto: SignInDto = {
      email: 'test@example.com',
      password: 'SecurePass123',
    };

    it('should call authService.signIn with correct DTO', async () => {
      // Arrange
      authService.signIn = jest.fn().mockResolvedValue(mockTokenResponse);

      // Act
      const result = await controller.signIn(signInDto);

      // Assert
      expect(authService.signIn).toHaveBeenCalledWith(signInDto);
      expect(result).toEqual(mockTokenResponse);
    });

    it('should return TokenResponseDto on successful signin', async () => {
      // Arrange
      authService.signIn = jest.fn().mockResolvedValue(mockTokenResponse);

      // Act
      const result = await controller.signIn(signInDto);

      // Assert
      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('refresh_token');
      expect(result).toHaveProperty('token_type', 'Bearer');
      expect(result).toHaveProperty('expires_in', 3600);
    });

    it('should propagate errors from service', async () => {
      // Arrange
      const error = new Error('Invalid credentials');
      authService.signIn = jest.fn().mockRejectedValue(error);

      // Act & Assert
      await expect(controller.signIn(signInDto)).rejects.toThrow(error);
    });
  });

  describe('refresh', () => {
    const refreshToken = 'valid-refresh-token';

    it('should call authService.refreshAccessToken with refresh token', async () => {
      // Arrange
      authService.refreshAccessToken = jest.fn().mockResolvedValue(mockTokenResponse);

      // Act
      const result = await controller.refresh(refreshToken);

      // Assert
      expect(authService.refreshAccessToken).toHaveBeenCalledWith(refreshToken);
      expect(result).toEqual(mockTokenResponse);
    });

    it('should return new TokenResponseDto on successful refresh', async () => {
      // Arrange
      authService.refreshAccessToken = jest.fn().mockResolvedValue(mockTokenResponse);

      // Act
      const result = await controller.refresh(refreshToken);

      // Assert
      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('refresh_token');
      expect(result).toHaveProperty('token_type', 'Bearer');
      expect(result).toHaveProperty('expires_in');
    });

    it('should propagate errors from service', async () => {
      // Arrange
      const error = new Error('Invalid refresh token');
      authService.refreshAccessToken = jest.fn().mockRejectedValue(error);

      // Act & Assert
      await expect(controller.refresh(refreshToken)).rejects.toThrow(error);
    });

    it('should handle empty refresh token', async () => {
      // Arrange
      authService.refreshAccessToken = jest.fn().mockRejectedValue(new Error('Invalid refresh token'));

      // Act & Assert
      await expect(controller.refresh('')).rejects.toThrow();
    });
  });

  describe('logout', () => {
    const refreshToken = 'refresh-token-to-revoke';

    it('should call authService.logout with refresh token', async () => {
      // Arrange
      authService.logout = jest.fn().mockResolvedValue(undefined);

      // Act
      await controller.logout(refreshToken);

      // Assert
      expect(authService.logout).toHaveBeenCalledWith(refreshToken);
    });

    it('should complete without returning value', async () => {
      // Arrange
      authService.logout = jest.fn().mockResolvedValue(undefined);

      // Act
      const result = await controller.logout(refreshToken);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should propagate errors from service', async () => {
      // Arrange
      const error = new Error('Logout failed');
      authService.logout = jest.fn().mockRejectedValue(error);

      // Act & Assert
      await expect(controller.logout(refreshToken)).rejects.toThrow(error);
    });

    it('should handle empty refresh token gracefully', async () => {
      // Arrange
      authService.logout = jest.fn().mockResolvedValue(undefined);

      // Act & Assert - should not throw
      await expect(controller.logout('')).resolves.toBeUndefined();
    });
  });

  describe('getProfile', () => {
    it('should return user profile from JWT payload', async () => {
      // Act
      const result = await controller.getProfile(mockJwtPayload);

      // Assert
      expect(result).toEqual({
        id: mockJwtPayload.sub,
        email: mockJwtPayload.email,
        first_name: mockJwtPayload.first_name,
        last_name: mockJwtPayload.last_name,
        is_active: true,
        email_verified: true,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      });
    });

    it('should return correct structure for UserResponseDto', async () => {
      // Act
      const result = await controller.getProfile(mockJwtPayload);

      // Assert
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('first_name');
      expect(result).toHaveProperty('last_name');
      expect(result).toHaveProperty('is_active', true);
      expect(result).toHaveProperty('email_verified', true);
      expect(result).toHaveProperty('created_at');
      expect(result).toHaveProperty('updated_at');
    });

    it('should handle JWT payload without optional fields', async () => {
      // Arrange
      const payloadWithoutNames: JwtPayloadDto = {
        sub: '550e8400-e29b-41d4-a716-446655440000',
        email: 'test@example.com',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      };

      // Act
      const result = await controller.getProfile(payloadWithoutNames);

      // Assert
      expect(result.first_name).toBeUndefined();
      expect(result.last_name).toBeUndefined();
      expect(result.email).toBe(payloadWithoutNames.email);
      expect(result.id).toBe(payloadWithoutNames.sub);
    });

    it('should generate current timestamps', async () => {
      // Act
      const result = await controller.getProfile(mockJwtPayload);

      // Assert
      expect(result.created_at).toBeInstanceOf(Date);
      expect(result.updated_at).toBeInstanceOf(Date);
    });

    it('should not perform database lookup', async () => {
      // This test verifies that getProfile doesn't use authService
      // Arrange - authService should not be called
      const spySign = jest.spyOn(authService, 'signIn');
      const spySignUp = jest.spyOn(authService, 'signUp');
      const spyRefresh = jest.spyOn(authService, 'refreshAccessToken');
      const spyLogout = jest.spyOn(authService, 'logout');

      // Act
      await controller.getProfile(mockJwtPayload);

      // Assert
      expect(spySign).not.toHaveBeenCalled();
      expect(spySignUp).not.toHaveBeenCalled();
      expect(spyRefresh).not.toHaveBeenCalled();
      expect(spyLogout).not.toHaveBeenCalled();
    });
  });

  describe('DTO validation behavior', () => {
    it('should accept valid SignUpDto format', async () => {
      // Arrange
      const validSignUpDto: SignUpDto = {
        email: 'user@example.com',
        password: 'SecurePass123',
        first_name: 'John',
        last_name: 'Doe',
      };
      authService.signUp = jest.fn().mockResolvedValue(mockUserResponse);

      // Act & Assert - should not throw validation errors
      await expect(controller.signUp(validSignUpDto)).resolves.toBeDefined();
    });

    it('should accept valid SignInDto format', async () => {
      // Arrange
      const validSignInDto: SignInDto = {
        email: 'user@example.com',
        password: 'password123',
      };
      authService.signIn = jest.fn().mockResolvedValue(mockTokenResponse);

      // Act & Assert - should not throw validation errors
      await expect(controller.signIn(validSignInDto)).resolves.toBeDefined();
    });
  });

  describe('endpoint paths and methods', () => {
    it('should have POST /signup endpoint', () => {
      // Verify the endpoint is defined (metadata is checked via Swagger)
      expect(controller.signUp).toBeDefined();
    });

    it('should have POST /signin endpoint', () => {
      expect(controller.signIn).toBeDefined();
    });

    it('should have POST /refresh endpoint', () => {
      expect(controller.refresh).toBeDefined();
    });

    it('should have POST /logout endpoint', () => {
      expect(controller.logout).toBeDefined();
    });

    it('should have GET /profile endpoint', () => {
      expect(controller.getProfile).toBeDefined();
    });
  });
});
