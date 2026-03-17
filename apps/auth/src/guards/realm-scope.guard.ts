import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RealmScopeGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const realmId = request.params.realmId;

    if (!realmId) {
      throw new BadRequestException('Realm ID is required');
    }

    // Verify realm exists
    const realm = await this.prisma.realm.findUnique({
      where: { id: realmId },
    });

    if (!realm) {
      throw new NotFoundException('Realm not found');
    }

    if (!realm.enabled) {
      throw new NotFoundException('Realm is disabled');
    }

    // Attach realm to request for use in services
    request.realm = realm;
    return true;
  }
}
