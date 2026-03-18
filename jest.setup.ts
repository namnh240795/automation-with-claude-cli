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

// Mock @app/keycloak-integration module (doesn't exist yet, provide full mock)
// Temporarily disabled - module doesn't exist yet
// TODO: Uncomment when keycloak-integration library is created
/*
jest.mock('@app/keycloak-integration', () => ({
  KeycloakModule: {
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
  },
  KeycloakAuthGuard: jest.fn().mockImplementation(() => ({
    canActivate: jest.fn(() => true),
  })),
}));
*/
