// Jest setup file for mocking Keycloak dependencies

// Mock nest-keycloak-connect
jest.mock('nest-keycloak-connect', () => ({
  AuthGuard: jest.fn().mockImplementation(() => ({
    canActivate: jest.fn(() => true),
  })),
  EnforcerOptions: {},
  PolicyEnforcementMode: {
    PERMISSIVE: 'PERMISSIVE',
    ENFORCING: 'ENFORCING',
    DISABLED: 'DISABLED',
  },
  TokenValidation: {
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE',
  },
  Unprotected: () => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    return descriptor;
  },
}));

// Mock keycloak-connect
jest.mock('keycloak-connect', () => ({
  Keycloak: jest.fn().mockImplementation(() => ({
    enforce: jest.fn(),
  })),
  Grant: jest.fn(),
}));

// Mock @app/keycloak-integration module
const mockKeycloakModule = {
  registerAsync: jest.fn(() => ({
    module: jest.fn(),
    imports: [],
    providers: [],
    exports: [],
  })),
  register: jest.fn(() => ({
    module: jest.fn(),
    imports: [],
    providers: [],
    exports: [],
  })),
};

jest.mock('@app/keycloak-integration', () => ({
  KeycloakModule: mockKeycloakModule,
  KeycloakService: jest.fn().mockImplementation(() => ({
    login: jest.fn(),
    exchangeCodeForToken: jest.fn(),
    refreshToken: jest.fn(),
    logout: jest.fn(),
    getUserInfo: jest.fn(),
    getAuthorizationUrl: jest.fn(),
    decodeToken: jest.fn(),
    extractUserInfo: jest.fn(),
    isTokenExpired: jest.fn(),
  })),
  KeycloakAuthGuard: jest.fn().mockImplementation(() => ({
    canActivate: jest.fn(() => true),
  })),
  KeycloakUser: jest.fn().mockImplementation(() => (data: any, ctx: any) => ({
    sub: 'test-user-id',
    email: 'test@example.com',
    given_name: 'Test',
    family_name: 'User',
    email_verified: true,
  })),
  KeycloakUserId: jest.fn(),
  KeycloakRoles: jest.fn(),
  KeycloakEmail: jest.fn(),
  Unprotected: jest.fn(),
  EnforcerOptions: {},
}));
