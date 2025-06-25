import { io } from 'socket.io-client';
import { clientVersion } from '../../src-lib/lib-web';
// If types are used, update import:
// import { WebSocketMessage, ClientInfo } from '../common/types';

const socket = io();

const statusElement = document.getElementById('status') as HTMLSpanElement;

socket.on('connect', () => {
  statusElement.textContent = 'Connected';
  statusElement.style.color = 'green';
});
//
socket.on('disconnect', () => {
  statusElement.textContent = 'Disconnected';
  statusElement.style.color = 'red';
});

// Live reload functionality
socket.on('reload', () => {
  console.log('Live reload triggered');
  window.location.reload();
});

console.log('Client application loaded');
console.log('Client library version:', clientVersion);
console.log('Testing chokidar file detection! 🚀'); 