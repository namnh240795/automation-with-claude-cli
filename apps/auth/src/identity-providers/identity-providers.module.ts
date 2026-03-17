import { Module } from '@nestjs/common';
import { IdentityProvidersController } from './identity-providers.controller';
import { IdentityProvidersService } from './identity-providers.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [IdentityProvidersController],
  providers: [IdentityProvidersService],
  exports: [IdentityProvidersService],
})
export class IdentityProvidersModule {}
