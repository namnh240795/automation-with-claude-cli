import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard, AuthUser, JwtPayloadDto } from '@app/auth-utilities';
import { UserOrganizationService } from '../user-organization/user-organization.service';

@ApiTags('Organization Invitations')
@Controller('organizations/:orgId/invitations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrganizationInvitationsController {
  constructor(private readonly userOrganizationService: UserOrganizationService) {}

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create an invitation to join an organization' })
  @ApiResponse({ status: 201, description: 'Invitation created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input or invitation exists' })
  async createInvitation(
    @Param('orgId') orgId: string,
    @AuthUser() user: JwtPayloadDto,
    @Body() dto: { email: string; role: string },
  ): Promise<{ id: string; email: string; role: string; expires_at: Date }> {
    return this.userOrganizationService.createInvitation(
      orgId,
      dto.email,
      dto.role,
      user.sub,
    );
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get all pending invitations for an organization' })
  @ApiResponse({ status: 200, description: 'List of pending invitations' })
  async getPendingInvitations(
    @Param('orgId') orgId: string,
  ): Promise<
    {
      id: string;
      email: string;
      role: string;
      invited_by: string;
      expires_at: Date;
      created_at: Date;
    }[]
  > {
    return this.userOrganizationService.getPendingInvitations(orgId);
  }

  @Post(':id/accept')
  @Version('1')
  @ApiOperation({ summary: 'Accept an invitation to join an organization' })
  @ApiResponse({ status: 200, description: 'Invitation accepted' })
  @ApiResponse({ status: 400, description: 'Invalid or expired invitation' })
  async acceptInvitation(
    @Param('orgId') orgId: string,
    @Param('id') id: string,
    @AuthUser() user: JwtPayloadDto,
  ): Promise<{ message: string }> {
    await this.userOrganizationService.acceptInvitation(id, user.sub);
    return { message: 'Invitation accepted successfully' };
  }

  @Delete(':id')
  @Version('1')
  @ApiOperation({ summary: 'Cancel an invitation' })
  @ApiResponse({ status: 200, description: 'Invitation cancelled' })
  async cancelInvitation(
    @Param('orgId') orgId: string,
    @Param('id') id: string,
    @AuthUser() user: JwtPayloadDto,
  ): Promise<{ message: string }> {
    await this.userOrganizationService.cancelInvitation(id, user.sub);
    return { message: 'Invitation cancelled successfully' };
  }
}