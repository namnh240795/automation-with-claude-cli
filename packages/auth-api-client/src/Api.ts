/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** Service health status */
export enum HealthStatus {
  Ok = "ok",
  Error = "error",
  Degraded = "degraded",
}

export interface HelloResponseDto {
  /**
   * Greeting message
   * @example "Hello from Auth!"
   */
  message: string;
  /**
   * Response timestamp in ISO format
   * @format date-time
   * @example "2025-02-23T10:30:00.000Z"
   */
  timestamp?: string;
  /**
   * Request ID for tracing
   * @format uuid
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  requestId?: string;
}

export interface HealthResponseDto {
  /**
   * Service health status
   * @example "ok"
   */
  status: HealthStatus;
  /**
   * Current timestamp in ISO format
   * @format date-time
   * @example "2025-02-23T10:30:00.000Z"
   */
  timestamp: string;
  /**
   * Service name
   * @example "auth"
   */
  service?: string;
  /**
   * Service version
   * @example "1.0.0"
   */
  version?: string;
  /**
   * Server uptime in seconds
   * @format int64
   */
  uptime?: number;
}

export interface SignUpDto {
  /**
   * User email address
   * @format email
   * @example "user@example.com"
   */
  email: string;
  /**
   * User password
   * @minLength 8
   * @example "SecurePass123!"
   */
  password: string;
  /**
   * User's first name
   * @example "John"
   */
  first_name?: string;
  /**
   * User's last name
   * @example "Doe"
   */
  last_name?: string;
}

export interface SignupResponseDto {
  /**
   * User unique identifier
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;
  /**
   * User email address
   * @example "user@example.com"
   */
  email: string;
  /**
   * User's first name
   * @example "John"
   */
  first_name?: string;
  /**
   * User's last name
   * @example "Doe"
   */
  last_name?: string;
  /**
   * Whether the user account is active
   * @example true
   */
  is_active: boolean;
  /**
   * Whether the email has been verified
   * @example false
   */
  email_verified: boolean;
  /**
   * Account creation timestamp
   * @format date-time
   * @example "2024-02-24T12:00:00.000Z"
   */
  created_at: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2024-02-24T12:00:00.000Z"
   */
  updated_at: string;
}

export interface SignInDto {
  /**
   * User email address
   * @format email
   * @example "user@example.com"
   */
  email: string;
  /**
   * User password
   * @example "SecurePass123!"
   */
  password: string;
}

export interface TokenResponseDto {
  /**
   * JWT access token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  access_token: string;
  /**
   * JWT refresh token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  refresh_token: string;
  /**
   * Token type
   * @example "Bearer"
   */
  token_type: string;
  /**
   * Access token expiration in seconds
   * @example 3600
   */
  expires_in: number;
}

export interface RefreshTokenDto {
  /**
   * Refresh token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  refresh_token: string;
}

export interface VoidResponseDto {
  /**
   * Success message
   * @example "Operation completed successfully"
   */
  message?: string;
}

export interface RealmResponseDto {
  /**
   * Realm unique identifier
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;
  /**
   * Realm unique name
   * @example "my-realm"
   */
  name: string;
  /**
   * Whether the realm is enabled
   * @example true
   */
  enabled: boolean;
  /**
   * Whether SSL is required
   * @example "external"
   */
  ssl_required?: string;
  /**
   * Whether user registration is allowed
   * @example false
   */
  registration_allowed: boolean;
  /**
   * Login theme name
   * @example "keycloak"
   */
  login_theme?: string;
  /**
   * Account theme name
   * @example "keycloak"
   */
  account_theme?: string;
  /**
   * Admin theme name
   * @example "keycloak"
   */
  admin_theme?: string;
  /**
   * Email theme name
   * @example "keycloak"
   */
  email_theme?: string;
  /**
   * Whether internationalization is enabled
   * @example false
   */
  internationalization_enabled: boolean;
  /**
   * Default locale
   * @example "en"
   */
  default_locale?: string;
  /**
   * Access token lifespan in seconds
   * @example 300
   */
  access_token_lifespan?: number;
  /**
   * Access code lifespan in seconds
   * @example 60
   */
  access_code_lifespan?: number;
  /**
   * Reset password allowed
   * @example true
   */
  reset_password_allowed: boolean;
  /**
   * Edit username allowed
   * @example true
   */
  edit_username_allowed: boolean;
}

export interface PaginationMetaDto {
  /**
   * Total number of items
   * @example 100
   */
  total: number;
  /**
   * Current page number (zero-based)
   * @example 0
   */
  page: number;
  /**
   * Number of items per page
   * @example 20
   */
  limit: number;
  /**
   * Total number of pages
   * @example 5
   */
  total_pages: number;
}

export interface RealmsPaginatedResponseDto {
  /** Array of realms */
  data: RealmResponseDto[];
  /** Pagination metadata */
  meta: PaginationMetaDto;
}

export interface CreateRealmDto {
  /**
   * Realm unique name (used in URLs)
   * @example "my-realm"
   */
  name: string;
  /**
   * Whether the realm is enabled
   * @default true
   * @example true
   */
  enabled?: boolean;
  /**
   * Whether SSL is required for this realm
   * @example "external"
   */
  ssl_required?: string;
  /**
   * Whether user registration is allowed
   * @default false
   * @example false
   */
  registration_allowed?: boolean;
  /**
   * Login theme name
   * @example "keycloak"
   */
  login_theme?: string;
  /**
   * Account theme name
   * @example "keycloak"
   */
  account_theme?: string;
  /**
   * Admin theme name
   * @example "keycloak"
   */
  admin_theme?: string;
  /**
   * Email theme name
   * @example "keycloak"
   */
  email_theme?: string;
  /**
   * Whether internationalization is enabled
   * @default false
   * @example false
   */
  internationalization_enabled?: boolean;
  /**
   * Default locale
   * @example "en"
   */
  default_locale?: string;
  /**
   * Access token lifespan in seconds
   * @min 1
   * @example 300
   */
  access_token_lifespan?: number;
  /**
   * Access code lifespan in seconds
   * @min 1
   * @example 60
   */
  access_code_lifespan?: number;
  /**
   * Reset password allowed
   * @default true
   * @example true
   */
  reset_password_allowed?: boolean;
  /**
   * Edit username allowed
   * @default true
   * @example true
   */
  edit_username_allowed?: boolean;
}

export interface UpdateRealmDto {
  /**
   * Realm unique name (used in URLs)
   * @example "my-realm"
   */
  name?: string;
  /**
   * Whether the realm is enabled
   * @default true
   * @example true
   */
  enabled?: boolean;
  /**
   * Whether SSL is required for this realm
   * @example "external"
   */
  ssl_required?: string;
  /**
   * Whether user registration is allowed
   * @default false
   * @example false
   */
  registration_allowed?: boolean;
  /**
   * Login theme name
   * @example "keycloak"
   */
  login_theme?: string;
  /**
   * Account theme name
   * @example "keycloak"
   */
  account_theme?: string;
  /**
   * Admin theme name
   * @example "keycloak"
   */
  admin_theme?: string;
  /**
   * Email theme name
   * @example "keycloak"
   */
  email_theme?: string;
  /**
   * Whether internationalization is enabled
   * @default false
   * @example false
   */
  internationalization_enabled?: boolean;
  /**
   * Default locale
   * @example "en"
   */
  default_locale?: string;
  /**
   * Access token lifespan in seconds
   * @min 1
   * @example 300
   */
  access_token_lifespan?: number;
  /**
   * Access code lifespan in seconds
   * @min 1
   * @example 60
   */
  access_code_lifespan?: number;
  /**
   * Reset password allowed
   * @default true
   * @example true
   */
  reset_password_allowed?: boolean;
  /**
   * Edit username allowed
   * @default true
   * @example true
   */
  edit_username_allowed?: boolean;
}

export interface IdResponseDto {
  /**
   * Resource unique identifier
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;
}

export interface SmtpConfigResponseDto {
  /**
   * SMTP server host
   * @example "smtp.example.com"
   */
  host?: string;
  /**
   * SMTP server port
   * @example 587
   */
  port?: number;
  /** SMTP username */
  username?: string;
  /**
   * Email from address
   * @example "noreply@example.com"
   */
  from?: string;
  /** Reply-to address */
  reply_to?: string;
  /**
   * Enable SSL/TLS
   * @example true
   */
  ssl?: boolean;
  /**
   * Enable STARTTLS
   * @example true
   */
  start_tls?: string;
  /**
   * Email authentication enabled
   * @example true
   */
  auth?: boolean;
  /** Envelope from address */
  envelope_from?: string;
  /** SMTP server password (should not be returned) */
  password?: string;
}

export interface UserResponseDto {
  /**
   * User unique identifier
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;
  /**
   * User username
   * @example "john.doe"
   */
  username: string;
  /**
   * User email address
   * @example "john.doe@example.com"
   */
  email?: string;
  /**
   * User's first name
   * @example "John"
   */
  first_name?: string;
  /**
   * User's last name
   * @example "Doe"
   */
  last_name?: string;
  /**
   * Whether the user is enabled
   * @example true
   */
  enabled: boolean;
  /**
   * Whether the email is verified
   * @example false
   */
  email_verified: boolean;
  /**
   * Account creation timestamp
   * @format int64
   * @example "1708790400000"
   */
  created_timestamp?: number;
  /** Federation link */
  federation_link?: string;
  /** Service account client link */
  service_account_client_link?: string;
}

export interface UsersPaginatedResponseDto {
  /** Array of users */
  data: UserResponseDto[];
  /** Pagination metadata */
  meta: PaginationMetaDto;
}

export interface CreateUserDto {
  /**
   * User username (unique within realm)
   * @minLength 1
   * @example "john.doe"
   */
  username: string;
  /**
   * User email address
   * @format email
   * @example "john.doe@example.com"
   */
  email?: string;
  /**
   * User's first name
   * @example "John"
   */
  first_name?: string;
  /**
   * User's last name
   * @example "Doe"
   */
  last_name?: string;
  /**
   * Whether the user is enabled
   * @default true
   * @example true
   */
  enabled?: boolean;
  /**
   * Whether the email is verified
   * @default false
   * @example false
   */
  email_verified?: boolean;
  /** Federation link */
  federation_link?: string;
}

