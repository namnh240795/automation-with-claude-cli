import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Version,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard, AuthUser, JwtPayloadDto } from '@app/auth-utilities';
import { OrganizationsService } from './organizations.service';
import { UserOrganizationService } from '../user-organization/user-organization.service';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
  OrganizationResponseDto,
  OrganizationMemberResponseDto,
} from './dto';

@ApiTags('Organizations')
@Controller('organizations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrganizationsController {
  constructor(
    private readonly organizationsService: OrganizationsService,
    private readonly userOrganizationService: UserOrganizationService,
  ) {}

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create a new organization (BUSINESS user only)' })
  @ApiResponse({ status: 201, description: 'Organization created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Display ID already exists' })
  async create(
    @AuthUser() user: JwtPayloadDto,
    @Body() dto: CreateOrganizationDto,
  ): Promise<OrganizationResponseDto> {
    // BUSINESS users can create organizations
    return this.organizationsService.create(dto, user.sub);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get all organizations for the current user' })
  @ApiResponse({ status: 200, description: 'List of organizations' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@AuthUser() user: JwtPayloadDto): Promise<OrganizationResponseDto[]> {
    return this.organizationsService.findAll(user.sub);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get an organization by ID' })
  @ApiResponse({ status: 200, description: 'Organization details' })
  @ApiResponse({ status: 404, description: 'Organization not found or access denied' })
  async findOne(
    @Param('id') id: string,
    @AuthUser() user: JwtPayloadDto,
  ): Promise<OrganizationResponseDto> {
    return this.organizationsService.findOne(id, user.sub);
  }

  @Patch(':id')
  @Version('1')
  @ApiOperation({ summary: 'Update an organization' })
  @ApiResponse({ status: 200, description: 'Organization updated' })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  async update(
    @Param('id') id: string,
    @AuthUser() user: JwtPayloadDto,
    @Body() dto: UpdateOrganizationDto,
  ): Promise<OrganizationResponseDto> {
    return this.organizationsService.update(id, dto, user.sub);
  }

  @Delete(':id')
  @Version('1')
  @ApiOperation({ summary: 'Soft delete an organization' })
  @ApiResponse({ status: 200, description: 'Organization deleted' })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  async remove(
    @Param('id') id: string,
    @AuthUser() user: JwtPayloadDto,
  ): Promise<void> {
    return this.organizationsService.remove(id, user.sub);
  }

  // Member management endpoints
  @Post(':id/members')
  @Version('1')
  @ApiOperation({ summary: 'Add a member to an organization' })
  @ApiResponse({ status: 201, description: 'Member added successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Not an org admin' })
  async addMember(
    @Param('id') id: string,
    @AuthUser() user: JwtPayloadDto,
    @Body() dto: { user_id: string; role: string },
  ): Promise<{ message: string }> {
    const isAdmin = await this.userOrganizationService.isOrgAdmin(user.sub, id);
    if (!isAdmin) {
      throw new ForbiddenException('Not an organization admin');
    }
    await this.userOrganizationService.addMember(id, dto.user_id, dto.role, user.sub);
    return { message: 'Member added successfully' };
  }

  @Delete(':id/members/:userId')
  @Version('1')
  @ApiOperation({ summary: 'Remove a member from an organization' })
  @ApiResponse({ status: 200, description: 'Member removed successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Not an org admin' })
  async removeMember(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @AuthUser() user: JwtPayloadDto,
  ): Promise<{ message: string }> {
    const isAdmin = await this.userOrganizationService.isOrgAdmin(user.sub, id);
    if (!isAdmin) {
      throw new ForbiddenException('Not an organization admin');
    }
    await this.userOrganizationService.removeMember(id, userId, user.sub);
    return { message: 'Member removed successfully' };
  }

  @Patch(':id/members/:userId')
  @Version('1')
  @ApiOperation({ summary: 'Update a member role in an organization' })
  @ApiResponse({ status: 200, description: 'Member role updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Not an org admin' })
  async updateMemberRole(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @AuthUser() user: JwtPayloadDto,
    @Body() dto: { role: string },
  ): Promise<{ message: string }> {
    const isAdmin = await this.userOrganizationService.isOrgAdmin(user.sub, id);
    if (!isAdmin) {
      throw new ForbiddenException('Not an organization admin');
    }
    await this.userOrganizationService.updateMemberRole(id, userId, dto.role, user.sub);
    return { message: 'Member role updated successfully' };
  }

  @Get(':id/members')
  @Version('1')
  @ApiOperation({ summary: 'Get all members of an organization' })
  @ApiResponse({ status: 200, description: 'List of organization members' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMembers(
    @Param('id') id: string,
    @AuthUser() user: JwtPayloadDto,
  ): Promise<OrganizationMemberResponseDto[]> {
    // Any org member can view the member list
    return this.userOrganizationService.getOrgMembers(id);
  }
}