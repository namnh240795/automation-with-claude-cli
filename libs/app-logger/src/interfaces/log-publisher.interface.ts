import { LogEvent } from '@app/messaging';

export interface LogPublisher {
  publishLog(event: LogEvent): void;
}