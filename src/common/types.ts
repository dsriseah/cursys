// Common types between web and node

export interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: number;
}

export interface ClientInfo {
  id: string;
  connectedAt: Date;
  userAgent?: string;
} 