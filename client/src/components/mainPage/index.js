import React, { useEffect, useState } from "react";
import Header from "../header";
import Invite from "../invite";
import Canvas from "../canvas";
import ChatBox from "../chatBox";
import LoginModal from "../loginModal";
import styles from "./mainPage.module.css";
import { useParams } from "react-router-dom";
import useSocketContext from "../../context/socketContext";
import { useUserContext } from "../../context/userContext";

export default function MainPage() {
  const [initialDrawingData, setInitialDrawingData] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [socket] = useSocketContext();
  const { user, setUser } = useUserContext();
  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    if (id) {
      socket.emit("joinExistingRoom", { roomId: id });
    } else {
      socket.emit("createNewRoom");
    }

    socket.on("roomData", ({ roomId, data = [], users = [] }) => {
      console.log({ users });
      // Add room name to user context.
      console.log("roomData received", roomId);
      setUser({ type: "setRoom", payload: roomId });
      setRoomId(roomId);
      setInitialDrawingData((previous) =>
        data.length === 0 ? previous : data
      );
      const arr = users.map((user) => user.name);
      setRoomUsers(arr);
    });

    return () => {
      socket.emit("leaveRoom", { roomId: user.roomName }); // Need to add room name.
      // Set listeners to off.
      socket.off("roomData");
    };
  }, []);

  return (
    <main className={styles.main}>
      <Header setOpen={() => setIsOpen(true)} />
      <Invite room={roomId} />
      <Canvas initialData={initialDrawingData} />
      <ChatBox userList={roomUsers} setUserList={setRoomUsers} />
      <LoginModal open={isOpen} close={() => setIsOpen(false)} />
    </main>
  );
}
