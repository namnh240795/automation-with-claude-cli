import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth-utilities';
import { RealmScopeGuard } from '../guards/realm-scope.guard';
import { GroupsService } from './groups.service';
import { CreateGroupDto, UpdateGroupDto, GroupResponseDto, GroupsPaginatedResponseDto } from './dto';
import { IdResponseDto } from '../dto';
import { RoleResponseDto } from '../roles/dto';
import { UserResponseDto } from '../users/dto';

@ApiTags('Groups')
@Controller('api/v1/realms/:realmId/groups')
@UseGuards(JwtAuthGuard, RealmScopeGuard)
@ApiBearerAuth()
@ApiParam({ name: 'realmId', description: 'Realm ID', example: '550e8400-e29b-41d4-a716-446655440000' })
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  @ApiOperation({ summary: 'List groups in a realm' })
  @ApiResponse({
    status: 200,
    description: 'List of groups',
    type: GroupsPaginatedResponseDto,
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 0 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search in group name' })
  @ApiQuery({ name: 'parent', required: false, type: String, description: 'Filter by parent group ID' })
  async findAll(
    @Param('realmId') realmId: string,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page = 0,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit = 20,
    @Query('search') search?: string,
    @Query('parent') parentId?: string,
  ) {
    return this.groupsService.findAll(realmId, page, limit, search, parentId);
  }

  @Get(':groupId')
  @ApiOperation({ summary: 'Get group details' })
  @ApiParam({ name: 'groupId', description: 'Group ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Group details',
    type: GroupResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Group not found' })
  async findOne(
    @Param('realmId') realmId: string,
    @Param('groupId') groupId: string,
  ) {
    return this.groupsService.findOne(realmId, groupId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new group' })
  @ApiResponse({
    status: 201,
    description: 'Group successfully created',
    type: GroupResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Group with this name already exists' })
  async create(
    @Param('realmId') realmId: string,
    @Body() createGroupDto: CreateGroupDto,
  ) {
    return this.groupsService.create(realmId, createGroupDto);
  }

  @Put(':groupId')
  @ApiOperation({ summary: 'Update group' })
  @ApiParam({ name: 'groupId', description: 'Group ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Group successfully updated',
    type: GroupResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Group not found' })
  @ApiResponse({ status: 409, description: 'Group with this name already exists' })
  async update(
    @Param('realmId') realmId: string,
    @Param('groupId') groupId: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupsService.update(realmId, groupId, updateGroupDto);
  }

  @Delete(':groupId')
  @ApiOperation({ summary: 'Delete group' })
  @ApiParam({ name: 'groupId', description: 'Group ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Group successfully deleted',
    type: IdResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Group not found' })
  async delete(
    @Param('realmId') realmId: string,
    @Param('groupId') groupId: string,
  ) {
    return this.groupsService.delete(realmId, groupId);
  }

  @Get(':groupId/roles')
  @ApiOperation({ summary: 'Get group roles' })
  @ApiParam({ name: 'groupId', description: 'Group ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'List of group roles',
    isArray: true,
    type: RoleResponseDto,
  })
  async getRoles(
    @Param('realmId') realmId: string,
    @Param('groupId') groupId: string,
  ) {
    return this.groupsService.getRoles(realmId, groupId);
  }

  @Post(':groupId/roles')
  @ApiOperation({ summary: 'Assign roles to group' })
  @ApiParam({ name: 'groupId', description: 'Group ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Roles successfully assigned',
    isArray: true,
    type: RoleResponseDto,
  })
  async addRoles(
    @Param('realmId') realmId: string,
    @Param('groupId') groupId: string,
    @Body() body: { role_ids: string[] },
  ) {
    return this.groupsService.addRoles(realmId, groupId, body.role_ids);
  }

  @Delete(':groupId/roles/:roleId')
  @ApiOperation({ summary: 'Remove role from group' })
  @ApiParam({ name: 'groupId', description: 'Group ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiParam({ name: 'roleId', description: 'Role ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Role successfully removed',
  })
  async removeRole(
    @Param('realmId') realmId: string,
    @Param('groupId') groupId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.groupsService.removeRole(realmId, groupId, roleId);
  }

  @Get(':groupId/members')
  @ApiOperation({ summary: 'Get group members' })
  @ApiParam({ name: 'groupId', description: 'Group ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'List of group members',
    isArray: true,
    type: UserResponseDto,
  })
  async getMembers(
    @Param('realmId') realmId: string,
    @Param('groupId') groupId: string,
  ) {
    return this.groupsService.getMembers(realmId, groupId);
  }

  @Post(':groupId/members/:userId')
  @ApiOperation({ summary: 'Add user to group' })
  @ApiParam({ name: 'groupId', description: 'Group ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiParam({ name: 'userId', description: 'User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'User successfully added to group',
    type: IdResponseDto,
  })
  async addMember(
    @Param('realmId') realmId: string,
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ) {
    return this.groupsService.addMember(realmId, groupId, userId);
  }

  @Delete(':groupId/members/:userId')
  @ApiOperation({ summary: 'Remove user from group' })
  @ApiParam({ name: 'groupId', description: 'Group ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiParam({ name: 'userId', description: 'User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'User successfully removed from group',
    type: IdResponseDto,
  })
  async removeMember(
    @Param('realmId') realmId: string,
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ) {
    return this.groupsService.removeMember(realmId, groupId, userId);
  }
}
