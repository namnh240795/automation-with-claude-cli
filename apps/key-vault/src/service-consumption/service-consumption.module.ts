import { Module } from '@nestjs/common';
import { ServiceConsumptionController } from './service-consumption.controller';
import { ServiceConsumptionService } from './service-consumption.service';

@Module({
  controllers: [ServiceConsumptionController],
  providers: [ServiceConsumptionService],
})
export class ServiceConsumptionModule {}
