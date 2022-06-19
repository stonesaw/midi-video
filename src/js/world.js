let p5;

export class World {
  constructor(_p5, bpm = 120, bar = {numer: 4, denom: 4}, midi_data_list = []) {
    p5 = _p5;

    // data
    this._bpm = bpm;
    this._bar = {numer: bar[0], denom: bar[1]};
    this._midi_data_list = midi_data_list;
    // game objects
    this._objects = [];

    this._start_t = p5.millis();
    this._current_t = this._start_t - p5.millis();
    this._bar_count = 0;
  }

  get bpm() {
    return this._bpm;
  }
  
  get current_t() {
    return this._current_t;
  }

  set bpm(bpm) {
    this._bpm = bpm;
  }

  get bar_count() {
    return this._bar_count;
  }

  // functions

  init() {
    this._start_t = p5.millis();
  }

  update() {
    this._current_t = p5.millis() - this._start_t;
    this._bar_count = p5.floor(this.current_t / 1000 / (60.0 / this.bpm));
  }

  draw() {
    this._objects.forEach(obj => {
      obj.draw();
    })
  }
}
