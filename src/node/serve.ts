import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import path from 'path';
import chokidar from 'chokidar';
import { serverVersion } from '../../src-lib/lib-node';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV !== 'production';
console.log('process.env.NODE_ENV:', process.env.NODE_ENV);

// Serve static files from the built web
app.use(express.static(path.join(process.cwd(), '_dist/web'), {
  setHeaders: (res, path) => {
    if (isDevelopment) {
      // Prevent caching in development mode
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }
}));

// Serve the main HTML file for all routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), '_dist/web/index.html'));
});

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('Web client connected');
  
  ws.on('close', () => {
    console.log('Web client disconnected');
  });
});

// File watching for live reload (development only)
if (isDevelopment) {
  console.log('Setting up chokidar file watcher...');
  console.log('Current working directory:', process.cwd());
  
  const watchPaths = [
    path.join(process.cwd(), 'src/web'),
    path.join(process.cwd(), 'src-lib/lib-web.ts')
  ];
  
  console.log('Watch paths:', watchPaths);
  
  const watcher = chokidar.watch(watchPaths, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  });

  watcher
    .on('ready', () => {
      console.log('File watcher ready for live reload');
      console.log('Watched files:', watcher.getWatched());
    })
    .on('change', (filePath) => {
      console.log(`File changed: ${filePath}`);
      console.log('Rebuilding web files...');
      
      // Trigger tsup rebuild
      const { exec } = require('child_process');
      exec('npm run build:web', (error: any, stdout: any, stderr: any) => {
        if (error) {
          console.error('Build error:', error);
          return;
        }
        console.log('Build completed, triggering live reload...');
        // Send reload message to all connected clients
        wss.clients.forEach((client) => {
          if (client.readyState === 1) { // WebSocket.OPEN
            client.send('reload');
          }
        });
      });
    })
    .on('error', (error) => {
      console.error('File watcher error:', error);
    });
} else {
  console.log('Production mode: file watching disabled');
}

server.listen(PORT, () => {
  console.log(`Node server running on port ${PORT}`);
  console.log('Node library version:', serverVersion);
  if (isDevelopment) {
    console.log('Development mode: live reload enabled');
  }
}); 