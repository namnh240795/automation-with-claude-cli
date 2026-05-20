import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth-utilities';
import { AuthUser, JwtPayloadDto } from '@app/auth-utilities';
import { UserSecretsService } from './user-secrets.service';
import {
  CreateUserSecretDto,
  UpdateUserSecretDto,
  CreateOrgSecretDto,
} from './dto';

@ApiTags('User Secrets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user-secrets')
export class UserSecretsController {
  constructor(private readonly userSecretsService: UserSecretsService) {}

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create personal secret' })
  @ApiResponse({ status: 201, description: 'Secret created' })
  @ApiResponse({ status: 409, description: 'Secret name already exists' })
  create(
    @Body() dto: CreateUserSecretDto,
    @AuthUser() user: JwtPayloadDto,
  ) {
    return this.userSecretsService.create(dto, user.sub);
  }

  @Post('organization')
  @Version('1')
  @ApiOperation({ summary: 'Create organization secret (ADMIN only)' })
  @ApiResponse({ status: 201, description: 'Org secret created' })
  @ApiResponse({ status: 403, description: 'Not organization admin' })
  createOrgSecret(
    @Body() dto: CreateOrgSecretDto,
    @AuthUser() user: JwtPayloadDto,
  ) {
    return this.userSecretsService.createOrgSecret(dto, user);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'List all accessible secrets' })
  @ApiResponse({ status: 200, description: 'Success' })
  findAll(@AuthUser() user: JwtPayloadDto) {
    return this.userSecretsService.findAllForUser(user);
  }

  @Get('organization/:orgId')
  @Version('1')
  @ApiOperation({ summary: 'List organization secrets' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  findOrgSecrets(
    @Param('orgId') orgId: string,
    @AuthUser() user: JwtPayloadDto,
  ) {
    return this.userSecretsService.findOrgSecrets(orgId, user);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get secret metadata' })
  @ApiQuery({ name: 'reveal', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Secret not found' })
  async findOne(
    @Param('id') id: string,
    @Query('reveal') reveal: string,
    @AuthUser() user: JwtPayloadDto,
  ) {
    const secret = await this.userSecretsService.findOne(id, user);

    if (reveal === 'true') {
      const value = await this.userSecretsService.getDecryptedValue(id, user);
      return { ...secret, value };
    }

    return secret;
  }

  @Patch(':id')
  @Version('1')
  @ApiOperation({ summary: 'Update secret' })
  @ApiResponse({ status: 200, description: 'Updated' })
  @ApiResponse({ status: 404, description: 'Secret not found' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserSecretDto,
    @AuthUser() user: JwtPayloadDto,
  ) {
    return this.userSecretsService.update(id, dto, user);
  }

  @Delete(':id')
  @Version('1')
  @ApiOperation({ summary: 'Soft delete secret' })
  @ApiResponse({ status: 200, description: 'Deleted' })
  @ApiResponse({ status: 404, description: 'Secret not found' })
  remove(
    @Param('id') id: string,
    @AuthUser() user: JwtPayloadDto,
  ) {
    return this.userSecretsService.remove(id, user);
  }
}