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
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto, UsersPaginatedResponseDto } from './dto';
import { IdResponseDto } from '../dto';
import { RoleResponseDto } from '../roles/dto';
import { GroupResponseDto } from '../groups/dto';

@ApiTags('Users')
@Controller('api/v1/realms/:realmId/users')
@UseGuards(JwtAuthGuard, RealmScopeGuard)
@ApiBearerAuth()
@ApiParam({ name: 'realmId', description: 'Realm ID', example: '550e8400-e29b-41d4-a716-446655440000' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List users in a realm' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: UsersPaginatedResponseDto,
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 0 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search in username, email, first_name, last_name' })
  async findAll(
    @Param('realmId') realmId: string,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page = 0,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit = 20,
    @Query('search') search?: string,
  ) {
    return this.usersService.findAll(realmId, page, limit, search);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user details' })
  @ApiParam({ name: 'userId', description: 'User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'User details',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(
    @Param('realmId') realmId: string,
    @Param('userId') userId: string,
  ) {
    return this.usersService.findOne(realmId, userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 409, description: 'User with this username/email already exists' })
  async create(
    @Param('realmId') realmId: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(realmId, createUserDto);
  }

  @Put(':userId')
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'userId', description: 'User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'User successfully updated',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 409, description: 'User with this username/email already exists' })
  async update(
    @Param('realmId') realmId: string,
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(realmId, userId, updateUserDto);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'userId', description: 'User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'User successfully deleted',
    type: IdResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async delete(
    @Param('realmId') realmId: string,
    @Param('userId') userId: string,
  ) {
    return this.usersService.delete(realmId, userId);
  }

  @Get(':userId/credentials')
  @ApiOperation({ summary: 'Get user credentials' })
  @ApiParam({ name: 'userId', description: 'User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'List of user credentials',
    isArray: true,
    type: 'object',
  })
  async getCredentials(
    @Param('realmId') realmId: string,
    @Param('userId') userId: string,
  ) {
    return this.usersService.getCredentials(realmId, userId);
  }

  @Get(':userId/attributes')
  @ApiOperation({ summary: 'Get user attributes' })
  @ApiParam({ name: 'userId', description: 'User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'User attributes as key-value pairs',
    type: 'object',
  })
  async getAttributes(
    @Param('realmId') realmId: string,
    @Param('userId') userId: string,
  ) {
    return this.usersService.getAttributes(realmId, userId);
  }

  @Put(':userId/attributes')
  @ApiOperation({ summary: 'Update user attributes' })
  @ApiParam({ name: 'userId', description: 'User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'User attributes successfully updated',
    type: 'object',
  })
  async updateAttributes(
    @Param('realmId') realmId: string,
    @Param('userId') userId: string,
    @Body() attributes: Record<string, string>,
  ) {
    return this.usersService.updateAttributes(realmId, userId, attributes);
  }

  @Delete(':userId/attributes/:name')
  @ApiOperation({ summary: 'Delete user attribute' })
  @ApiParam({ name: 'userId', description: 'User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiParam({ name: 'name', description: 'Attribute name', example: 'customAttribute' })
  @ApiResponse({
    status: 200,
    description: 'Attribute successfully deleted',
  })
  async deleteAttribute(
    @Param('realmId') realmId: string,
    @Param('userId') userId: string,
    @Param('name') name: string,
  ) {
    return this.usersService.deleteAttribute(realmId, userId, name);
  }

  @Get(':userId/roles')
  @ApiOperation({ summary: 'Get user roles' })
  @ApiParam({ name: 'userId', description: 'User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'List of user roles',
    isArray: true,
    type: RoleResponseDto,
  })
  async getRoles(
    @Param('realmId') realmId: string,
    @Param('userId') userId: string,
  ) {
    return this.usersService.getRoles(realmId, userId);
  }

  @Post(':userId/roles')
  @ApiOperation({ summary: 'Add roles to user' })
  @ApiParam({ name: 'userId', description: 'User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Roles successfully added',
    isArray: true,
    type: RoleResponseDto,
  })
  async addRoles(
    @Param('realmId') realmId: string,
    @Param('userId') userId: string,
    @Body() body: { role_ids: string[] },
  ) {
    return this.usersService.addRoles(realmId, userId, body.role_ids);
  }

  @Delete(':userId/roles')
  @ApiOperation({ summary: 'Remove roles from user' })
  @ApiParam({ name: 'userId', description: 'User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Roles successfully removed',
  })
  async removeRoles(
    @Param('realmId') realmId: string,
    @Param('userId') userId: string,
    @Body() body: { role_ids: string[] },
  ) {
    return this.usersService.removeRoles(realmId, userId, body.role_ids);
  }

  @Get(':userId/groups')
  @ApiOperation({ summary: 'Get user groups' })
  @ApiParam({ name: 'userId', description: 'User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'List of user groups',
    isArray: true,
    type: GroupResponseDto,
  })
  async getGroups(
    @Param('realmId') realmId: string,
    @Param('userId') userId: string,
  ) {
    return this.usersService.getGroups(realmId, userId);
  }

  @Post(':userId/groups')
  @ApiOperation({ summary: 'Add user to groups' })
  @ApiParam({ name: 'userId', description: 'User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'User successfully added to groups',
    isArray: true,
    type: GroupResponseDto,
  })
  async addGroups(
    @Param('realmId') realmId: string,
    @Param('userId') userId: string,
    @Body() body: { group_ids: string[] },
  ) {
    return this.usersService.addGroups(realmId, userId, body.group_ids);
  }

  @Delete(':userId/groups/:groupId')
  @ApiOperation({ summary: 'Remove user from group' })
  @ApiParam({ name: 'userId', description: 'User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiParam({ name: 'groupId', description: 'Group ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'User successfully removed from group',
    type: IdResponseDto,
  })
  async removeGroup(
    @Param('realmId') realmId: string,
    @Param('userId') userId: string,
    @Param('groupId') groupId: string,
  ) {
    return this.usersService.removeGroup(realmId, userId, groupId);
  }
}
