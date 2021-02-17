import React, { useState, createContext, useContext } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_SERVER_URL;
const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(socketIOClient(ENDPOINT));

  function connection(string) {
    setSocket(string);
  }

  return (
    <SocketContext.Provider value={[socket, connection]}>
      {children}
    </SocketContext.Provider>
  );
}

export default function useSocketContext() {
  return useContext(SocketContext);
}
