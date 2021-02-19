import React, { useEffect, useRef, useState } from "react";
import styles from "./canvas.module.css";
import p5 from "p5";
import ToolBar from "../toolBar";
import useSketch from "./sketch";
import useSocketContext from "../../context/socketContext";

export default function Canvas({ initialData }) {
  const canvasRef = useRef();
  const [socket] = useSocketContext();
  const { Sketch, setDrawColor, setDrawSize } = useSketch();

  const downloadDrawing = () => {
    console.log("Download drawing");
  };

  useEffect(() => {
    let myP5 = new p5(Sketch, canvasRef.current);

    myP5.initialDraw(initialData);

    socket.on("mouse", (data) => {
      console.log("Mouse data received from server", data);
      myP5.mouseEvent(data);
    });

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
