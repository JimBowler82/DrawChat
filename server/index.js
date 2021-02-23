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
const { addToUsersArray } = require("./data/userData");

app.use(cors());

app.get("/", (req, res) => res.send("Welcome to the DrawChat server"));

io.on("connection", (socket) => {
  /* 
    On connection, create a user object with defaults and at it to the user array.
  */
  const newUser = {
    id: socket.id,
    room: "",
    name: "",
    color: "",
  };
  addToUsersArray(newUser);
  console.log(`${socket.id} connected`);

  // Load additional socket functionality by purpose
  require("./socketMain")(io, socket);
  require("./drawFunctions")(io, socket);
  require("./chatFunctions")(io, socket);
});

httpServer.listen(process.env.PORT || "5000", () =>
  console.log("Server running on 5000")
);

module.exports = { io };
