import { io } from 'socket.io-client';

export const socket = io('https://medapi.magicsoft.uz', {
  auth: {
    token: 'medNavbatProduction',
  },
});
