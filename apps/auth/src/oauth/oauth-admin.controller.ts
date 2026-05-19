import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  Logger,
  Version,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard, Roles } from '@app/auth-utilities';
import { PermissionService } from './permission.service';
import { RoleService } from './role.service';
import { ClientService } from './client.service';
import {
  CreatePermissionDto,
  PermissionResponseDto,
  CreateRoleDto,
  UpdateRoleDto,
  AssignPermissionsToRoleDto,
  RoleResponseDto,
  AssignRoleToClientDto,
} from './dto/role-permission.dto';

@ApiTags('oauth-admin')
@Controller('oauth/admin')
@ApiBearerAuth('bearer-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN')
export class OAuthAdminController {
  private readonly logger = new Logger(OAuthAdminController.name);

  constructor(
    private readonly permissionService: PermissionService,
    private readonly roleService: RoleService,
    private readonly clientService: ClientService,
  ) {}

  // ============================================================
  // PERMISSION ENDPOINTS
  // ============================================================

  @Post('permissions')
  @Version('1')
  @ApiOperation({ summary: 'Create a new permission' })
  @ApiOkResponse({ type: PermissionResponseDto })
  async createPermission(@Body() dto: CreatePermissionDto) {
    return this.permissionService.create(dto);
  }

  @Post('permissions/seed')
  @Version('1')
  @ApiOperation({ summary: 'Seed default permissions' })
  async seedPermissions() {
    return this.permissionService.seedDefaults();
  }

  @Get('permissions')
  @Version('1')
  @ApiOperation({ summary: 'List all permissions' })
  async listPermissions() {
    return this.permissionService.findAll();
  }

  @Get('permissions/resource/:resource')
  @Version('1')
  @ApiOperation({ summary: 'List permissions by resource' })
  async listPermissionsByResource(@Param('resource') resource: string) {
    return this.permissionService.findByResource(resource);
  }

  @Delete('permissions/:id')
  @Version('1')
  @ApiOperation({ summary: 'Delete a permission' })
  async deletePermission(@Param('id') id: string) {
    return this.permissionService.delete(id);
  }

  // ============================================================
  // ROLE ENDPOINTS
  // ============================================================

  @Post('roles')
  @Version('1')
  @ApiOperation({ summary: 'Create a new role' })
  @ApiOkResponse({ type: RoleResponseDto })
  async createRole(@Body() dto: CreateRoleDto) {
    const role = await this.roleService.create(dto);
    return {
      id: role.id,
      name: role.name,
      description: role.description,
      is_active: role.is_active,
      permissions: role.permissions.map((rp) => rp.permission.name),
      created_at: role.created_at,
    };
  }

  @Post('roles/seed')
  @Version('1')
  @ApiOperation({ summary: 'Seed default roles' })
  async seedRoles() {
    return this.roleService.seedDefaults();
  }

  @Get('roles')
  @Version('1')
  @ApiOperation({ summary: 'List all roles' })
  async listRoles() {
    const roles = await this.roleService.findAll();
    return roles.map((role) => ({
      id: role.id,
      name: role.name,
      description: role.description,
      is_active: role.is_active,
      permissions: role.permissions.map((rp) => rp.permission.name),
      created_at: role.created_at,
    }));
  }

  @Get('roles/:id')
  @Version('1')
  @ApiOperation({ summary: 'Get role by ID' })
  async getRole(@Param('id') id: string) {
    const role = await this.roleService.findById(id);
    return {
      id: role.id,
      name: role.name,
      description: role.description,
      is_active: role.is_active,
      permissions: role.permissions.map((rp) => rp.permission.name),
      created_at: role.created_at,
    };
  }

  @Put('roles/:id')
  @Version('1')
  @ApiOperation({ summary: 'Update a role' })
  async updateRole(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    const role = await this.roleService.update(id, dto);
    return {
      id: role.id,
      name: role.name,
      description: role.description,
      is_active: role.is_active,
      permissions: role.permissions.map((rp) => rp.permission.name),
      created_at: role.created_at,
    };
  }

  @Delete('roles/:id')
  @Version('1')
  @ApiOperation({ summary: 'Delete a role' })
  async deleteRole(@Param('id') id: string) {
    return this.roleService.delete(id);
  }

  // ============================================================
  // ROLE-PERMISSION ASSIGNMENTS
  // ============================================================

  @Post('roles/:id/permissions')
  @Version('1')
  @ApiOperation({ summary: 'Assign permissions to a role' })
  async assignPermissionsToRole(
    @Param('id') id: string,
    @Body() dto: AssignPermissionsToRoleDto,
  ) {
    const role = await this.roleService.assignPermissions(id, dto.permission_names);
    return {
      id: role.id,
      name: role.name,
      description: role.description,
      is_active: role.is_active,
      permissions: role.permissions.map((rp) => rp.permission.name),
      created_at: role.created_at,
    };
  }

  @Delete('roles/:id/permissions')
  @Version('1')
  @ApiOperation({ summary: 'Remove permissions from a role' })
  async removePermissionsFromRole(
    @Param('id') id: string,
    @Body() dto: AssignPermissionsToRoleDto,
  ) {
    const role = await this.roleService.removePermissions(id, dto.permission_names);
    return {
      id: role.id,
      name: role.name,
      description: role.description,
      is_active: role.is_active,
      permissions: role.permissions.map((rp) => rp.permission.name),
      created_at: role.created_at,
    };
  }

  // ============================================================
  // CLIENT-ROLE ASSIGNMENTS (M2M)
  // ============================================================

  @Post('clients/:clientId/roles')
  @Version('1')
  @ApiOperation({ summary: 'Assign a role to a client (M2M)' })
  async assignRoleToClient(
    @Param('clientId') clientId: string,
    @Body() dto: AssignRoleToClientDto,
  ) {
    return this.clientService.assignRole(clientId, dto.role_name);
  }

  @Delete('clients/:clientId/roles/:roleName')
  @Version('1')
  @ApiOperation({ summary: 'Remove a role from a client' })
  async removeRoleFromClient(
    @Param('clientId') clientId: string,
    @Param('roleName') roleName: string,
  ) {
    return this.clientService.removeRole(clientId, roleName);
  }

  @Get('clients/:clientId/rbac')
  @Version('1')
  @ApiOperation({ summary: 'Get client RBAC info (roles + permissions)' })
  async getClientRbac(@Param('clientId') clientId: string) {
    return this.clientService.getClientWithRbac(clientId);
  }

  @Put('clients/:clientId/permissions')
  @Version('1')
  @ApiOperation({ summary: 'Update client direct permissions' })
  @ApiOkResponse({ type: Object })
  async updateClientPermissions(
    @Param('clientId') clientId: string,
    @Body() body: { permissions: string[] },
  ) {
    return this.clientService.updateClientPermissions(clientId, body.permissions);
  }
}