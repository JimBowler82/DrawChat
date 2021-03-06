import React, { useEffect, useState, useRef } from "react";
import styles from "./chatBox.module.css";
import { FiSend } from "react-icons/fi";
import useSocketContext from "../../context/socketContext";
import { useUserContext } from "../../context/userContext";
import Overlay from "../overlay";

export default function ChatBox({ userList, setUserList }) {
  const msgRef = useRef();
  const { user, setUser } = useUserContext();
  const [socket] = useSocketContext();
  const [chatInfo, setChatInfo] = useState({ name: "", color: "" });
  const [chatMessages, setChatMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    socket.on("chatMessage", handleChatMessages);

    socket.on("newJoin", handleUserList);

    socket.on("userLeave", handleUserLeave);

    return () => {
      socket.off("newJoin", handleUserList);
      socket.off("chatMessage", handleChatMessages);
      socket.off("userLeave", handleUserLeave);
    };
  }, []);

  function handleUserLeave({ name }) {
    console.log(`${name} has disconnected`);
    setUserList((list) => list.filter((user) => user !== name));
    setChatMessages((messages) => [
      ...messages,
      { name: "System", message: `${name} has left!` },
    ]);
  }

  function handleUserList({ user }) {
    console.log(`${user} joined the chat`);
    setUserList((list) => [...list, user]);
    setChatMessages((messages) => [
      ...messages,
      { name: "System", message: `${user} has joined!` },
    ]);
  }

  function handleChatMessages({ name, message }) {
    console.log("New chat message received");
    setChatMessages((messages) => [...messages, { name, message }]);
    scrollToBottom();
  }

  function startChat() {
    setUser({ type: "setName", payload: chatInfo.name });
    socket.emit("setName", { name: chatInfo.name, color: chatInfo.color });
  }

  function handleSend() {
    socket.emit("chatMessage", {
      name: user.name,
      room: user.roomName,
      message: messageText,
    });
    setMessageText("");
  }

  function scrollToBottom() {
    msgRef.current.scrollTop = msgRef.current.scrollHeight;
  }

  return (
    <div className={styles.chatBoxDiv}>
      {/* USERS IN CHAT LIST */}
      <div className={styles.userList}>
        <p>Users</p>
        <ul>
          {userList.map((user, i) => (
            <li key={i}>{user}</li>
          ))}
        </ul>
      </div>

      <div className={styles.messagesDiv}>
        {/* PRE-CHAT OVERLAY */}
        {user.name === "" && (
          <Overlay
            setChatInfo={setChatInfo}
            chatInfo={chatInfo}
            startChat={startChat}
          />
        )}

        {/* CHAT MESSAGES AREA */}
        <div className={styles.messages} ref={msgRef}>
          {chatMessages.map((msg, i) => {
            return (
              <p
                key={i}
                className={
                  msg.name === "System" ? styles.system : styles.message
                }
              >
                <span>{msg.name === user.name ? "You" : msg.name}:</span>
                {msg.message}
              </p>
            );
          })}
        </div>

        {/* CHAT MESSAGE INPUT AND SEND BUTTON */}
        <div className={styles.inputDiv}>
          <input
            type="text"
            className={styles.msgInput}
            onChange={(e) => setMessageText(e.target.value)}
            value={messageText}
          />
          <button onClick={handleSend}>
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
}
