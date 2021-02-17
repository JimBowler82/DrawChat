import useSocketContext from "../../context/socketContext";

export default function useSketch() {
  const [socket] = useSocketContext();

  let drawColor = "#ffffff";

  let drawSize = "32";

  const setDrawColor = (value) => {
    drawColor = value;
  };

  const setDrawSize = (value) => {
    drawSize = value;
  };

  const canvasWidth = 800;
  const canvasHeight = 450;

  const Sketch = (p) => {
    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.background(51);
    };

    p.draw = () => {};

    p.mouseDragged = () => {
      if (
        p.mouseX >= 0 &&
        p.mouseX <= canvasWidth &&
        p.mouseY >= 0 &&
        p.mouseY <= canvasHeight
      ) {
        const data = {
          x: p.mouseX,
          y: p.mouseY,
          color: drawColor,
          size: drawSize,
        };

        console.log("mouse dragged");
        socket.emit("mouse", data);

        p.noStroke();
        p.fill(drawColor);
        p.ellipse(p.mouseX, p.mouseY, drawSize, drawSize);
      }
    };

    p.initialDraw = (data) => {
      console.log("initial draw");
      data.forEach((dataObj) => {
        p.noStroke();
        p.fill(dataObj.color);
        p.ellipse(dataObj.x, dataObj.y, dataObj.size, dataObj.size);
      });
    };

    p.mouseEvent = (data) => {
      console.log("mouse event draw");
      p.noStroke();
      p.fill(data.color);
      p.ellipse(data.x, data.y, data.size, data.size);
    };
  };

  return { drawColor, drawSize, setDrawColor, setDrawSize, Sketch };
}
