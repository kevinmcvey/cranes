'use strict';

// To reduce "pop" sounds when gain adjusts, take this time to linearly adjust
const GAIN_ADJUSTMENT_RAMP_MS = 16;

class Oscillator {
  constructor(AudioContextSingleton, frequency) {
    this.AudioContextSingleton = AudioContextSingleton;
    this.frequency = frequency;

    this.constructed = false;
  }

  start() {
    if (!this.constructed) {
      this.constructAudioPipeline();
    }
  }

  constructAudioPipeline() {
    this.audioContext = this.AudioContextSingleton.getAudioContext();

    this.oscillatorNode = this.audioContext.createOscillator();
    this.oscillatorNode.type = 'sine';
    this.oscillatorNode.frequency.setValueAtTime(this.frequency, this.audioContext.currentTime);

    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = 0.0;

    this.oscillatorNode.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
    this.oscillatorNode.start();

    this.constructed = true;
  }

  setGain(gain, rampMs=GAIN_ADJUSTMENT_RAMP_MS) {
    const adjustTime = this.audioContext.currentTime + (rampMs / 1000.0);
    this.gainNode.gain.linearRampToValueAtTime(gain, adjustTime);
  }
}

module.exports = Oscillator;
