import React from "react";
import styles from "./overlay.module.css";
import { Button, FormControl } from "react-bootstrap";

export default function Overlay({ setChatInfo, chatInfo, startChat }) {
  return (
    <div className={styles.overlay}>
      <h3>Enter a nickname to chat</h3>
      <div>
        <label htmlFor="nickname">Nickname: </label>
        <FormControl
          aria-label="Users nickname"
          style={{ textAlign: "center" }}
          onChange={(e) => setChatInfo({ ...chatInfo, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="chatColor">Chat Color:</label>
        <input
          type="color"
          name="chatColor"
          value="#000000"
          onChange={(e) => setChatInfo({ ...chatInfo, color: e.target.value })}
        />
      </div>
      <Button
        varient="primary"
        size="sm"
        style={{ width: "50%" }}
        onClick={startChat}
      >
        Enter
      </Button>
    </div>
  );
}
