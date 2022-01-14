'use strict';

class CenteredHtml {
  constructor(elementId, aspectRatio) {
    this.element = document.getElementById(elementId);
    this.aspectRatio = aspectRatio;

    this.reposition();
    this.bindToWindow();
  }

  reposition() {
    const windowWidth = this.element.parentElement.clientWidth;
    const windowHeight = this.element.parentElement.clientHeight;
    const windowAspectRatio = windowWidth / windowHeight;

    const fillDimension = (windowAspectRatio < this.aspectRatio) ? 'width' : 'height';

    if (fillDimension === 'width') {
      this.width = windowWidth;
      this.height = windowWidth * (1.0 / this.aspectRatio);
      this.x = 0;
      this.y = (windowHeight - this.height) / 2;
    } else if (fillDimension === 'height') {
      this.width = windowHeight * this.aspectRatio;
      this.height = windowHeight;
      this.x = (windowWidth - this.width) / 2;
      this.y = 0;
    }

    this.adjustElementProperties();
  }

  adjustElementProperties() {
    this.element.style['width'] = this.width;
    this.element.style['height'] = this.height;
    this.element.style['left'] = this.x;
    this.element.style['top'] = this.y;
  }

  bindToWindow() {
    window.addEventListener('resize', () => {
      this.reposition();
    });
  }
}

module.exports = CenteredHtml;
