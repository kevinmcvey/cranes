'use strict';

const { CRANE_STATES, GAIN_ADJUSTMENT_RAMP_MS } = require('./constants');

class Crane {
  constructor(name, controller, lights, oscillator, morseStreamer, idleIntervalMs, boundingBox) {
    this.name = name;
    this.controller = controller;

    this.lights = lights;
    this.oscillator = oscillator;
    this.morseStreamer = morseStreamer;

    this.lastState = CRANE_STATES.muted;
    this.state = CRANE_STATES.muted;

    this.timeOfLastIdleToggle = -1;
    this.idleIntervalMs = idleIntervalMs;

    this.boundingBox = boundingBox;

    this.registerMorseCallback();
    this.startIdleLoop();
  }

  setState(state) {
    if (this.state === state) {
      return;
    }

    this.state = state;

    this.controller.handleStateChange(this.name, this.state);
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

  startIdleLoop() {
    this.setState(CRANE_STATES.idling);
    this.scheduleIdleFrame();
  }

  scheduleIdleFrame() {
    window.requestAnimationFrame(timestamp => this.idle(timestamp));
  }

  idle(timestamp) {
    if (this.state !== CRANE_STATES.idling) {
      return this.scheduleIdleFrame();
    }

    const justStarted = this.timeOfLastIdleToggle === -1;
    const readyForNextToggle = (timestamp - this.timeOfLastIdleToggle) >= this.idleIntervalMs;

    if (justStarted || readyForNextToggle) {
      this.timeOfLastIdleToggle = timestamp;
      this.toggleLights();
    }

    this.scheduleIdleFrame();
  }

  mute() {
    this.setState(CRANE_STATES.muted);
    this.turnOffLights();
  }

  unmute() {
    this.setState(CRANE_STATES.idling);
  }

  registerMorseCallback() {
    this.morseStreamer.registerCallback((bit) => this.handleBit(bit));
  }

  handleBit(bit) {
    if (this.state !== CRANE_STATES.active) {
      this.setState(CRANE_STATES.active);
    }

    if (bit === '1') {
      this.on();
    } else if (bit === '0') {
      this.off();
    } else if (bit === 'END') {
      this.off();

      this.setState(CRANE_STATES.idling);
    }
  }

  handleKeypress(event) {
    return this.morseStreamer.handleKeypress(event);
  }
}

module.exports = Crane;
