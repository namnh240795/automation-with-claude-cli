import { Controller, Get, Post, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import {
  KeycloakAuthGuard,
  KeycloakRolesGuard,
  Roles,
  KeycloakUser,
  KeycloakUserInfo,
} from '@app/keycloak-integration';

/**
 * Admin Controller
 * Demonstrates role-based access control with Keycloak
 *
 * @requires admin - All endpoints require admin role
 */
@ApiTags('Admin')
@Controller('admin')
@UseGuards(KeycloakAuthGuard, KeycloakRolesGuard)
@ApiBearerAuth()
export class AdminController {
  /**
   * Get system configuration
   * Requires: admin role
   */
  @Get('config')
  @Roles('admin')
  @ApiOperation({ summary: 'Get system configuration (admin only)' })
  @ApiResponse({ status: 200, description: 'Configuration retrieved' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin role required' })
  async getConfig(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      user: user.email,
      roles: user.realm_access?.roles || [],
      config: {
        maintenance_mode: false,
        max_users: 1000,
      },
    };
  }

  /**
   * List all users
   * Requires: admin role
   */
  @Get('users')
  @Roles('admin')
  @ApiOperation({ summary: 'List all users (admin only)' })
  @ApiResponse({ status: 200, description: 'User list retrieved' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin role required' })
  async listUsers(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      accessed_by: user.email,
      users: [], // Placeholder - actual implementation would query database
    };
  }

  /**
   * Get system statistics
   * Requires: admin or moderator role
   */
  @Get('stats')
  @Roles('admin', 'moderator')
  @ApiOperation({ summary: 'Get system statistics (admin/moderator)' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin or moderator role required' })
  async getStats(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      accessed_by: user.email,
      user_roles: user.realm_access?.roles || [],
      stats: {
        total_users: 150,
        active_sessions: 42,
      },
    };
  }

  /**
   * Get audit logs
   * Requires: admin role only
   */
  @Get('audit-logs')
  @Roles('admin')
  @ApiOperation({ summary: 'Get audit logs (admin only)' })
  @ApiResponse({ status: 200, description: 'Audit logs retrieved' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin role required' })
  async getAuditLogs(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      accessed_by: user.email,
      logs: [], // Placeholder
    };
  }
}
