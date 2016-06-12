var Util = {
  render_circle: function ( radius, color, ctx) {
    ctx.fillStyle = color;
    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  },

  inherits: function (child, parent) {
    var Surrogate = function () {};
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
    child.prototype.constructor = child;
  },

  distance: function (x1, x2, y1, y2) {
    return Math.sqrt( Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) );
  },

  direction: function (theta) {
    if (theta <  Math.PI / 4 && theta > -1 * Math.PI / 4)    { return "RIGHT"; }
    if (theta < -Math.PI / 4 && theta > -3 * Math.PI / 4)    { return "DOWN";  }
    if (theta >  Math.PI / 4 && theta <  3 * Math.PI / 4)    { return "UP";    }
    if (theta <  Math.PI     && theta >  3 * Math.PI / 4 ||
        theta > -Math.PI     && theta < -3 * Math.PI / 4)    { return "LEFT";  }

  },

  limitVector: function (vector, newMagnitude, limit) {
    var oldMagnitude = this.distance(0, vector[0], 0, vector[1]);
    if (oldMagnitude < limit) { return vector }
    var normalizer = newMagnitude / oldMagnitude;
    return [ vector[0] * normalizer, vector[1] * normalizer];
  }
}

module.exports = Util;
