let drawingData = [];

function getDrawingData() {
  return drawingData;
}

function addDrawingData(data) {
  drawingData = [...drawingData, data];
  console.log("drawing data added");
}

function clearDrawingData() {
  drawingData = [];
  console.log("drawing data cleared");
}

module.exports = {
  getDrawingData,
  addDrawingData,
  clearDrawingData,
};
