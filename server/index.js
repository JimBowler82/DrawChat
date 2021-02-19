const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const options = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
};
const io = require("socket.io")(httpServer, options);
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

app.use(cors());

app.get("/", (req, res) => res.send("Welcome to the DrawChat server"));

let drawingData = [];

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  // Receive existing room name to join
  socket.on("joinExistingRoom", ({ roomId }) => {
    socket.join(roomId);
    console.log(`Socket with id ${socket.id} has joined room ${roomId}`);

    // Send room data to socket
    io.to(socket.id).emit("roomData", { roomId: roomId, data: drawingData });

    // Notify other sockets of join
    socket.broadcast.to(roomId).emit("newJoin");
  });

  // Receive create new room
  socket.on("createNewRoom", () => {
    const newID = uuidv4().substring(0, 8);

    socket.join(newID);
    console.log(`Socket with id ${socket.id} has joined room ${newID}`);

    // Send room data to socket
    io.to(socket.id).emit("roomData", { roomId: newID });
  });

  // Receive new drawing input, save to drawingData, send out to all connections.
  socket.on("mouse", (data) => {
    console.log("Mouse data received");
    drawingData.push(data);

    socket.broadcast.emit("mouse", data);
  });

  // Clear out drawingData on clearCanvas message
  socket.on("clearCanvas", () => {
    console.log("Clearing canvas");
    database = [];
    socket.broadcast.emit("clearCanvas");
  });

  // Handle socket leaving a room
  socket.on("leaveRoom", ({ roomId }) => {
    socket.leave(roomId);
    console.log(`Socket ${socket.id} has left room ${roomId}`);
  });

  // Notify of socket disconnect
  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} has disconnected`);
  });
});

httpServer.listen("5000", () => console.log("Server running on 5000"));
