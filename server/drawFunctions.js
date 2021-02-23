module.exports = function (io, socket) {
  const { addDrawingData, clearDrawingData } = require("./data/drawingData");

  // FUNCTIONS - DRAWING

  /* 
    Handles mouse drawing events - stores input & emits out to the room
  */
  function handleMouse({ data, roomName }) {
    addDrawingData(data);
    socket.broadcast.to(roomName).emit("mouse", data);
  }

  /* 
    Handles clear canvas event - clears drawing data & emits out to the room
  */
  function handleClearCanvas({ room }) {
    console.log("Clearing canvas");
    clearDrawingData();
    socket.broadcast.to(room).emit("clearCanvas");
  }

  // SOCKET LISTENERS - DRAWING EVENTS

  /* 
    Receive new drawing input, save to drawingData, send out to all connections.
  */
  socket.on("mouse", handleMouse);

  /*
    Clear out drawingData on clearCanvas message & emit to room.
  */
  socket.on("clearCanvas", handleClearCanvas);
};
