// Shared types between client and server

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