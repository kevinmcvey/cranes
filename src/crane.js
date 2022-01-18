'use strict';

const Light = require('./light');

class Crane {
  constructor(name, lights) {
    this.name = name;
    this.lights = lights;
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