export interface UpdateUserDto {
  /**
   * User username (unique within realm)
   * @minLength 1
   * @example "john.doe"
   */
  username?: string;
  /**
   * User email address
   * @format email
   * @example "john.doe@example.com"
   */
  email?: string;
  /**
   * User's first name
   * @example "John"
   */
  first_name?: string;
  /**
   * User's last name
   * @example "Doe"
   */
  last_name?: string;
  /**
   * Whether the user is enabled
   * @default true
   * @example true
   */
  enabled?: boolean;
  /**
   * Whether the email is verified
   * @default false
   * @example false
   */
  email_verified?: boolean;
  /** Federation link */
  federation_link?: string;
}

export interface RoleResponseDto {
  /**
   * Role unique identifier
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;
  /**
   * Role name
   * @example "admin"
   */
  name: string;
  /**
   * Role description
   * @example "Administrator role with full access"
   */
  description?: string;
  /**
   * Whether this is a client-specific role
   * @example false
   */
  client_role: boolean;
  /**
   * Realm ID
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  realm: string;
}

export interface GroupResponseDto {
  /**
   * Group unique identifier
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;
  /**
   * Group name
   * @example "administrators"
   */
  name: string;
  /**
   * Parent group ID
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  parent_group?: string;
  /**
   * Realm ID
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  realm_id: string;
  /**
   * Group type
   * @example 0
   */
  type: number;
}

export interface RolesPaginatedResponseDto {
  /** Array of roles */
  data: RoleResponseDto[];
  /** Pagination metadata */
  meta: PaginationMetaDto;
}

export interface CreateRoleDto {
  /**
   * Role name (unique within realm)
   * @minLength 1
   * @example "admin"
   */
  name: string;
  /**
   * Role description
   * @example "Administrator role with full access"
   */
  description?: string;
}

export interface UpdateRoleDto {
  /**
   * Role name (unique within realm)
   * @minLength 1
   * @example "admin"
   */
  name?: string;
  /**
   * Role description
   * @example "Administrator role with full access"
   */
  description?: string;
}

export interface GroupsPaginatedResponseDto {
  /** Array of groups */
  data: GroupResponseDto[];
  /** Pagination metadata */
  meta: PaginationMetaDto;
}

export interface CreateGroupDto {
  /**
   * Group name
   * @minLength 1
   * @example "administrators"
   */
  name: string;
  /**
   * Parent group ID (optional, for hierarchical groups)
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  parent_id?: string;
}

export interface UpdateGroupDto {
  /**
   * Group name
   * @minLength 1
   * @example "administrators"
   */
  name?: string;
  /**
   * Parent group ID (optional, for hierarchical groups)
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  parent_id?: string;
}

export interface ClientResponseDto {
  /**
   * Client unique identifier
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;
  /**
   * Client identifier
   * @example "my-app"
   */
  client_id: string;
  /**
   * Client name
   * @example "My Application"
   */
  name?: string;
  /**
   * Client description
   * @example "My web application"
   */
  description?: string;
  /**
   * Whether the client is enabled
   * @example true
   */
  enabled: boolean;
  /**
   * Whether this is a public client
   * @example false
   */
  public_client: boolean;
  /**
   * Enable standard OAuth2 authorization code flow
   * @example true
   */
  standard_flow_enabled: boolean;
  /**
   * Enable implicit flow
   * @example false
   */
  implicit_flow_enabled: boolean;
  /**
   * Enable direct access grants
   * @example false
   */
  direct_access_grants_enabled: boolean;
  /**
   * Enable service accounts
   * @example false
   */
  service_accounts_enabled: boolean;
  /**
   * Require user consent
   * @example false
   */
  consent_required: boolean;
  /**
   * Whether this is a bearer-only client
   * @example false
   */
  bearer_only: boolean;
}

export interface ClientsPaginatedResponseDto {
  /** Array of clients */
  data: ClientResponseDto[];
  /** Pagination metadata */
  meta: PaginationMetaDto;
}

export interface CreateClientDto {
  /**
   * Client identifier (unique within realm)
   * @minLength 1
   * @example "my-app"
   */
  client_id: string;
  /**
   * Client name
   * @example "My Application"
   */
  name?: string;
  /**
   * Client description
   * @example "My web application"
   */
  description?: string;
  /**
   * Whether the client is enabled
   * @default true
   * @example true
   */
  enabled?: boolean;
  /**
   * Client secret (for confidential clients)
   * @example "my-secret-key"
   */
  secret?: string;
  /**
   * Whether this is a public client
   * @default false
   * @example false
   */
  public_client?: boolean;
  /**
   * Enable standard OAuth2 authorization code flow
   * @default true
   * @example true
   */
  standard_flow_enabled?: boolean;
  /**
   * Enable implicit flow
   * @default false
   * @example false
   */
  implicit_flow_enabled?: boolean;
  /**
   * Enable direct access grants (Resource Owner Password Credentials)
   * @default false
   * @example false
   */
  direct_access_grants_enabled?: boolean;
  /**
   * Enable service accounts
   * @default false
   * @example false
   */
  service_accounts_enabled?: boolean;
  /**
   * Require user consent
   * @default false
   * @example false
   */
  consent_required?: boolean;
  /**
   * Whether this is a bearer-only client (no direct user access)
   * @default false
   * @example false
   */
  bearer_only?: boolean;
  /**
   * Base URL
   * @example "http://localhost:3000"
   */
  base_url?: string;
  /**
   * Root URL
   * @example "http://localhost:3000"
   */
  root_url?: string;
  /** Management URL */
  management_url?: string;
  /**
   * Valid redirect URIs
   * @example ["http://localhost:3000/callback"]
   */
  redirect_uris?: string[];
  /**
   * Valid web origins
   * @example ["http://localhost:3000"]
   */
  web_origins?: string[];
  /**
   * Protocol (openid-connect, saml)
   * @example "openid-connect"
   */
  protocol?: string;
}

export interface UpdateClientDto {
  /**
   * Client identifier (unique within realm)
   * @minLength 1
   * @example "my-app"
   */
  client_id?: string;
  /**
   * Client name
   * @example "My Application"
   */
  name?: string;
  /**
   * Client description
   * @example "My web application"
   */
  description?: string;
  /**
   * Whether the client is enabled
   * @default true
   * @example true
   */
  enabled?: boolean;
  /**
   * Client secret (for confidential clients)
   * @example "my-secret-key"
   */
  secret?: string;
  /**
   * Whether this is a public client
   * @default false
   * @example false
   */
  public_client?: boolean;
  /**
   * Enable standard OAuth2 authorization code flow
   * @default true
   * @example true
   */
  standard_flow_enabled?: boolean;
  /**
   * Enable implicit flow
   * @default false
   * @example false
   */
  implicit_flow_enabled?: boolean;
  /**
   * Enable direct access grants (Resource Owner Password Credentials)
   * @default false
   * @example false
   */
  direct_access_grants_enabled?: boolean;
  /**
   * Enable service accounts
   * @default false
   * @example false
   */
  service_accounts_enabled?: boolean;
  /**
   * Require user consent
   * @default false
   * @example false
   */
  consent_required?: boolean;
  /**
   * Whether this is a bearer-only client (no direct user access)
   * @default false
   * @example false
   */
  bearer_only?: boolean;
  /**
   * Base URL
   * @example "http://localhost:3000"
   */
  base_url?: string;
  /**
   * Root URL
   * @example "http://localhost:3000"
   */
  root_url?: string;
  /** Management URL */
  management_url?: string;
  /**
   * Valid redirect URIs
   * @example ["http://localhost:3000/callback"]
   */
  redirect_uris?: string[];
  /**
   * Valid web origins
   * @example ["http://localhost:3000"]
   */
  web_origins?: string[];
  /**
   * Protocol (openid-connect, saml)
   * @example "openid-connect"
   */
  protocol?: string;
}

export interface ClientSecretResponseDto {
  /**
   * Client unique identifier
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;
  /**
   * Client identifier
   * @example "my-app"
   */
  client_id: string;
  /**
   * New client secret
   * @example "abc123def4567890"
   */
  secret: string;
  /**
   * Client type
   * @example "secret"
   */
  type: string;
}

export interface UserSessionResponseDto {
  /** User session ID */
  user_session_id: string;
  /** User ID */
  user_id: string;
  /** Realm ID */
  realm_id: string;
  /** Session created timestamp */
  created_on: number;
  /** Last session refresh timestamp */
  last_session_refresh: number;
  /** Broker session ID */
  broker_session_id?: string;
  /** Session data */
  data?: string;
}

export interface ClientSessionResponseDto {
  /** User session ID */
  user_session_id: string;
  /** Client ID */
  client_id: string;
  /** Session timestamp */
  timestamp?: number;
  /** Session data */
  data?: string;
  /** Client storage provider */
  client_storage_provider: string;
  /** External client ID */
  external_client_id: string;
  /** Offline flag */
  offline_flag: string;
}

export interface RevokeTokenDto {
  /**
   * Token to revoke
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  token: string;
  /**
   * Time in seconds until token should expire
   * @example 3600
   */
  expire?: number;
}

export interface RequiredActionResponseDto {
  /** Required action ID */
  id: string;
  /** Action alias */
  alias?: string;
  /** Action name */
  name?: string;
  /** Action provider ID */
  provider_id?: string;
  /** Whether action is enabled */
  enabled: boolean;
  /** Whether this is a default action */
  default_action: boolean;
  /** Action priority */
  priority?: number;
  /** Realm ID */
  realm_id?: string;
}

export interface CreateRequiredActionDto {
  /**
   * Action alias
   * @example "VERIFY_EMAIL"
   */
  alias: string;
  /**
   * Action name
   * @example "Verify Email"
   */
  name?: string;
  /**
   * Provider ID
   * @example "verify-email"
   */
  provider_id?: string;
  /**
   * Whether action is enabled
   * @example true
   */
  enabled: boolean;
  /**
   * Default action
   * @example false
   */
  default_action?: boolean;
  /**
   * Action priority
   * @example 10
   */
  priority?: number;
}

export interface UpdateRequiredActionDto {
  /** Action alias */
  alias?: string;
  /** Action name */
  name?: string;
  /** Whether action is enabled */
  enabled?: boolean;
  /** Default action */
  default_action?: boolean;
  /** Action priority */
  priority?: number;
}

