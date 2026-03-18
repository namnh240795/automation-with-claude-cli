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

import {
  AddGroupsDto,
  AddRedirectUriDto,
  AddRolesDto,
  AdminEventResponseDto,
  AuthenticationExecutionResponseDto,
  AuthenticationFlowResponseDto,
  AuthenticatorConfigResponseDto,
  ClientResponseDto,
  ClientSecretResponseDto,
  ClientSessionResponseDto,
  ClientsPaginatedResponseDto,
  CreateAuthenticationExecutionDto,
  CreateAuthenticationFlowDto,
  CreateAuthenticatorConfigDto,
  CreateClientDto,
  CreateGroupDto,
  CreateIdentityProviderDto,
  CreateIdentityProviderMapperDto,
  CreateRealmDto,
  CreateRequiredActionDto,
  CreateRoleDto,
  CreateUserDto,
  EventResponseDto,
  FederatedIdentitiesListResponseDto,
  GroupResponseDto,
  GroupsPaginatedResponseDto,
  HealthResponseDto,
  HelloResponseDto,
  IdentityProviderMapperResponseDto,
  IdentityProviderMappersPaginatedResponseDto,
  IdentityProviderResponseDto,
  IdentityProvidersPaginatedResponseDto,
  IdResponseDto,
  RealmResponseDto,
  RealmsPaginatedResponseDto,
  RefreshTokenDto,
  RemoveRolesDto,
  RequiredActionResponseDto,
  RevokeTokenDto,
  RoleResponseDto,
  RolesPaginatedResponseDto,
  SetUserRequiredActionsDto,
  SignInDto,
  SignUpDto,
  SignupResponseDto,
  SmtpConfigResponseDto,
  TokenResponseDto,
  UpdateAuthenticationExecutionDto,
  UpdateAuthenticationFlowDto,
  UpdateAuthenticatorConfigDto,
  UpdateClientDto,
  UpdateGroupDto,
  UpdateIdentityProviderDto,
  UpdateIdentityProviderMapperDto,
  UpdateRealmDto,
  UpdateRequiredActionDto,
  UpdateRoleDto,
  UpdateUserDto,
  UserRequiredActionResponseDto,
  UserResponseDto,
  UserSessionResponseDto,
  UsersPaginatedResponseDto,
  VoidResponseDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Auth<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Auth
   * @name AppControllerGetHelloV1
   * @summary Health check endpoint
   * @request GET:/auth/v1
   */
  appControllerGetHelloV1 = (params: RequestParams = {}) =>
    this.request<HelloResponseDto, any>({
      path: `/auth/v1`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AppControllerHealthCheckV1
   * @summary Health check
   * @request GET:/auth/v1/health
   */
  appControllerHealthCheckV1 = (params: RequestParams = {}) =>
    this.request<HealthResponseDto, any>({
      path: `/auth/v1/health`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerSignUp
   * @summary Register a new user
   * @request POST:/auth/signup
   */
  authControllerSignUp = (data: SignUpDto, params: RequestParams = {}) =>
    this.request<SignupResponseDto, void>({
      path: `/auth/signup`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerSignIn
   * @summary Sign in with email and password
   * @request POST:/auth/signin
   */
  authControllerSignIn = (data: SignInDto, params: RequestParams = {}) =>
    this.request<TokenResponseDto, void>({
      path: `/auth/signin`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerRefresh
   * @summary Refresh access token using refresh token
   * @request POST:/auth/refresh
   */
  authControllerRefresh = (data: RefreshTokenDto, params: RequestParams = {}) =>
    this.request<TokenResponseDto, void>({
      path: `/auth/refresh`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerLogout
   * @summary Logout user and revoke refresh token
   * @request POST:/auth/logout
   */
  authControllerLogout = (data: RefreshTokenDto, params: RequestParams = {}) =>
    this.request<VoidResponseDto, any>({
      path: `/auth/logout`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerGetProfile
   * @summary Get current user profile
   * @request GET:/auth/profile
   * @secure
   */
  authControllerGetProfile = (params: RequestParams = {}) =>
    this.request<SignupResponseDto, void>({
      path: `/auth/profile`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Realms
   * @name RealmsControllerFindAll
   * @summary List all realms
   * @request GET:/auth/api/v1/realms
   * @secure
   */
  realmsControllerFindAll = (
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
    });
  /**
   * No description
   *
   * @tags Realms
   * @name RealmsControllerCreate
   * @summary Create a new realm
   * @request POST:/auth/api/v1/realms
   * @secure
   */
  realmsControllerCreate = (data: CreateRealmDto, params: RequestParams = {}) =>
    this.request<RealmResponseDto, void>({
      path: `/auth/api/v1/realms`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Realms
   * @name RealmsControllerFindOne
   * @summary Get realm details
   * @request GET:/auth/api/v1/realms/{realmId}
   * @secure
   */
  realmsControllerFindOne = (realmId: string, params: RequestParams = {}) =>
    this.request<RealmResponseDto, void>({
      path: `/auth/api/v1/realms/${realmId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Realms
   * @name RealmsControllerUpdate
   * @summary Update realm
   * @request PUT:/auth/api/v1/realms/{realmId}
   * @secure
   */
  realmsControllerUpdate = (
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
    });
  /**
   * No description
   *
   * @tags Realms
   * @name RealmsControllerDelete
   * @summary Delete realm
   * @request DELETE:/auth/api/v1/realms/{realmId}
   * @secure
   */
  realmsControllerDelete = (realmId: any, params: RequestParams = {}) =>
    this.request<IdResponseDto, void>({
      path: `/auth/api/v1/realms/${realmId}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Realms
   * @name RealmsControllerGetAttributes
   * @summary Get realm attributes
   * @request GET:/auth/api/v1/realms/{realmId}/attributes
   * @secure
   */
  realmsControllerGetAttributes = (
    realmId: string,
    params: RequestParams = {},
  ) =>
    this.request<any, any>({
      path: `/auth/api/v1/realms/${realmId}/attributes`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Realms
   * @name RealmsControllerUpdateAttributes
   * @summary Update realm attributes
   * @request PUT:/auth/api/v1/realms/{realmId}/attributes
   * @secure
   */
  realmsControllerUpdateAttributes = (
    realmId: string,
    attributes: Record<string, string>,
    params: RequestParams = {},
  ) =>
    this.request<any, any>({
      path: `/auth/api/v1/realms/${realmId}/attributes`,
      method: "PUT",
      body: attributes,
      secure: true,
      format: "json",
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Realms
   * @name RealmsControllerDeleteAttribute
   * @summary Delete realm attribute
   * @request DELETE:/auth/api/v1/realms/{realmId}/attributes/{name}
   * @secure
   */
  realmsControllerDeleteAttribute = (
    realmId: string,
    name: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/auth/api/v1/realms/${realmId}/attributes/${name}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Realms
   * @name RealmsControllerGetSmtpConfig
   * @summary Get realm SMTP configuration
   * @request GET:/auth/api/v1/realms/{realmId}/smtp
   * @secure
   */
  realmsControllerGetSmtpConfig = (
    realmId: string,
    params: RequestParams = {},
  ) =>
    this.request<any, any>({
      path: `/auth/api/v1/realms/${realmId}/smtp`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Realms
   * @name RealmsControllerUpdateSmtpConfig
   * @summary Update realm SMTP configuration
   * @request PUT:/auth/api/v1/realms/{realmId}/smtp
   * @secure
   */
  realmsControllerUpdateSmtpConfig = (
    realmId: string,
    smtpConfig: SmtpConfigRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<SmtpConfigResponseDto, any>({
      path: `/auth/api/v1/realms/${realmId}/smtp`,
      method: "PUT",
      body: smtpConfig,
      secure: true,
      format: "json",
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerFindAll
   * @summary List users in a realm
   * @request GET:/auth/api/v1/realms/{realmId}/users
   * @secure
   */
  usersControllerFindAll = (
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
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerCreate
   * @summary Create a new user
   * @request POST:/auth/api/v1/realms/{realmId}/users
   * @secure
   */
  usersControllerCreate = (
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
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerFindOne
   * @summary Get user details
   * @request GET:/auth/api/v1/realms/{realmId}/users/{userId}
   * @secure
   */
  usersControllerFindOne = (
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
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerUpdate
   * @summary Update user
   * @request PUT:/auth/api/v1/realms/{realmId}/users/{userId}
   * @secure
   */
  usersControllerUpdate = (
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
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerDelete
   * @summary Delete user
   * @request DELETE:/auth/api/v1/realms/{realmId}/users/{userId}
   * @secure
   */
  usersControllerDelete = (
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
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerGetCredentials
   * @summary Get user credentials
   * @request GET:/auth/api/v1/realms/{realmId}/users/{userId}/credentials
   * @secure
   */
  usersControllerGetCredentials = (
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
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerGetAttributes
   * @summary Get user attributes
   * @request GET:/auth/api/v1/realms/{realmId}/users/{userId}/attributes
   * @secure
   */
  usersControllerGetAttributes = (
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
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerUpdateAttributes
   * @summary Update user attributes
   * @request PUT:/auth/api/v1/realms/{realmId}/users/{userId}/attributes
   * @secure
   */
  usersControllerUpdateAttributes = (
    realmId: string,
    userId: string,
    attributes: Record<string, string>,
    params: RequestParams = {},
  ) =>
    this.request<any, any>({
      path: `/auth/api/v1/realms/${realmId}/users/${userId}/attributes`,
      method: "PUT",
      body: attributes,
      secure: true,
      format: "json",
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerDeleteAttribute
   * @summary Delete user attribute
   * @request DELETE:/auth/api/v1/realms/{realmId}/users/{userId}/attributes/{name}
   * @secure
   */
  usersControllerDeleteAttribute = (
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
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerGetRoles
   * @summary Get user roles
   * @request GET:/auth/api/v1/realms/{realmId}/users/{userId}/roles
   * @secure
   */
  usersControllerGetRoles = (
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
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerAddRoles
   * @summary Add roles to user
   * @request POST:/auth/api/v1/realms/{realmId}/users/{userId}/roles
   * @secure
   */
  usersControllerAddRoles = (
    realmId: string,
    userId: string,
    data: AddRolesDto,
    params: RequestParams = {},
  ) =>
    this.request<RoleResponseDto[], any>({
      path: `/auth/api/v1/realms/${realmId}/users/${userId}/roles`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerRemoveRoles
   * @summary Remove roles from user
   * @request DELETE:/auth/api/v1/realms/{realmId}/users/{userId}/roles
   * @secure
   */
  usersControllerRemoveRoles = (
    realmId: string,
    userId: string,
    data: RemoveRolesDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/auth/api/v1/realms/${realmId}/users/${userId}/roles`,
      method: "DELETE",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerGetGroups
   * @summary Get user groups
   * @request GET:/auth/api/v1/realms/{realmId}/users/{userId}/groups
   * @secure
   */
  usersControllerGetGroups = (
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
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerAddGroups
   * @summary Add user to groups
   * @request POST:/auth/api/v1/realms/{realmId}/users/{userId}/groups
   * @secure
   */
  usersControllerAddGroups = (
    realmId: string,
    userId: string,
    data: AddGroupsDto,
    params: RequestParams = {},
  ) =>
    this.request<GroupResponseDto[], any>({
      path: `/auth/api/v1/realms/${realmId}/users/${userId}/groups`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerRemoveGroup
   * @summary Remove user from group
   * @request DELETE:/auth/api/v1/realms/{realmId}/users/{userId}/groups/{groupId}
   * @secure
   */
  usersControllerRemoveGroup = (
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
    });
  /**
   * No description
   *
   * @tags Roles
   * @name RolesControllerFindAll
   * @summary List roles in a realm
   * @request GET:/auth/api/v1/realms/{realmId}/roles
   * @secure
   */
  rolesControllerFindAll = (
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
    });
  /**
   * No description
   *
   * @tags Roles
   * @name RolesControllerCreate
   * @summary Create a new role
   * @request POST:/auth/api/v1/realms/{realmId}/roles
   * @secure
   */
  rolesControllerCreate = (
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
    });
  /**
   * No description
   *
   * @tags Roles
   * @name RolesControllerFindOne
   * @summary Get role details
   * @request GET:/auth/api/v1/realms/{realmId}/roles/{roleId}
   * @secure
   */
  rolesControllerFindOne = (
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
    });
  /**
   * No description
   *
   * @tags Roles
   * @name RolesControllerUpdate
   * @summary Update role
   * @request PUT:/auth/api/v1/realms/{realmId}/roles/{roleId}
   * @secure
   */
  rolesControllerUpdate = (
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
    });
  /**
   * No description
   *
   * @tags Roles
   * @name RolesControllerDelete
   * @summary Delete role
   * @request DELETE:/auth/api/v1/realms/{realmId}/roles/{roleId}
   * @secure
   */
  rolesControllerDelete = (
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
    });
  /**
   * No description
   *
   * @tags Roles
   * @name RolesControllerGetComposites
   * @summary Get composite roles
   * @request GET:/auth/api/v1/realms/{realmId}/roles/{roleId}/composites
   * @secure
   */
  rolesControllerGetComposites = (
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
    });
  /**
   * No description
   *
   * @tags Roles
   * @name RolesControllerAddComposites
   * @summary Add composite roles
   * @request POST:/auth/api/v1/realms/{realmId}/roles/{roleId}/composites
   * @secure
   */
  rolesControllerAddComposites = (
    realmId: string,
    roleId: string,
    body: { roleIds: string[] },
    params: RequestParams = {},
  ) =>
    this.request<RoleResponseDto[], any>({
      path: `/auth/api/v1/realms/${realmId}/roles/${roleId}/composites`,
      method: "POST",
      body: body,
      secure: true,
      format: "json",
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Roles
   * @name RolesControllerRemoveComposite
   * @summary Remove composite role
   * @request DELETE:/auth/api/v1/realms/{realmId}/roles/{roleId}/composites/{compositeId}
   * @secure
   */
  rolesControllerRemoveComposite = (
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
    });
  /**
   * No description
   *
   * @tags Roles
   * @name RolesControllerGetUsers
   * @summary Get users with this role
   * @request GET:/auth/api/v1/realms/{realmId}/roles/{roleId}/users
   * @secure
   */
  rolesControllerGetUsers = (
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
    });
  /**
   * No description
   *
   * @tags Roles
   * @name RolesControllerAddUser
   * @summary Assign role to user
   * @request POST:/auth/api/v1/realms/{realmId}/roles/{roleId}/users/{userId}
   * @secure
   */
  rolesControllerAddUser = (
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
    });
  /**
   * No description
   *
   * @tags Roles
   * @name RolesControllerRemoveUser
   * @summary Remove role from user
   * @request DELETE:/auth/api/v1/realms/{realmId}/roles/{roleId}/users/{userId}
   * @secure
   */
  rolesControllerRemoveUser = (
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
    });
  /**
   * No description
   *
   * @tags Groups
   * @name GroupsControllerFindAll
   * @summary List groups in a realm
   * @request GET:/auth/api/v1/realms/{realmId}/groups
   * @secure
   */
  groupsControllerFindAll = (
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
    });
  /**
   * No description
   *
   * @tags Groups
   * @name GroupsControllerCreate
   * @summary Create a new group
   * @request POST:/auth/api/v1/realms/{realmId}/groups
   * @secure
   */
  groupsControllerCreate = (
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
    });
  /**
   * No description
   *
   * @tags Groups
   * @name GroupsControllerFindOne
   * @summary Get group details
   * @request GET:/auth/api/v1/realms/{realmId}/groups/{groupId}
   * @secure
   */
  groupsControllerFindOne = (
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
    });
  /**
   * No description
   *
   * @tags Groups
   * @name GroupsControllerUpdate
   * @summary Update group
   * @request PUT:/auth/api/v1/realms/{realmId}/groups/{groupId}
   * @secure
   */
  groupsControllerUpdate = (
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
    });
  /**
   * No description
   *
   * @tags Groups
   * @name GroupsControllerDelete
   * @summary Delete group
   * @request DELETE:/auth/api/v1/realms/{realmId}/groups/{groupId}
   * @secure
   */
  groupsControllerDelete = (
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
    });
  /**
   * No description
   *
   * @tags Groups
   * @name GroupsControllerGetRoles
   * @summary Get group roles
   * @request GET:/auth/api/v1/realms/{realmId}/groups/{groupId}/roles
   * @secure
   */
  groupsControllerGetRoles = (
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
    });
  /**
   * No description
   *
   * @tags Groups
   * @name GroupsControllerAddRoles
   * @summary Assign roles to group
   * @request POST:/auth/api/v1/realms/{realmId}/groups/{groupId}/roles
   * @secure
   */
  groupsControllerAddRoles = (
    realmId: string,
    groupId: string,
    body: { roleIds: string[] },
    params: RequestParams = {},
  ) =>
    this.request<RoleResponseDto[], any>({
      path: `/auth/api/v1/realms/${realmId}/groups/${groupId}/roles`,
      method: "POST",
      body: body,
      secure: true,
      format: "json",
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Groups
   * @name GroupsControllerRemoveRole
   * @summary Remove role from group
   * @request DELETE:/auth/api/v1/realms/{realmId}/groups/{groupId}/roles/{roleId}
   * @secure
   */
  groupsControllerRemoveRole = (
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
    });
  /**
   * No description
   *
   * @tags Groups
   * @name GroupsControllerGetMembers
   * @summary Get group members
   * @request GET:/auth/api/v1/realms/{realmId}/groups/{groupId}/members
   * @secure
   */
  groupsControllerGetMembers = (
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
    });
  /**
   * No description
   *
   * @tags Groups
   * @name GroupsControllerAddMember
   * @summary Add user to group
   * @request POST:/auth/api/v1/realms/{realmId}/groups/{groupId}/members/{userId}
   * @secure
   */
  groupsControllerAddMember = (
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
    });
  /**
   * No description
   *
   * @tags Groups
   * @name GroupsControllerRemoveMember
   * @summary Remove user from group
   * @request DELETE:/auth/api/v1/realms/{realmId}/groups/{groupId}/members/{userId}
   * @secure
   */
  groupsControllerRemoveMember = (
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
    });
  /**
   * No description
   *
   * @tags Clients
   * @name ClientsControllerFindAll
   * @summary List clients in a realm
   * @request GET:/auth/api/v1/realms/{realmId}/clients
   * @secure
   */
  clientsControllerFindAll = (
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
    });
  /**
   * No description
   *
   * @tags Clients
   * @name ClientsControllerCreate
   * @summary Create a new client
   * @request POST:/auth/api/v1/realms/{realmId}/clients
   * @secure
   */
  clientsControllerCreate = (
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
    });
  /**
   * No description
   *
   * @tags Clients
   * @name ClientsControllerFindOne
   * @summary Get client details
   * @request GET:/auth/api/v1/realms/{realmId}/clients/{clientId}
   * @secure
   */
  clientsControllerFindOne = (
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
    });
  /**
   * No description
   *
   * @tags Clients
   * @name ClientsControllerUpdate
   * @summary Update client
   * @request PUT:/auth/api/v1/realms/{realmId}/clients/{clientId}
   * @secure
   */
  clientsControllerUpdate = (
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
    });
  /**
   * No description
   *
   * @tags Clients
   * @name ClientsControllerDelete
   * @summary Delete client
   * @request DELETE:/auth/api/v1/realms/{realmId}/clients/{clientId}
   * @secure
   */
  clientsControllerDelete = (
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
    });
  /**
   * No description
   *
   * @tags Clients
   * @name ClientsControllerGetRedirectUris
   * @summary Get client redirect URIs
   * @request GET:/auth/api/v1/realms/{realmId}/clients/{clientId}/redirect-uris
   * @secure
   */
  clientsControllerGetRedirectUris = (
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
    });
  /**
   * No description
   *
   * @tags Clients
   * @name ClientsControllerAddRedirectUri
   * @summary Add redirect URI
   * @request POST:/auth/api/v1/realms/{realmId}/clients/{clientId}/redirect-uris
   * @secure
   */
  clientsControllerAddRedirectUri = (
    realmId: string,
    clientId: string,
    data: AddRedirectUriDto,
    params: RequestParams = {},
  ) =>
    this.request<string[], any>({
      path: `/auth/api/v1/realms/${realmId}/clients/${clientId}/redirect-uris`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Clients
   * @name ClientsControllerRemoveRedirectUri
   * @summary Remove redirect URI
   * @request DELETE:/auth/api/v1/realms/{realmId}/clients/{clientId}/redirect-uris/{uri}
   * @secure
   */
  clientsControllerRemoveRedirectUri = (
    realmId: string,
    clientId: string,
    uri: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/auth/api/v1/realms/${realmId}/clients/${clientId}/redirect-uris/${encodeURIComponent(uri)}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Clients
   * @name ClientsControllerGetSecret
   * @summary Get client secret
   * @request GET:/auth/api/v1/realms/{realmId}/clients/{clientId}/secret
   * @secure
   */
  clientsControllerGetSecret = (
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
    });
  /**
   * No description
   *
   * @tags Clients
   * @name ClientsControllerRegenerateSecret
   * @summary Regenerate client secret
   * @request POST:/auth/api/v1/realms/{realmId}/clients/{clientId}/secret/regenerate
   * @secure
   */
  clientsControllerRegenerateSecret = (
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
    });
  /**
   * @description Get all offline user sessions for a specific realm
   *
   * @tags Sessions
   * @name SessionsControllerGetRealmSessions
   * @summary List all sessions in a realm
   * @request GET:/auth/realms/{realmId}/sessions
   * @secure
   */
  sessionsControllerGetRealmSessions = (
    realmId: string,
    params: RequestParams = {},
  ) =>
    this.request<UserSessionResponseDto[], void>({
      path: `/auth/realms/${realmId}/sessions`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get all offline sessions for a specific user
   *
   * @tags Sessions
   * @name SessionsControllerGetUserSessions
   * @summary Get user's sessions
   * @request GET:/auth/users/{userId}/sessions
   * @secure
   */
  sessionsControllerGetUserSessions = (
    userId: string,
    params: RequestParams = {},
  ) =>
    this.request<UserSessionResponseDto[], void>({
      path: `/auth/users/${userId}/sessions`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Terminate all sessions for a specific user
   *
   * @tags Sessions
   * @name SessionsControllerTerminateAllUserSessions
   * @summary Terminate all user's sessions
   * @request DELETE:/auth/users/{userId}/sessions
   * @secure
   */
  sessionsControllerTerminateAllUserSessions = (
    userId: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/auth/users/${userId}/sessions`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Get all offline client sessions for a specific user
   *
   * @tags Sessions
   * @name SessionsControllerGetUserClientSessions
   * @summary Get user's client sessions
   * @request GET:/auth/users/{userId}/client-sessions
   * @secure
   */
  sessionsControllerGetUserClientSessions = (
    userId: string,
    params: RequestParams = {},
  ) =>
    this.request<ClientSessionResponseDto[], void>({
      path: `/auth/users/${userId}/client-sessions`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Terminate a specific user session by ID
   *
   * @tags Sessions
   * @name SessionsControllerTerminateSession
   * @summary Terminate a session
   * @request DELETE:/auth/sessions/{sessionId}
   * @secure
   */
  sessionsControllerTerminateSession = (
    sessionId: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/auth/sessions/${sessionId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Revoke an access or refresh token by adding it to the revoked tokens list
   *
   * @tags Sessions
   * @name SessionsControllerRevokeToken
   * @summary Revoke a token
   * @request POST:/auth/tokens/revoke
   */
  sessionsControllerRevokeToken = (
    data: RevokeTokenDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/auth/tokens/revoke`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Check if a specific token has been revoked
   *
   * @tags Sessions
   * @name SessionsControllerIsTokenRevoked
   * @summary Check if token is revoked
   * @request POST:/auth/tokens/check-revoked
   */
  sessionsControllerIsTokenRevoked = (
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
    });
  /**
   * @description Get all required actions configured for a realm
   *
   * @tags Required Actions
   * @name RequiredActionsControllerGetRealmRequiredActions
   * @summary List required actions
   * @request GET:/auth/realms/{realmId}/required-actions
   * @secure
   */
  requiredActionsControllerGetRealmRequiredActions = (
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
    });
  /**
   * @description Create a new required action for a realm
   *
   * @tags Required Actions
   * @name RequiredActionsControllerCreateRequiredAction
   * @summary Create required action
   * @request POST:/auth/realms/{realmId}/required-actions
   * @secure
   */
  requiredActionsControllerCreateRequiredAction = (
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
    });
  /**
   * @description Get details of a specific required action
   *
   * @tags Required Actions
   * @name RequiredActionsControllerGetRequiredAction
   * @summary Get required action
   * @request GET:/auth/required-actions/{actionId}
   * @secure
   */
  requiredActionsControllerGetRequiredAction = (
    actionId: string,
    params: RequestParams = {},
  ) =>
    this.request<RequiredActionResponseDto, void>({
      path: `/auth/required-actions/${actionId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Update properties of a required action
   *
   * @tags Required Actions
   * @name RequiredActionsControllerUpdateRequiredAction
   * @summary Update required action
   * @request PUT:/auth/required-actions/{actionId}
   * @secure
   */
  requiredActionsControllerUpdateRequiredAction = (
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
    });
  /**
   * @description Delete a required action from the system
   *
   * @tags Required Actions
   * @name RequiredActionsControllerDeleteRequiredAction
   * @summary Delete required action
   * @request DELETE:/auth/required-actions/{actionId}
   * @secure
   */
  requiredActionsControllerDeleteRequiredAction = (
    actionId: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/auth/required-actions/${actionId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Get all required actions assigned to a specific user
   *
   * @tags Required Actions
   * @name RequiredActionsControllerGetUserRequiredActions
   * @summary Get user's required actions
   * @request GET:/auth/users/{userId}/required-actions
   * @secure
   */
  requiredActionsControllerGetUserRequiredActions = (
    userId: string,
    params: RequestParams = {},
  ) =>
    this.request<UserRequiredActionResponseDto[], void>({
      path: `/auth/users/${userId}/required-actions`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Replace all required actions for a user
   *
   * @tags Required Actions
   * @name RequiredActionsControllerSetUserRequiredActions
   * @summary Set user's required actions
   * @request PUT:/auth/users/{userId}/required-actions
   * @secure
   */
  requiredActionsControllerSetUserRequiredActions = (
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
    });
  /**
   * @description Remove a specific required action from a user
   *
   * @tags Required Actions
   * @name RequiredActionsControllerRemoveUserRequiredAction
   * @summary Remove user's required action
   * @request DELETE:/auth/users/{userId}/required-actions/{actionName}
   * @secure
   */
  requiredActionsControllerRemoveUserRequiredAction = (
    userId: string,
    actionName: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/auth/users/${userId}/required-actions/${actionName}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Get all available required action providers in the system
   *
   * @tags Required Actions
   * @name RequiredActionsControllerGetRequiredActionProviders
   * @summary List required action providers
   * @request GET:/auth/required-actions-providers
   * @secure
   */
  requiredActionsControllerGetRequiredActionProviders = (
    params: RequestParams = {},
  ) =>
    this.request<RequiredActionResponseDto[], void>({
      path: `/auth/required-actions-providers`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get all user events for a realm with optional filtering
   *
   * @tags Events
   * @name EventsControllerGetRealmEvents
   * @summary List realm events
   * @request GET:/auth/realms/{realmId}/events
   * @secure
   */
  eventsControllerGetRealmEvents = (
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
    });
  /**
   * @description Get all events for a specific user
   *
   * @tags Events
   * @name EventsControllerGetUserEvents
   * @summary Get user's events
   * @request GET:/auth/users/{userId}/events
   * @secure
   */
  eventsControllerGetUserEvents = (
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
    });
  /**
   * @description Get all admin events for a realm with optional filtering
   *
   * @tags Events
   * @name EventsControllerGetAdminEvents
   * @summary List admin events
   * @request GET:/auth/realms/{realmId}/admin-events
   * @secure
   */
  eventsControllerGetAdminEvents = (
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
    });
  /**
   * @description Export realm events to JSON for audit purposes
   *
   * @tags Events
   * @name EventsControllerExportEvents
   * @summary Export events
   * @request GET:/auth/realms/{realmId}/events/export
   * @secure
   */
  eventsControllerExportEvents = (
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
    });
  /**
   * @description Delete events older than specified number of days
   *
   * @tags Events
   * @name EventsControllerCleanupEvents
   * @summary Clean up old events
   * @request DELETE:/auth/realms/{realmId}/events/cleanup
   * @secure
   */
  eventsControllerCleanupEvents = (
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
    });
  /**
   * @description Delete admin events older than specified number of days
   *
   * @tags Events
   * @name EventsControllerCleanupAdminEvents
   * @summary Clean up old admin events
   * @request DELETE:/auth/realms/{realmId}/admin-events/cleanup
   * @secure
   */
  eventsControllerCleanupAdminEvents = (
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
    });
  /**
   * @description Get all authentication flows configured for a realm
   *
   * @tags Authentication Flows
   * @name AuthenticationControllerGetRealmFlows
   * @summary List authentication flows
   * @request GET:/auth/realms/{realmId}/authentication-flows
   * @secure
   */
  authenticationControllerGetRealmFlows = (
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
    });
  /**
   * @description Create a new authentication flow for a realm
   *
   * @tags Authentication Flows
   * @name AuthenticationControllerCreateFlow
   * @summary Create authentication flow
   * @request POST:/auth/realms/{realmId}/authentication-flows
   * @secure
   */
  authenticationControllerCreateFlow = (
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
    });
  /**
   * @description Get details of a specific authentication flow
   *
   * @tags Authentication Flows
   * @name AuthenticationControllerGetFlow
   * @summary Get authentication flow
   * @request GET:/auth/authentication-flows/{flowId}
   * @secure
   */
  authenticationControllerGetFlow = (
    flowId: string,
    params: RequestParams = {},
  ) =>
    this.request<AuthenticationFlowResponseDto, void>({
      path: `/auth/authentication-flows/${flowId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Update properties of an authentication flow
   *
   * @tags Authentication Flows
   * @name AuthenticationControllerUpdateFlow
   * @summary Update authentication flow
   * @request PUT:/auth/authentication-flows/{flowId}
   * @secure
   */
  authenticationControllerUpdateFlow = (
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
    });
  /**
   * @description Delete an authentication flow from the system
   *
   * @tags Authentication Flows
   * @name AuthenticationControllerDeleteFlow
   * @summary Delete authentication flow
   * @request DELETE:/auth/authentication-flows/{flowId}
   * @secure
   */
  authenticationControllerDeleteFlow = (
    flowId: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/auth/authentication-flows/${flowId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Get all execution steps for an authentication flow
   *
   * @tags Authentication Flows
   * @name AuthenticationControllerGetFlowExecutions
   * @summary List flow executions
   * @request GET:/auth/authentication-flows/{flowId}/executions
   * @secure
   */
  authenticationControllerGetFlowExecutions = (
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
    });
  /**
   * @description Add an execution step to an authentication flow
   *
   * @tags Authentication Flows
   * @name AuthenticationControllerAddExecution
   * @summary Add flow execution
   * @request POST:/auth/realms/{realmId}/authentication-flows/{flowId}/executions
   * @secure
   */
  authenticationControllerAddExecution = (
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
    });
  /**
   * @description Update an execution step in an authentication flow
   *
   * @tags Authentication Flows
   * @name AuthenticationControllerUpdateExecution
   * @summary Update flow execution
   * @request PUT:/auth/authentication-flows/executions/{executionId}
   * @secure
   */
  authenticationControllerUpdateExecution = (
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
    });
  /**
   * @description Remove an execution step from an authentication flow
   *
   * @tags Authentication Flows
   * @name AuthenticationControllerDeleteExecution
   * @summary Delete flow execution
   * @request DELETE:/auth/authentication-flows/executions/{executionId}
   * @secure
   */
  authenticationControllerDeleteExecution = (
    executionId: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/auth/authentication-flows/executions/${executionId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Get all authenticator configurations for a realm
   *
   * @tags Authentication Flows
   * @name AuthenticationControllerGetRealmConfigs
   * @summary List authenticator configs
   * @request GET:/auth/realms/{realmId}/authenticator-configs
   * @secure
   */
  authenticationControllerGetRealmConfigs = (
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
    });
  /**
   * @description Create a new authenticator configuration for a realm
   *
   * @tags Authentication Flows
   * @name AuthenticationControllerCreateConfig
   * @summary Create authenticator config
   * @request POST:/auth/realms/{realmId}/authenticator-configs
   * @secure
   */
  authenticationControllerCreateConfig = (
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
    });
  /**
   * @description Update an authenticator configuration
   *
   * @tags Authentication Flows
   * @name AuthenticationControllerUpdateConfig
   * @summary Update authenticator config
   * @request PUT:/auth/authenticator-configs/{configId}
   * @secure
   */
  authenticationControllerUpdateConfig = (
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
    });
  /**
   * @description Delete an authenticator configuration
   *
   * @tags Authentication Flows
   * @name AuthenticationControllerDeleteConfig
   * @summary Delete authenticator config
   * @request DELETE:/auth/authenticator-configs/{configId}
   * @secure
   */
  authenticationControllerDeleteConfig = (
    configId: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/auth/authenticator-configs/${configId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Get all identity providers configured for a realm (social login, SSO, etc.)
   *
   * @tags Identity Providers
   * @name IdentityProvidersControllerGetRealmProviders
   * @summary List identity providers
   * @request GET:/auth/realms/{realmId}/identity-providers
   * @secure
   */
  identityProvidersControllerGetRealmProviders = (
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
    });
  /**
   * @description Create a new identity provider (social login, SAML, OIDC, etc.)
   *
   * @tags Identity Providers
   * @name IdentityProvidersControllerCreateProvider
   * @summary Create identity provider
   * @request POST:/auth/realms/{realmId}/identity-providers
   * @secure
   */
  identityProvidersControllerCreateProvider = (
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
    });
  /**
   * @description Get details of a specific identity provider
   *
   * @tags Identity Providers
   * @name IdentityProvidersControllerGetProvider
   * @summary Get identity provider
   * @request GET:/auth/identity-providers/{internalId}
   * @secure
   */
  identityProvidersControllerGetProvider = (
    internalId: string,
    params: RequestParams = {},
  ) =>
    this.request<IdentityProviderResponseDto, void>({
      path: `/auth/identity-providers/${internalId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Update properties of an identity provider
   *
   * @tags Identity Providers
   * @name IdentityProvidersControllerUpdateProvider
   * @summary Update identity provider
   * @request PUT:/auth/identity-providers/{internalId}
   * @secure
   */
  identityProvidersControllerUpdateProvider = (
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
    });
  /**
   * @description Delete an identity provider from the system
   *
   * @tags Identity Providers
   * @name IdentityProvidersControllerDeleteProvider
   * @summary Delete identity provider
   * @request DELETE:/auth/identity-providers/{internalId}
   * @secure
   */
  identityProvidersControllerDeleteProvider = (
    internalId: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/auth/identity-providers/${internalId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Get all identity provider mappers for a realm
   *
   * @tags Identity Providers
   * @name IdentityProvidersControllerGetProviderMappers
   * @summary List identity provider mappers
   * @request GET:/auth/realms/{realmId}/identity-provider-mappers
   * @secure
   */
  identityProvidersControllerGetProviderMappers = (
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
    });
  /**
   * @description Create a new identity provider mapper for mapping user attributes
   *
   * @tags Identity Providers
   * @name IdentityProvidersControllerCreateMapper
   * @summary Create identity provider mapper
   * @request POST:/auth/realms/{realmId}/identity-provider-mappers
   * @secure
   */
  identityProvidersControllerCreateMapper = (
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
    });
  /**
   * @description Get all mappers for a specific identity provider
   *
   * @tags Identity Providers
   * @name IdentityProvidersControllerGetMappersForProvider
   * @summary List mappers for identity provider
   * @request GET:/auth/realms/{realmId}/identity-providers/{idpAlias}/mappers
   * @secure
   */
  identityProvidersControllerGetMappersForProvider = (
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
    });
  /**
   * @description Update an identity provider mapper
   *
   * @tags Identity Providers
   * @name IdentityProvidersControllerUpdateMapper
   * @summary Update identity provider mapper
   * @request PUT:/auth/identity-provider-mappers/{mapperId}
   * @secure
   */
  identityProvidersControllerUpdateMapper = (
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
    });
  /**
   * @description Delete an identity provider mapper
   *
   * @tags Identity Providers
   * @name IdentityProvidersControllerDeleteMapper
   * @summary Delete identity provider mapper
   * @request DELETE:/auth/identity-provider-mappers/{mapperId}
   * @secure
   */
  identityProvidersControllerDeleteMapper = (
    mapperId: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/auth/identity-provider-mappers/${mapperId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Get all linked social/external accounts for a user
   *
   * @tags Identity Providers
   * @name IdentityProvidersControllerGetUserFederatedIdentities
   * @summary Get user's federated identities
   * @request GET:/auth/users/{userId}/federated-identities
   * @secure
   */
  identityProvidersControllerGetUserFederatedIdentities = (
    userId: string,
    params: RequestParams = {},
  ) =>
    this.request<FederatedIdentitiesListResponseDto, void>({
      path: `/auth/users/${userId}/federated-identities`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Remove a linked social/external account from a user
   *
   * @tags Identity Providers
   * @name IdentityProvidersControllerDeleteFederatedIdentity
   * @summary Unlink federated identity
   * @request DELETE:/auth/users/{userId}/federated-identities/{identityProvider}
   * @secure
   */
  identityProvidersControllerDeleteFederatedIdentity = (
    userId: string,
    identityProvider: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/auth/users/${userId}/federated-identities/${identityProvider}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
