Util = require('../util.js');
Zombie = require('./zombie.js');

function BoneZombie(x, y, player, theta, image) {
  Zombie.call(this, x, y, player, theta, 2, image);
  // this.awakenRange = 100;
  // this.coolingDown = false;
};

Util.inherits(BoneZombie, Zombie);

BoneZombie.prototype.render = function (ctx) {
  Util.render_circle.call(this, 25, "red", ctx);

};

BoneZombie.prototype.doZombieThings = function () {
  this.regulateAwakenStatus();
  if (this.awake) { this.chasePlayer(); }
};

BoneZombie.prototype.chasePlayer = function () {
  this.calibrateTheta();
  this.move();
};


BoneZombie.prototype.regulateAwakenStatus = function () {

  var playerDistance = Util.distance(this.x, this.player.x, this.y, this.player.y)
  if (playerDistance < this.awakenRange) { this.awake = true }
};

// BoneZombie.prototype.animateRight = function (ctx) {
//
//   var millisecondCounter = (new Date()).getMilliseconds();
//
//   if (millisecondCounter < 250 && this.awake) {
//     ctx.drawImage(this.image, 0, 150, 33, 42, this.x - 22, this.y - 30, 45, 60);
//   } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.awake) {
//     ctx.drawImage(this.image, 33, 150, 33, 42, this.x - 22, this.y - 30, 45, 60);
//   } else  {
//     ctx.drawImage(this.image, 64, 150, 33, 42, this.x - 22, this.y - 30, 45, 60);
//   }
// };
//
// BoneZombie.prototype.animateLeft = function (ctx) {
//   var millisecondCounter = (new Date()).getMilliseconds();
//
//   if (millisecondCounter < 250 && this.awake) {
//     ctx.drawImage(this.image, 0, 85, 33, 42, this.x - 22, this.y - 30, 45, 60);
//   } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.awake) {
//     ctx.drawImage(this.image, 33, 85, 33, 42, this.x - 22, this.y - 30, 45, 60);
//   } else {
//     ctx.drawImage(this.image, 64, 85, 33, 42, this.x - 22, this.y - 30, 45, 60);
//   }
// };
//
// BoneZombie.prototype.animateDown = function (ctx) {
//   var millisecondCounter = (new Date()).getMilliseconds();
//
//   if (millisecondCounter < 250 && this.awake) {
//     ctx.drawImage(this.image, 0, 23, 33, 42, this.x - 22, this.y - 30, 45, 60);
//   } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.awake) {
//     ctx.drawImage(this.image, 64, 23, 33, 42, this.x - 22, this.y - 30, 45, 60);
//   } else {
//     ctx.drawImage(this.image, 33, 23, 33, 42, this.x - 22, this.y - 30, 45, 60);
//   }
// };
//
// BoneZombie.prototype.animateUp = function (ctx) {
//   var millisecondCounter = (new Date()).getMilliseconds();
//
//   if (millisecondCounter < 250 && this.awake) {
//     ctx.drawImage(this.image, 0, 215, 33, 42, this.x - 22, this.y - 30, 45, 60);
//   } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.awake) {
//     ctx.drawImage(this.image, 64, 215, 33, 42, this.x - 22, this.y - 30, 45, 60);
//   } else {
//     ctx.drawImage(this.image, 33, 215, 33, 42, this.x - 22, this.y - 30, 45, 60);
//   }
// };



module.exports = BoneZombie;