export interface UserRequiredActionResponseDto {
  /** User ID */
  user_id: string;
  /** Required action */
  required_action: string;
}

export interface SetUserRequiredActionsDto {
  /**
   * List of required actions to assign to user
   * @example ["VERIFY_EMAIL","UPDATE_PASSWORD"]
   */
  required_actions: string[];
}

export interface EventResponseDto {
  /** Event ID */
  id: string;
  /** Event type */
  type?: string;
  /** Realm ID */
  realm_id?: string;
  /** User ID */
  user_id?: string;
  /** Client ID */
  client_id?: string;
  /** Session ID */
  session_id?: string;
  /** IP address */
  ip_address?: string;
  /** Event time */
  event_time?: number;
  /** Error message */
  error?: string;
  /** Event details (JSON) */
  details_json?: string;
  /** Long value details */
  details_json_long_value?: string;
}

export interface AdminEventResponseDto {
  /** Admin event ID */
  id: string;
  /** Operation type */
  operation_type?: string;
  /** Realm ID */
  realm_id?: string;
  /** Resource type */
  resource_type?: string;
  /** Resource path */
  resource_path?: string;
  /** Authentication realm ID */
  auth_realm_id?: string;
  /** Authentication client ID */
  auth_client_id?: string;
  /** Authentication user ID */
  auth_user_id?: string;
  /** IP address */
  ip_address?: string;
  /** Admin event time */
  admin_event_time?: number;
  /** Error message */
  error?: string;
  /** Event representation */
  representation?: string;
  /** Event details (JSON) */
  details_json?: string;
}

export interface AuthenticationFlowResponseDto {
  /** Flow ID */
  id: string;
  /** Flow alias/identifier */
  alias?: string;
  /** Flow description */
  description?: string;
  /** Realm ID */
  realm_id?: string;
  /** Provider ID */
  provider_id: string;
  /** Is top level flow */
  top_level: boolean;
  /** Is built-in flow */
  built_in: boolean;
}

export interface CreateAuthenticationFlowDto {
  /**
   * Flow alias/identifier
   * @example "browser-flow"
   */
  alias: string;
  /**
   * Flow description
   * @example "Browser based authentication"
   */
  description?: string;
  /**
   * Provider ID
   * @example "basic-flow"
   */
  provider_id?: string;
  /**
   * Is this a top level flow
   * @example true
   */
  top_level?: boolean;
}

export interface UpdateAuthenticationFlowDto {
  /** Flow alias/identifier */
  alias?: string;
  /** Flow description */
  description?: string;
  /** Provider ID */
  provider_id?: string;
  /** Is this a top level flow */
  top_level?: boolean;
}

export interface AuthenticationExecutionResponseDto {
  /** Execution ID */
  id: string;
  /** Execution alias */
  alias?: string;
  /** Authenticator implementation */
  authenticator?: string;
  /** Realm ID */
  realm_id?: string;
  /** Flow ID */
  flow_id?: string;
  /** Requirement level (0=REQUIRED, 1=OPTIONAL, 2=DISABLED, 3=ALTERNATIVE, 4=CONDITIONAL) */
  requirement?: number;
  /** Execution priority */
  priority?: number;
  /** Is this a sub-flow */
  authenticator_flow: boolean;
  /** Auth flow ID */
  auth_flow_id?: string;
  /** Authenticator config ID */
  auth_config?: string;
}

export interface CreateAuthenticationExecutionDto {
  /**
   * Execution alias
   * @example "auth-cookie"
   */
  alias?: string;
  /**
   * Authenticator implementation
   * @example "auth-cookie"
   */
  authenticator: string;
  /**
   * Requirement level
   * @example "REQUIRED"
   */
  requirement:
    | "REQUIRED"
    | "OPTIONAL"
    | "DISABLED"
    | "ALTERNATIVE"
    | "CONDITIONAL";
  /**
   * Execution priority (lower is higher priority)
   * @example 0
   */
  priority: number;
  /** Is this a sub-flow */
  authenticator_flow?: boolean;
  /** Auth flow ID if authenticator_flow is true */
  auth_flow_id?: string;
  /** Authenticator config ID */
  auth_config?: string;
}

export interface UpdateAuthenticationExecutionDto {
  /** Execution alias */
  alias?: string;
  /** Authenticator implementation */
  authenticator?: string;
  /** Requirement level */
  requirement?:
    | "REQUIRED"
    | "OPTIONAL"
    | "DISABLED"
    | "ALTERNATIVE"
    | "CONDITIONAL";
  /** Execution priority */
  priority?: number;
  /** Is this a sub-flow */
  authenticator_flow?: boolean;
  /** Auth flow ID if authenticator_flow is true */
  auth_flow_id?: string;
  /** Authenticator config ID */
  auth_config?: string;
}

export interface AuthenticatorConfigResponseDto {
  /** Config ID */
  id: string;
  /** Config alias */
  alias?: string;
  /** Realm ID */
  realm_id?: string;
  /** Config entries */
  config?: object;
}

export interface CreateAuthenticatorConfigDto {
  /**
   * Config alias
   * @example "totp-config"
   */
  alias: string;
  /**
   * Configuration entries as key-value pairs
   * @example {"key":"value"}
   */
  config?: object;
}

export interface UpdateAuthenticatorConfigDto {
  /** Config alias */
  alias?: string;
  /** Configuration entries as key-value pairs */
  config?: object;
}

export interface IdentityProviderResponseDto {
  /** Provider internal ID */
  internal_id: string;
  /** Provider alias */
  provider_alias?: string;
  /** Provider ID */
  provider_id?: string;
  /** Provider display name */
  provider_display_name?: string;
  /** Realm ID */
  realm_id?: string;
  /** Is the provider enabled */
  enabled: boolean;
  /** Store tokens from this provider */
  store_token: boolean;
  /** Authenticate by default */
  authenticate_by_default: boolean;
  /** Add token role */
  add_token_role: boolean;
  /** Trust email from provider */
  trust_email: boolean;
  /** Link only */
  link_only: boolean;
  /** Hide on login page */
  hide_on_login?: boolean;
  /** Organization ID */
  organization_id?: string;
  /** First broker login flow ID */
  first_broker_login_flow_id?: string;
  /** Post broker login flow ID */
  post_broker_login_flow_id?: string;
  /** Provider configuration */
  config?: object;
}

export interface IdentityProvidersPaginatedResponseDto {
  /** Array of identity providers */
  providers: IdentityProviderResponseDto[];
  /** Total number of providers */
  total: number;
}

export interface CreateIdentityProviderDto {
  /**
   * Provider alias (unique per realm)
   * @example "google"
   */
  provider_alias: string;
  /**
   * Provider ID (e.g., google, facebook, github)
   * @example "google"
   */
  provider_id: string;
  /**
   * Provider display name
   * @example "Google"
   */
  provider_display_name?: string;
  /**
   * Is the provider enabled
   * @example true
   */
  enabled?: boolean;
  /**
   * Store tokens from this provider
   * @example false
   */
  store_token?: boolean;
  /**
   * Authenticate by default
   * @example false
   */
  authenticate_by_default?: boolean;
  /**
   * Add token role
   * @example true
   */
  add_token_role?: boolean;
  /**
   * Trust email from provider
   * @example true
   */
  trust_email?: boolean;
  /**
   * Link only (do not allow new users)
   * @example false
   */
  link_only?: boolean;
  /**
   * Hide on login page
   * @example false
   */
  hide_on_login?: boolean;
  /** Organization ID */
  organization_id?: string;
  /** First broker login flow ID */
  first_broker_login_flow_id?: string;
  /** Post broker login flow ID */
  post_broker_login_flow_id?: string;
  /**
   * Provider configuration as key-value pairs
   * @example {"clientId":"your-client-id","clientSecret":"your-secret"}
   */
  config?: object;
}

export interface UpdateIdentityProviderDto {
  /** Provider display name */
  provider_display_name?: string;
  /** Is the provider enabled */
  enabled?: boolean;
  /** Store tokens from this provider */
  store_token?: boolean;
  /** Authenticate by default */
  authenticate_by_default?: boolean;
  /** Add token role */
  add_token_role?: boolean;
  /** Trust email from provider */
  trust_email?: boolean;
  /** Link only (do not allow new users) */
  link_only?: boolean;
  /** Hide on login page */
  hide_on_login?: boolean;
  /** Organization ID */
  organization_id?: string;
  /** First broker login flow ID */
  first_broker_login_flow_id?: string;
  /** Post broker login flow ID */
  post_broker_login_flow_id?: string;
  /** Provider configuration as key-value pairs */
  config?: object;
}

export interface IdentityProviderMapperResponseDto {
  /** Mapper ID */
  id: string;
  /** Mapper name */
  name: string;
  /** Identity provider alias */
  idp_alias: string;
  /** Identity provider mapper name */
  idp_mapper_name: string;
  /** Realm ID */
  realm_id: string;
  /** Mapper configuration */
  config?: object;
}

export interface IdentityProviderMappersPaginatedResponseDto {
  /** Array of identity provider mappers */
  mappers: IdentityProviderMapperResponseDto[];
  /** Total number of mappers */
  total: number;
}

export interface CreateIdentityProviderMapperDto {
  /**
   * Mapper name
   * @example "user-attribute-mapper"
   */
  name: string;
  /**
   * Identity provider alias
   * @example "google"
   */
  idp_alias: string;
  /**
   * Identity provider mapper name (e.g., "google-user-attribute-mapper")
   * @example "google-user-attribute-mapper"
   */
  idp_mapper_name: string;
  /**
   * Mapper configuration as key-value pairs
   * @example {"user.attribute":"email","attribute.name":"google_email"}
   */
  config?: object;
}

export interface UpdateIdentityProviderMapperDto {
  /** Mapper name */
  name?: string;
  /** Identity provider mapper name */
  idp_mapper_name?: string;
  /** Mapper configuration as key-value pairs */
  config?: object;
}

export interface FederatedIdentityResponseDto {
  /** Identity provider ID */
  identity_provider: string;
  /** Realm ID */
  realm_id?: string;
  /** Federated user ID */
  federated_user_id?: string;
  /** Federated username */
  federated_username?: string;
  /** Local user ID */
  user_id: string;
  /** Federated token */
  token?: string;
}

