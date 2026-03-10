import { Module } from '@nestjs/common'
import { PoliciesController } from './policies.controller'
import { PoliciesService } from './policies.service'
import { PoliciesGateway } from './policies.gateway'

@Module({
  controllers: [PoliciesController],
  providers: [PoliciesService, PoliciesGateway],
  exports: [PoliciesService],
})
export class PoliciesModule {}
