# Cursys - Architecture

## System Overview
Cursys follows a **full-stack TypeScript architecture** with shared code between client and server, designed for both standalone deployment and library consumption.

## Core Architecture Patterns

### 1. Shared Type System
- **Location**: `src/shared/types.ts`
- **Purpose**: Type-safe communication between client and server
- **Key Interfaces**:
  - `WebSocketMessage`: Standardized message format with type, data, timestamp
  - `ClientInfo`: Client metadata for connection tracking

### 2. Dual Library Architecture
- **Client Library**: `src-lib/lib-client.ts` (ES modules)
- **Server Library**: `src-lib/lib-server.ts` (CommonJS)
- **Purpose**: Allow installation as npm package with separate client/server exports
- **Version Tracking**: Shared version constants for client/server synchronization

### 3. Build System Architecture
- **Bundler**: Parcel with multiple targets
- **Targets**:
  - `server`: Node.js CommonJS with source maps
  - `client`: Browser ES modules with public URL routing
  - `lib-client`: Browser ES modules for library consumption
  - `lib-server`: Node.js CommonJS for library consumption
- **Asset Pipeline**: Automatic copying from `src-assets/` to client build

## Communication Architecture

### WebSocket Layer
- **Technology**: Socket.IO
- **Protocol**: WebSocket with HTTP fallback
- **Message Format**: Structured JSON with type system
- **Connection Management**: Automatic reconnection and event handling

### HTTP Layer
- **Framework**: Express.js
- **Static Serving**: Built client files from `_dist/client/`
- **SPA Routing**: Catch-all route serving `index.html`
- **API Ready**: Express middleware stack for future REST endpoints

## Deployment Architecture

### Development
- **Port**: 3000 (configurable via `PORT` env var)
- **Hot Reload**: Parcel development server
- **Asset Serving**: Direct file serving from `_dist/`

### Production
- **Reverse Proxy**: Nginx with SSL termination
- **WebSocket Support**: Proxy upgrade headers for Socket.IO
- **Security**: HTTPS redirect, security headers, SSL configuration
- **Path Routing**: `/app` prefix with internal port 3000

## TypeScript Configuration
- **Target**: ES2020 with ESNext modules
- **Strict Mode**: Enabled for type safety
- **Path Mapping**: `@/*` aliases to `src/*`
- **Module Resolution**: Node.js with synthetic default imports

## Data Flow Architecture

### Client → Server
1. Socket.IO client connects to server
2. Messages sent via `socket.emit()` with typed interfaces
3. Server receives and processes via event handlers

### Server → Client
1. Server broadcasts via `io.emit()` or targeted `socket.emit()`
2. Client receives via `socket.on()` event listeners
3. UI updates based on message type and data

### Shared State
- **Connection Status**: Real-time client connection tracking
- **Message History**: Timestamped message logging
- **Client Registry**: Active client management with metadata

## Scalability Considerations
- **Stateless Design**: No server-side session storage
- **WebSocket Scaling**: Ready for Socket.IO Redis adapter
- **Library Separation**: Independent client/server packages
- **Build Optimization**: Separate bundles for different targets 