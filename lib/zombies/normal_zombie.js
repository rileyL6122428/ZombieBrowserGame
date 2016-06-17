var Util = require('../util.js');
var Zombie = require('./zombie.js');

function NormalZombie(x, y, player, theta) {


  Zombie.call(this, x, y, player, theta, 2, document.getElementById('test'));
  this.awakenRange = 210;
  this.width = 35;
  this.height = 42;
};

Util.inherits(NormalZombie, Zombie);


NormalZombie.prototype.render = function (ctx) {
  Util.render_circle.call(this, 25, "green", ctx);
};

NormalZombie.prototype.doZombieThings = function () {
  this.regulateAwakenStatus();
  if (this.awake) { this.chasePlayer(); }
};

NormalZombie.prototype.chasePlayer = function () {
  this.move();
};


NormalZombie.prototype.regulateAwakenStatus = function () {

  var playerDistance = Util.distance(this.x, this.player.x, this.y, this.player.y)
  if (playerDistance < this.awakenRange) { this.awake = true }
};

NormalZombie.prototype.animateRight = function (ctx) {

  var millisecondCounter = (new Date()).getMilliseconds();
  if (millisecondCounter < 250 && this.awake) {
    ctx.drawImage(this.image, 0, 150, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.awake) {
    ctx.drawImage(this.image, 33, 150, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
  } else  {
    ctx.drawImage(this.image, 64, 150, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
  }
};

NormalZombie.prototype.animateLeft = function (ctx) {
  var millisecondCounter = (new Date()).getMilliseconds();

  if (millisecondCounter < 250 && this.awake) {
    ctx.drawImage(this.image, 0, 85, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.awake) {
    ctx.drawImage(this.image, 33, 85, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
  } else {
    ctx.drawImage(this.image, 64, 85, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
  }
};

NormalZombie.prototype.animateDown = function (ctx) {
  var millisecondCounter = (new Date()).getMilliseconds();

  if (millisecondCounter < 250 && this.awake) {
    ctx.drawImage(this.image, 0, 23, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.awake) {
    ctx.drawImage(this.image, 64, 23, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
  } else {
    ctx.drawImage(this.image, 33, 23, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
  }
};

NormalZombie.prototype.animateUp = function (ctx) {
  var millisecondCounter = (new Date()).getMilliseconds();

  if (millisecondCounter < 250 && this.awake) {
    ctx.drawImage(this.image, 0, 215, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.awake) {
    ctx.drawImage(this.image, 64, 215, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
  } else {
    ctx.drawImage(this.image, 33, 215, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
  }
};



module.exports = NormalZombie;
