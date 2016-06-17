var Util = require('../util');
var Level = require('./level');
var Torch = require('../torch');
var Wall = require('../wall');
var Player = require('../player');
var NormalZombie = require('../zombies/normal_zombie');
var RunnerZombie = require('../zombies/runner_zombie');

function LevelThree(ctx) {
  this.ctx = ctx;
  Level.call(this);
  this.player = new Player(600, -300, ctx);

  this.fadeInTextHeader = "LEVEL 3";
  this.fadeInTextSubtitle = "Now things get interesting.";

  this.fadeOutTextHeader = "LEVEL 4";
  this.fadeOutTextSubtitle = "You've come a long way.";

  this.torches = [
    new Torch(200, 240, this.player),
    new Torch(980, 240, this.player),
    new Torch(595, 430, this.player),
    new Torch(80, 580, this.player),
    new Torch(1100, 580, this.player)
  ];

  this.wall = new Wall (600, 320, 1100, 600, this.player);
  this.unmovingObjs = [this.wall].concat(this.torches);

  this.normalZombies = [
    new NormalZombie(290, 200, this.player, 0),
    new NormalZombie(80, 350, this.player, 0),
    new NormalZombie(340, 380, this.player, 0),
    new NormalZombie(240, 590, this.player, 0),

    new NormalZombie(1090, 210, this.player, 0),
    new NormalZombie(1130, 420, this.player, 0),
    new NormalZombie(1050, 460, this.player, 0),
    new NormalZombie(820, 300, this.player, 0)
  ];

  this.runnerZombie = new RunnerZombie(602, 585, this.player, 0);
  this.zombies = this.normalZombies.concat(this.runnerZombie);
  this.registerHerd();

  this.movingObjs = this.zombies.concat(this.player)
}

Util.inherits(LevelThree, Level)

LevelThree.prototype.registerHerd = function () {
  for (var i = 0; i < this.zombies.length; i++) {
    for (var j = 0; j < this.zombies.length; j++) {
      if(i !== j) {
        this.zombies[i].registerOtherZombie(this.zombies[j])
      }
    }
  }
};

module.exports = LevelThree;
