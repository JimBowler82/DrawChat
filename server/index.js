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
let usersArray = [];

io.on("connection", (socket) => {
  // Add socket to array of connected sockets
  const newUser = {
    id: socket.id,
    room: "",
    name: "",
    color: "",
  };
  usersArray = [...usersArray, newUser];
  console.log(`New connection: ${socket.id}`);

  // Receive existing room name to join
  socket.on("joinExistingRoom", ({ roomId }) => {
    socket.join(roomId);

    // Update corressponding object in usersArray
    const index = usersArray.findIndex((user) => user.id === socket.id);
    if (index >= 0) usersArray[index].room = roomId;

    console.log(`Socket with id ${socket.id} has joined room ${roomId}`);

    // Send room data to socket
    const drawingDataByRoom = drawingData.filter(
      (dataObj) => dataObj.room === roomId
    );
    io.to(socket.id).emit("roomData", {
      roomId: roomId,
      data: drawingDataByRoom,
      users: usersArray.filter(
        (user) => user.room === roomId && user.name !== ""
      ),
    });
  });

  // Receive create new room
  socket.on("createNewRoom", () => {
    const newID = uuidv4().substring(0, 8);

    socket.join(newID);

    // Update corressponding object in usersArray
    const index = usersArray.findIndex((user) => user.id === socket.id);
    if (index >= 0) usersArray[index].room = newID;

    console.log(`Socket with id ${socket.id} has joined room ${newID}`, {
      usersArray,
    });

    // Send room data to socket
    io.to(socket.id).emit("roomData", {
      roomId: newID,
    });
  });

  // Receive new drawing input, save to drawingData, send out to all connections.
  socket.on("mouse", ({ data, roomName }) => {
    drawingData.push(data);

    socket.broadcast.to(roomName).emit("mouse", data);
  });

  // Clear out drawingData on clearCanvas message
  socket.on("clearCanvas", ({ room }) => {
    console.log("Clearing canvas");
    drawingData = [];
    socket.broadcast.to(room).emit("clearCanvas");
  });

  // Handle socket leaving a room
  socket.on("leaveRoom", ({ roomId }) => {
    socket.leave(roomId);
    // Update corressponding object in usersArray
    const index = usersArray.findIndex((user) => user.id === socket.id);
    if (index >= 0) {
      usersArray[index].room = "";
      io.to(usersArray[index].room).emit("userLeave", {
        name: usersArray[index].name,
      });
    }

    console.log(`Socket ${socket.id} has left room ${roomId}`);
  });

  // Notify of socket disconnect
  socket.on("disconnect", () => {
    // Update corressponding object in usersArray
    const index = usersArray.findIndex((user) => user.id === socket.id);
    if (index >= 0) {
      io.to(usersArray[index].room).emit("userLeave", {
        name: usersArray[index].name,
      });
      usersArray = [
        ...usersArray.slice(0, index),
        ...usersArray.slice(index + 1),
      ];

      console.log(`Socket ${socket.id} has disconnected`, { usersArray });
    }
  });

  // CHAT FUNCTIONALITY

  socket.on("setName", ({ name, color }) => {
    console.log(`Setting user name for ${name} with color: ${color}`);
    console.log({ socketid: socket.id });
    // Find user in array
    const index = usersArray.findIndex((user) => user.id === socket.id);
    const room = usersArray[index].room;
    console.log({ room });
    // update
    if (index >= 0) {
      usersArray[index].name = name;
      usersArray[index].color = color;
    } else {
      console.log("no object found in usersArray");
    }

    console.log({ usersArray });
    // Notify room of user joined chat
    io.to(room).emit("newJoin", { user: name });
  });

  socket.on("chatMessage", ({ name, room, message }) => {
    // Receive new chat message and broadcast
    console.log("New chat message received");
    io.to(room).emit("chatMessage", { name, message });
    console.log(`Chat message broadcast to room ${room}`);
  });
});

httpServer.listen(process.env.PORT || "5000", () =>
  console.log("Server running on 5000")
);

module.exports = { io };
