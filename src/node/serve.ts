import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import chokidar from 'chokidar';
import { serverVersion } from '../../src-lib/lib-node';

const app = express();
const server = createServer(app);
const io = new Server(server);

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
io.on('connection', (socket) => {
  console.log('Web client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Web client disconnected:', socket.id);
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
      
      // Trigger Parcel rebuild
      const { exec } = require('child_process');
      exec('npm run build:web', (error: any, stdout: any, stderr: any) => {
        if (error) {
          console.error('Build error:', error);
          return;
        }
        console.log('Build completed, triggering live reload...');
        io.emit('reload');
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