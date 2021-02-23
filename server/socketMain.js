module.exports = function (io, socket) {
  const { v4: uuidv4 } = require("uuid");
  const {
    usersArray,
    getUsersArray,
    updateUserRoom,
    addToUsersArray,
    removeUserObject,
    findUserObject,
  } = require("./data/userData");

  const {
    getDrawingData,
    addDrawingData,
    clearDrawingData,
  } = require("./data/drawingData");

  // FUNCTIONS - ROOM JOIN / LEAVE / DISCONNECT

  /* 
    Join socket to an existing room, update user object & send room data which already exists.
    Sends the roomId, existing drawing data, and the users in the room.
  */
  function joinExisitingRoom({ roomId }) {
    //Join room
    socket.join(roomId);

    // Update corressponding object in usersArray
    updateUserRoom(socket, roomId);

    // Send room data to socket
    const drawingDataByRoom = getDrawingData().filter(
      (dataObj) => dataObj.room === roomId
    );
    const userArray = getUsersArray();
    io.to(roomId).emit("roomData", {
      roomId: roomId,
      data: drawingDataByRoom,
      users: userArray.filter(
        (user) => user.room === roomId && user.name !== ""
      ),
    });
  }

  /* 
    Create a new room with a unique string, join user to room, update user object.
    Sends the new room id back to the client.
  */
  function createNewRoom() {
    // Generate room id.
    const newID = uuidv4().substring(0, 8);

    // Join room
    socket.join(newID);

    // Update corressponding object in usersArray
    updateUserRoom(socket, newID);

    // Send room data to socket
    io.to(socket.id).emit("roomData", {
      roomId: newID,
    });
  }

  /*
    Handles user leaving a room.  Removes socket from room,
    updates user object & emits to room
  */
  function handleUserLeaveRoom({ roomId }) {
    socket.leave(roomId);
    // Update corressponding object in usersArray
    updateUserRoom(socket, "");
    const [user, index] = findUserObject(socket);
    io.to(roomId).emit("userLeave", {
      name: user.name,
    });
  }

  /*
    Handles the disconnection event.  
  */
  function handleDisconnect() {
    console.log("disconect received", { socket });
    // Find corressponding object in usersArray
    const [user, index] = findUserObject(socket);

    // Emit to room
    io.to(user.room).emit("userLeave", {
      name: user.name,
    });

    // Remove user object
    removeUserObject(socket);
  }

  // SOCKET LISTENERS - ROOM EVENTS

  /* 
    Receive existing room name to join 
  */
  socket.on("joinExistingRoom", joinExisitingRoom);

  /* 
    Receive create new room
    */
  socket.on("createNewRoom", createNewRoom);

  /*
    Event when a user leaves a room. Updates user object & emits to room.
  */
  socket.on("leaveRoom", handleUserLeaveRoom);

  /*
    Disconnect event when a user closes the application
  */
  socket.on("disconnect", handleDisconnect);
};
