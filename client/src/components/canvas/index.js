import React, { useEffect, useRef, useState } from "react";
import styles from "./canvas.module.css";
import p5 from "p5";
import ToolBar from "../toolBar";
import { setDrawColor, setDrawSize, Sketch } from "./sketch";

export default function Canvas() {
  const canvasRef = useRef();

  const downloadDrawing = () => {
    console.log("Download drawing");
  };

  useEffect(() => {
    let myP5 = new p5(Sketch, canvasRef.current);

    return () => {
      myP5.remove();
    };
  });

  return (
    <div ref={canvasRef} className={styles.canvas}>
      <ToolBar
        colorFn={setDrawColor}
        sizeFn={setDrawSize}
        dwnldFn={downloadDrawing}
      />
    </div>
  );
}
