import React, { useState } from "react";
import ReactDom from "react-dom";
import styles from "./loginModal.module.css";
import Register from "../register";
import Login from "../login";
import UpdateForm from "../updateForm";

export default function LoginModal({ open, close, updateForm }) {
  const [showSignup, setSignup] = useState(false);

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className={styles.overlay} />
      <div className={styles.container}>
        {showSignup && (
          <Register switchView={() => setSignup(!showSignup)} close={close} />
        )}
        {!showSignup && !updateForm && (
          <Login switchView={() => setSignup(!showSignup)} close={close} />
        )}
        {!showSignup && updateForm && <UpdateForm close={close} />}
      </div>
    </>,
    document.getElementById("portal")
  );
}
