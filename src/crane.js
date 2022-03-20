'use strict';

const { GAIN_ADJUSTMENT_RAMP_MS } = require('./constants');

class Crane {
  constructor(name, lights, oscillator, morseStreamer, idleIntervalMs) {
    this.name = name;
    this.lights = lights;
    this.oscillator = oscillator;
    this.morseStreamer = morseStreamer;

    this.idling = false;
    this.timeOfLastIdleToggle = -1;
    this.idleIntervalMs = idleIntervalMs;

    this.registerMorseCallback();
  }

  on() {
    // This is a hack to make turning on the lights match the linear ramp time
    // for the oscillator's gain.
    setTimeout(() => {
      this.turnOnLights();
    }, GAIN_ADJUSTMENT_RAMP_MS);

    this.oscillator.setGain(0.1);
  }

  off() {
    // This is a hack to make turning off the lights match the linear ramp time
    // for the oscillator's gain.
    setTimeout(() => {
      this.turnOffLights();
    }, GAIN_ADJUSTMENT_RAMP_MS);

    this.oscillator.setGain(0.0);
  }

  turnOnLights() {
    this.lights.forEach(light => light.on());
  }

  turnOffLights() {
    this.lights.forEach(light => light.off());
  }

  toggleLights() {
    this.lights.forEach((light) => light.toggle());
  }

  startIdling() {
    this.idling = true;
    this.scheduleIdleFrame();
  }

  scheduleIdleFrame() {
    window.requestAnimationFrame(timestamp => this.idle(timestamp));
  }

  idle(timestamp) {
    if (!this.idling) {
      return;
    }

    const justStarted = this.timeOfLastIdleToggle === -1;
    const readyForNextToggle = (timestamp - this.timeOfLastIdleToggle) >= this.idleIntervalMs;

    if (justStarted || readyForNextToggle) {
      this.timeOfLastIdleToggle = timestamp;
      this.toggleLights();
    }

    this.scheduleIdleFrame();
  }

  stopIdling() {
    this.idling = false;
    this.turnOffLights();
  }

  registerMorseCallback() {
    this.morseStreamer.registerCallback((bit) => this.handleBit(bit));
  }

  handleBit(bit) {
    if (bit === '1') {
      this.on();
    } else if (bit === '0') {
      this.off();
    } else if (bit === 'END') {
      this.off();
    }
  }

  handleKeypress(event) {
    return this.morseStreamer.handleKeypress(event);
  }
}

module.exports = Crane;
