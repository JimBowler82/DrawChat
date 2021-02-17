import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SocketProvider } from "./context/socketContext";

ReactDOM.render(
  <SocketProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SocketProvider>,
  document.getElementById("root")
);
