var Util = require('../util');

function Zombie(x, y, player, theta, speed, image) {
  this.x = x;
  this.y = y;
  this.player = player;
  this.speed = speed;
  this.theta = theta;
  this.image = image

  this.awake = false;
  this.moving = false;
}

Zombie.prototype.move = function () {
  this.x += Math.cos(this.theta) * this.speed;
  this.y -= Math.sin(this.theta) * this.speed;
};

Zombie.prototype.calibrateTheta = function () {
  this.theta = Math.atan2(this.y - this.player.y, this.player.x - this.x);
};

Zombie.prototype.animate = function (ctx) {

  switch (Util.direction(this.theta)) {
    case "RIGHT":
      this.animateRight(ctx);
      break;
    case "LEFT":
      this.animateLeft(ctx);
      break;
    case "DOWN":
      this.animateDown(ctx)
      break;
    case "UP":
      this.animateUp(ctx)
      break;
    // case "LEFT"
  }
};

module.exports = Zombie;
