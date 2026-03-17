import { Module } from '@nestjs/common';
import { RequiredActionsController } from './required-actions.controller';
import { RequiredActionsService } from './required-actions.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RequiredActionsController],
  providers: [RequiredActionsService],
  exports: [RequiredActionsService],
})
export class RequiredActionsModule {}
