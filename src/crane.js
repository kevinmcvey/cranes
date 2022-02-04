'use strict';

const { GAIN_ADJUSTMENT_RAMP_MS } = require('./constants');

class Crane {
  constructor(name, lights, oscillator, morseStreamer) {
    this.name = name;
    this.lights = lights;
    this.oscillator = oscillator;
    this.morseStreamer = morseStreamer;

    this.registerMorseCallback();
  }

  on() {
    // This is a hack to make turning on the lights match the linear ramp time
    // for the oscillator's gain.
    setTimeout(() => {
      this.lights.forEach(light => light.on());
    }, GAIN_ADJUSTMENT_RAMP_MS);

    this.oscillator.setGain(0.1);
  }

  off() {
    // This is a hack to make turning off the lights match the linear ramp time
    // for the oscillator's gain.
    setTimeout(() => {
      this.lights.forEach(light => light.off());
    }, GAIN_ADJUSTMENT_RAMP_MS);

    this.oscillator.setGain(0.0);
  }

  toggle() {
    this.lights.forEach((light) => {
      light.toggle();
    });
  }

  registerMorseCallback() {
    this.morseStreamer.registerCallback((bit) => this.handleBit(bit));
  }

  handleBit(bit) {
    if (bit === '1') {
      this.on();
    } else if (bit === '0') {
      this.off();
    }
  }
}

module.exports = Crane;
