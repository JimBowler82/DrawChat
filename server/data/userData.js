let usersArray = [];

function getUsersArray() {
  return usersArray;
}

function addToUsersArray(user) {
  usersArray = [...usersArray, user];
  console.log("user added to userArray", { usersArray: getUsersArray() });
}

function updateUserRoom(socket, room) {
  const [user, index] = findUserObject(socket);
  if (index >= 0) {
    usersArray[index].room = room;
    console.log("User object room updated", { usersArray: getUsersArray() });
  }
}

function updateUserName(socket, name, color) {
  const [user, index] = findUserObject(socket);
  if (index >= 0) {
    usersArray[index].name = name;
    usersArray[index].color = color;
    console.log("User object name updated", { usersArray: getUsersArray() });
  }
}

function findUserObject(socket) {
  const index = usersArray.findIndex((user) => user.id === socket.id);
  console.log({ index });
  if (index >= 0) {
    return [usersArray[index], index];
  } else {
    console.log("Find User object error");
    return [null, null];
  }
}

function removeUserObject(socket) {
  const [user, index] = findUserObject(socket);
  if (index >= 0) {
    usersArray = [
      ...usersArray.slice(0, index),
      ...usersArray.slice(index + 1),
    ];
    console.log(`User removed from usersArray`, {
      usersArray: getUsersArray(),
    });
  }
}

module.exports = {
  usersArray,
  getUsersArray,
  updateUserRoom,
  updateUserName,
  addToUsersArray,
  removeUserObject,
  findUserObject,
};
