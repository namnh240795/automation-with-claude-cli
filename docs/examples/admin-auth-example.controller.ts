import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import {
  KeycloakAuthGuard,
  KeycloakRolesGuard,
  KeycloakScopesGuard,
  Resource,
  Scope,
  Roles,
  KeycloakUser,
  KeycloakUserInfo,
} from '@app/keycloak-integration';

/**
 * Admin Controller - Administrator Panel Authentication Examples
 *
 * This controller demonstrates the admin panel authentication with Keycloak
 * for system administrators.
 *
 * Role Structure:
 * - super_admin: Full system access (can access everything, including other admins)
 * - admin: Admin panel access (can manage users and view system config)
 * - moderator: Content moderation access (limited admin access)
 *
 * Scope Structure:
 * - admin:users:read - List users
 * - admin:users:write - Modify users
 * - admin:system:read - View system config
 * - admin:system:write - Modify system config
 * - admin:logs:view - View logs
 */
@ApiTags('Admin')
@Controller('admin')
@UseGuards(KeycloakAuthGuard, KeycloakRolesGuard, KeycloakScopesGuard)
@ApiBearerAuth()
export class AdminAuthExampleController {

  // =========================================================================
  // USER MANAGEMENT ENDPOINTS
  // =========================================================================

  /**
   * List all users
   * Requires: admin role OR admin:users:read scope
   */
  @Get('users')
  @Roles('admin', 'super_admin')
  @Scope('admin:users:read')
  @ApiOperation({ summary: 'List all users (admin only)' })
  @ApiResponse({ status: 200, description: 'User list retrieved' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin role required' })
  async listUsers(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      accessed_by: user.email,
      users: [
        {
          id: '1',
          email: 'user@example.com',
          first_name: 'John',
          last_name: 'Doe',
          roles: ['user'],
          created_at: '2024-01-01T00:00:00Z',
          is_active: true,
        },
        {
          id: '2',
          email: 'admin@example.com',
          first_name: 'Jane',
          last_name: 'Smith',
          roles: ['admin'],
          created_at: '2024-01-01T00:00:00Z',
          is_active: true,
        },
      ],
    };
  }

  /**
   * Get specific user
   * Requires: admin role
   */
  @Get('users/:id')
  @Roles('admin', 'super_admin')
  @Scope('admin:users:read')
  @ApiOperation({ summary: 'Get user by ID (admin only)' })
  @ApiResponse({ status: 200, description: 'User retrieved' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUser(@Param('id') id: string, @KeycloakUser() user: KeycloakUserInfo) {
    return {
      accessed_by: user.email,
      user: {
        id,
        email: 'user@example.com',
        first_name: 'John',
        last_name: 'Doe',
        roles: ['user', 'premium_user'],
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-15T10:00:00Z',
        last_login: '2024-01-15T09:30:00Z',
      },
    };
  }

  /**
   * Update user
   * Requires: admin role OR admin:users:write scope
   */
  @Put('users/:id')
  @Roles('admin', 'super_admin')
  @Scope('admin:users:write')
  @ApiOperation({ summary: 'Update user (admin only)' })
  @ApiResponse({ status: 200, description: 'User updated' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin role required' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateDto: { first_name?: string; last_name?: string; is_active?: boolean },
    @KeycloakUser() user: KeycloakUserInfo,
  ) {
    return {
      updated_by: user.email,
      user_id: id,
      updated_fields: updateDto,
      updated_at: new Date(),
    };
  }

  /**
   * Assign roles to user
   * Requires: admin role OR admin:users:write scope
   */
  @Post('users/:id/roles')
  @Roles('admin', 'super_admin')
  @Scope('admin:users:write')
  @ApiOperation({ summary: 'Assign roles to user (admin only)' })
  @ApiResponse({ status: 200, description: 'Roles assigned' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin role required' })
  async assignRoles(
    @Param('id') userId: string,
    @Body() rolesDto: { roles: string[] },
    @KeycloakUser() user: KeycloakUserInfo,
  ) {
    return {
      assigned_by: user.email,
      user_id: userId,
      roles: rolesDto.roles,
      assigned_at: new Date(),
    };
  }

  /**
   * Delete user
   * Requires: super_admin role (more restrictive than regular admin)
   */
  @Delete('users/:id')
  @Roles('super_admin')
  @Resource('admin_users', 'delete')
  @ApiOperation({ summary: 'Delete user (super admin only)' })
  @ApiResponse({ status: 200, description: 'User deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden - super admin role required' })
  async deleteUser(@Param('id') id: string, @KeycloakUser() user: KeycloakUserInfo) {
    return {
      deleted_by: user.email,
      user_id: id,
      deleted_at: new Date(),
    };
  }

  // =========================================================================
  // SYSTEM CONFIGURATION ENDPOINTS
  // =========================================================================

  /**
   * Get system configuration
   * Requires: admin role OR admin:system:read scope
   */
  @Get('system/config')
  @Roles('admin', 'super_admin')
  @Scope('admin:system:read')
  @ApiOperation({ summary: 'Get system configuration (admin only)' })
  @ApiResponse({ status: 200, description: 'Configuration retrieved' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin role required' })
  async getSystemConfig(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      accessed_by: user.email,
      config: {
        maintenance_mode: false,
        max_users: 10000,
        session_timeout: 3600,
        password_policy: {
          min_length: 8,
          require_uppercase: true,
          require_numbers: true,
          require_special_chars: true,
        },
        email: {
          smtp_server: 'smtp.example.com',
          from_address: 'noreply@example.com',
        },
      },
    };
  }

  /**
   * Update system configuration
   * Requires: super_admin role OR admin:system:write scope
   */
  @Put('system/config')
  @Roles('super_admin')
  @Scope('admin:system:write')
  @ApiOperation({ summary: 'Update system configuration (super admin only)' })
  @ApiResponse({ status: 200, description: 'Configuration updated' })
  @ApiResponse({ status: 403, description: 'Forbidden - super admin role required' })
  async updateSystemConfig(
    @Body() configDto: Record<string, any>,
    @KeycloakUser() user: KeycloakUserInfo,
  ) {
    return {
      updated_by: user.email,
      config: configDto,
      updated_at: new Date(),
    };
  }

  /**
   * Enable/disable maintenance mode
   * Requires: super_admin role
   */
  @Post('system/maintenance')
  @Roles('super_admin')
  @Scope('admin:system:write')
  @ApiOperation({ summary: 'Enable/disable maintenance mode (super admin only)' })
  @ApiResponse({ status: 200, description: 'Maintenance mode updated' })
  @ApiResponse({ status: 403, description: 'Forbidden - super admin role required' })
  async setMaintenanceMode(
    @Body() maintenanceDto: { enabled: boolean },
    @KeycloakUser() user: KeycloakUserInfo,
  ) {
    return {
      updated_by: user.email,
      maintenance_mode: maintenanceDto.enabled,
      updated_at: new Date(),
    };
  }

  // =========================================================================
  // LOGS AND AUDIT ENDPOINTS
  // =========================================================================

  /**
   * Get system logs
   * Requires: admin role OR admin:logs:view scope
   */
  @Get('logs')
  @Roles('admin', 'super_admin')
  @Scope('admin:logs:view')
  @ApiOperation({ summary: 'Get system logs (admin only)' })
  @ApiResponse({ status: 200, description: 'Logs retrieved' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin role required' })
  async getLogs(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      accessed_by: user.email,
      logs: [
        {
          level: 'info',
          message: 'User logged in',
          user_email: 'user@example.com',
          timestamp: '2024-01-15T10:30:00Z',
        },
        {
          level: 'warning',
          message: 'Failed login attempt',
          user_email: 'unknown@example.com',
          timestamp: '2024-01-15T10:28:00Z',
        },
        {
          level: 'error',
          message: 'Database connection failed',
          timestamp: '2024-01-15T10:25:00Z',
        },
      ],
    };
  }

  /**
   * Get audit logs
   * Requires: admin role
   */
  @Get('audit-logs')
  @Roles('admin', 'super_admin')
  @Scope('admin:logs:view')
  @ApiOperation({ summary: 'Get audit logs (admin only)' })
  @ApiResponse({ status: 200, description: 'Audit logs retrieved' })
  async getAuditLogs(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      accessed_by: user.email,
      logs: [
        {
          action: 'user_updated',
          performed_by: 'admin@example.com',
          target_user: 'user@example.com',
          changes: { first_name: 'John -> Jane' },
          timestamp: '2024-01-15T09:00:00Z',
        },
        {
          action: 'roles_assigned',
          performed_by: 'admin@example.com',
          target_user: 'user@example.com',
          roles_added: ['premium_user'],
          timestamp: '2024-01-14T15:30:00Z',
        },
      ],
    };
  }

  // =========================================================================
  // STATISTICS ENDPOINTS
  // =========================================================================

  /**
   * Get system statistics
   * Requires: admin role OR admin:system:read scope
   */
  @Get('stats')
  @Roles('admin', 'super_admin')
  @Scope('admin:system:read')
  @ApiOperation({ summary: 'Get system statistics (admin only)' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved' })
  async getStats(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      accessed_by: user.email,
      stats: {
        users: {
          total: 1500,
          active: 1200,
          premium: 300,
          new_this_month: 150,
        },
        content: {
          total: 500,
          published: 450,
          draft: 50,
        },
        system: {
          uptime: '99.9%',
          avg_response_time: '120ms',
          disk_usage: '45%',
          memory_usage: '60%',
        },
      },
    };
  }

  // =========================================================================
  // ADMIN USER MANAGEMENT ENDPOINTS
  // =========================================================================

  /**
   * List all admins
   * Requires: super_admin role
   */
  @Get('admins')
  @Roles('super_admin')
  @Scope('admin:users:read')
  @ApiOperation({ summary: 'List all admins (super admin only)' })
  @ApiResponse({ status: 200, description: 'Admin list retrieved' })
  @ApiResponse({ status: 403, description: 'Forbidden - super admin role required' })
  async listAdmins(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      accessed_by: user.email,
      admins: [
        {
          id: '1',
          email: 'superadmin@example.com',
          roles: ['super_admin'],
          created_at: '2024-01-01T00:00:00Z',
        },
        {
          id: '2',
          email: 'admin1@example.com',
          roles: ['admin'],
          created_at: '2024-01-02T00:00:00Z',
        },
      ],
    };
  }

  /**
   * Create new admin
   * Requires: super_admin role
   */
  @Post('admins')
  @Roles('super_admin')
  @Scope('admin:users:write')
  @ApiOperation({ summary: 'Create new admin (super admin only)' })
  @ApiResponse({ status: 201, description: 'Admin created' })
  @ApiResponse({ status: 403, description: 'Forbidden - super admin role required' })
  async createAdmin(
    @Body() adminDto: { email: string; password: string; roles: string[] },
    @KeycloakUser() user: KeycloakUserInfo,
  ) {
    return {
      created_by: user.email,
      admin: {
        id: '3',
        email: adminDto.email,
        roles: adminDto.roles,
        created_at: new Date(),
      },
    };
  }

  // =========================================================================
  // NOTIFICATION ENDPOINTS
  // =========================================================================

  /**
   * Send system-wide notification
   * Requires: admin role
   */
  @Post('notifications/send')
  @Roles('admin', 'super_admin')
  @Scope('admin:system:write')
  @ApiOperation({ summary: 'Send system-wide notification (admin only)' })
  @ApiResponse({ status: 200, description: 'Notification sent' })
  async sendNotification(
    @Body() notificationDto: { title: string; message: string; target_roles?: string[] },
    @KeycloakUser() user: KeycloakUserInfo,
  ) {
    return {
      sent_by: user.email,
      notification: notificationDto,
      sent_at: new Date(),
      recipients: notificationDto.target_roles
        ? `Users with roles: ${notificationDto.target_roles.join(', ')}`
        : 'All users',
    };
  }
}
