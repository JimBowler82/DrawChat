import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SocketProvider } from "./context/socketContext";
import { UserProvider } from "./context/userContext";
import { AuthProvider } from "./context/authContext";

ReactDOM.render(
  <AuthProvider>
    <SocketProvider>
      <UserProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </UserProvider>
    </SocketProvider>
  </AuthProvider>,
  document.getElementById("root")
);
