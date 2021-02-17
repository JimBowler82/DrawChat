import React from "react";
import styles from "./toolBar.module.css";
import { Button } from "react-bootstrap";
import { FiDownload } from "react-icons/fi";

export default function ToolBar({ colorFn, sizeFn, dwnldFn, clear }) {
  return (
    <div className={styles.toolbarContainer}>
      <span>Toolbar</span>
      <div className={styles.tools}>
        <label htmlFor="">
          Colour:{" "}
          <input type="color" onChange={(e) => colorFn(e.target.value)} />
        </label>
        <label htmlFor="">
          Size:{" "}
          <input
            type="range"
            min="5"
            max="72"
            onChange={(e) => sizeFn(e.target.value)}
          />
        </label>
        <div className={styles.buttons}>
          <label htmlFor="">
            <Button
              variant="dark"
              size="sm"
              style={{ padding: "0 10px" }}
              onClick={dwnldFn}
            >
              <FiDownload />
            </Button>
          </label>
          <label htmlFor="">
            <Button variant="dark" size="sm" style={{ padding: "0 10px" }}>
              Clear
            </Button>
          </label>
        </div>
      </div>
    </div>
  );
}
