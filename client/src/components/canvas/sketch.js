export let drawColor = "#ffffff";

export let drawSize = "32";

export const setDrawColor = (value) => {
  drawColor = value;
};

export const setDrawSize = (value) => {
  drawSize = value;
};

const canvasWidth = 800;
const canvasHeight = 450;

export const Sketch = (p) => {
  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.background(51);
  };

  p.draw = () => {};

  p.mouseDragged = () => {
    const data = {
      x: p.mouseX,
      y: p.mouseY,
      color: drawColor,
      size: drawSize,
    };

    console.log("mouse dragged", data);

    p.noStroke();
    p.fill(drawColor);
    p.ellipse(p.mouseX, p.mouseY, drawSize, drawSize);
  };
};
