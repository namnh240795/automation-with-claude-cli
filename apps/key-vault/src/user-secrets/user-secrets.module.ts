import { Module } from '@nestjs/common';
import { UserSecretsService } from './user-secrets.service';
import { UserSecretsController } from './user-secrets.controller';

@Module({
  providers: [UserSecretsService],
  controllers: [UserSecretsController],
  exports: [UserSecretsService],
})
export class UserSecretsModule {}