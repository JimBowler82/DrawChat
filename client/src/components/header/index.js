import React from "react";
import styles from "./header.module.css";
import { Button } from "react-bootstrap";
import { VscSave } from "react-icons/vsc";
import { BiLogIn } from "react-icons/bi";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h1>DrawChat</h1>
        <div className={styles.buttonsDiv}>
          <Button variant="warning">
            Save
            <VscSave style={{ marginLeft: "5px" }} />
          </Button>
          <Button variant="success">
            Login <BiLogIn />
          </Button>
        </div>
      </div>
    </header>
  );
}
