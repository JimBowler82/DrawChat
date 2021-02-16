import React, { useEffect, useRef } from "react";
import styles from "./canvas.module.css";
import p5 from "p5";

export default function Canvas() {
  const canvasRef = useRef();

  const Sketch = (p) => {
    p.setup = () => {
      p.createCanvas(800, 450);
      p.background(51);
    };

    p.draw = () => {
      p.fill(255);
    };

    p.mouseDragged = () => {
      console.log("mouse dragged");
      p.noStroke();
      p.fill(255);
      p.ellipse(p.mouseX, p.mouseY, 25, 25);
    };
  };

  useEffect(() => {
    let myP5 = new p5(Sketch, canvasRef.current);

    return () => {
      myP5.remove();
    };
  });

  return <div ref={canvasRef} className={styles.canvas}></div>;
}
