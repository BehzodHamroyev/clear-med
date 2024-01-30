import { io } from 'socket.io-client';

export const socket = io('http://socketmed.magicsoft.uz', {
  auth: {
    token: 'medNavbatProduction',
  },
});
