import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Kafka, Consumer, EachMessagePayload, logLevel } from 'kafkajs';
import { LogEvent } from './interfaces/log-event.interface';
import { OpenSearchService } from '@app/opensearch';

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaConsumerService.name);
  private kafka!: Kafka;
  private consumer!: Consumer;
  private readonly topic = 'workflow-logs';

  constructor(private readonly openSearchService: OpenSearchService) {}

  async onModuleInit() {
    const broker = process.env.KAFKA_BROKER || 'kafka:9092';
    this.kafka = new Kafka({
      clientId: 'logging-consumer',
      brokers: [broker],
      logLevel: logLevel.WARN,
      retry: {
        initialRetryTime: 300,
        retries: 10,
      },
    });

    this.consumer = this.kafka.consumer({ groupId: 'logging-consumer-group' });

    await this.consumer.connect();
    await this.createTopicIfNotExists();
    await this.consumer.subscribe({ topic: this.topic, fromBeginning: false });

    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        await this.handleMessage(payload);
      },
    });

    this.logger.log('Kafka consumer connected and subscribed');
  }

  async createTopicIfNotExists() {
    try {
      const admin = this.kafka.admin();
      await admin.connect();
      const topics = await admin.listTopics();
      if (!topics.includes(this.topic)) {
        await admin.createTopics({
          topics: [{ topic: this.topic, numPartitions: 1, replicationFactor: 1 }],
        });
        this.logger.log(`Created topic: ${this.topic}`);
      }
      await admin.disconnect();
    } catch (error) {
      this.logger.warn(`Failed to create topic: ${error}`);
    }
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
    this.logger.log('Kafka consumer disconnected');
  }

  private async handleMessage(payload: EachMessagePayload): Promise<void> {
    const { message } = payload;

    if (!message.value) {
      this.logger.warn('Received message with no value');
      return;
    }

    try {
      const logEvent: LogEvent = JSON.parse(message.value.toString());

      await this.openSearchService.indexLog({
        eventId: logEvent.eventId,
        source_s: logEvent.source,
        action_s: logEvent.action,
        input_s: logEvent.input,
        output_s: logEvent.output,
        error_s: logEvent.error,
        exception_s: logEvent.exception,
        timestamp: logEvent.timestamp,
        duration_ms: logEvent.duration_ms,
      });

      this.logger.debug(`Indexed log: ${logEvent.eventId}`);
    } catch (error) {
      this.logger.error(`Failed to process message: ${error}`);
    }
  }
}