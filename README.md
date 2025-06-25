# Cursor Jason Demo

A Node.js TypeScript application with HTTP server and WebSocket support, built with Parcel.

## Prerequisites

- Node.js 18.17.0 (managed with nvm)
- npm

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cursor-jason-demo
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

- **Build server**: `npm run build:server`
- **Build client**: `npm run build:client`
- **Build both**: `npm run build`
- **Start server**: `npm start`

## Project Structure

```
src/
├── server/          # Server-side TypeScript
├── client/          # Client-side TypeScript
└── shared/          # Shared types
_dist/               # Built files (gitignored)
_support/            # Deployment configurations
```

The server runs on port 3000 and serves both HTTP and WebSocket connections.

## Installing as a Library

You can install this project as a library from GitHub:

```bash
npm install github:username/cursor-jason-demo
```

### Usage

```javascript
// Client library (ES modules)
import { clientVersion } from 'cursor-jason-demo/client';

// Server library (CommonJS)
const { serverVersion } = require('cursor-jason-demo/server');

// Default import (auto-detects module system)
import pkg from 'cursor-jason-demo';
```

Full TypeScript support is included.

## Installing nvm

If you don't have nvm installed, run:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
```

Then:
1. Restart your terminal or run: `source ~/.bashrc`
2. Install Node.js: `nvm install 18.17.0`
3. Use Node.js: `nvm use 18.17.0` 