'use strict';

class Controller {
  constructor(cranes) {
    this.cranes = cranes;

    this.selectedIndex = 0;

    this.bindKeyboard();
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

  selectPreviousCrane() {
    if (this.cranes.length === 0) {
      this.selectedIndex = -1;
    } else if (this.selectedIndex === -1) {
      this.selectedIndex = 0;
    } else if (this.selectedIndex === 0) {
      this.selectedIndex = this.cranes.length - 1;
    } else {
      this.selectedIndex -= 1;
    }
  }

  selectNextCrane() {
    if (this.cranes.length === 0) {
      this.selectedIndex = -1;
    } else if (this.selectedIndex === -1) {
      this.selectedIndex = this.cranes.length - 1;
    } else if (this.selectedIndex === this.cranes.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex += 1;
    }
  }

  bindKeyboard() {
    window.addEventListener('keyup', event => this.handleKeypress(event));
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
}

module.exports = Controller;
