import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";
import { Button } from "react-bootstrap";
import { VscSave } from "react-icons/vsc";
import { BiLogIn } from "react-icons/bi";
import { IoPerson } from "react-icons/io5";
import { useAuthContext } from "../../context/authContext";

export default function Header({ setOpen }) {
  const { currentUser } = useAuthContext();

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h1>DrawChat</h1>
        <div className={styles.buttonsDiv}>
          <Button variant="warning" disabled={!currentUser}>
            Save
            <VscSave style={{ marginLeft: "5px" }} />
          </Button>
          {!currentUser && (
            <Button variant="success" onClick={setOpen}>
              Login <BiLogIn />
            </Button>
          )}
          {currentUser && (
            <Link to="/profile" className={styles.navBtn}>
              <Button variant="success">
                Profile <IoPerson />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
