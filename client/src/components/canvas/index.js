import React, { useEffect, useRef } from "react";
import styles from "./canvas.module.css";
import p5 from "p5";
import ToolBar from "../toolBar";
import useSketch from "./sketch";
import useSocketContext from "../../context/socketContext";
import { useUserContext } from "../../context/userContext";

export default function Canvas({ initialData }) {
  const canvasRef = useRef();
  const [socket] = useSocketContext();
  const { Sketch, setDrawColor, setDrawSize } = useSketch();
  const { user } = useUserContext();
  let cnv;

  const downloadDrawing = () => {
    cnv.download();
  };

  const clearCanvas = (e) => {
    cnv.clearCanvas();
    if (e) {
      socket.emit("clearCanvas", { room: user.roomName });
    }
  };

  useEffect(() => {
    let myP5 = new p5(Sketch, canvasRef.current);
    cnv = myP5;
    myP5.initialDraw(initialData);

    socket.on("mouse", (data) => {
      myP5.mouseEvent(data);
    });

    socket.on("clearCanvas", () => {
      console.log("clear canvas event received");
      clearCanvas();
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
        clear={clearCanvas}
      />
    </div>
  );
}
