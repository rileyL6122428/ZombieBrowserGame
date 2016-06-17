var NormalZombie = require('./normal_zombie');
var Util = require('../util');

function RunnerZombie(x, y, player, theta) {
  NormalZombie.call(this, x, y, player, theta);
  this.speed = 5;
  this.awakenRange = 190;
  this.image = document.getElementById("blueZombie");
}

Util.inherits(RunnerZombie, NormalZombie)

module.exports = RunnerZombie;
