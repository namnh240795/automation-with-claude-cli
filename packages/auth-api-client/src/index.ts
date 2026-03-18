/**
 * Auth Service API Client
 *
 * Auto-generated TypeScript API client from Auth Service OpenAPI specification.
 *
 * @example
 * ```typescript
 * import { AuthServiceClient } from '@app/auth-api-client';
 *
 * const client = new AuthServiceClient({
 *   baseURL: 'http://localhost:3001/auth',
 * });
 *
 * const response = await client.auth.v1.realms.getRealms();
 * ```
 */

// Export HTTP client configuration
export * from './http-client';

// Export all data contracts/types
export * from './data-contracts';

// Export the Auth service routes/client
export * from './Auth';

// Re-export the main API class with a friendly name
export { Auth as AuthServiceClient } from './Auth';
