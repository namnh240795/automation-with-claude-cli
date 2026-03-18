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
  message: string;
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
   * @example "john.doe"
   */
  username?: string;
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

export interface AddRolesDto {
  /**
   * Array of role IDs to add to the user
   * @example ["550e8400-e29b-41d4-a716-446655440000"]
   */
  roleIds: string[];
}

export interface RemoveRolesDto {
  /**
   * Array of role IDs to remove from the user
   * @example ["550e8400-e29b-41d4-a716-446655440000"]
   */
  roleIds: string[];
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

export interface AddGroupsDto {
  /**
   * Array of group IDs to add the user to
   * @example ["550e8400-e29b-41d4-a716-446655440000"]
   */
  groupIds: string[];
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

export interface AddRedirectUriDto {
  /**
   * Redirect URI to add
   * @example "http://localhost:3000/callback"
   */
  uri: string;
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
   * Client secret value
   * @example "abc123def4567890"
   */
  value: string;
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
  broker_session_id: string;
  /** Session data */
  data: string;
}

export interface ClientSessionResponseDto {
  /** User session ID */
  user_session_id: string;
  /** Client ID */
  client_id: string;
  /** Session timestamp */
  timestamp: number;
  /** Session data */
  data: string;
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
  alias: string;
  /** Action name */
  name: string;
  /** Action provider ID */
  provider_id: string;
  /** Whether action is enabled */
  enabled: boolean;
  /** Whether this is a default action */
  default_action: boolean;
  /** Action priority */
  priority: number;
  /** Realm ID */
  realm_id: string;
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
  name: string;
  /**
   * Provider ID
   * @example "verify-email"
   */
  provider_id: string;
  /**
   * Whether action is enabled
   * @example true
   */
  enabled: boolean;
  /**
   * Default action
   * @example false
   */
  default_action: boolean;
  /**
   * Action priority
   * @example 10
   */
  priority: number;
}

export interface UpdateRequiredActionDto {
  /** Action alias */
  alias: string;
  /** Action name */
  name: string;
  /** Whether action is enabled */
  enabled: boolean;
  /** Default action */
  default_action: boolean;
  /** Action priority */
  priority: number;
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
  type: string;
  /** Realm ID */
  realm_id: string;
  /** User ID */
  user_id: string;
  /** Client ID */
  client_id: string;
  /** Session ID */
  session_id: string;
  /** IP address */
  ip_address: string;
  /** Event time */
  event_time: number;
  /** Error message */
  error: string;
  /** Event details (JSON) */
  details_json: string;
  /** Long value details */
  details_json_long_value: string;
}

export interface AdminEventResponseDto {
  /** Admin event ID */
  id: string;
  /** Operation type */
  operation_type: string;
  /** Realm ID */
  realm_id: string;
  /** Resource type */
  resource_type: string;
  /** Resource path */
  resource_path: string;
  /** Authentication realm ID */
  auth_realm_id: string;
  /** Authentication client ID */
  auth_client_id: string;
  /** Authentication user ID */
  auth_user_id: string;
  /** IP address */
  ip_address: string;
  /** Admin event time */
  admin_event_time: number;
  /** Error message */
  error: string;
  /** Event representation */
  representation: string;
  /** Event details (JSON) */
  details_json: string;
}

export interface AuthenticationFlowResponseDto {
  /** Flow ID */
  id: string;
  /** Flow alias/identifier */
  alias: string;
  /** Flow description */
  description: string;
  /** Realm ID */
  realm_id: string;
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
  alias: string;
  /** Authenticator implementation */
  authenticator: string;
  /** Realm ID */
  realm_id: string;
  /** Flow ID */
  flow_id: string;
  /** Requirement level (0=REQUIRED, 1=OPTIONAL, 2=DISABLED, 3=ALTERNATIVE, 4=CONDITIONAL) */
  requirement: number;
  /** Execution priority */
  priority: number;
  /** Is this a sub-flow */
  authenticator_flow: boolean;
  /** Auth flow ID */
  auth_flow_id: string;
  /** Authenticator config ID */
  auth_config: string;
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
  alias: string;
  /** Realm ID */
  realm_id: string;
  /** Config entries */
  config: object;
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

export interface IdentityProvidersPaginatedResponseDto {
  /** Array of identity providers */
  providers: string[];
  /** Total number of providers */
  total: number;
}

export interface IdentityProviderResponseDto {
  /** Provider internal ID */
  internal_id: string;
  /** Provider alias */
  provider_alias: string;
  /** Provider ID */
  provider_id: string;
  /** Provider display name */
  provider_display_name: string;
  /** Realm ID */
  realm_id: string;
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
  hide_on_login: boolean;
  /** Organization ID */
  organization_id: string;
  /** First broker login flow ID */
  first_broker_login_flow_id: string;
  /** Post broker login flow ID */
  post_broker_login_flow_id: string;
  /** Provider configuration */
  config: object;
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

export interface IdentityProviderMappersPaginatedResponseDto {
  /** Array of identity provider mappers */
  mappers: string[];
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
  config: object;
}

export interface UpdateIdentityProviderMapperDto {
  /** Mapper name */
  name?: string;
  /** Identity provider mapper name */
  idp_mapper_name?: string;
  /** Mapper configuration as key-value pairs */
  config?: object;
}

export interface FederatedIdentitiesListResponseDto {
  /** Array of federated identities */
  identities: string[];
  /** Total number of identities */
  total: number;
}
