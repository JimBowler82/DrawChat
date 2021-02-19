import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SocketProvider } from "./context/socketContext";
import { UserProvider } from "./context/userContext";

ReactDOM.render(
  <SocketProvider>
    <UserProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserProvider>
  </SocketProvider>,
  document.getElementById("root")
);
