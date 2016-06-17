var Util = require('../util');
var Level = require('./level');
var Torch = require('../torch');
var Wall = require('../wall');
var Player = require('../player');
var NormalZombie = require('../zombies/normal_zombie');
var RunnerZombie = require('../zombies/runner_zombie');
var BoneZombie = require('../zombies/bone_zombie');

function LevelFive(ctx) {
  this.ctx = ctx;
  Level.call(this);
  this.player = new Player(600, 600, ctx);

  this.fadeInTextHeader = "LEVEL 5";
  this.fadeInTextSubtitle = "... good luck."

  this.fadeOutTextHeader = "";
  this.fadeOutTextSubtitle = "";

  this.torches = [
    new Torch(50, 40, this.player),
    new Torch(1130, 40, this.player),
    new Torch(595, 100, this.player),
    new Torch(895, 260, this.player),
    new Torch(295, 260, this.player)
  ];

  this.wall = new Wall(600, 320, 1100, 600, this.player);
  this.unmovingObjs = [this.wall].concat(this.torches);

  this.normalZombies = [
    new NormalZombie(100, 240, this.player, 0),
    new NormalZombie(400, 200, this.player, 0),
    new NormalZombie(430, 350, this.player, 0),

    new NormalZombie(1000, 400, this.player, 0),
    new NormalZombie(670, 220, this.player, 0),
    new NormalZombie(850, 150, this.player, 0)
  ]
  this.runnerZombie = new RunnerZombie(600, 50, this.player, 0);
  this.zombies = this.normalZombies.concat(this.runnerZombie)
  this.registerHerd()

  this.boneZombies = [
    new BoneZombie(1140, 600, this.player, 0, this.wall, this.torches[0]),
    new BoneZombie(50, 600, this.player, 0, this.wall, this.torches[1])
  ];

  this.zombies = this.zombies.concat(this.boneZombies);

  this.movingObjs = this.zombies.concat(this.player)
}

Util.inherits(LevelFive, Level)

LevelFive.prototype.registerHerd = function () {
  for (var i = 0; i < this.zombies.length; i++) {
    for (var j = 0; j < this.zombies.length; j++) {
      if(i !== j) {
        this.zombies[i].registerOtherZombie(this.zombies[j])
      }
    }
  }
};

module.exports = LevelFive;
