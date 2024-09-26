// src/shared/api/socket.ts

import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

// Create a function to initialize the socket connection
export const initSocket = (): Socket => {
  const socket = io(SOCKET_URL);

  // You can add any custom event handlers here if needed
  socket.on('connect', () => {
    console.log('Connected to the socket server:', socket.id);
  });

  return socket;
};
