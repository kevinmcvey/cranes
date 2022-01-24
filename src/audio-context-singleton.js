'use strict';

class AudioContextSingleton {
  constructor() {}

  static getAudioContext() {
    if (this.audioContext === undefined) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    return this.audioContext;
  }
}

module.exports = AudioContextSingleton;
