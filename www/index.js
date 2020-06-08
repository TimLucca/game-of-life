import { Universe, Cell, greet } from "rust-gol";
import { memory } from "rust-gol/rust_gol_bg";

// greet("Play the game");
const reset = document.getElementById("reset")
const preset = document.getElementById("preset")
const toggle = document.getElementById("toggle")
const select_preset = document.getElementById("preset_select")
const canvas = document.getElementById("game-of-life-canvas");
let universe = Universe.new(2);
const width = universe.width();
const height = universe.height();

const CELL_SIZE = 15; // px
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
  fps.render();
  if (run == false) {
    return;
  }
  universe.tick();
  drawGrid();
  drawCells();
  // requestAnimationFrame(renderLoop);
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
    ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
  }

  ctx.stroke();
};

const drawCells = () => {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height / 8);

  ctx.beginPath();

  // for (let row = 0; row < height; row++) {
  //   for (let col = 0; col < width; col++) {
  //     const index = getIndex(row, col);
  //     ctx.fillStyle = bitIsSet(index, cells) ? ALIVE_COLOR : DEAD_COLOR;
  //     ctx.fillRect(
  //       col * (CELL_SIZE + 1) + 1,
  //       row * (CELL_SIZE + 1) + 1,
  //       CELL_SIZE,
  //       CELL_SIZE
  //     );
  //   }
  // }

  ctx.fillStyle = ALIVE_COLOR;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const i = getIndex(row, col);
      if (!bitIsSet(i, cells)) {
        continue;
      }
      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  ctx.fillStyle = DEAD_COLOR;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const i = getIndex(row, col);
      if (bitIsSet(i, cells)) {
        continue;
      }
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
  if (run === false) {
    run = true;
    requestAnimationFrame(renderLoop);
    toggle.textContent = "Stop";
  } else {
    run = false;
    toggle.textContent = "Start";
  }
};

reset.onclick = () => {
  if(preset.preset_val.value) {
    universe = Universe.new(preset.preset_val.value)
  } else {
    universe = Universe.new(999)
  }
  if (run) {
    toggle.onclick()
  }
  drawCells()
}

select_preset.onclick = () => {
  if(preset.preset_val.value) {
    universe = Universe.new(preset.preset_val.value)
  }
  reset.onclick()
}

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

const fps = new class {
  constructor() {
    this.fps = document.getElementById("fps-count");
    this.frames = [];
    this.lastFrameTimeStamp = performance.now()
  }

  render() {
    const now = performance.now();
    const delta = now - this.lastFrameTimeStamp;
    this.lastFrameTimeStamp = now;
    const fps = 1 / delta * 1000;

    this.frames.push(fps);
    if (this.frames.length > 100) {
      this.frames.shift();
    }

    let sum = 0;
    let min = Infinity;
    let max = -Infinity;
    for (let i = 0; i < this.frames.length; i++) {
      sum += this.frames[i];
      min = Math.min(this.frames[i], min);
      max = Math.max(this.frames[i], max);
    }
    let mean = sum / this.frames.length;

    this.fps.textContent = `
    FPS: ${Math.round(fps)}
    Most recent 100 frames
    average: ${Math.round(mean)}
    min: ${Math.round(min)}
    max: ${Math.round(max)}`.trim();
  }
};