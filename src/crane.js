'use strict';

const Light = require('./light');

class Crane {
  constructor(name, lights, oscillator) {
    this.name = name;
    this.lights = lights;
    this.oscillator = oscillator;
  }

  on() {
    this.lights.forEach((light) => {
      light.on();
    });

    this.oscillator.setGain(0.1);
  }

  off() {
    this.lights.forEach((light) => {
      light.off();
    });

    this.oscillator.setGain(0.0);
  }

  toggle() {
    this.lights.forEach((light) => {
      light.toggle();
    });
  }
}

module.exports = Crane;
