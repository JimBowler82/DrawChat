import React, { useState } from "react";
import styles from "./profilePage.module.css";
import { Redirect, useHistory } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { useUserContext } from "../../context/userContext";
import { Alert, Button, Card } from "react-bootstrap";
import LoginModal from "../loginModal";

export default function ProfilePage() {
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAuthContext();
  const { user } = useUserContext();
  const history = useHistory();

  if (!currentUser) return <Redirect to={`/${user.roomName}`} />;

  function close() {
    setOpen(false);
  }

  function back() {
    return history.push(`/${user.roomName}`);
  }

  async function handleLogout() {
    setError("");

    try {
      await logout();
    } catch (error) {
      setError(`Failed to log out: ${error.message}`);
    }
  }

  return (
    <main className={styles.main}>
      <Card className={styles.containerCard}>
        <Card.Body>
          <h2 className="text-center mb-4">Profile Page</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: {currentUser.email}</strong>
          <div className={styles.btnGroup}>
            <Button variant="primary" onClick={() => setOpen(true)}>
              Update Profile
            </Button>
            <Button variant="secondary" onClick={back}>
              Back
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </Card.Body>
      </Card>
      <LoginModal open={open} updateForm={true} close={close} />
    </main>
  );
}
