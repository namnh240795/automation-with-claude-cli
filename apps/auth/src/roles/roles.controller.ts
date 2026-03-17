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
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto, RoleResponseDto, RolesPaginatedResponseDto } from './dto';
import { IdResponseDto } from '../dto';
import { UserResponseDto } from '../users/dto';

@ApiTags('Roles')
@Controller('api/v1/realms/:realmId/roles')
@UseGuards(JwtAuthGuard, RealmScopeGuard)
@ApiBearerAuth()
@ApiParam({ name: 'realmId', description: 'Realm ID', example: '550e8400-e29b-41d4-a716-446655440000' })
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({ summary: 'List roles in a realm' })
  @ApiResponse({
    status: 200,
    description: 'List of roles',
    type: RolesPaginatedResponseDto,
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 0 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search in role name and description' })
  async findAll(
    @Param('realmId') realmId: string,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page = 0,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit = 20,
    @Query('search') search?: string,
  ) {
    return this.rolesService.findAll(realmId, page, limit, search);
  }

  @Get(':roleId')
  @ApiOperation({ summary: 'Get role details' })
  @ApiParam({ name: 'roleId', description: 'Role ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Role details',
    type: RoleResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Role not found' })
  async findOne(
    @Param('realmId') realmId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.rolesService.findOne(realmId, roleId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({
    status: 201,
    description: 'Role successfully created',
    type: RoleResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Role with this name already exists' })
  async create(
    @Param('realmId') realmId: string,
    @Body() createRoleDto: CreateRoleDto,
  ) {
    return this.rolesService.create(realmId, createRoleDto);
  }

  @Put(':roleId')
  @ApiOperation({ summary: 'Update role' })
  @ApiParam({ name: 'roleId', description: 'Role ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Role successfully updated',
    type: RoleResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Role not found' })
  @ApiResponse({ status: 409, description: 'Role with this name already exists' })
  async update(
    @Param('realmId') realmId: string,
    @Param('roleId') roleId: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.update(realmId, roleId, updateRoleDto);
  }

  @Delete(':roleId')
  @ApiOperation({ summary: 'Delete role' })
  @ApiParam({ name: 'roleId', description: 'Role ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Role successfully deleted',
    type: IdResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Role not found' })
  async delete(
    @Param('realmId') realmId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.rolesService.delete(realmId, roleId);
  }

  @Get(':roleId/composites')
  @ApiOperation({ summary: 'Get composite roles' })
  @ApiParam({ name: 'roleId', description: 'Role ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'List of composite roles',
    isArray: true,
    type: RoleResponseDto,
  })
  async getComposites(
    @Param('realmId') realmId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.rolesService.getComposites(realmId, roleId);
  }

  @Post(':roleId/composites')
  @ApiOperation({ summary: 'Add composite roles' })
  @ApiParam({ name: 'roleId', description: 'Role ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Composite roles successfully added',
    isArray: true,
    type: RoleResponseDto,
  })
  async addComposites(
    @Param('realmId') realmId: string,
    @Param('roleId') roleId: string,
    @Body() body: { role_ids: string[] },
  ) {
    return this.rolesService.addComposites(realmId, roleId, body.role_ids);
  }

  @Delete(':roleId/composites/:compositeId')
  @ApiOperation({ summary: 'Remove composite role' })
  @ApiParam({ name: 'roleId', description: 'Role ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiParam({ name: 'compositeId', description: 'Composite Role ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Composite role successfully removed',
  })
  async removeComposite(
    @Param('realmId') realmId: string,
    @Param('roleId') roleId: string,
    @Param('compositeId') compositeId: string,
  ) {
    return this.rolesService.removeComposite(realmId, roleId, compositeId);
  }

  @Get(':roleId/users')
  @ApiOperation({ summary: 'Get users with this role' })
  @ApiParam({ name: 'roleId', description: 'Role ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'List of users with this role',
    isArray: true,
    type: UserResponseDto,
  })
  async getUsers(
    @Param('realmId') realmId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.rolesService.getUsers(realmId, roleId);
  }

  @Post(':roleId/users/:userId')
  @ApiOperation({ summary: 'Assign role to user' })
  @ApiParam({ name: 'roleId', description: 'Role ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiParam({ name: 'userId', description: 'User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Role successfully assigned to user',
    isArray: true,
    type: RoleResponseDto,
  })
  async addUser(
    @Param('realmId') realmId: string,
    @Param('roleId') roleId: string,
    @Param('userId') userId: string,
  ) {
    return this.rolesService.addUser(realmId, roleId, userId);
  }

  @Delete(':roleId/users/:userId')
  @ApiOperation({ summary: 'Remove role from user' })
  @ApiParam({ name: 'roleId', description: 'Role ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiParam({ name: 'userId', description: 'User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Role successfully removed from user',
    type: IdResponseDto,
  })
  async removeUser(
    @Param('realmId') realmId: string,
    @Param('roleId') roleId: string,
    @Param('userId') userId: string,
  ) {
    return this.rolesService.removeUser(realmId, roleId, userId);
  }
}
