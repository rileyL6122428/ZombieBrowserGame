var Util = require('../util');

function Zombie(x, y, player, theta, speed, image) {
  this.x = x;
  this.y = y;
  this.player = player;
  this.speed = speed;
  this.theta = theta;
  this.image = image

  this.herdingCoefficent = 40;

  this.otherZombies = [];

  this.awake = false;
  this.moving = false;
}

Zombie.prototype.move = function () {
  var chasePlayerVec = this.chasePlayerVec();
  var separationVec = this.separationVec();

  var summedVec = [
    chasePlayerVec[0] + separationVec[0],
    chasePlayerVec[1] + separationVec[1]
  ]

  var movementVec = Util.limitVector(summedVec, this.speed)
  this.x += summedVec[0];
  this.y -= summedVec[1];
};

Zombie.prototype.chasePlayerVec = function () {
  this.theta = this.calculateTheta(this.player);
  var xComp = Math.cos(this.theta) * this.speed;
  var yComp = Math.sin(this.theta) * this.speed;
  return [xComp, yComp];
};

Zombie.prototype.separationVec = function () {
  var separationVec = [0, 0];
  var that = this;

  this.otherZombies.forEach(function (zombie){
    var magnitude = that.separationMagnitude(Util.distance(that.x, zombie.x, that.y, zombie.y));
    var theta = that.calculateTheta(zombie);
    separationVec = [
      separationVec[0] - Math.cos(theta) * magnitude,
      separationVec[1] - Math.sin(theta) * magnitude
    ]
  });

  return separationVec;
};

Zombie.prototype.separationMagnitude = function (distance) {
  return Math.pow(2, -distance/this.herdingCoefficent);
};


Zombie.prototype.calculateTheta = function (target) {
  return Math.atan2(this.y - target.y, target.x - this.x);
};

Zombie.prototype.registerOtherZombie = function (zombie) {
  this.otherZombies.push(zombie);
}

Zombie.prototype.animate = function (ctx) {
  switch (Util.direction(this.theta)) {
    case "RIGHT": this.animateRight(ctx); break;
    case "LEFT" : this.animateLeft(ctx);  break;
    case "DOWN" : this.animateDown(ctx);  break;
    case "UP"   : this.animateUp(ctx);    break;
  }
};

Zombie.prototype.playerCaptured = function () {
  return (
    this.player.x < this.x + this.width  / 2 + 5 &&
    this.player.x > this.x - this.width  / 2 - 5 &&
    this.player.y < this.y + this.height / 2 + 5 &&
    this.player.y > this.y - this.height / 2 - 5 &&
    !this.player.warping
  )
};

module.exports = Zombie;
