'use strict';

const Light = require('./light');

class Crane {
  constructor(canvasId, lightParameters) {
    this.canvasId = canvasId;
    this.lights = this.constructLights(lightParameters);
  }

  constructLights(parameters) {
    return parameters.map((blob) => {
      return new Light(this.canvasId, blob.cx, blob.cy, blob.r, blob.state);
    });
  }

  on() {
    this.lights.forEach((light) => {
      light.on();
    });
  }

  off() {
    this.lights.forEach((light) => {
      light.off();
    });
  }

  toggle() {
    this.lights.forEach((light) => {
      light.toggle();
    });
  }
}

module.exports = Crane;
