export interface LogEvent {
  eventId: string;
  source_s: string;
  action_s?: string;
  input_s?: string;
  output_s?: string;
  error_s?: string;
  exception_s?: string;
  timestamp: string;
}

export interface LogPublisher {
  publishLog(log: LogEvent): Promise<void>;
}