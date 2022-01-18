'use strict';

const Crane = require('./crane');

const MORSE_INTERVAL_MS = 100;

class Scene {
  constructor(cranes, script, morseTranslator) {
    this.cranes = cranes;
    this.script = script;
    this.morseTranslator = morseTranslator;

    this.active = false;
  }

  start() {
    this.active = true;
    this.scheduleNextFrame();
  }

  scheduleNextFrame() {
    window.requestAnimationFrame(timestamp => this.handleFrame(timestamp));
  }

  stop() {
    this.active = false;
  }

  handleFrame(timestamp) {
    if (this.active) {
      this.scheduleNextFrame();
    }
  }

  translateStringToSignal(string) {
    return this.morseTranslator.translateStringToSignal(string);
  }
}

module.exports = Scene;
