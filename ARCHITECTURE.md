# CURSYS Architecture

## Overview
CURSYS is built with a modern TypeScript stack optimized for fast development and production deployment. The architecture emphasizes type safety, fast builds, and real-time communication.

## Core Architecture

### 1. Platform-Based Directory Structure
```
src/
├── web/          # Browser client with WebSocket support
├── node/         # Express server with WebSocket support
└── common/       # Shared TypeScript interfaces
src-lib/
├── lib-web.ts    # Web library exports
└── lib-node.ts   # Node library exports
```

### 2. Build System Architecture
- **tsup bundler**: Fast TypeScript bundling with esbuild under the hood
- **Multiple targets**: Separate builds for web (ESM) and node (CommonJS)
- **Type generation**: Automatic `.d.ts` file generation
- **Asset pipeline**: Automatic copying from `src-assets/` to web build
- **Development workflow**: Single command builds everything and starts server

### 3. Communication Architecture
- **Native WebSocket**: Browser-native WebSocket API for real-time communication
- **Express.js server**: HTTP server with WebSocket upgrade support
- **Live reload**: Chokidar file watching with automatic rebuild and browser refresh
- **Message protocol**: Simple string-based messages for live reload

### 4. Library Architecture
- **Web library**: ESM format for browser consumption
- **Node library**: CommonJS format for server consumption
- **Package exports**: Subpath exports for platform-specific imports
- **Type safety**: Full TypeScript definitions included

## Development Workflow

### 1. Build Process
```
npm run dev
├── build:lib-web    # Build web library (ESM)
├── build:lib-node   # Build node library (CommonJS)
├── build:node       # Build server application
├── copy-assets      # Copy static assets
├── build:web        # Build web client (ESM)
└── start            # Start development server
```

### 2. Live Reload System
- **File watching**: Chokidar monitors `src/web/` and `src-lib/lib-web.ts`
- **Auto-rebuild**: tsup rebuilds web files when changes detected
- **WebSocket messaging**: Server sends 'reload' message to connected clients
- **Browser refresh**: Clients automatically refresh on reload message

### 3. Type Safety
- **Shared interfaces**: Common types in `src/common/`
- **Library types**: Separate type definitions for web and node
- **Build-time checking**: TypeScript compilation during build
- **Runtime safety**: Type-safe WebSocket message handling

## Production Architecture

### 1. Server Deployment
- **Express.js**: HTTP server with static file serving
- **WebSocket support**: Native WebSocket upgrade handling
- **SPA routing**: Fallback to index.html for client-side routing
- **Static assets**: Direct serving from `_out/web/`

### 2. Nginx Configuration
- **Reverse proxy**: Forward requests to Node.js application
- **WebSocket upgrade**: Proper WebSocket proxy configuration
- **SSL termination**: HTTPS support with certificate management
- **Security headers**: CORS and security policy headers

### 3. Build Optimization
- **Tree shaking**: Dead code elimination in production builds
- **Minification**: Optional code minification for production
- **Source maps**: Development source maps for debugging
- **Type declarations**: Separate `.d.ts` files for library consumers

## Performance Characteristics

### 1. Build Performance
- **tsup speed**: 35x faster than Parcel for TypeScript builds
- **Incremental builds**: Only rebuild changed files
- **Parallel processing**: Multiple targets built concurrently
- **Memory efficient**: Lower memory usage than webpack-based tools

### 2. Runtime Performance
- **Native WebSocket**: Browser-native implementation, no library overhead
- **Lightweight server**: Express.js with minimal middleware
- **Fast static serving**: Direct file system access
- **Efficient file watching**: Chokidar optimized for cross-platform performance

### 3. Bundle Sizes
- **Web client**: ~900B (vs 41KB with Parcel)
- **Node server**: ~4KB optimized for server environment
- **Libraries**: Minimal size with tree shaking
- **Dependencies**: Reduced footprint without Socket.IO

## Security Considerations

### 1. WebSocket Security
- **Origin validation**: Server validates WebSocket origin
- **Message sanitization**: Input validation for WebSocket messages
- **Connection limits**: Maximum concurrent connections
- **Error handling**: Graceful error handling and logging

### 2. HTTP Security
- **Security headers**: CORS, CSP, and other security headers
- **Input validation**: Express.js middleware for request validation
- **Static file security**: Proper MIME type handling
- **Error pages**: Secure error page responses

## Monitoring and Debugging

### 1. Development Tools
- **TypeScript**: Compile-time error checking
- **Source maps**: Debug original TypeScript code
- **Hot reload**: Instant feedback on code changes
- **Console logging**: Comprehensive development logging

### 2. Production Monitoring
- **Connection logging**: WebSocket connection events
- **Error tracking**: Server error logging and reporting
- **Performance metrics**: Build time and runtime metrics
- **Health checks**: Application health monitoring endpoints 

## Build System
- **Libraries:** Built with `tsup --config tsup.lib.config.ts` to `_exports/` (with types)
- **Apps:** Built with `tsup --config tsup.app.config.ts` to `_out/` (no types)
- **Scripts:** Clean, only use config files
- **Live Reload:** Watches web and library sources, rebuilds app, triggers browser reload
- **Type Declarations:** Only libraries export types for consumers

## Directory Structure
- `_exports/` — Library outputs for npm consumers
- `_out/` — App/server outputs for deployment

## Development
- Use `npm run build`, `npm run dev`, or `./curs` for full build/start
- Libraries are always up to date in `_exports/` for npm consumers 
