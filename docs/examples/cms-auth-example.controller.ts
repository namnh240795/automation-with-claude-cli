import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import {
  KeycloakAuthGuard,
  KeycloakRolesGuard,
  KeycloakScopesGuard,
  Resource,
  Scope,
  Scopes,
  Roles,
  KeycloakUser,
  KeycloakUserInfo,
  RequireAllPermissions,
} from '@app/keycloak-integration';

/**
 * CMS Controller - Content Management System Authentication Examples
 *
 * This controller demonstrates the multi-component Keycloak architecture
 * with role-based access control (RBAC) and scope-based authorization.
 *
 * Role Structure:
 * - super_admin: Full system access (can access all components)
 * - cms_admin: Manage CMS settings and users
 * - cms_publisher: Review/publish content (includes editor permissions)
 * - cms_editor: Create/edit content (cannot publish)
 *
 * Scope Structure:
 * - cms:content:read - Read content
 * - cms:content:write - Create/edit content
 * - cms:content:publish - Publish content
 * - cms:media:manage - Manage media files
 * - cms:users:manage - Manage CMS users
 * - cms:analytics:view - View analytics
 */
@ApiTags('CMS')
@Controller('cms')
@UseGuards(KeycloakAuthGuard, KeycloakRolesGuard, KeycloakScopesGuard)
@ApiBearerAuth()
export class CmsAuthExampleController {

  // =========================================================================
  // CONTENT MANAGEMENT ENDPOINTS
  // =========================================================================

