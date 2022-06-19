// reference
// https://qiita.com/mitsuya_bauhaus/items/b6f3d1aec07a9e07bb3a


import { Midi } from '@tonejs/midi';
import { World } from './world';

// global variables

let p5;
let canvas = null;
let delegate = undefined;
// eslint-disable-next-line no-unused-vars
let world;

let debug_log = "";
// let scale = 1.0;

// let ox = 100;
// let oy = 100;

// アスペクト比 は 16:9 固定


export function main(_p5) {
  p5 = _p5

  // setup p5
  p5.setup = () => {
    updateCanvasSize(document.body.clientWidth, document.body.clientHeight)
    canvas.parent("p5Canvas");

    p5.textSize(24)

    world = new World(p5);
  }

  // draw ( repeated )
  p5.draw = () => {
    world.update();
    p5.background(255);

    p5.strokeWeight(40);
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

    p5.rect(0, 0, p5.width, p5.height);

    p5.fill(0, 209, 178);
    p5.text(world.bar_count, 100, 100)

    if (debug_log !== "") {
      p5.fill(0, 209, 178);
      p5.text(debug_log, 100, 100)
    }

    // callback
    if (delegate !== undefined) {
      delegate(p5.round(world.current_t / 10) / 100);
    }
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

// let currentMidi = null;

export function loadMidiData(file) {
  console.log("file >>");
  console.log(file);
  //read the file
  const reader = new FileReader();
  reader.onload = function (e) {
    const midi = new Midi(e.target.result);
    console.log("midi >>");
    console.log(midi);
    // currentMidi = midi;
    const json = JSON.stringify(midi, undefined, 2);
    generateNoteGroup(file.name, json);
  };
  reader.readAsArrayBuffer(file);
  debug_log = `file: ${file.name}`;
}


// eslint-disable-next-line no-unused-vars
export function generateNoteGroup(name, json_data) {
  
}
