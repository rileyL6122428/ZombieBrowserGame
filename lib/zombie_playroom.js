var Player = require("./player");
var NormalZombie = require("./zombies/normal_zombie");
var BoneZombie = require("./zombies/bone_zombie");
var Torch = require('./torch');
var Wall = require('./wall');
var RunnerZombie = require('./zombies/runner_zombie');
var LevelOne = require('./levels/level_one');
var LevelTwo = require('./levels/level_two');

function ZombiePlayeroom (ctx) {

  // this.levelOne = new LevelOne(ctx)
  this.levelTwo = new LevelTwo(ctx)

  ctx.beginPath();
  ctx.rect(0, 0, 1300, 800);
  ctx.fillStyle = "black";
  ctx.fill();
}

ZombiePlayeroom.prototype.draw = function () {
  // this.levelOne.play()
  this.levelTwo.play();

};


module.exports = ZombiePlayeroom;
