import { clientVersion } from '../../src-lib/lib-web';
// If types are used, update import:
// import { WebSocketMessage, ClientInfo } from '../common/types';

const socket = new WebSocket(`ws://${window.location.host}`);

const statusElement = document.getElementById('status') as HTMLSpanElement;

socket.onopen = () => {
  statusElement.textContent = 'Connected';
  statusElement.style.color = 'green';
};

socket.onclose = () => {
  statusElement.textContent = 'Disconnected';
  statusElement.style.color = 'red';
};

socket.onerror = (error) => {
  console.error('WebSocket error:', error);
  statusElement.textContent = 'Error';
  statusElement.style.color = 'red';
};

// Live reload functionality
socket.onmessage = (event) => {
  if (event.data === 'reload') {
    console.log('Live reload triggered');
    window.location.reload();
  }
};

console.log('Client library version:', clientVersion);
console.log('Testing chokidar file detection! 🚀'); 