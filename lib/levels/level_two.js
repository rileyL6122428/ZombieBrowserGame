var Util = require('../util');
var Level = require('./level');
var Torch = require('../torch');
var Wall = require('../wall');
var Player = require('../player');
var NormalZombie = require('../zombies/normal_zombie');

function LevelTwo(ctx) {
  this.ctx = ctx;
  Level.call(this);
  this.player = new Player(1100, 190, ctx);

  this.fadeInTextHeader = "LEVEL 2";
  this.fadeInTextSubtitle = "Doing great.";

  this.fadeOutTextHeader = "LEVEL 3";
  this.fadeOutTextSubtitle = "Now things get interesting."

  this.torches = [
    new Torch(50, 50, this.player),
    new Torch(50, 560, this.player),
    new Torch(360, 265, this.player),
    new Torch(660, 50, this.player),
    new Torch(660, 560, this.player)
  ];

  this.wall = new Wall (600, 320, 1100, 600, this.player);
  this.unmovingObjs = [this.wall].concat(this.torches);

  this.normalZombies = [
    new NormalZombie(690,230, this.player, 0),
    new NormalZombie(800, 470, this.player, 0),
    new NormalZombie(570, 420, this.player, 0),
    new NormalZombie(900, 50, this.player, 0),

    new NormalZombie(440, 70, this.player, 0),
    new NormalZombie(200, 110, this.player, 0),

    new NormalZombie(340, 340, this.player, 0),
    new NormalZombie(260, 430, this.player, 0),
    new NormalZombie(240, 590, this.player, 0),

    new NormalZombie(50, 310, this.player, 0)
  ];
  this.registerHerd();
  this.zombies = this.normalZombies;

  this.movingObjs = this.normalZombies.concat(this.player)
}

Util.inherits(LevelTwo, Level);

LevelTwo.prototype.registerHerd = function () {
  for (var i = 0; i < this.normalZombies.length; i++) {
    for (var j = 0; j < this.normalZombies.length; j++) {
      if(i !== j) {
        this.normalZombies[i].registerOtherZombie(this.normalZombies[j])
      }
    }
  }
};


module.exports = LevelTwo;
