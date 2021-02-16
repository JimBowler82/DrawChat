import React from "react";
import styles from "./chatBox.module.css";
import { FiSend } from "react-icons/fi";
import { Button, FormControl } from "react-bootstrap";

export default function ChatBox() {
  return (
    <div className={styles.chatBoxDiv}>
      <div className={styles.userList}>
        <p>Users</p>
        <ul></ul>
      </div>
      <div className={styles.messagesDiv}>
        <div className={styles.overlay}>
          <h3>Enter a nickname to chat</h3>
          <div>
            <label htmlFor="nickname">Nickname: </label>
            <FormControl
              aria-label="Users nickname"
              style={{ textAlign: "center" }}
            />
          </div>
          <div>
            <label htmlFor="chatColor">Chat Color:</label>
            <input type="color" name="chatColor" id="" />
          </div>
          <Button varient="primary" size="sm" style={{ width: "50%" }}>
            {" "}
            Enter{" "}
          </Button>
        </div>
        <div className={styles.messages}>
          <p></p>
        </div>
        <div className={styles.inputDiv}>
          <input type="text" className={styles.msgInput} />
          <button>
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
}
