import React, { useRef, useState } from "react";
import styles from "./login.module.css";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuthContext } from "../../context/authContext";

export default function Login({ switchView, close }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuthContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      close();
    } catch (error) {
      setError(`Failed to log in: ${error.message}`);
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <div className={styles.closeBtn} onClick={close}>
            X
          </div>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button type="submit" className="w-100" disabled={loading}>
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account?{" "}
        <span className={styles.link} onClick={switchView}>
          Register
        </span>
      </div>
    </>
  );
}
