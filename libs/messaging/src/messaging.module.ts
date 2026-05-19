import { Module, Global } from '@nestjs/common';
import { KafkaProducerService } from './kafka-producer.service';
import { KafkaConsumerService } from './kafka-consumer.service';
import { OpenSearchModule } from '@app/opensearch';

@Global()
@Module({
  imports: [OpenSearchModule],
  providers: [KafkaProducerService, KafkaConsumerService],
  exports: [KafkaProducerService, KafkaConsumerService],
})
export class MessagingModule {}