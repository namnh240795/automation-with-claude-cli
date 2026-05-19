import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Kafka, Producer, Partitioners, logLevel } from 'kafkajs';
import { LogEvent } from './interfaces/log-event.interface';
import { LogPublisher } from './interfaces/log-publisher.interface';
import { AppLogger } from '@app/app-logger';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy, LogPublisher {
  private readonly logger = new Logger(KafkaProducerService.name);
  private kafka!: Kafka;
  private producer!: Producer;
  private readonly topic = 'workflow-logs';

  async onModuleInit() {
    const broker = process.env.KAFKA_BROKER || 'kafka:9092';
    this.kafka = new Kafka({
      clientId: 'logging-producer',
      brokers: [broker],
      logLevel: logLevel.WARN,
      retry: {
        initialRetryTime: 300,
        retries: 10,
      },
    });

    this.producer = this.kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
    });

    await this.producer.connect();
    AppLogger.setLogPublisher(this);
    this.logger.log('Kafka producer connected');
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    this.logger.log('Kafka producer disconnected');
  }

  async ensureTopicExists() {
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
      this.logger.warn(`Failed to ensure topic exists: ${error}`);
    }
  }

  publishLog(event: LogEvent): void {
    this.sendLog(event).catch((error) => {
      this.logger.error(`Failed to publish log: ${error}`);
    });
  }

  async sendLog(event: LogEvent): Promise<void> {
    await this.ensureTopicExists();
    await this.producer.send({
      topic: this.topic,
      messages: [
        {
          key: event.eventId,
          value: JSON.stringify(event),
        },
      ],
    });
    this.logger.debug(`Log sent to Kafka: ${event.eventId}`);
  }
}