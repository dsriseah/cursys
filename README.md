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
cursys/
├── src/
│   ├── common/          # Shared types and utilities
│   ├── node/            # Server-side code
│   └── web/             # Client-side code
├── src-lib/             # Library source files
├── src-assets/          # Static assets
├── _out/                # Built files (gitignored)
├── _exports/            # Library exports for npm package
├── curs                 # Build script
└── package.json
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
- **Static serving**: Direct file serving from `_out/`

### Production
- Nginx reverse proxy configuration in `

## Project Structure

```
cursys/
├── src/
│   ├── common/          # Shared types and utilities
│   ├── node/            # Server-side code
│   └── web/             # Client-side code
├── src-lib/             # Library source files
├── src-assets/          # Static assets
├── _out/                # Built files (gitignored)
├── _exports/            # Library exports for npm package
├── curs                 # Build script
└── package.json
```

## Installation

### Development
```bash
git clone https://github.com/dsriseah/cursys.git
cd cursys
npm install
npm run dev
```

### As a Package
```bash
npm install dsriseah/cursys
```

## Usage

### Development
- **Quick start**: `./curs` - Builds and starts the development server
- **Manual build**: `npm run dev` - Full development build with live reload
- **Server only**: `npm run build:node && npm start`

### As a Library
```javascript
// ESM import (browser/Node.js)
import { clientVersion } from 'cursys/web';

// CommonJS require (Node.js)
const { serverVersion } = require('cursys/node');

// Default import (Node.js)
const cursys = require('cursys');
```
