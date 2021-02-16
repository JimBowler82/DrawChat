import React from "react";
import styles from "./invite.module.css";
import { MdContentCopy } from "react-icons/md";
import { Button, InputGroup, FormControl } from "react-bootstrap";

export default function Invite({ url }) {
  return (
    <div className={styles.inviteDiv}>
      <span>Invite Link:</span>
      <InputGroup className="mb-3" style={{ marginTop: "1rem" }}>
        <FormControl
          value="http://yoursharablelink/random"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          disabled
          style={{ textAlign: "center" }}
        />
        <InputGroup.Append>
          <Button variant="secondary">
            <MdContentCopy />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
