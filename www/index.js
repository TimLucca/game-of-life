import { Universe, Cell, greet } from "rust-gol";
import { memory } from "rust-gol/rust_gol_bg";

// greet("Play the game");
const toggle = document.getElementById("toggle")
const canvas = document.getElementById("game-of-life-canvas");
const universe = Universe.new();
const width = universe.width();
const height = universe.height();

const CELL_SIZE = 35; // px
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctx = canvas.getContext('2d');

var run = false;

const slider = document.getElementById("speed");
const output = document.getElementById("fps");
output.innerHTML = slider.value;

slider.oninput = () => {
  output.innerHTML = slider.value;
}

const getIndex = (row, column) => {
  return row * width + column;
};

const renderLoop = () => {
  if (run == false) {
    return;
  }
  universe.tick();
  drawGrid();
  drawCells();
  sleep(1000 / slider.value).then(() => {
    requestAnimationFrame(renderLoop);
  });
};

const bitIsSet = (n, arr) => {
  const byte = Math.floor(n / 8);
  const mask = 1 << (n % 8);
  return (arr[byte] & mask) === mask;
};

const drawGrid = () => {
  ctx.beginPath();
  ctx.strokeStyle = GRID_COLOR;

  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
  }

  for (let j = 0; j <= height; j++) {
    ctx.moveTo(0, j* (CELL_SIZE + 1) + 1);
    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
  }

  ctx.stroke();
};

const drawCells = () => {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height / 8);

  ctx.beginPath();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const index = getIndex(row, col);

      ctx.fillStyle = bitIsSet(index, cells) ? ALIVE_COLOR : DEAD_COLOR;

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }
  ctx.stroke();
};

drawGrid();

toggle.onclick = () => {
  if(run===false) {
    run = true;
    requestAnimationFrame(renderLoop);
    toggle.textContent = "Stop";
  } else {
    run = false;
    toggle.textContent = "Start";
  }
};

canvas.addEventListener("click", e => {
  const boundingRect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / boundingRect.width;
  const scaleY = canvas.height / boundingRect.height;
  const canvasLeft = (e.clientX - boundingRect.left) * scaleX;
  const canvasTop = (e.clientY - boundingRect.top) * scaleY;
  const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
  const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

  universe.toggle_cell(row, col);

  drawGrid();
  drawCells();
})

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
};