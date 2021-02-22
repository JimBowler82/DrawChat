import React, { useRef } from "react";
import styles from "./invite.module.css";
import { MdContentCopy } from "react-icons/md";
import { Button, InputGroup, FormControl } from "react-bootstrap";

export default function Invite({ room }) {
  const base_url = process.env.REACT_APP_SERVER_URL;
  const url = base_url + room;

  const inputRef = useRef(null);

  function copyLink() {
    inputRef.current.disabled = false;
    inputRef.current.select();
    document.execCommand("copy");
    inputRef.current.disabled = true;
    console.log("url copied");
  }

  return (
    <div className={styles.inviteDiv}>
      <span>Invite Link:</span>
      <InputGroup className="mb-3" style={{ marginTop: "1rem" }}>
        <FormControl
          ref={inputRef}
          value={url}
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          disabled
          style={{ textAlign: "center" }}
        />
        <InputGroup.Append>
          <Button variant="secondary" onClick={copyLink}>
            <MdContentCopy />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
