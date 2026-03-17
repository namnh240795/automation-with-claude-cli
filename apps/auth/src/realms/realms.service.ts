import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { LogActivity } from '@app/app-logger';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRealmDto, UpdateRealmDto } from './dto';

@Injectable()
export class RealmsService {
  constructor(private readonly prisma: PrismaService) {}

  @LogActivity()
  async findAll(page = 0, limit = 20) {
    const skip = page * limit;

    const [realms, total] = await Promise.all([
      this.prisma.realm.findMany({
        skip,
        take: limit,
        orderBy: { name: 'asc' },
        select: {
          id: true,
          name: true,
          enabled: true,
          ssl_required: true,
          registration_allowed: true,
          login_theme: true,
          internationalization_enabled: true,
          reset_password_allowed: true,
          edit_username_allowed: true,
        },
      }),
      this.prisma.realm.count(),
    ]);

    return {
      data: realms,
      meta: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  @LogActivity()
  async findOne(id: string) {
    const realm = await this.prisma.realm.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        enabled: true,
        ssl_required: true,
        registration_allowed: true,
        login_theme: true,
        internationalization_enabled: true,
        reset_password_allowed: true,
        edit_username_allowed: true,
        access_token_lifespan: true,
        access_code_lifespan: true,
        default_locale: true,
      },
    });

    if (!realm) {
      throw new NotFoundException('Realm not found');
    }

    return realm;
  }

  @LogActivity()
  async create(createRealmDto: CreateRealmDto) {
    const { name, ...data } = createRealmDto;

    // Check if realm with this name already exists
    const existingRealm = await this.prisma.realm.findUnique({
      where: { name },
    });

    if (existingRealm) {
      throw new ConflictException('Realm with this name already exists');
    }

    const realm = await this.prisma.realm.create({
      data: {
        name,
        ...data,
        id: crypto.randomUUID(),
      },
      select: {
        id: true,
        name: true,
        enabled: true,
        ssl_required: true,
        registration_allowed: true,
        login_theme: true,
        internationalization_enabled: true,
        reset_password_allowed: true,
        edit_username_allowed: true,
      },
    });

    return realm;
  }

  @LogActivity()
  async update(id: string, updateRealmDto: UpdateRealmDto) {
    // Check if realm exists
    const existingRealm = await this.prisma.realm.findUnique({
      where: { id },
    });

    if (!existingRealm) {
      throw new NotFoundException('Realm not found');
    }

    // If name is being updated, check for duplicates
    if (updateRealmDto.name && updateRealmDto.name !== existingRealm.name) {
      const duplicateRealm = await this.prisma.realm.findUnique({
        where: { name: updateRealmDto.name },
      });

      if (duplicateRealm) {
        throw new ConflictException('Realm with this name already exists');
      }
    }

    const realm = await this.prisma.realm.update({
      where: { id },
      data: updateRealmDto,
      select: {
        id: true,
        name: true,
        enabled: true,
        ssl_required: true,
        registration_allowed: true,
        login_theme: true,
        internationalization_enabled: true,
        reset_password_allowed: true,
        edit_username_allowed: true,
      },
    });

    return realm;
  }

  @LogActivity()
  async delete(id: string) {
    // Check if realm exists
    const existingRealm = await this.prisma.realm.findUnique({
      where: { id },
    });

    if (!existingRealm) {
      throw new NotFoundException('Realm not found');
    }

    // Prevent deletion of master realm
    if (existingRealm.name === 'master') {
      throw new ConflictException('Cannot delete master realm');
    }

    await this.prisma.realm.delete({
      where: { id },
    });

    return { id };
  }

  @LogActivity()
  async getAttributes(realmId: string) {
    const attributes = await this.prisma.realm_attribute.findMany({
      where: { realm_id: realmId },
      select: {
        name: true,
        value: true,
      },
    });

    // Convert to key-value object
    const attributesObj: Record<string, string> = {};
    for (const attr of attributes) {
      if (attr.name) {
        attributesObj[attr.name] = attr.value || '';
      }
    }

    return attributesObj;
  }

  @LogActivity()
  async updateAttributes(realmId: string, attributes: Record<string, string>) {
    // Delete existing attributes
    await this.prisma.realm_attribute.deleteMany({
      where: { realm_id: realmId },
    });

    // Create new attributes
    const data = Object.entries(attributes).map(([name, value]) => ({
      realm_id: realmId,
      name,
      value,
    }));

    await this.prisma.realm_attribute.createMany({
      data,
      skipDuplicates: true,
    });

    return this.getAttributes(realmId);
  }

  @LogActivity()
  async deleteAttribute(realmId: string, name: string) {
    await this.prisma.realm_attribute.deleteMany({
      where: {
        realm_id: realmId,
        name,
      },
    });

    return { name };
  }

  @LogActivity()
  async getSmtpConfig(realmId: string) {
    const smtpConfigs = await this.prisma.realm_smtp_config.findMany({
      where: { realm_id: realmId },
    });

    // Convert to key-value object
    const smtpConfig: Record<string, string | boolean | number> = {};
    for (const config of smtpConfigs) {
      if (config.name) {
        // Parse boolean and number values
        const value = config.value;
        if (value === 'true') {
          smtpConfig[config.name] = true;
        } else if (value === 'false') {
          smtpConfig[config.name] = false;
        } else if (value && !isNaN(Number(value))) {
          smtpConfig[config.name] = Number(value);
        } else {
          smtpConfig[config.name] = value || '';
        }
      }
    }

    return Object.keys(smtpConfig).length > 0 ? smtpConfig : null;
  }

  @LogActivity()
  async updateSmtpConfig(realmId: string, config: Record<string, any>) {
    // Delete existing SMTP config
    await this.prisma.realm_smtp_config.deleteMany({
      where: { realm_id: realmId },
    });

    // Create new SMTP config entries
    const data = Object.entries(config).map(([name, value]) => ({
      realm_id: realmId,
      name,
      value: String(value),
    }));

    if (data.length > 0) {
      await this.prisma.realm_smtp_config.createMany({
        data,
        skipDuplicates: true,
      });
    }

    return this.getSmtpConfig(realmId);
  }
}
