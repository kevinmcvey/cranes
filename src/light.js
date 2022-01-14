'use strict';

// TODO: Fade in and out
class Light {
  constructor(canvasId, cx, cy, radius, state = 'off') {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");

    this.cx = cx;
    this.cy = cy;
    this.radius = radius;

    this.gradient = this.constructGradient();

    this.setState(state);
  }

  constructGradient() {
    const r1 = this.radius / 5;
    const r2 = this.radius;

    const gradient = this.context.createRadialGradient(this.cx, this.cy, r1, this.cx, this.cy, r2);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1.0)");
    gradient.addColorStop(0.1, "rgba(255, 0, 0, 1.0)");
    gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.2)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.0)");

    return gradient;
  }

  on() {
    if (this.state === 'on') {
      return;
    }

    this.context.fillStyle = this.gradient;
    this.context.beginPath();
    this.context.arc(this.cx, this.cy, this.radius, 0, 2 * Math.PI);
    this.context.fill();

    this.state = 'on';
  }

  off() {
    if (this.state === 'off') {
      return;
    }

    this.context.clearRect(/*x*/ this.cx - this.radius, /*y*/ this.cy - this.radius,
                           /*width*/ this.radius * 2, /*height*/ this.radius * 2);

    this.state = 'off';
  }

  toggle() {
    if (this.state === 'off') {
      return this.on();
    } else if (this.state === 'on') {
      return this.off();
    }

    throw `Light is in invalid state "${this.state}"`;
  }

  setState(state) {
    if (state === 'on') {
      return this.on();
    }

    if (state === 'off') {
      return this.off();
    }

    throw `Provided state "${state}" is invalid`;
  }
}

module.exports = Light;
