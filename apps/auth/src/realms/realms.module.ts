import { Module } from '@nestjs/common';
import { RealmsController } from './realms.controller';
import { RealmsService } from './realms.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RealmsController],
  providers: [RealmsService],
  exports: [RealmsService],
})
export class RealmsModule {}
