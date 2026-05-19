import { LogEvent } from './log-event.interface';

export interface LogPublisher {
  publishLog(event: LogEvent): void;
}
