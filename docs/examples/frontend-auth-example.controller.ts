import { Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import {
  KeycloakAuthGuard,
  KeycloakRolesGuard,
  KeycloakScopesGuard,
  Scope,
  Scopes,
  Roles,
  KeycloakUser,
  KeycloakUserInfo,
} from '@app/keycloak-integration';

/**
 * Frontend Controller - User-Facing Application Authentication Examples
 *
 * This controller demonstrates the frontend authentication with Keycloak
 * for a user-facing application.
 *
 * Role Structure:
 * - user: Standard frontend user (default role)
 * - premium_user: Paid frontend features
 * - super_admin: Full system access (can access all components)
 *
 * Scope Structure:
 * - profile:read - Read user profile
 * - profile:write - Update user profile
 * - content:view - View published content
 * - content:premium - Access premium content
 */
@ApiTags('Frontend')
@Controller('api/user')
@UseGuards(KeycloakAuthGuard, KeycloakRolesGuard, KeycloakScopesGuard)
@ApiBearerAuth()
export class FrontendAuthExampleController {

  // =========================================================================
  // USER PROFILE ENDPOINTS
  // =========================================================================

  /**
   * Get user profile
   * Requires: user role OR profile:read scope
   * Accessible to all authenticated users
   */
  @Get('profile')
  @Roles('user', 'premium_user', 'super_admin')
  @Scope('profile:read')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      user_id: user.sub,
      email: user.email,
      first_name: user.given_name,
      last_name: user.family_name,
      email_verified: user.email_verified,
      roles: user.realm_access?.roles || [],
    };
  }

  /**
   * Update user profile
   * Requires: user role OR profile:write scope
   * Accessible to all authenticated users
   */
  @Put('profile')
  @Roles('user', 'premium_user', 'super_admin')
  @Scope('profile:write')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateProfile(
    @Body() updateDto: { first_name?: string; last_name?: string },
    @KeycloakUser() user: KeycloakUserInfo,
  ) {
    return {
      user_id: user.sub,
      updated_fields: updateDto,
      updated_at: new Date(),
    };
  }

  /**
   * Get user preferences
   * Requires: user role
   */
  @Get('preferences')
  @Roles('user', 'premium_user', 'super_admin')
  @Scope('profile:read')
  @ApiOperation({ summary: 'Get user preferences' })
  @ApiResponse({ status: 200, description: 'Preferences retrieved' })
  async getPreferences(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      user_id: user.sub,
      preferences: {
        language: 'en',
        theme: 'light',
        notifications_enabled: true,
        email_subscription: true,
      },
    };
  }

  /**
   * Update user preferences
   * Requires: user role
   */
  @Put('preferences')
  @Roles('user', 'premium_user', 'super_admin')
  @Scope('profile:write')
  @ApiOperation({ summary: 'Update user preferences' })
  @ApiResponse({ status: 200, description: 'Preferences updated' })
  async updatePreferences(
    @Body() prefsDto: Record<string, any>,
    @KeycloakUser() user: KeycloakUserInfo,
  ) {
    return {
      user_id: user.sub,
      updated_preferences: prefsDto,
    };
  }

  // =========================================================================
  // CONTENT ENDPOINTS
  // =========================================================================

  /**
   * View published content
   * Requires: user role OR content:view scope
   * Accessible to all authenticated users
   */
  @Get('content')
  @Roles('user', 'premium_user', 'super_admin')
  @Scope('content:view')
  @ApiOperation({ summary: 'View published content' })
  @ApiResponse({ status: 200, description: 'Content retrieved' })
  async listContent(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      user_id: user.sub,
      content: [
        { id: '1', title: 'Welcome Article', excerpt: 'Introduction to our platform...', is_premium: false },
        { id: '2', title: 'Getting Started', excerpt: 'Learn how to use our platform...', is_premium: false },
        { id: '3', title: 'Premium Guide', excerpt: 'Advanced features for premium users...', is_premium: true },
      ],
    };
  }

  /**
   * View specific content
   * Requires: user role OR content:view scope
   */
  @Get('content/:id')
  @Roles('user', 'premium_user', 'super_admin')
  @Scope('content:view')
  @ApiOperation({ summary: 'View specific content' })
  @ApiResponse({ status: 200, description: 'Content retrieved' })
  @ApiResponse({ status: 404, description: 'Content not found' })
  async getContent(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      user_id: user.sub,
      content: {
        id: '1',
        title: 'Welcome Article',
        body: 'Full article content here...',
        author: 'Jane Smith',
        published_at: '2024-01-15T10:00:00Z',
      },
    };
  }

  // =========================================================================
  // PREMIUM CONTENT ENDPOINTS
  // =========================================================================

  /**
   * View premium content
   * Requires: premium_user role OR content:premium scope
   * Only accessible to premium users
   */
  @Get('premium/content')
  @Roles('premium_user', 'super_admin')
  @Scope('content:premium')
  @ApiOperation({ summary: 'View premium content (premium users only)' })
  @ApiResponse({ status: 200, description: 'Premium content retrieved' })
  @ApiResponse({ status: 403, description: 'Forbidden - premium subscription required' })
  async getPremiumContent(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      user_id: user.sub,
      subscription: 'premium',
      content: [
        {
          id: '101',
          title: 'Advanced Analytics Guide',
          excerpt: 'Learn advanced analytics techniques...',
          body: 'Full premium content here...',
        },
        {
          id: '102',
          title: 'Premium Features Overview',
          excerpt: 'Discover all premium features...',
          body: 'Full premium content here...',
        },
      ],
    };
  }

  /**
   * Get premium subscription status
   * Requires: premium_user role
   */
  @Get('subscription')
  @Roles('premium_user', 'super_admin')
  @Scope('profile:read')
  @ApiOperation({ summary: 'Get subscription status' })
  @ApiResponse({ status: 200, description: 'Subscription status retrieved' })
  @ApiResponse({ status: 403, description: 'Forbidden - premium subscription required' })
  async getSubscription(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      user_id: user.sub,
      subscription: {
        plan: 'premium',
        status: 'active',
        started_at: '2024-01-01T00:00:00Z',
        renews_at: '2024-02-01T00:00:00Z',
        features: [
          'premium_content',
          'advanced_analytics',
          'priority_support',
          'api_access',
        ],
      },
    };
  }

  // =========================================================================
  // USER ACTIVITY ENDPOINTS
  // =========================================================================

  /**
   * Get user activity history
   * Requires: user role
   */
  @Get('activity')
  @Roles('user', 'premium_user', 'super_admin')
  @Scope('profile:read')
  @ApiOperation({ summary: 'Get user activity history' })
  @ApiResponse({ status: 200, description: 'Activity history retrieved' })
  async getActivity(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      user_id: user.sub,
      activities: [
        { action: 'viewed_content', content_id: '1', timestamp: '2024-01-15T10:30:00Z' },
        { action: 'updated_profile', timestamp: '2024-01-14T15:20:00Z' },
        { action: 'logged_in', timestamp: '2024-01-14T09:00:00Z' },
      ],
    };
  }

  /**
   * Get user bookmarks
   * Requires: user role
   */
  @Get('bookmarks')
  @Roles('user', 'premium_user', 'super_admin')
  @Scope('profile:read')
  @ApiOperation({ summary: 'Get user bookmarks' })
  @ApiResponse({ status: 200, description: 'Bookmarks retrieved' })
  async getBookmarks(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      user_id: user.sub,
      bookmarks: [
        { content_id: '1', title: 'Welcome Article', created_at: '2024-01-15T10:35:00Z' },
        { content_id: '5', title: 'Quick Start Guide', created_at: '2024-01-14T14:20:00Z' },
      ],
    };
  }

  /**
   * Add bookmark
   * Requires: user role
   */
  @Post('bookmarks')
  @Roles('user', 'premium_user', 'super_admin')
  @Scope('profile:write')
  @ApiOperation({ summary: 'Add bookmark' })
  @ApiResponse({ status: 201, description: 'Bookmark added' })
  async addBookmark(
    @Body() bookmarkDto: { content_id: string },
    @KeycloakUser() user: KeycloakUserInfo,
  ) {
    return {
      user_id: user.sub,
      content_id: bookmarkDto.content_id,
      created_at: new Date(),
    };
  }

  // =========================================================================
  // NOTIFICATIONS ENDPOINTS
  // =========================================================================

  /**
   * Get user notifications
   * Requires: user role
   */
  @Get('notifications')
  @Roles('user', 'premium_user', 'super_admin')
  @Scope('profile:read')
  @ApiOperation({ summary: 'Get user notifications' })
  @ApiResponse({ status: 200, description: 'Notifications retrieved' })
  async getNotifications(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      user_id: user.sub,
      notifications: [
        {
          id: '1',
          type: 'content_update',
          message: 'New content available: Advanced Features Guide',
          read: false,
          created_at: '2024-01-15T09:00:00Z',
        },
        {
          id: '2',
          type: 'system',
          message: 'Your password will expire in 7 days',
          read: true,
          created_at: '2024-01-14T08:00:00Z',
        },
      ],
    };
  }

  /**
   * Mark notification as read
   * Requires: user role
   */
  @Post('notifications/:id/read')
  @Roles('user', 'premium_user', 'super_admin')
  @Scope('profile:write')
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiResponse({ status: 200, description: 'Notification marked as read' })
  async markNotificationRead(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      user_id: user.sub,
      marked_read_at: new Date(),
    };
  }
}
