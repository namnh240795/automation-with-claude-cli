import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication-flows.controller';
import { AuthenticationService } from './authentication-flows.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
