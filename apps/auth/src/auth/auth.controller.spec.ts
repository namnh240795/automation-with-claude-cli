import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '@app/auth-utilities';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  const mockAuthResponse = {
    access_token: 'access-token-123',
    refresh_token: 'refresh-token-123',
    token_type: 'Bearer' as const,
    expires_in: 3600,
  };

  const mockUserProfile = {
    id: 'user-id',
    email: 'test@example.com',
    first_name: 'John',
    last_name: 'Doe',
    role: 'USER',
    is_active: true,
    created_at: new Date(),
  };

  const mockJwtPayload = {
    sub: 'user-id',
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
            signup: jest.fn(),
            signin: jest.fn(),
            getProfile: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should register a new user', async () => {
      const signUpDto = {
        email: 'test@example.com',
        password: 'Password123!',
        first_name: 'John',
        last_name: 'Doe',
      };
      authService.signup.mockResolvedValue(mockAuthResponse);

      const result = await controller.signup(signUpDto);

      expect(result).toEqual(mockAuthResponse);
      expect(authService.signup).toHaveBeenCalledWith(signUpDto);
    });

    it('should return auth tokens on successful registration', async () => {
      const signUpDto = {
        email: 'new@example.com',
        password: 'SecurePass123!',
        first_name: 'Jane',
        last_name: 'Smith',
      };
      authService.signup.mockResolvedValue({
        ...mockAuthResponse,
        refresh_token: 'new-refresh-token',
      });

      const result = await controller.signup(signUpDto);

      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('refresh_token');
      expect(result.token_type).toBe('Bearer');
      expect(authService.signup).toHaveBeenCalledWith(signUpDto);
    });
  });

  describe('signin', () => {
    it('should sign in user with valid credentials', async () => {
      const signInDto = {
        email: 'test@example.com',
        password: 'Password123!',
      };
      authService.signin.mockResolvedValue(mockAuthResponse);

      const result = await controller.signin(signInDto);

      expect(result).toEqual(mockAuthResponse);
      expect(authService.signin).toHaveBeenCalledWith(signInDto);
    });

    it('should return tokens when signin succeeds', async () => {
      const signInDto = {
        email: 'test@example.com',
        password: 'Password123!',
      };
      authService.signin.mockResolvedValue({
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
        token_type: 'Bearer',
        expires_in: 3600,
      });

      const result = await controller.signin(signInDto);

      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('refresh_token');
      expect(authService.signin).toHaveBeenCalledWith(signInDto);
    });
  });

  describe('getProfile', () => {
    it('should return user profile for authenticated user', async () => {
      authService.getProfile.mockResolvedValue(mockUserProfile);

      const result = await controller.getProfile(mockJwtPayload);

      expect(result).toEqual(mockUserProfile);
      expect(authService.getProfile).toHaveBeenCalledWith(mockJwtPayload.sub);
    });

    it('should return profile with correct user data', async () => {
      const userProfile = {
        id: mockJwtPayload.sub,
        email: mockJwtPayload.email,
        first_name: mockJwtPayload.first_name,
        last_name: mockJwtPayload.last_name,
        role: 'USER',
        is_active: true,
        created_at: new Date(),
      };
      authService.getProfile.mockResolvedValue(userProfile);

      const result = await controller.getProfile(mockJwtPayload);

      expect(result.id).toBe(mockJwtPayload.sub);
      expect(result.email).toBe(mockJwtPayload.email);
      expect(authService.getProfile).toHaveBeenCalledWith(mockJwtPayload.sub);
    });
  });
});