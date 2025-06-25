# CURSYS
_experimental ursys clone made with cursor ai_

A Node.js TypeScript application with HTTP server and WebSocket support, built with Parcel. Designed to be both a standalone application and installable as a library.

## Prerequisites

- Node.js 18.17.0 (managed with nvm)
- npm

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/dsriseah/cursys.git
   cd cursys
   ```

2. **Install dependencies**
   ```bash
   npm ci
   ```

3. **Run the application**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Visit `http://localhost:3000`

## Development

### Build Commands
- **Development with live reload**: `npm run dev` (builds everything, starts server, and enables live reload)
- **Build server only**: `npm run build:server`
- **Build client only**: `npm run build:client`
- **Build library client**: `npm run build:lib-client`
- **Build library server**: `npm run build:lib-server`
- **Copy assets**: `npm run copy-assets`
- **Start production server**: `npm start`

### Live Reload
The project includes built-in live reload functionality:
- **File watching**: Uses chokidar to monitor `src/client/` and `src-lib/lib-client.ts`
- **WebSocket-based**: Uses Socket.IO for real-time communication
- **Automatic rebuild**: Parcel rebuilds client files when changes are detected
- **Browser refresh**: Automatically refreshes the browser after rebuild

To use live reload:
1. Run `npm run dev`
2. Open `http://localhost:3000` in your browser
3. Make changes to client files (TypeScript, HTML, CSS)
4. Browser will automatically refresh with your changes

**Note**: Live reload is automatically enabled in development mode (when `NODE_ENV` is not 'production').

### Project Structure

```
src/
├── server/          # Express server with Socket.IO
├── client/          # Browser client with Socket.IO
└── shared/          # Shared TypeScript interfaces
src-lib/
├── lib-client.ts    # Client library exports
└── lib-server.ts    # Server library exports
src-assets/          # Static assets (copied to client build)
_dist/               # Built files (gitignored)
_support/            # Deployment configurations (nginx.conf)
```

The server runs on port 3000 and serves both HTTP and WebSocket connections via Socket.IO.

## Architecture

- **Full-stack TypeScript** with shared types between client and server
- **Express.js server** serving static files and handling WebSocket connections
- **Socket.IO** for real-time bidirectional communication
- **Parcel bundler** with multiple build targets
- **Single Page Application** with client-side routing

## Installing as a Library

You can install this project as a library from GitHub:

```bash
npm install github:dsri/cursys
```

### Usage

```javascript
// Client library (ES modules)
import { clientVersion } from 'cursys/client';

// Server library (CommonJS)
const { serverVersion } = require('cursys/server');

// Default import (auto-detects module system)
import pkg from 'cursys';
```

Full TypeScript support is included with separate type definitions for client and server.

## Deployment

### Development
- Runs on `http://localhost:3000`
- Hot reload with Parcel development server
- Direct file serving from `_dist/`

### Production
- Nginx reverse proxy configuration in `_support/nginx.conf`
- SSL termination and security headers
- WebSocket support through proxy upgrade headers
- Path routing with `/app` prefix

## Installing nvm

If you don't have nvm installed, run:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
```

Then:
1. Restart your terminal or run: `source ~/.bashrc`
2. Install Node.js: `nvm install 18.17.0`
3. Use Node.js: `nvm use 18.17.0` 