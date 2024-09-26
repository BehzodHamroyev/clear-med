// src/hooks/useSocket.ts
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { initSocket } from '../api/socket';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = initSocket();
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return socket;
};
