# CURSYS Context

## Project Overview
CURSYS is an experimental clone of URSYS, built with modern TypeScript tooling. It's designed as both a standalone application and an installable library for real-time web applications.

## Architecture Overview

### 1. Platform-Based Structure
- **`src/web/`**: Browser client with WebSocket support
- **`src/node/`**: Express server with WebSocket support  
- **`src/common/`**: Shared TypeScript interfaces
- **`src-lib/`**: Library exports for web and node platforms

### 2. Build System
- **tsup bundler** with multiple build targets
- **Automatic type generation** (`.d.ts` files)
- **Asset copying** from `src-assets/` to web build
- **Development workflow**: `npm run dev` builds everything and starts server

### 3. Communication Layer
- **Native WebSocket** for real-time bidirectional communication
- **Express.js server** serving static files and handling WebSocket connections
- **Live reload**: Automatic file watching, rebuild, and browser refresh in development

### 4. Library Structure
- **Web library**: ESM format for browser consumption
- **Node library**: CommonJS format for server consumption
- **Package exports**: Subpath exports for platform-specific imports
- **TypeScript support**: Full type definitions included

### 5. Development Workflow
- **Fast builds**: tsup provides 35x faster builds than Parcel
- **Live reload**: Automatic file watching, rebuild, and browser refresh in development
- **Type safety**: Full TypeScript support across all platforms
- **Hot reload**: WebSocket-based live reload system

### 6. Deployment
- **Development**: Custom server with live reload on port 3000
- **Production**: Nginx reverse proxy with WebSocket support
- **Static serving**: Direct file serving from `_dist/` directory

## Key Technologies
- **TypeScript**: Full-stack type safety
- **Express.js**: HTTP server and static file serving
- **Native WebSocket**: Real-time communication
- **tsup**: Fast TypeScript bundling with automatic type generation
- **chokidar**: File watching for live reload
- **Node.js**: Server runtime environment 