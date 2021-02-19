import React, { useEffect, useState } from "react";
import Header from "../header";
import Invite from "../invite";
import Canvas from "../canvas";
import ChatBox from "../chatBox";
import styles from "./mainPage.module.css";
import { useParams } from "react-router-dom";
import useSocketContext from "../../context/socketContext";

export default function MainPage() {
  const [roomId, setRoomId] = useState("");
  const [socket] = useSocketContext();
  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    if (id) {
      socket.emit("joinExisitingRoom", { roomId: id });
    } else {
      socket.emit("createNewRoom");
    }

    socket.on("roomData", ({ roomId }) => {
      // Add room name to user context.
      console.log({ roomId });
      setRoomId(roomId);
    });

    return () => {
      socket.emit("leaveRoom"); // Need to add room name.
      // Set listeners to off.
      socket.off("roomData");
    };
  }, []);

  return (
    <main className={styles.main}>
      <Header />
      <Invite room={roomId} />
      <Canvas />
      <ChatBox />
    </main>
  );
}
