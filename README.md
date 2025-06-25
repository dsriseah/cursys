# CURSYS
_experimental ursys clone made with cursor ai_

A Node.js TypeScript application with HTTP server and WebSocket support, built with tsup. Designed to be both a standalone application and installable as a library.

## Prerequisites

- nvm
- npm

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/dsriseah/cursys.git
   cd cursys
   ```

2. **Install dependencies**

   Make sure you have nvm installed (see appendix)
   ```bash
   nvm use
   npm ci
   ```

3. **Run the application**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Visit `http://localhost:3000`

## Quick Demo

For a quick demonstration, you can use the `curs` command:

```bash
./curs
```

This will build all components and start the server in one command.

## Development

### Build Commands
- **Development with live reload**: `npm run dev` (builds everything, starts server, and enables live reload)
- **Build all**: `npm run build` (builds everything with tsup)
- **Build node server only**: `npm run build:node`
- **Build web client only**: `npm run build:web`
- **Build web library**: `npm run build:lib-web`
- **Build node library**: `npm run build:lib-node`
- **Copy assets**: `npm run copy-assets`
- **Start production server**: `npm start`

### Live Reload
The project includes built-in live reload functionality:
- **File watching**: Uses chokidar to monitor `src/web/` and `src-lib/lib-web.ts`
- **WebSocket-based**: Uses native WebSocket for real-time communication
- **Automatic rebuild**: tsup rebuilds web files when changes are detected
- **Browser refresh**: Automatically refreshes the browser after rebuild

To use live reload:
1. Run `npm run dev`
2. Open `http://localhost:3000` in your browser
3. Make changes to web files (TypeScript, HTML, CSS)
4. Browser will automatically refresh with your changes

**Note**: Live reload is automatically enabled in development mode (when `NODE_ENV` is not 'production').

### Project Structure

```
src/
├── node/            # Express server with WebSocket support
├── web/             # Browser client with WebSocket support
└── common/          # Shared TypeScript interfaces
src-lib/
├── lib-web.ts       # Web library exports
└── lib-node.ts      # Node library exports
src-assets/          # Static assets (copied to web build)
_dist/               # Built files (gitignored)
_support/            # Deployment configurations (nginx.conf)
```

The server runs on port 3000 and serves both HTTP and WebSocket connections.

## Architecture

- **Full-stack TypeScript** with shared types between web and node
- **Express.js server** serving static files and handling WebSocket connections
- **Native WebSocket** for real-time bidirectional communication
- **tsup bundler** with multiple build targets and automatic type generation
- **Single Page Application** with client-side routing

## Installing as a Library

You can install this project as a library from GitHub:

```bash
npm install github:dsri/cursys
```

### Usage

```javascript
// Web library (ES modules)
import { clientVersion } from 'cursys/web';

// Node library (CommonJS)
const { serverVersion } = require('cursys/node');

// Default import (auto-detects module system)
import pkg from 'cursys';
```

Full TypeScript support is included with separate type definitions for web and node.

## Deployment

### Development
- Runs on `http://localhost:3000`
- Custom development server with built-in live reload
- Direct file serving from `_dist/`

### Production
- Nginx reverse proxy configuration in `_support/nginx.conf`
- SSL termination and security headers
- WebSocket support through proxy upgrade headers
- Path routing with `/app` prefix

## Appendix: Installing nvm

If you don't have nvm installed, run:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
```

Then:
1. Restart your terminal or run: `source ~/.bashrc`
2. Install Node.js: `nvm install 18.17.0`
3. Use Node.js: `nvm use 18.17.0` 
