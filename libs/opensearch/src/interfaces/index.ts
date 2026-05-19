export interface LogDocument {
  eventId: string;
  source: string;
  action: string;
  input?: string;
  output?: string;
  error?: string;
  exception?: string;
  timestamp: string;
  duration_ms?: number;
}

export interface LogSearchResult {
  logs: LogDocument[];
  total: number;
}