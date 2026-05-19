export interface LogEvent {
  eventId: string;
  source: string;        // Service name
  action: string;        // Method name
  input?: string;        // Stringified args
  output?: string;       // Stringified result
  error?: string;         // Error message
  exception?: string;    // Stack trace
  timestamp: string;     // ISO 8601
  duration_ms?: number;   // Execution duration in milliseconds
}

export interface LogDocument {
  eventId: string;
  source_s: string;
  action_s: string;
  input_s?: string;
  output_s?: string;
  error_s?: string;
  exception_s?: string;
  timestamp: string;
  duration_ms?: number;
}
