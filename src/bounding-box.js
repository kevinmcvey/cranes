'use strict';

class BoundingBox {
  constructor(topLeft, bottomRight) {
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;
  }

  contains(point) {
    return this.topLeft.x <= point.x && point.x <= this.bottomRight.x &&
           this.topLeft.y <= point.y && point.y <= this.bottomRight.y;
  }
}

module.exports = BoundingBox;
