const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socket = require("socket.io");
const io = socket(server);

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on("mouse", (data) => {
    console.log("Mouse data received", data);
  });
});

server.listen("5000", () => console.log("Server running on 5000"));
