let p5;

export class Timer {
  constructor(_p5) {
    p5 = _p5;

    this._start_t = p5.millis();
    this._play_t = 0.0;
    this._time = 0.0;
  }

  get time() {
    return p5.millis() - this._start_t;
  }

  start(millis = null) {
    if (millis === null) {
        this._start_t = p5.millis() - this._start_t;
    } else {
        this._start_t = p5.millis() + millis;
    }
  }

  stop() {

  }
}
