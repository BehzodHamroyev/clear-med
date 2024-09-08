import { io } from 'socket.io-client';

export const socket = io('http://192.168.0.130:3009/', {
  auth: {
    token: 'medNavbatProduction',
  },
});