export interface FederatedIdentitiesListResponseDto {
  /** Array of federated identities */
  identities: FederatedIdentityResponseDto[];
  /** Total number of identities */
  total: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:3001";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title AUTH API - Authentication & Identity Management
 * @version 1.0.0
 * @license MIT (https://opensource.org/licenses/MIT)
 * @baseUrl http://localhost:3001
 * @contact API Support <support@example.com> (https://github.com/namnh240795/automation-with-claude-cli/issues)
 *
 * # Authentication & IAM API
 *
 * ## Overview
 *
 * The **AUTH API** provides comprehensive Authentication and Identity Management (IAM) capabilities, built on NestJS with Fastify. This API offers a complete Keycloak-compatible IAM solution for modern applications.
 *
 * ## Features
 *
 * ### 🔐 Authentication
 * - **User Registration** - Self-service user signup with email verification
 * - **Authentication** - JWT-based authentication with access and refresh tokens
 * - **Token Management** - Secure token refresh and revocation
 * - **Password Management** - Secure password hashing and validation
 *
 * ### 👥 Identity Management
 * - **Multi-tenant Realms** - Support for multiple isolated realms/tenants
 * - **User Management** - Complete CRUD operations for user accounts
 * - **Role-Based Access Control (RBAC)** - Hierarchical role and permission system
 * - **Group Management** - Organize users into groups for easier management
 * - **Client Management** - OAuth/OIDC client registration and configuration
 * - **Session Management** - Track and manage user sessions across devices
 * - **Required Actions** - Configure mandatory user actions (password reset, TOTP setup, email verification)
 *
 * ### 🔔 Security & Compliance
 * - **Event/Audit Logging** - Comprehensive audit trail for compliance
 * - **Admin Events** - Administrative operation tracking
 * - **Authentication Flows** - Configurable authentication flows and execution steps
 * - **Identity Providers** - Social login (Google, Facebook, etc.) and SSO integration
 * - **Federated Identity** - Link and manage external account connections
 *
 * ### 🔑 OAuth/OIDC Support
 * - **OAuth 2.0** - Standard OAuth 2.0 authorization flows
 * - **OpenID Connect** - OIDC 1.0 compliant identity layer
 * - **Client Registration** - Dynamic OAuth client registration
 * - **Token Introspection** - Validate tokens and check permissions
 *
 * ### 🌐 API Features
 * - **RESTful Design** - Clean, intuitive REST API architecture
 * - **JSON API** - JSON request/response format
 * - **Pagination** - Efficient pagination for list endpoints
 * - **Error Handling** - Consistent error responses with detailed messages
 * - **CORS Support** - Configurable Cross-Origin Resource Sharing
 *
 * ## Base URL
 *
 * All API endpoints are prefixed with `/auth` and versioned with `/v1`:
 *
 * ```
 * http://localhost:3001/auth/v1/{endpoint}
 * ```
 *
 * ## Authentication
 *
 * Most endpoints require authentication using a Bearer token:
 *
 * ```bash
 * Authorization: Bearer <your-access-token>
 * ```
 *
 * ### Obtaining Tokens
 *
 * 1. **Sign Up** - Create a new account
 * ```bash
 * POST /auth/signup
 * ```
 *
 * 2. **Sign In** - Get your access token
 * ```bash
 * POST /auth/signin
 * {
 *   "email": "user@example.com",
 *   "password": "your-password"
 * }
 * ```
 *
 * 3. **Use Token** - Include in Authorization header
 * ```bash
 * Authorization: Bearer <access-token>
 * ```
 *
 * ## Response Format
 *
 * ### Success Response
 * ```json
 * {
 *   "data": { ... },
 *   "meta": {
 *     "total": 100,
 *     "page": 0,
 *     "limit": 10,
 *     "total_pages": 10
 *   }
 * }
 * ```
 *
 * ### Error Response
 * ```json
 * {
 *   "statusCode": 400,
 *   "message": "Error description",
 *   "error": "Bad Request"
 * }
 * ```
 *
 * ## Pagination
 *
 * List endpoints support pagination via query parameters:
 *
 * - `page` - Page number (default: 0)
 * - `limit` - Items per page (default: 20, max: 100)
 *
 * ```bash
 * GET /auth/api/v1/realms?page=0&limit=10
 * ```
 *
 * ## Rate Limiting
 *
 * API requests are rate-limited to ensure fair usage:
 * - Default: 100 requests per minute
 * - Burst: 200 requests per minute
 *
 * ## Versioning
 *
 * The API uses URI-based versioning. The current version is `v1`.
 *
 * ## Support & Documentation
 *
 * - 📖 **Scalar UI**: http://localhost:3001/reference
 * - 📚 **OpenAPI JSON**: http://localhost:3001/api-json
 * - 🐙 **GitHub**: https://github.com/namnh240795/automation-with-claude-cli
 * - 📧 **Contact**: support@example.com
 *
 * ## Changelog
 *
 * ### v1.0.0 (Current)
 * - Initial release with comprehensive IAM features
 * - Multi-tenant realm support
 * - User, role, group, and client management
 * - OAuth/OIDC client registration
 * - JWT-based authentication
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name AppControllerGetHelloV1
     * @summary Health check endpoint
     * @request GET:/auth/v1
     */
    appControllerGetHelloV1: (params: RequestParams = {}) =>
      this.request<HelloResponseDto, any>({
        path: `/auth/v1`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AppControllerHealthCheckV1
     * @summary Health check
     * @request GET:/auth/v1/health
     */
    appControllerHealthCheckV1: (params: RequestParams = {}) =>
      this.request<HealthResponseDto, any>({
        path: `/auth/v1/health`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthControllerSignUp
     * @summary Register a new user
     * @request POST:/auth/signup
     */
    authControllerSignUp: (data: SignUpDto, params: RequestParams = {}) =>
      this.request<SignupResponseDto, void>({
        path: `/auth/signup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthControllerSignIn
     * @summary Sign in with email and password
     * @request POST:/auth/signin
     */
    authControllerSignIn: (data: SignInDto, params: RequestParams = {}) =>
      this.request<TokenResponseDto, void>({
        path: `/auth/signin`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthControllerRefresh
     * @summary Refresh access token using refresh token
     * @request POST:/auth/refresh
     */
    authControllerRefresh: (
      data: RefreshTokenDto,
      params: RequestParams = {},
    ) =>
      this.request<TokenResponseDto, void>({
        path: `/auth/refresh`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthControllerLogout
     * @summary Logout user and revoke refresh token
     * @request POST:/auth/logout
     */
    authControllerLogout: (data: RefreshTokenDto, params: RequestParams = {}) =>
      this.request<VoidResponseDto, any>({
        path: `/auth/logout`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthControllerGetProfile
     * @summary Get current user profile
     * @request GET:/auth/profile
     * @secure
     */
    authControllerGetProfile: (params: RequestParams = {}) =>
      this.request<SignupResponseDto, void>({
        path: `/auth/profile`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Realms
     * @name RealmsControllerFindAll
     * @summary List all realms
     * @request GET:/auth/api/v1/realms
     * @secure
     */
    realmsControllerFindAll: (
      query?: {
        /** @example 20 */
        limit?: number;
        /** @example 0 */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RealmsPaginatedResponseDto, any>({
        path: `/auth/api/v1/realms`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Realms
     * @name RealmsControllerCreate
     * @summary Create a new realm
     * @request POST:/auth/api/v1/realms
     * @secure
     */
    realmsControllerCreate: (
      data: CreateRealmDto,
      params: RequestParams = {},
    ) =>
      this.request<RealmResponseDto, void>({
        path: `/auth/api/v1/realms`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Realms
     * @name RealmsControllerFindOne
     * @summary Get realm details
     * @request GET:/auth/api/v1/realms/{realmId}
     * @secure
     */
    realmsControllerFindOne: (realmId: string, params: RequestParams = {}) =>
      this.request<RealmResponseDto, void>({
        path: `/auth/api/v1/realms/${realmId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Realms
     * @name RealmsControllerUpdate
     * @summary Update realm
     * @request PUT:/auth/api/v1/realms/{realmId}
     * @secure
     */
    realmsControllerUpdate: (
      realmId: string,
      data: UpdateRealmDto,
      params: RequestParams = {},
    ) =>
      this.request<RealmResponseDto, void>({
        path: `/auth/api/v1/realms/${realmId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Realms
     * @name RealmsControllerDelete
     * @summary Delete realm
     * @request DELETE:/auth/api/v1/realms/{realmId}
     * @secure
     */
    realmsControllerDelete: (realmId: string, params: RequestParams = {}) =>
      this.request<IdResponseDto, void>({
        path: `/auth/api/v1/realms/${realmId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Realms
     * @name RealmsControllerGetAttributes
     * @summary Get realm attributes
     * @request GET:/auth/api/v1/realms/{realmId}/attributes
     * @secure
     */
    realmsControllerGetAttributes: (
      realmId: string,
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/auth/api/v1/realms/${realmId}/attributes`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Realms
     * @name RealmsControllerUpdateAttributes
     * @summary Update realm attributes
     * @request PUT:/auth/api/v1/realms/{realmId}/attributes
     * @secure
     */
    realmsControllerUpdateAttributes: (
      realmId: string,
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/auth/api/v1/realms/${realmId}/attributes`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Realms
     * @name RealmsControllerDeleteAttribute
     * @summary Delete realm attribute
     * @request DELETE:/auth/api/v1/realms/{realmId}/attributes/{name}
     * @secure
     */
    realmsControllerDeleteAttribute: (
      realmId: string,
      name: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/auth/api/v1/realms/${realmId}/attributes/${name}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Realms
     * @name RealmsControllerGetSmtpConfig
     * @summary Get realm SMTP configuration
     * @request GET:/auth/api/v1/realms/{realmId}/smtp
     * @secure
     */
    realmsControllerGetSmtpConfig: (
      realmId: string,
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/auth/api/v1/realms/${realmId}/smtp`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Realms
     * @name RealmsControllerUpdateSmtpConfig
     * @summary Update realm SMTP configuration
     * @request PUT:/auth/api/v1/realms/{realmId}/smtp
     * @secure
     */
    realmsControllerUpdateSmtpConfig: (
      realmId: string,
      params: RequestParams = {},
    ) =>
      this.request<SmtpConfigResponseDto, any>({
        path: `/auth/api/v1/realms/${realmId}/smtp`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerFindAll
     * @summary List users in a realm
     * @request GET:/auth/api/v1/realms/{realmId}/users
     * @secure
     */
    usersControllerFindAll: (
      realmId: string,
      query?: {
        /** Search in username, email, first_name, last_name */
        search?: string;
        /** @example 20 */
        limit?: number;
        /** @example 0 */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<UsersPaginatedResponseDto, any>({
        path: `/auth/api/v1/realms/${realmId}/users`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerCreate
     * @summary Create a new user
     * @request POST:/auth/api/v1/realms/{realmId}/users
     * @secure
     */
    usersControllerCreate: (
      realmId: string,
      data: CreateUserDto,
      params: RequestParams = {},
    ) =>
      this.request<UserResponseDto, void>({
        path: `/auth/api/v1/realms/${realmId}/users`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerFindOne
     * @summary Get user details
     * @request GET:/auth/api/v1/realms/{realmId}/users/{userId}
     * @secure
     */
    usersControllerFindOne: (
      realmId: string,
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<UserResponseDto, void>({
        path: `/auth/api/v1/realms/${realmId}/users/${userId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerUpdate
     * @summary Update user
     * @request PUT:/auth/api/v1/realms/{realmId}/users/{userId}
     * @secure
     */
    usersControllerUpdate: (
      realmId: string,
      userId: string,
      data: UpdateUserDto,
      params: RequestParams = {},
    ) =>
      this.request<UserResponseDto, void>({
        path: `/auth/api/v1/realms/${realmId}/users/${userId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerDelete
     * @summary Delete user
     * @request DELETE:/auth/api/v1/realms/{realmId}/users/{userId}
     * @secure
     */
    usersControllerDelete: (
      realmId: string,
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<IdResponseDto, void>({
        path: `/auth/api/v1/realms/${realmId}/users/${userId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetCredentials
     * @summary Get user credentials
     * @request GET:/auth/api/v1/realms/{realmId}/users/{userId}/credentials
     * @secure
     */
    usersControllerGetCredentials: (
      realmId: string,
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<any[], any>({
        path: `/auth/api/v1/realms/${realmId}/users/${userId}/credentials`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetAttributes
     * @summary Get user attributes
     * @request GET:/auth/api/v1/realms/{realmId}/users/{userId}/attributes
     * @secure
     */
    usersControllerGetAttributes: (
      realmId: string,
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/auth/api/v1/realms/${realmId}/users/${userId}/attributes`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerUpdateAttributes
     * @summary Update user attributes
     * @request PUT:/auth/api/v1/realms/{realmId}/users/{userId}/attributes
     * @secure
     */
    usersControllerUpdateAttributes: (
      realmId: string,
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/auth/api/v1/realms/${realmId}/users/${userId}/attributes`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerDeleteAttribute
     * @summary Delete user attribute
     * @request DELETE:/auth/api/v1/realms/{realmId}/users/{userId}/attributes/{name}
     * @secure
     */
    usersControllerDeleteAttribute: (
      realmId: string,
      userId: string,
      name: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/auth/api/v1/realms/${realmId}/users/${userId}/attributes/${name}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetRoles
     * @summary Get user roles
     * @request GET:/auth/api/v1/realms/{realmId}/users/{userId}/roles
     * @secure
     */
    usersControllerGetRoles: (
      realmId: string,
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<RoleResponseDto[], any>({
        path: `/auth/api/v1/realms/${realmId}/users/${userId}/roles`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerAddRoles
     * @summary Add roles to user
     * @request POST:/auth/api/v1/realms/{realmId}/users/{userId}/roles
     * @secure
     */
    usersControllerAddRoles: (
      realmId: string,
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<RoleResponseDto[], any>({
        path: `/auth/api/v1/realms/${realmId}/users/${userId}/roles`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerRemoveRoles
     * @summary Remove roles from user
     * @request DELETE:/auth/api/v1/realms/{realmId}/users/{userId}/roles
     * @secure
     */
    usersControllerRemoveRoles: (
      realmId: string,
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/auth/api/v1/realms/${realmId}/users/${userId}/roles`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetGroups
     * @summary Get user groups
     * @request GET:/auth/api/v1/realms/{realmId}/users/{userId}/groups
     * @secure
     */
    usersControllerGetGroups: (
      realmId: string,
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<GroupResponseDto[], any>({
        path: `/auth/api/v1/realms/${realmId}/users/${userId}/groups`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerAddGroups
     * @summary Add user to groups
     * @request POST:/auth/api/v1/realms/{realmId}/users/{userId}/groups
     * @secure
     */
    usersControllerAddGroups: (
      realmId: string,
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<GroupResponseDto[], any>({
        path: `/auth/api/v1/realms/${realmId}/users/${userId}/groups`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerRemoveGroup
     * @summary Remove user from group
     * @request DELETE:/auth/api/v1/realms/{realmId}/users/{userId}/groups/{groupId}
     * @secure
     */
    usersControllerRemoveGroup: (
      realmId: string,
      userId: string,
      groupId: string,
      params: RequestParams = {},
    ) =>
      this.request<IdResponseDto, any>({
        path: `/auth/api/v1/realms/${realmId}/users/${userId}/groups/${groupId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name RolesControllerFindAll
     * @summary List roles in a realm
     * @request GET:/auth/api/v1/realms/{realmId}/roles
     * @secure
     */
    rolesControllerFindAll: (
      realmId: string,
      query?: {
        /** Search in role name and description */
        search?: string;
        /** @example 20 */
        limit?: number;
        /** @example 0 */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RolesPaginatedResponseDto, any>({
        path: `/auth/api/v1/realms/${realmId}/roles`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name RolesControllerCreate
     * @summary Create a new role
     * @request POST:/auth/api/v1/realms/{realmId}/roles
     * @secure
     */
    rolesControllerCreate: (
      realmId: string,
      data: CreateRoleDto,
      params: RequestParams = {},
    ) =>
      this.request<RoleResponseDto, void>({
        path: `/auth/api/v1/realms/${realmId}/roles`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name RolesControllerFindOne
     * @summary Get role details
     * @request GET:/auth/api/v1/realms/{realmId}/roles/{roleId}
     * @secure
     */
    rolesControllerFindOne: (
      realmId: string,
      roleId: string,
      params: RequestParams = {},
    ) =>
      this.request<RoleResponseDto, void>({
        path: `/auth/api/v1/realms/${realmId}/roles/${roleId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name RolesControllerUpdate
     * @summary Update role
     * @request PUT:/auth/api/v1/realms/{realmId}/roles/{roleId}
     * @secure
     */
    rolesControllerUpdate: (
      realmId: string,
      roleId: string,
      data: UpdateRoleDto,
      params: RequestParams = {},
    ) =>
      this.request<RoleResponseDto, void>({
        path: `/auth/api/v1/realms/${realmId}/roles/${roleId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name RolesControllerDelete
     * @summary Delete role
     * @request DELETE:/auth/api/v1/realms/{realmId}/roles/{roleId}
     * @secure
     */
    rolesControllerDelete: (
      realmId: string,
      roleId: string,
      params: RequestParams = {},
    ) =>
      this.request<IdResponseDto, void>({
        path: `/auth/api/v1/realms/${realmId}/roles/${roleId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name RolesControllerGetComposites
     * @summary Get composite roles
     * @request GET:/auth/api/v1/realms/{realmId}/roles/{roleId}/composites
     * @secure
     */
    rolesControllerGetComposites: (
      realmId: string,
      roleId: string,
      params: RequestParams = {},
    ) =>
      this.request<RoleResponseDto[], any>({
        path: `/auth/api/v1/realms/${realmId}/roles/${roleId}/composites`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name RolesControllerAddComposites
     * @summary Add composite roles
     * @request POST:/auth/api/v1/realms/{realmId}/roles/{roleId}/composites
     * @secure
     */
    rolesControllerAddComposites: (
      realmId: string,
      roleId: string,
      params: RequestParams = {},
    ) =>
      this.request<RoleResponseDto[], any>({
        path: `/auth/api/v1/realms/${realmId}/roles/${roleId}/composites`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name RolesControllerRemoveComposite
     * @summary Remove composite role
     * @request DELETE:/auth/api/v1/realms/{realmId}/roles/{roleId}/composites/{compositeId}
     * @secure
     */
    rolesControllerRemoveComposite: (
      realmId: string,
      roleId: string,
      compositeId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/auth/api/v1/realms/${realmId}/roles/${roleId}/composites/${compositeId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name RolesControllerGetUsers
     * @summary Get users with this role
     * @request GET:/auth/api/v1/realms/{realmId}/roles/{roleId}/users
     * @secure
     */
    rolesControllerGetUsers: (
      realmId: string,
      roleId: string,
      params: RequestParams = {},
    ) =>
      this.request<UserResponseDto[], any>({
        path: `/auth/api/v1/realms/${realmId}/roles/${roleId}/users`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name RolesControllerAddUser
     * @summary Assign role to user
     * @request POST:/auth/api/v1/realms/{realmId}/roles/{roleId}/users/{userId}
     * @secure
     */
    rolesControllerAddUser: (
      realmId: string,
      roleId: string,
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<RoleResponseDto[], any>({
        path: `/auth/api/v1/realms/${realmId}/roles/${roleId}/users/${userId}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name RolesControllerRemoveUser
     * @summary Remove role from user
     * @request DELETE:/auth/api/v1/realms/{realmId}/roles/{roleId}/users/{userId}
     * @secure
     */
    rolesControllerRemoveUser: (
      realmId: string,
      roleId: string,
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<IdResponseDto, any>({
        path: `/auth/api/v1/realms/${realmId}/roles/${roleId}/users/${userId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Groups
     * @name GroupsControllerFindAll
     * @summary List groups in a realm
     * @request GET:/auth/api/v1/realms/{realmId}/groups
     * @secure
     */
    groupsControllerFindAll: (
      realmId: string,
      query?: {
        /** Search in group name */
        search?: string;
        /** Filter by parent group ID */
        parent?: string;
        /** @example 20 */
        limit?: number;
        /** @example 0 */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GroupsPaginatedResponseDto, any>({
        path: `/auth/api/v1/realms/${realmId}/groups`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Groups
     * @name GroupsControllerCreate
     * @summary Create a new group
     * @request POST:/auth/api/v1/realms/{realmId}/groups
     * @secure
     */
    groupsControllerCreate: (
      realmId: string,
      data: CreateGroupDto,
      params: RequestParams = {},
    ) =>
      this.request<GroupResponseDto, void>({
        path: `/auth/api/v1/realms/${realmId}/groups`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Groups
     * @name GroupsControllerFindOne
     * @summary Get group details
     * @request GET:/auth/api/v1/realms/{realmId}/groups/{groupId}
     * @secure
     */
    groupsControllerFindOne: (
      realmId: string,
      groupId: string,
      params: RequestParams = {},
    ) =>
      this.request<GroupResponseDto, void>({
        path: `/auth/api/v1/realms/${realmId}/groups/${groupId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Groups
     * @name GroupsControllerUpdate
     * @summary Update group
     * @request PUT:/auth/api/v1/realms/{realmId}/groups/{groupId}
     * @secure
     */
    groupsControllerUpdate: (
      realmId: string,
      groupId: string,
      data: UpdateGroupDto,
      params: RequestParams = {},
    ) =>
      this.request<GroupResponseDto, void>({
        path: `/auth/api/v1/realms/${realmId}/groups/${groupId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Groups
     * @name GroupsControllerDelete
     * @summary Delete group
     * @request DELETE:/auth/api/v1/realms/{realmId}/groups/{groupId}
     * @secure
     */
    groupsControllerDelete: (
      realmId: string,
      groupId: string,
      params: RequestParams = {},
    ) =>
      this.request<IdResponseDto, void>({
        path: `/auth/api/v1/realms/${realmId}/groups/${groupId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Groups
     * @name GroupsControllerGetRoles
     * @summary Get group roles
     * @request GET:/auth/api/v1/realms/{realmId}/groups/{groupId}/roles
     * @secure
     */
    groupsControllerGetRoles: (
      realmId: string,
      groupId: string,
      params: RequestParams = {},
    ) =>
      this.request<RoleResponseDto[], any>({
        path: `/auth/api/v1/realms/${realmId}/groups/${groupId}/roles`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Groups
     * @name GroupsControllerAddRoles
     * @summary Assign roles to group
     * @request POST:/auth/api/v1/realms/{realmId}/groups/{groupId}/roles
     * @secure
     */
    groupsControllerAddRoles: (
      realmId: string,
      groupId: string,
      params: RequestParams = {},
    ) =>
      this.request<RoleResponseDto[], any>({
        path: `/auth/api/v1/realms/${realmId}/groups/${groupId}/roles`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Groups
     * @name GroupsControllerRemoveRole
     * @summary Remove role from group
     * @request DELETE:/auth/api/v1/realms/{realmId}/groups/{groupId}/roles/{roleId}
     * @secure
     */
    groupsControllerRemoveRole: (
      realmId: string,
      groupId: string,
      roleId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/auth/api/v1/realms/${realmId}/groups/${groupId}/roles/${roleId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Groups
     * @name GroupsControllerGetMembers
     * @summary Get group members
     * @request GET:/auth/api/v1/realms/{realmId}/groups/{groupId}/members
     * @secure
     */
    groupsControllerGetMembers: (
      realmId: string,
      groupId: string,
      params: RequestParams = {},
    ) =>
      this.request<UserResponseDto[], any>({
        path: `/auth/api/v1/realms/${realmId}/groups/${groupId}/members`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Groups
     * @name GroupsControllerAddMember
     * @summary Add user to group
     * @request POST:/auth/api/v1/realms/{realmId}/groups/{groupId}/members/{userId}
     * @secure
     */
    groupsControllerAddMember: (
      realmId: string,
      groupId: string,
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<IdResponseDto, any>({
        path: `/auth/api/v1/realms/${realmId}/groups/${groupId}/members/${userId}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Groups
     * @name GroupsControllerRemoveMember
     * @summary Remove user from group
     * @request DELETE:/auth/api/v1/realms/{realmId}/groups/{groupId}/members/{userId}
     * @secure
     */
    groupsControllerRemoveMember: (
      realmId: string,
      groupId: string,
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<IdResponseDto, any>({
        path: `/auth/api/v1/realms/${realmId}/groups/${groupId}/members/${userId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Clients
     * @name ClientsControllerFindAll
     * @summary List clients in a realm
     * @request GET:/auth/api/v1/realms/{realmId}/clients
     * @secure
     */
    clientsControllerFindAll: (
      realmId: string,
      query?: {
        /** Search in client_id and name */
        search?: string;
        /** @example 20 */
        limit?: number;
        /** @example 0 */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ClientsPaginatedResponseDto, any>({
        path: `/auth/api/v1/realms/${realmId}/clients`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Clients
     * @name ClientsControllerCreate
     * @summary Create a new client
     * @request POST:/auth/api/v1/realms/{realmId}/clients
     * @secure
     */
    clientsControllerCreate: (
      realmId: string,
      data: CreateClientDto,
      params: RequestParams = {},
    ) =>
      this.request<ClientResponseDto, void>({
        path: `/auth/api/v1/realms/${realmId}/clients`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Clients
     * @name ClientsControllerFindOne
     * @summary Get client details
     * @request GET:/auth/api/v1/realms/{realmId}/clients/{clientId}
     * @secure
     */
    clientsControllerFindOne: (
      realmId: string,
      clientId: string,
      params: RequestParams = {},
    ) =>
      this.request<ClientResponseDto, void>({
        path: `/auth/api/v1/realms/${realmId}/clients/${clientId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Clients
     * @name ClientsControllerUpdate
     * @summary Update client
     * @request PUT:/auth/api/v1/realms/{realmId}/clients/{clientId}
     * @secure
     */
    clientsControllerUpdate: (
      realmId: string,
      clientId: string,
      data: UpdateClientDto,
      params: RequestParams = {},
    ) =>
      this.request<ClientResponseDto, void>({
        path: `/auth/api/v1/realms/${realmId}/clients/${clientId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Clients
     * @name ClientsControllerDelete
     * @summary Delete client
     * @request DELETE:/auth/api/v1/realms/{realmId}/clients/{clientId}
     * @secure
     */
    clientsControllerDelete: (
      realmId: string,
      clientId: string,
      params: RequestParams = {},
    ) =>
      this.request<IdResponseDto, void>({
        path: `/auth/api/v1/realms/${realmId}/clients/${clientId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Clients
     * @name ClientsControllerGetRedirectUris
     * @summary Get client redirect URIs
     * @request GET:/auth/api/v1/realms/{realmId}/clients/{clientId}/redirect-uris
     * @secure
     */
    clientsControllerGetRedirectUris: (
      realmId: string,
      clientId: string,
      params: RequestParams = {},
    ) =>
      this.request<string[], any>({
        path: `/auth/api/v1/realms/${realmId}/clients/${clientId}/redirect-uris`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Clients
     * @name ClientsControllerAddRedirectUri
     * @summary Add redirect URI
     * @request POST:/auth/api/v1/realms/{realmId}/clients/{clientId}/redirect-uris
     * @secure
     */
    clientsControllerAddRedirectUri: (
      realmId: string,
      clientId: string,
      params: RequestParams = {},
    ) =>
      this.request<string[], any>({
        path: `/auth/api/v1/realms/${realmId}/clients/${clientId}/redirect-uris`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Clients
     * @name ClientsControllerRemoveRedirectUri
     * @summary Remove redirect URI
     * @request DELETE:/auth/api/v1/realms/{realmId}/clients/{clientId}/redirect-uris/{uri}
     * @secure
     */
    clientsControllerRemoveRedirectUri: (
      realmId: string,
      clientId: string,
      uri: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/auth/api/v1/realms/${realmId}/clients/${clientId}/redirect-uris/${uri}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Clients
     * @name ClientsControllerGetSecret
     * @summary Get client secret
     * @request GET:/auth/api/v1/realms/{realmId}/clients/{clientId}/secret
     * @secure
     */
    clientsControllerGetSecret: (
      realmId: string,
      clientId: string,
      params: RequestParams = {},
    ) =>
      this.request<ClientsPaginatedResponseDto, any>({
        path: `/auth/api/v1/realms/${realmId}/clients/${clientId}/secret`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Clients
     * @name ClientsControllerRegenerateSecret
     * @summary Regenerate client secret
     * @request POST:/auth/api/v1/realms/{realmId}/clients/{clientId}/secret/regenerate
     * @secure
     */
    clientsControllerRegenerateSecret: (
      realmId: string,
      clientId: string,
      params: RequestParams = {},
    ) =>
      this.request<ClientSecretResponseDto, any>({
        path: `/auth/api/v1/realms/${realmId}/clients/${clientId}/secret/regenerate`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get all offline user sessions for a specific realm
     *
     * @tags Sessions
     * @name SessionsControllerGetRealmSessions
     * @summary List all sessions in a realm
     * @request GET:/auth/realms/{realmId}/sessions
     * @secure
     */
    sessionsControllerGetRealmSessions: (
      realmId: string,
      params: RequestParams = {},
    ) =>
      this.request<UserSessionResponseDto[], void>({
        path: `/auth/realms/${realmId}/sessions`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get all offline sessions for a specific user
     *
     * @tags Sessions
     * @name SessionsControllerGetUserSessions
     * @summary Get user's sessions
     * @request GET:/auth/users/{userId}/sessions
     * @secure
     */
    sessionsControllerGetUserSessions: (
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<UserSessionResponseDto[], void>({
        path: `/auth/users/${userId}/sessions`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Terminate all sessions for a specific user
     *
     * @tags Sessions
     * @name SessionsControllerTerminateAllUserSessions
     * @summary Terminate all user's sessions
     * @request DELETE:/auth/users/{userId}/sessions
     * @secure
     */
    sessionsControllerTerminateAllUserSessions: (
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/auth/users/${userId}/sessions`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Get all offline client sessions for a specific user
     *
     * @tags Sessions
     * @name SessionsControllerGetUserClientSessions
     * @summary Get user's client sessions
     * @request GET:/auth/users/{userId}/client-sessions
     * @secure
     */
    sessionsControllerGetUserClientSessions: (
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<ClientSessionResponseDto[], void>({
        path: `/auth/users/${userId}/client-sessions`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Terminate a specific user session by ID
     *
     * @tags Sessions
     * @name SessionsControllerTerminateSession
     * @summary Terminate a session
     * @request DELETE:/auth/sessions/{sessionId}
     * @secure
     */
    sessionsControllerTerminateSession: (
      sessionId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/auth/sessions/${sessionId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Revoke an access or refresh token by adding it to the revoked tokens list
     *
     * @tags Sessions
     * @name SessionsControllerRevokeToken
     * @summary Revoke a token
     * @request POST:/auth/tokens/revoke
     */
    sessionsControllerRevokeToken: (
      data: RevokeTokenDto,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/auth/tokens/revoke`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Check if a specific token has been revoked
     *
     * @tags Sessions
     * @name SessionsControllerIsTokenRevoked
     * @summary Check if token is revoked
     * @request POST:/auth/tokens/check-revoked
     */
    sessionsControllerIsTokenRevoked: (
      data: {
        /** Token to check */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** Whether the token is revoked */
          revoked?: boolean;
        },
        any
      >({
        path: `/auth/tokens/check-revoked`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get all required actions configured for a realm
     *
     * @tags Required Actions
     * @name RequiredActionsControllerGetRealmRequiredActions
     * @summary List required actions
     * @request GET:/auth/realms/{realmId}/required-actions
     * @secure
     */
    requiredActionsControllerGetRealmRequiredActions: (
      realmId: string,
      query?: {
        /** @example "0" */
        page?: string;
        /** @example "20" */
        limit?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<RequiredActionResponseDto[], void>({
        path: `/auth/realms/${realmId}/required-actions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new required action for a realm
     *
     * @tags Required Actions
     * @name RequiredActionsControllerCreateRequiredAction
     * @summary Create required action
     * @request POST:/auth/realms/{realmId}/required-actions
     * @secure
     */
    requiredActionsControllerCreateRequiredAction: (
      realmId: string,
      data: CreateRequiredActionDto,
      params: RequestParams = {},
    ) =>
      this.request<RequiredActionResponseDto, void>({
        path: `/auth/realms/${realmId}/required-actions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get details of a specific required action
     *
     * @tags Required Actions
     * @name RequiredActionsControllerGetRequiredAction
     * @summary Get required action
     * @request GET:/auth/required-actions/{actionId}
     * @secure
     */
    requiredActionsControllerGetRequiredAction: (
      actionId: string,
      params: RequestParams = {},
    ) =>
      this.request<RequiredActionResponseDto, void>({
        path: `/auth/required-actions/${actionId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update properties of a required action
     *
     * @tags Required Actions
     * @name RequiredActionsControllerUpdateRequiredAction
     * @summary Update required action
     * @request PUT:/auth/required-actions/{actionId}
     * @secure
     */
    requiredActionsControllerUpdateRequiredAction: (
      actionId: string,
      data: UpdateRequiredActionDto,
      params: RequestParams = {},
    ) =>
      this.request<RequiredActionResponseDto, void>({
        path: `/auth/required-actions/${actionId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a required action from the system
     *
     * @tags Required Actions
     * @name RequiredActionsControllerDeleteRequiredAction
     * @summary Delete required action
     * @request DELETE:/auth/required-actions/{actionId}
     * @secure
     */
    requiredActionsControllerDeleteRequiredAction: (
      actionId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/auth/required-actions/${actionId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Get all required actions assigned to a specific user
     *
     * @tags Required Actions
     * @name RequiredActionsControllerGetUserRequiredActions
     * @summary Get user's required actions
     * @request GET:/auth/users/{userId}/required-actions
     * @secure
     */
    requiredActionsControllerGetUserRequiredActions: (
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<UserRequiredActionResponseDto[], void>({
        path: `/auth/users/${userId}/required-actions`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Replace all required actions for a user
     *
     * @tags Required Actions
     * @name RequiredActionsControllerSetUserRequiredActions
     * @summary Set user's required actions
     * @request PUT:/auth/users/{userId}/required-actions
     * @secure
     */
    requiredActionsControllerSetUserRequiredActions: (
      userId: string,
      data: SetUserRequiredActionsDto,
      params: RequestParams = {},
    ) =>
      this.request<UserRequiredActionResponseDto[], void>({
        path: `/auth/users/${userId}/required-actions`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Remove a specific required action from a user
     *
     * @tags Required Actions
     * @name RequiredActionsControllerRemoveUserRequiredAction
     * @summary Remove user's required action
     * @request DELETE:/auth/users/{userId}/required-actions/{actionName}
     * @secure
     */
    requiredActionsControllerRemoveUserRequiredAction: (
      userId: string,
      actionName: string,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/auth/users/${userId}/required-actions/${actionName}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Get all available required action providers in the system
     *
     * @tags Required Actions
     * @name RequiredActionsControllerGetRequiredActionProviders
     * @summary List required action providers
     * @request GET:/auth/required-actions-providers
     * @secure
     */
    requiredActionsControllerGetRequiredActionProviders: (
      params: RequestParams = {},
    ) =>
      this.request<RequiredActionResponseDto[], void>({
        path: `/auth/required-actions-providers`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get all user events for a realm with optional filtering
     *
     * @tags Events
     * @name EventsControllerGetRealmEvents
     * @summary List realm events
     * @request GET:/auth/realms/{realmId}/events
     * @secure
     */
    eventsControllerGetRealmEvents: (
      realmId: string,
      query?: {
        /** Filter by user ID */
        user_id?: string;
        /** Filter by client ID */
        client_id?: string;
        /** Filter by event type */
        type?: string;
        /** Filter by date from (timestamp) */
        date_from?: number;
        /** Filter by date to (timestamp) */
        date_to?: number;
        /** @example "0" */
        page?: string;
        /** @example "50" */
        limit?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EventResponseDto[], void>({
        path: `/auth/realms/${realmId}/events`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get all events for a specific user
     *
     * @tags Events
     * @name EventsControllerGetUserEvents
     * @summary Get user's events
     * @request GET:/auth/users/{userId}/events
     * @secure
     */
    eventsControllerGetUserEvents: (
      userId: string,
      query?: {
        /** @example "0" */
        page?: string;
        /** @example "50" */
        limit?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EventResponseDto[], void>({
        path: `/auth/users/${userId}/events`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get all admin events for a realm with optional filtering
     *
     * @tags Events
     * @name EventsControllerGetAdminEvents
     * @summary List admin events
     * @request GET:/auth/realms/{realmId}/admin-events
     * @secure
     */
    eventsControllerGetAdminEvents: (
      realmId: string,
      query?: {
        /** Filter by operation type */
        operation_type?: string;
        /** Filter by resource type */
        resource_type?: string;
        /** Filter by resource path */
        resource_path?: string;
        /** Filter by auth realm */
        auth_realm_id?: string;
        /** Filter by date from (timestamp) */
        date_from?: number;
        /** Filter by date to (timestamp) */
        date_to?: number;
        /** @example "0" */
        page?: string;
        /** @example "50" */
        limit?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AdminEventResponseDto[], void>({
        path: `/auth/realms/${realmId}/admin-events`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Export realm events to JSON for audit purposes
     *
     * @tags Events
     * @name EventsControllerExportEvents
     * @summary Export events
     * @request GET:/auth/realms/{realmId}/events/export
     * @secure
     */
    eventsControllerExportEvents: (
      realmId: string,
      query?: {
        /** Filter by user ID */
        user_id?: string;
        /** Filter by client ID */
        client_id?: string;
        /** Filter by event type */
        type?: string;
        /** Filter by date from (timestamp) */
        date_from?: number;
        /** Filter by date to (timestamp) */
        date_to?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<EventResponseDto[], void>({
        path: `/auth/realms/${realmId}/events/export`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete events older than specified number of days
     *
     * @tags Events
     * @name EventsControllerCleanupEvents
     * @summary Clean up old events
     * @request DELETE:/auth/realms/{realmId}/events/cleanup
     * @secure
     */
    eventsControllerCleanupEvents: (
      realmId: string,
      query?: {
        /**
         * Delete events older than this many days
         * @example "90"
         */
        olderThanDays?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/auth/realms/${realmId}/events/cleanup`,
        method: "DELETE",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Delete admin events older than specified number of days
     *
     * @tags Events
     * @name EventsControllerCleanupAdminEvents
     * @summary Clean up old admin events
     * @request DELETE:/auth/realms/{realmId}/admin-events/cleanup
     * @secure
     */
    eventsControllerCleanupAdminEvents: (
      realmId: string,
      query?: {
        /**
         * Delete admin events older than this many days
         * @example "365"
         */
        olderThanDays?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/auth/realms/${realmId}/admin-events/cleanup`,
        method: "DELETE",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Get all authentication flows configured for a realm
     *
     * @tags Authentication Flows
     * @name AuthenticationControllerGetRealmFlows
     * @summary List authentication flows
     * @request GET:/auth/realms/{realmId}/authentication-flows
     * @secure
     */
    authenticationControllerGetRealmFlows: (
      realmId: string,
      query?: {
        /** @example "0" */
        page?: string;
        /** @example "20" */
        limit?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AuthenticationFlowResponseDto[], void>({
        path: `/auth/realms/${realmId}/authentication-flows`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new authentication flow for a realm
     *
     * @tags Authentication Flows
     * @name AuthenticationControllerCreateFlow
     * @summary Create authentication flow
     * @request POST:/auth/realms/{realmId}/authentication-flows
     * @secure
     */
    authenticationControllerCreateFlow: (
      realmId: string,
      data: CreateAuthenticationFlowDto,
      params: RequestParams = {},
    ) =>
      this.request<AuthenticationFlowResponseDto, void>({
        path: `/auth/realms/${realmId}/authentication-flows`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get details of a specific authentication flow
     *
     * @tags Authentication Flows
     * @name AuthenticationControllerGetFlow
     * @summary Get authentication flow
     * @request GET:/auth/authentication-flows/{flowId}
     * @secure
     */
    authenticationControllerGetFlow: (
      flowId: string,
      params: RequestParams = {},
    ) =>
      this.request<AuthenticationFlowResponseDto, void>({
        path: `/auth/authentication-flows/${flowId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update properties of an authentication flow
     *
     * @tags Authentication Flows
     * @name AuthenticationControllerUpdateFlow
     * @summary Update authentication flow
     * @request PUT:/auth/authentication-flows/{flowId}
     * @secure
     */
    authenticationControllerUpdateFlow: (
      flowId: string,
      data: UpdateAuthenticationFlowDto,
      params: RequestParams = {},
    ) =>
      this.request<AuthenticationFlowResponseDto, void>({
        path: `/auth/authentication-flows/${flowId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete an authentication flow from the system
     *
     * @tags Authentication Flows
     * @name AuthenticationControllerDeleteFlow
     * @summary Delete authentication flow
     * @request DELETE:/auth/authentication-flows/{flowId}
     * @secure
     */
    authenticationControllerDeleteFlow: (
      flowId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/auth/authentication-flows/${flowId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Get all execution steps for an authentication flow
     *
     * @tags Authentication Flows
     * @name AuthenticationControllerGetFlowExecutions
     * @summary List flow executions
     * @request GET:/auth/authentication-flows/{flowId}/executions
     * @secure
     */
    authenticationControllerGetFlowExecutions: (
      flowId: string,
      query?: {
        /** @example "0" */
        page?: string;
        /** @example "20" */
        limit?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AuthenticationExecutionResponseDto[], void>({
        path: `/auth/authentication-flows/${flowId}/executions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Add an execution step to an authentication flow
     *
     * @tags Authentication Flows
     * @name AuthenticationControllerAddExecution
     * @summary Add flow execution
     * @request POST:/auth/realms/{realmId}/authentication-flows/{flowId}/executions
     * @secure
     */
    authenticationControllerAddExecution: (
      realmId: string,
      flowId: string,
      data: CreateAuthenticationExecutionDto,
      params: RequestParams = {},
    ) =>
      this.request<AuthenticationExecutionResponseDto, void>({
        path: `/auth/realms/${realmId}/authentication-flows/${flowId}/executions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Update an execution step in an authentication flow
     *
     * @tags Authentication Flows
     * @name AuthenticationControllerUpdateExecution
     * @summary Update flow execution
     * @request PUT:/auth/authentication-flows/executions/{executionId}
     * @secure
     */
    authenticationControllerUpdateExecution: (
      executionId: string,
      data: UpdateAuthenticationExecutionDto,
      params: RequestParams = {},
    ) =>
      this.request<AuthenticationExecutionResponseDto, void>({
        path: `/auth/authentication-flows/executions/${executionId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Remove an execution step from an authentication flow
     *
     * @tags Authentication Flows
     * @name AuthenticationControllerDeleteExecution
     * @summary Delete flow execution
     * @request DELETE:/auth/authentication-flows/executions/{executionId}
     * @secure
     */
    authenticationControllerDeleteExecution: (
      executionId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/auth/authentication-flows/executions/${executionId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Get all authenticator configurations for a realm
     *
     * @tags Authentication Flows
     * @name AuthenticationControllerGetRealmConfigs
     * @summary List authenticator configs
     * @request GET:/auth/realms/{realmId}/authenticator-configs
     * @secure
     */
    authenticationControllerGetRealmConfigs: (
      realmId: string,
      query?: {
        /** @example "0" */
        page?: string;
        /** @example "20" */
        limit?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AuthenticatorConfigResponseDto[], void>({
        path: `/auth/realms/${realmId}/authenticator-configs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new authenticator configuration for a realm
     *
     * @tags Authentication Flows
     * @name AuthenticationControllerCreateConfig
     * @summary Create authenticator config
     * @request POST:/auth/realms/{realmId}/authenticator-configs
     * @secure
     */
    authenticationControllerCreateConfig: (
      realmId: string,
      data: CreateAuthenticatorConfigDto,
      params: RequestParams = {},
    ) =>
      this.request<AuthenticatorConfigResponseDto, void>({
        path: `/auth/realms/${realmId}/authenticator-configs`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Update an authenticator configuration
     *
     * @tags Authentication Flows
     * @name AuthenticationControllerUpdateConfig
     * @summary Update authenticator config
     * @request PUT:/auth/authenticator-configs/{configId}
     * @secure
     */
    authenticationControllerUpdateConfig: (
      configId: string,
      data: UpdateAuthenticatorConfigDto,
      params: RequestParams = {},
    ) =>
      this.request<AuthenticatorConfigResponseDto, void>({
        path: `/auth/authenticator-configs/${configId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete an authenticator configuration
     *
     * @tags Authentication Flows
     * @name AuthenticationControllerDeleteConfig
     * @summary Delete authenticator config
     * @request DELETE:/auth/authenticator-configs/{configId}
     * @secure
     */
    authenticationControllerDeleteConfig: (
      configId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/auth/authenticator-configs/${configId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Get all identity providers configured for a realm (social login, SSO, etc.)
     *
     * @tags Identity Providers
     * @name IdentityProvidersControllerGetRealmProviders
     * @summary List identity providers
     * @request GET:/auth/realms/{realmId}/identity-providers
     * @secure
     */
    identityProvidersControllerGetRealmProviders: (
      realmId: string,
      query?: {
        /** @example "0" */
        page?: string;
        /** @example "20" */
        limit?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<IdentityProvidersPaginatedResponseDto, void>({
        path: `/auth/realms/${realmId}/identity-providers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new identity provider (social login, SAML, OIDC, etc.)
     *
     * @tags Identity Providers
     * @name IdentityProvidersControllerCreateProvider
     * @summary Create identity provider
     * @request POST:/auth/realms/{realmId}/identity-providers
     * @secure
     */
    identityProvidersControllerCreateProvider: (
      realmId: string,
      data: CreateIdentityProviderDto,
      params: RequestParams = {},
    ) =>
      this.request<IdentityProviderResponseDto, void>({
        path: `/auth/realms/${realmId}/identity-providers`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get details of a specific identity provider
     *
     * @tags Identity Providers
     * @name IdentityProvidersControllerGetProvider
     * @summary Get identity provider
     * @request GET:/auth/identity-providers/{internalId}
     * @secure
     */
    identityProvidersControllerGetProvider: (
      internalId: string,
      params: RequestParams = {},
    ) =>
      this.request<IdentityProviderResponseDto, void>({
        path: `/auth/identity-providers/${internalId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update properties of an identity provider
     *
     * @tags Identity Providers
     * @name IdentityProvidersControllerUpdateProvider
     * @summary Update identity provider
     * @request PUT:/auth/identity-providers/{internalId}
     * @secure
     */
    identityProvidersControllerUpdateProvider: (
      internalId: string,
      data: UpdateIdentityProviderDto,
      params: RequestParams = {},
    ) =>
      this.request<IdentityProviderResponseDto, void>({
        path: `/auth/identity-providers/${internalId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete an identity provider from the system
     *
     * @tags Identity Providers
     * @name IdentityProvidersControllerDeleteProvider
     * @summary Delete identity provider
     * @request DELETE:/auth/identity-providers/{internalId}
     * @secure
     */
    identityProvidersControllerDeleteProvider: (
      internalId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/auth/identity-providers/${internalId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Get all identity provider mappers for a realm
     *
     * @tags Identity Providers
     * @name IdentityProvidersControllerGetProviderMappers
     * @summary List identity provider mappers
     * @request GET:/auth/realms/{realmId}/identity-provider-mappers
     * @secure
     */
    identityProvidersControllerGetProviderMappers: (
      realmId: string,
      query?: {
        /** @example "0" */
        page?: string;
        /** @example "20" */
        limit?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<IdentityProviderMappersPaginatedResponseDto, void>({
        path: `/auth/realms/${realmId}/identity-provider-mappers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new identity provider mapper for mapping user attributes
     *
     * @tags Identity Providers
     * @name IdentityProvidersControllerCreateMapper
     * @summary Create identity provider mapper
     * @request POST:/auth/realms/{realmId}/identity-provider-mappers
     * @secure
     */
    identityProvidersControllerCreateMapper: (
      realmId: string,
      data: CreateIdentityProviderMapperDto,
      params: RequestParams = {},
    ) =>
      this.request<IdentityProviderMapperResponseDto, void>({
        path: `/auth/realms/${realmId}/identity-provider-mappers`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get all mappers for a specific identity provider
     *
     * @tags Identity Providers
     * @name IdentityProvidersControllerGetMappersForProvider
     * @summary List mappers for identity provider
     * @request GET:/auth/realms/{realmId}/identity-providers/{idpAlias}/mappers
     * @secure
     */
    identityProvidersControllerGetMappersForProvider: (
      realmId: string,
      idpAlias: string,
      params: RequestParams = {},
    ) =>
      this.request<IdentityProviderMappersPaginatedResponseDto, void>({
        path: `/auth/realms/${realmId}/identity-providers/${idpAlias}/mappers`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update an identity provider mapper
     *
     * @tags Identity Providers
     * @name IdentityProvidersControllerUpdateMapper
     * @summary Update identity provider mapper
     * @request PUT:/auth/identity-provider-mappers/{mapperId}
     * @secure
     */
    identityProvidersControllerUpdateMapper: (
      mapperId: string,
      data: UpdateIdentityProviderMapperDto,
      params: RequestParams = {},
    ) =>
      this.request<IdentityProviderMapperResponseDto, void>({
        path: `/auth/identity-provider-mappers/${mapperId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete an identity provider mapper
     *
     * @tags Identity Providers
     * @name IdentityProvidersControllerDeleteMapper
     * @summary Delete identity provider mapper
     * @request DELETE:/auth/identity-provider-mappers/{mapperId}
     * @secure
     */
    identityProvidersControllerDeleteMapper: (
      mapperId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/auth/identity-provider-mappers/${mapperId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Get all linked social/external accounts for a user
     *
     * @tags Identity Providers
     * @name IdentityProvidersControllerGetUserFederatedIdentities
     * @summary Get user's federated identities
     * @request GET:/auth/users/{userId}/federated-identities
     * @secure
     */
    identityProvidersControllerGetUserFederatedIdentities: (
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<FederatedIdentitiesListResponseDto, void>({
        path: `/auth/users/${userId}/federated-identities`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Remove a linked social/external account from a user
     *
     * @tags Identity Providers
     * @name IdentityProvidersControllerDeleteFederatedIdentity
     * @summary Unlink federated identity
     * @request DELETE:/auth/users/{userId}/federated-identities/{identityProvider}
     * @secure
     */
    identityProvidersControllerDeleteFederatedIdentity: (
      userId: string,
      identityProvider: string,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/auth/users/${userId}/federated-identities/${identityProvider}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
