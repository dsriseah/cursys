# CURSYS - Project Context

## Overview
CURSYS is a Node.js TypeScript application with HTTP server and WebSocket support, built with Parcel bundler. It's designed to be both a standalone application and installable as a library.

## Architecture
- **Full-stack TypeScript**: Shared types between client and server
- **Express.js server**: Serves static files and handles WebSocket connections via Socket.IO
- **Single Page Application**: Client-side TypeScript with Socket.IO client
- **Library packaging**: Can be installed as npm package with separate client/server exports

## Key Components
- `src/server/` - Express server with Socket.IO WebSocket support
- `src/client/` - Browser-based client with Socket.IO connection
- `src/shared/` - TypeScript interfaces shared between client/server
- `src-lib/` - Library code for client and server exports
- `_dist/` - Built output (gitignored)

## Build System
- **Parcel bundler** with multiple targets (server, client, lib-client, lib-server)
- **TypeScript** compilation with source maps
- **Asset copying** from `src-assets/` to client build
- **Development workflow**: `npm run dev` builds everything and starts server

## Current State
- Basic WebSocket connection between client and server
- Connection status display in browser
- Server serves static files and SPA routing
- Library exports for both client (ES modules) and server (CommonJS)
- **Live reload system** with chokidar file watching and automatic browser refresh

## Development Context
- Node.js 18.17.0 required
- Runs on port 3000 by default
- WebSocket messages use `WebSocketMessage` interface with type, data, and timestamp
- Client tracking includes `ClientInfo` with id, connection time, and user agent
- **Live reload**: Automatic file watching, rebuild, and browser refresh in development

## Known Patterns
- Shared version tracking between client and server libraries
- Socket.IO for real-time communication
- Express static file serving with SPA fallback routing
- TypeScript interfaces for type safety across client/server boundary
- **Chokidar v4** for cross-platform file watching (no glob support)
- **Cache-busting headers** in development to prevent browser caching 