'use strict';

class MorseStreamer {
  constructor(buffer, intervalMs) {
    this.buffer = buffer;
    this.intervalMs = intervalMs;

    this.active = false;
    this.timeOfLastBit = -1;

    this.callbacks = [];

    // TODO: Mobile solution?
    // this.bindKeyup();
  }

  bindKeyup() {
    window.addEventListener('keyup', event => this.handleKeypress(event));
  }

  handleKeypress(event) {
    if (!this.buffer.isKnownCharacter(event.key)) {
      return;
    }

    this.buffer.addToBuffer(event.key);

    if (!this.active) {
      this.start();
    }
  }

  registerCallback(callback) {
    this.callbacks.push(callback);
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
    this.handleBit('0');
  }

  resetTimer() {
    this.timeOfLastBit = -1;
  }

  handleFrame(timestamp) {
    if (!this.active) {
      return this.resetTimer();
    }

    const justStarted = this.timeOfLastBit === -1;
    const readyForNextBit = (timestamp - this.timeOfLastBit) >= this.intervalMs;

    // Not enough time has elapsed. Check back in later.
    if (!(justStarted || readyForNextBit)) {
      return this.scheduleNextFrame();
    }

    const bit = this.buffer.next();

    // The buffer is empty. Stop.
    if (bit === undefined) {
      this.stop();
      return this.resetTimer();
    }

    this.handleBit(bit);

    this.timeOfLastBit = timestamp;
    this.scheduleNextFrame();
  }

  handleBit(bit) {
    this.callbacks.forEach(callback => callback(bit));
  }
}

module.exports = MorseStreamer;
