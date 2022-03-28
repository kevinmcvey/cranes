'use strict';

const { CRANE_STATES } = require('./constants');

class Controller {
  constructor(canvas) {
    this.canvas = canvas;

    this.cranes = [];
    this.craneNames = {};
    this.selectedIndex = -1;
    this.hoveringIndex = -1;

    this.bindKeyboard();
    this.bindMouse();
  }

  registerCrane(crane) {
    this.craneNames[crane.name] = this.cranes.length;
    this.cranes.push(crane);
  }

  registerCranes(cranes) {
    cranes.forEach(crane => this.registerCrane(crane));
  }

  unmuteAllCranes() {
    this.cranes.forEach(crane => crane.unmute());
  }

  muteAllCranes() {
    this.cranes.forEach(crane => crane.mute());
  }

  muteAllCranesExcept(index) {
    for (let i = 0; i < this.cranes.length; i++) {
      if (i !== index) {
        this.cranes[i].mute();
      }
    }
  }

  isEmpty() {
    return this.cranes.length === 0;
  }

  isCraneSelected() {
    return this.selectedIndex !== -1;
  }

  selectedCrane() {
    if (this.selectedIndex === -1) {
      return undefined;
    }

    return this.cranes[this.selectedIndex];
  }

  // TODO: Remove this feature
  selectPreviousCrane() {
    if (this.isEmpty()) {
      this.selectedIndex = -1;
    } else if (!this.isCraneSelected()) {
      this.selectedIndex = 0;
    } else if (this.selectedIndex === 0) {
      this.selectedIndex = this.cranes.length - 1;
    } else {
      this.selectedIndex -= 1;
    }
  }

  selectNextCrane() {
    if (this.isEmpty()) {
      this.selectedIndex = -1;
    } else if (!this.isCraneSelected()) {
      this.selectedIndex = this.cranes.length - 1;
    } else if (this.selectedIndex === this.cranes.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex += 1;
    }
  }

  intersectEventWithCranes(event) {
    const point = this.convertClientPointToCanvasPoint({ x: event.clientX, y: event.clientY });

    for (let index = 0; index < this.cranes.length; index++) {
      const crane = this.cranes[index];

      if (crane.boundingBox.contains(point)) {
        return index;
      }
    }

    return -1;
  }

  convertClientPointToCanvasPoint(point) {
    const rect = this.canvas.getBoundingClientRect();

    return {
      x: ((point.x - rect.x) / rect.width) * this.canvas.width,
      y: ((point.y - rect.y) / rect.height) * this.canvas.height
    };
  }

  stopHovering() {
    this.hoveringIndex = -1;
    this.unmuteAllCranes();
  }

  startHovering(index) {
    this.hoveringIndex = index;
    this.muteAllCranes();
    this.cranes[index].unmute();
  }

  isCurrentlyHovering() {
    return this.hoveringIndex !== -1;
  }

  bindKeyboard() {
    window.addEventListener('keyup', event => this.handleKeypress(event));
  }

  bindMouse() {
    window.addEventListener('mousemove', event => this.handleMousemove(event));
    window.addEventListener('mouseup', event => this.handleClick(event));
  }

  handleKeypress(event) {
    if (event.key === 'ArrowLeft') {
      return this.selectPreviousCrane();
    }

    if (event.key === 'ArrowRight') {
      return this.selectNextCrane();
    }

    if (this.isCraneSelected()) {
      this.selectedCrane().handleKeypress(event);
    }
  }

  handleMousemove(event) {
    const craneIndex = this.intersectEventWithCranes(event);

    if (this.isCurrentlyHovering() && craneIndex === -1) {
      this.stopHovering();
    }

    if (!this.isCurrentlyHovering() && craneIndex !== -1) {
      this.startHovering(craneIndex);
    }
  }

  handleClick(event) {
    const craneIndex = this.intersectEventWithCranes(event);

    if (craneIndex !== -1) {
      this.selectedIndex = craneIndex;
    }
  }

  handleStateChange(name, state) {
    console.log(name, state);
    if (state === CRANE_STATES.active) {
      this.muteAllCranesExcept(this.craneNames[name]);
    }

    if (state === CRANE_STATES.idling) {
      const index = this.craneNames[name];

      if (index === this.selectedIndex && index !== this.hoveringIndex) {
        console.log('complete and mouseoff');
        this.unmuteAllCranes();
      }
    }
  }
}

module.exports = Controller;
