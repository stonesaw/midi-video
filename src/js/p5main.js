// reference
// https://qiita.com/mitsuya_bauhaus/items/b6f3d1aec07a9e07bb3a
// https://p5js.org/examples/simulate-game-of-life.html

// import { loadMidi } from './midiLoader';
const { Midi } = require("@tonejs/midi");



let p5;
let delegate = undefined;

let w;
let columns;
let rows;
let board;
let next;
let start_t;
let current_t_display;
let debug_log = "";
// let scale = 1.0;

let canvas = null;

// アスペクト比 は 16:9 固定

export function main(_p5) {
  p5 = _p5

  p5.setup = () => {
    updateCanvasSize(document.body.clientWidth, document.body.clientHeight)
    canvas.parent("p5Canvas");

    p5.textSize(24)

    w = 20;
    // Calculate columns and rows
    columns = Math.floor(p5.width / w);
    rows = Math.floor(p5.height / w);
    // Wacky way to make a 2D array is JS
    board = new Array(columns);
    for (let i = 0; i < columns; i++) {
      board[i] = new Array(rows);
    }
    // Going to use multiple 2D arrays and swap them
    next = new Array(columns);
    for (let i = 0; i < columns; i++) {
      next[i] = new Array(rows);
    }
    init();

    start_t = p5.millis();
  }

  p5.draw = () => {
    p5.background(255);
    generate();
    for ( let i = 0; i < columns;i++) {
      for ( let j = 0; j < rows;j++) {
        if ((board[i][j] == 1)) p5.fill(0);
        else p5.fill(255);
        p5.stroke(0);
        p5.rect(i * w, j * w, w-1, w-1);
      }
    }

    current_t_display = p5.round((p5.millis() - start_t) / 10) / 100
    // p5.fill(0, 209, 178);
    // p5.text(current_t_display, 100, 100);

    if (debug_log !== "") {
      p5.fill(0, 209, 178);
      p5.text(debug_log, 100, 100)
    }

    // callback
    if (delegate !== undefined) {
      delegate(current_t_display);
    }
  }

  // reset board when mouse is pressed
  p5.mousePressed = () => {
    init();
  }

  // Fill board randomly
  function init() {
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        // Lining the edges with 0s
        if (i == 0 || j == 0 || i == columns-1 || j == rows-1) board[i][j] = 0;
        // Filling the rest randomly
        else board[i][j] = p5.floor(p5.random(2));
        next[i][j] = 0;
      }
    }
  }

  // The process of creating the new generation
  function generate() {

    // Loop through every spot in our 2D array and check spots neighbors
    for (let x = 1; x < columns - 1; x++) {
      for (let y = 1; y < rows - 1; y++) {
        // Add up all the states in a 3x3 surrounding grid
        let neighbors = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            neighbors += board[x+i][y+j];
          }
        }

        // A little trick to subtract the current cell's state since
        // we added it in the above loop
        neighbors -= board[x][y];
        // Rules of Life
        if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;           // Loneliness
        else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;           // Overpopulation
        else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;           // Reproduction
        else                                             next[x][y] = board[x][y]; // Stasis
      }
    }

    // Swap!
    let temp = board;
    board = next;
    next = temp;
  }
}

export function setDelegate(_delegate) {
  delegate = _delegate;
}

// eslint-disable-next-line no-unused-vars
export function updateCanvasSize(bodyWidth, bodyHeight) {
  var w = p5.round(bodyWidth * 0.8);
  var h = w * 9.0 / 16.0;
  if (canvas === null) {
    canvas = p5.createCanvas(w, h);
  }
  p5.resizeCanvas(w, h);
}

export function setDebugLog(str) {
  console.log(`set debug log '${str}'`)
  debug_log = str;
}


function parseMidi(url) {
  Midi.fromUrl(url).then(midi => {
    return {
      name: midi.name,
      tracks: midi.tracks
    }
  })
}

export function loadMidi(file) {
  alert("hello")
  const data = parseMidi(file);
  debug_log = `name: ${data.name},
  tracks: ${data.tracks}
  `
}
