// reference
// https://qiita.com/mitsuya_bauhaus/items/b6f3d1aec07a9e07bb3a
// https://p5js.org/examples/simulate-game-of-life.html

// import { loadMidi } from './midiLoader';
const { Midi } = require("@tonejs/midi");


// global variables

let p5;
let canvas = null;
let delegate = undefined;

let start_t;
let current_t_display;
let debug_log = "";
// let scale = 1.0;


// アスペクト比 は 16:9 固定


export function main(_p5) {
  p5 = _p5

  // setup p5
  p5.setup = () => {
    updateCanvasSize(document.body.clientWidth, document.body.clientHeight)
    canvas.parent("p5Canvas");

    p5.textSize(24)

    init();

    start_t = p5.millis();
  }

  // draw ( repeated )
  p5.draw = () => {
    p5.background(255);

    p5.strokeWeight(20);
    p5.noFill();
    let gradientStroke = p5.drawingContext.createLinearGradient(
      p5.width * 0.1,
      p5.height * 0.1,
      p5.width * 0.9,
      p5.height * 0.9
    );
  
    gradientStroke.addColorStop(0, p5.color(255, 0, 255));
    gradientStroke.addColorStop(0.5, p5.color(255, 255, 0));

    p5.drawingContext.strokeStyle = gradientStroke;

    p5.rect(0, 0, p5.width, p5.height, 20);

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
  console.log(`set debug log '${str}'`);
  debug_log = str;
}

export function loadMidiData(file) {
  const data = parseFile(file);
  console.log("data >>");
  console.log(data);
  debug_log = `file: ${file.name}`;
}

// eslint-disable-next-line no-unused-vars
let currentMidi = null;

function parseFile(file) {
  let json;
  console.log("file >>");
  console.log(file);
  //read the file
  const reader = new FileReader();
  reader.onload = function (e) {
    const midi = new Midi(e.target.result);
    console.log("midi >>")
    console.log(midi);
    currentMidi = midi;
    json = JSON.stringify(midi, undefined, 2);
    console.log("json >>")
    console.log(json);
  };
  reader.readAsArrayBuffer(file);
  return json; 
}

// function parseMidi(url) {
//   Midi.fromUrl(url).then(midi => {
//     return {
//       name: midi.name,
//       tracks: midi.tracks
//     }
//   })
// }
