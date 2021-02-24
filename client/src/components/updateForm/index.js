import React, { useState, useRef } from "react";
import styles from "./updateForm.module.css";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuthContext } from "../../context/authContext";

export default function UpdateForm({ close }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, updatePassword, updateEmail } = useAuthContext();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setError("");
    setLoading(true);
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        close();
      })
      .catch(() => {
        setError("Failed to update profile");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <div className={styles.closeBtn} onClick={close}>
            X
          </div>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={confirmPasswordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button type="submit" className="w-100" disabled={loading}>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
