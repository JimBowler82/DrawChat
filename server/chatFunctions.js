module.exports = function (io, socket) {
  const { findUserObject, updateUserName } = require("./data/userData");

  // FUNCTIONS - CHAT

  /*
    Handles set name events by setting name & color of the user object
  */
  function handleSetName({ name, color }) {
    console.log(`Setting user name for ${name} with color: ${color}`);
    // Find user in array
    const [user, index] = findUserObject(socket);

    // update
    if (user) {
      updateUserName(socket, name, color);
    } else {
      console.log("no object found in usersArray");
    }

    // Notify room of user joined chat
    io.to(user.room).emit("newJoin", { user: name });
  }

  /*
    Handle chat messages - broadcast them to the room
  */
  function handleChatMessage({ name, room, message }) {
    // Receive new chat message and broadcast
    console.log("New chat message received");
    io.to(room).emit("chatMessage", { name, message });
    console.log(`Chat message broadcast to room ${room}`);
  }

  // SOCKET LISTENERS - CHAT EVENTS

  /*
    Receive set name events
  */
  socket.on("setName", handleSetName);

  /*
    Receive chat messages and broadcast to room
  */
  socket.on("chatMessage", handleChatMessage);
};
