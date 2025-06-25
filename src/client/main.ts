import { io } from 'socket.io-client';

const socket = io();

const statusElement = document.getElementById('status') as HTMLSpanElement;

socket.on('connect', () => {
  statusElement.textContent = 'Connected';
  statusElement.style.color = 'green';
});

socket.on('disconnect', () => {
  statusElement.textContent = 'Disconnected';
  statusElement.style.color = 'red';
});

console.log('Client application loaded'); 