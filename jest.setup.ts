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
jest.mock('@app/keycloak-integration', () => {
  const actual = jest.requireActual('@app/keycloak-integration');
  return {
    ...actual,
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
  };
});
