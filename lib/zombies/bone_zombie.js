Util = require('../util.js');
Zombie = require('./zombie.js');

function BoneZombie(x, y, player, theta, wall, torch) {
  Zombie.call(this, x, y, player, theta, 13, document.getElementById("test"));
  this.wall = wall;
  this.chargeReady = false;
  this.startCoolDown = true;
  this.awake = false;
  this.movementVec = [];
  this.height = 48;
  this.width = 32;
  this.torch = torch
};

Util.inherits(BoneZombie, Zombie);

BoneZombie.prototype.render = function (ctx) {
  Util.render_circle.call(this, 25, "yellow", ctx);

};

BoneZombie.prototype.doZombieThings = function () {
  this.regulateAwakenStatus();
  if (this.awake) { this.chasePlayer(); }
};

BoneZombie.prototype.chasePlayer = function () {
  this.chargeAndCoolDown();
};

BoneZombie.prototype.chargeAndCoolDown = function () {
  if (this.chargeReady) { this.charge(); }
  if (this.startCoolDown) { this.coolDown(); }
};

BoneZombie.prototype.charge = function () {
  if(this.outOfBounds()) {
    this.chargeReady = false;
    this.startCoolDown = true;
    this.correctPosition();
  } else {
    this.move();
  }
};

BoneZombie.prototype.move = function () {
  this.x += this.movementVec[0]
  this.y -= this.movementVec[1]
};

BoneZombie.prototype.coolDown = function () {
  this.startCoolDown = false;

  var self = this;
  setTimeout(function (){
    self.calibrateMovementVector();
    self.chargeReady = true;
  }, 500)
};

BoneZombie.prototype.calibrateMovementVector = function () {
  this.movementVec = this.chasePlayerVec();
};

BoneZombie.prototype.regulateAwakenStatus = function () {
  if (this.torch.lit) { this.awake = true; }
};

BoneZombie.prototype.outOfBounds = function () {
  return (
    this.x > this.wall.rightBoundary() ||
    this.x < this.wall.leftBoundary()  ||
    this.y < this.wall.topBoundary()   ||
    this.y > this.wall.bottomBoundary()
  )
};

BoneZombie.prototype.correctPosition = function () {
  if(this.x > this.wall.rightBoundary()) { this.x = this.wall.rightBoundary() }
  if(this.x < this.wall.leftBoundary()) { this.x = this.wall.leftBoundary() }
  if(this.y < this.wall.topBoundary()) { this.y = this.wall.topBoundary() }
  if(this.y > this.wall.bottomBoundary()) { this.y = this.wall.bottomBoundary() }
};

BoneZombie.prototype.animateRight = function (ctx) {

  var millisecondCounter = (new Date()).getMilliseconds();

  if (millisecondCounter < 250 && this.chargeReady) {
    ctx.drawImage(this.image, 96, 144, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.chargeReady) {
    ctx.drawImage(this.image, 160, 144, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
  } else  {
    ctx.drawImage(this.image, 128, 144, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
  }
};

BoneZombie.prototype.animateLeft = function (ctx) {
  var millisecondCounter = (new Date()).getMilliseconds();

  if (millisecondCounter < 250 && this.chargeReady) {
    ctx.drawImage(this.image, 96, 80, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.chargeReady) {
    ctx.drawImage(this.image, 160, 80, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
  } else {
    ctx.drawImage(this.image, 128, 80, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
  }
};

BoneZombie.prototype.animateDown = function (ctx) {
  var millisecondCounter = (new Date()).getMilliseconds();

  if (millisecondCounter < 250 && this.chargeReady) {
    ctx.drawImage(this.image, 96, 16, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.chargeReady) {
    ctx.drawImage(this.image, 160, 16, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
  } else {
    ctx.drawImage(this.image, 128, 16, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
  }
};

BoneZombie.prototype.animateUp = function (ctx) {
  var millisecondCounter = (new Date()).getMilliseconds();

  if (millisecondCounter < 250 && this.chargeReady) {
    ctx.drawImage(this.image, 96, 208, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.chargeReady) {
    ctx.drawImage(this.image, 160, 208, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
  } else {
    ctx.drawImage(this.image, 128, 208, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
  }
};


module.exports = BoneZombie;
