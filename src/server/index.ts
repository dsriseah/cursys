import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve static files from the built client
app.use(express.static(path.join(process.cwd(), 'dist/client')));

// Serve the main HTML file for all routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist/client/index.html'));
});

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 