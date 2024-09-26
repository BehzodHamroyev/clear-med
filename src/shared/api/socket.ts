import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'https://socketfa.magicsoft.uz/';

// Create a function to initialize the socket connection
export const initSocket = (): Socket => {
  const socket = io(SOCKET_URL, {
    transports: ['websocket'], // Use WebSocket if available
  });

  socket.on('connect', () => {
    console.log('Connected to the socket server:', socket.id);
  });

  return socket;
};
