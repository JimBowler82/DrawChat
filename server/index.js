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

app.use(cors());

app.get("/", (req, res) => res.send("Welcome to the DrawChat server"));

let drawingData = [];

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  const data = drawingData;

  // Send initial data to new connections
  io.to(socket.id).emit("initialData", data);

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
});

httpServer.listen("5000", () => console.log("Server running on 5000"));
