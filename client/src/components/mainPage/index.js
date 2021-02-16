import React from "react";
import Header from "../header";
import Invite from "../invite";
import Canvas from "../canvas";
import ChatBox from "../chatBox";
import styles from "./mainPage.module.css";

export default function MainPage() {
  return (
    <main className={styles.main}>
      <Header />
      <Invite />
      <Canvas />
      <ChatBox />
    </main>
  );
}