  /**
   * List all published content
   * Requires: user role OR cms:content:read scope
   */
  @Get('content')
  @Roles('user', 'cms_editor', 'cms_publisher', 'cms_admin', 'super_admin')
  @Scope('cms:content:read')
  @ApiOperation({ summary: 'List published content' })
  @ApiResponse({ status: 200, description: 'Content list retrieved' })
  @ApiResponse({ status: 403, description: 'Forbidden - required role/scope not found' })
  async listContent(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      accessed_by: user.email,
      roles: user.realm_access?.roles || [],
      content: [
        { id: '1', title: 'Welcome Post', status: 'published' },
        { id: '2', title: 'About Us', status: 'published' },
      ],
    };
  }

  /**
   * Get specific content by ID
   * Requires: user role OR cms:content:read scope
   */
  @Get('content/:id')
  @Roles('user', 'cms_editor', 'cms_publisher', 'cms_admin', 'super_admin')
  @Scope('cms:content:read')
  @ApiOperation({ summary: 'Get content by ID' })
  @ApiResponse({ status: 200, description: 'Content retrieved' })
  @ApiResponse({ status: 404, description: 'Content not found' })
  async getContent(@Param('id') id: string, @KeycloakUser() user: KeycloakUserInfo) {
    return {
      accessed_by: user.email,
      content: { id, title: 'Sample Content', body: 'Content body...' },
    };
  }

  /**
   * Create new content (draft)
   * Requires: cms_editor role OR cms:content:write scope
   */
  @Post('content')
  @Roles('cms_editor', 'cms_publisher', 'cms_admin', 'super_admin')
  @Scope('cms:content:write')
  @ApiOperation({ summary: 'Create new content (draft)' })
  @ApiResponse({ status: 201, description: 'Content created' })
  @ApiResponse({ status: 403, description: 'Forbidden - editor role required' })
  async createContent(
    @Body() createDto: { title: string; body: string },
    @KeycloakUser() user: KeycloakUserInfo,
  ) {
    return {
      created_by: user.email,
      content: {
        id: '3',
        title: createDto.title,
        body: createDto.body,
        status: 'draft',
        created_at: new Date(),
      },
    };
  }

  /**
   * Update existing content
   * Requires: cms_editor role OR cms:content:write scope
   */
  @Put('content/:id')
  @Roles('cms_editor', 'cms_publisher', 'cms_admin', 'super_admin')
  @Scope('cms:content:write')
  @ApiOperation({ summary: 'Update content' })
  @ApiResponse({ status: 200, description: 'Content updated' })
  @ApiResponse({ status: 403, description: 'Forbidden - editor role required' })
  async updateContent(
    @Param('id') id: string,
    @Body() updateDto: { title?: string; body?: string },
    @KeycloakUser() user: KeycloakUserInfo,
  ) {
    return {
      updated_by: user.email,
      content: {
        id,
        ...updateDto,
        updated_at: new Date(),
      },
    };
  }

  /**
   * Publish content
   * Requires: cms_publisher role OR cms:content:publish scope
   * Note: This is more restrictive than creating/editing
   */
  @Post('content/:id/publish')
  @Roles('cms_publisher', 'cms_admin', 'super_admin')
  @Scope('cms:content:publish')
  @ApiOperation({ summary: 'Publish content' })
  @ApiResponse({ status: 200, description: 'Content published' })
  @ApiResponse({ status: 403, description: 'Forbidden - publisher role required' })
  async publishContent(@Param('id') id: string, @KeycloakUser() user: KeycloakUserInfo) {
    return {
      published_by: user.email,
      content: {
        id,
        status: 'published',
        published_at: new Date(),
      },
    };
  }

  /**
   * Delete content
   * Requires: cms_admin role OR cms:content:delete scope
   */
  @Delete('content/:id')
  @Roles('cms_admin', 'super_admin')
  @Resource('cms_content', 'delete')
  @ApiOperation({ summary: 'Delete content (admin only)' })
  @ApiResponse({ status: 200, description: 'Content deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin role required' })
  async deleteContent(@Param('id') id: string, @KeycloakUser() user: KeycloakUserInfo) {
    return {
      deleted_by: user.email,
      message: `Content ${id} deleted successfully`,
    };
  }

  // =========================================================================
  // MEDIA MANAGEMENT ENDPOINTS
  // =========================================================================

  /**
   * Upload media file
   * Requires: cms:media:manage scope
   */
  @Post('media/upload')
  @Roles('cms_editor', 'cms_publisher', 'cms_admin', 'super_admin')
  @Scope('cms:media:manage')
  @ApiOperation({ summary: 'Upload media file' })
  @ApiResponse({ status: 201, description: 'Media uploaded' })
  async uploadMedia(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      uploaded_by: user.email,
      message: 'Media upload endpoint',
    };
  }

  /**
   * List all media files
   * Requires: cms:media:read scope
   */
  @Get('media')
  @Roles('user', 'cms_editor', 'cms_publisher', 'cms_admin', 'super_admin')
  @Scope('cms:media:read')
  @ApiOperation({ summary: 'List media files' })
  @ApiResponse({ status: 200, description: 'Media list retrieved' })
  async listMedia(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      accessed_by: user.email,
      media: [
        { id: '1', filename: 'image1.jpg', url: '/media/image1.jpg' },
        { id: '2', filename: 'document.pdf', url: '/media/document.pdf' },
      ],
    };
  }

  // =========================================================================
  // USER MANAGEMENT ENDPOINTS
  // =========================================================================

  /**
   * List CMS users
   * Requires: cms_admin role OR cms:users:manage scope
   */
  @Get('users')
  @Roles('cms_admin', 'super_admin')
  @Scope('cms:users:manage')
  @ApiOperation({ summary: 'List CMS users (admin only)' })
  @ApiResponse({ status: 200, description: 'User list retrieved' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin role required' })
  async listUsers(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      accessed_by: user.email,
      users: [
        { id: '1', email: 'editor@example.com', roles: ['cms_editor'] },
        { id: '2', email: 'publisher@example.com', roles: ['cms_publisher', 'cms_editor'] },
      ],
    };
  }

  /**
   * Assign CMS roles to user
   * Requires: cms_admin role
   */
  @Post('users/:id/roles')
  @Roles('cms_admin', 'super_admin')
  @Scope('cms:users:manage')
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
    };
  }

  // =========================================================================
  // ANALYTICS ENDPOINTS
  // =========================================================================

  /**
   * View CMS analytics
   * Requires: cms_admin role OR cms:analytics:view scope
   */
  @Get('analytics')
  @Roles('cms_admin', 'super_admin')
  @Scope('cms:analytics:view')
  @ApiOperation({ summary: 'View CMS analytics (admin only)' })
  @ApiResponse({ status: 200, description: 'Analytics retrieved' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin role required' })
  async getAnalytics(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      accessed_by: user.email,
      analytics: {
        total_content: 150,
        published_content: 120,
        draft_content: 30,
        total_views: 50000,
        top_authors: [
          { name: 'John Doe', articles: 25 },
          { name: 'Jane Smith', articles: 20 },
        ],
      },
    };
  }

  // =========================================================================
  // SETTINGS ENDPOINTS
  // =========================================================================

  /**
   * Get CMS settings
   * Requires: cms_admin role
   */
  @Get('settings')
  @Roles('cms_admin', 'super_admin')
  @ApiOperation({ summary: 'Get CMS settings (admin only)' })
  @ApiResponse({ status: 200, description: 'Settings retrieved' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin role required' })
  async getSettings(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      accessed_by: user.email,
      settings: {
        site_name: 'My CMS',
        default_language: 'en',
        max_upload_size: '10MB',
        allowed_file_types: ['jpg', 'png', 'pdf', 'docx'],
      },
    };
  }

  /**
   * Update CMS settings
   * Requires: cms_admin role
   */
  @Put('settings')
  @Roles('cms_admin', 'super_admin')
  @ApiOperation({ summary: 'Update CMS settings (admin only)' })
  @ApiResponse({ status: 200, description: 'Settings updated' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin role required' })
  async updateSettings(
    @Body() settingsDto: Record<string, any>,
    @KeycloakUser() user: KeycloakUserInfo,
  ) {
    return {
      updated_by: user.email,
      settings: settingsDto,
    };
  }
}
