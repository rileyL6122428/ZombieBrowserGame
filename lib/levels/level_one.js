var Util = require('../util');
var Level = require('./level');
var Torch = require('../torch');
var Wall = require('../wall');
var Player = require('../player');
var NormalZombie = require('../zombies/normal_zombie');

function LevelOne(ctx) {
  this.ctx = ctx;
  Level.call(this);

  this.fadeInTextHeader = "LEVEL 1"
  this.fadeInTextSubtitle = "We all start somewhere."

  this.fadeOutTextHeader = "LEVEL 2"
  this.fadeOutTextSubtitle = "Doing great."

  this.player = new Player(100, 420, ctx);

  this.torches = [
    new Torch(80, 60, this.player),
    new Torch(580, 250, this.player),
    new Torch(1080, 60, this.player)
  ];

  this.wall = new Wall (600, 320, 1100, 600, this.player);
  this.unmovingObjs = [this.wall].concat(this.torches);

  this.normalZombies = [
    new NormalZombie(240,  95, this.player, 0),
    new NormalZombie(300, 340, this.player, 0),
    new NormalZombie(480, 520, this.player, 0),
    new NormalZombie(900, 130, this.player, 0),
    new NormalZombie(780, 380, this.player, 0)
  ];
  this.registerHerd();
  this.zombies = this.normalZombies;

  this.movingObjs = this.normalZombies.concat(this.player)
}

Util.inherits(LevelOne, Level);

LevelOne.prototype.registerHerd = function () {
  for (var i = 0; i < this.normalZombies.length; i++) {
    for (var j = 0; j < this.normalZombies.length; j++) {
      if(i !== j) {
        this.normalZombies[i].registerOtherZombie(this.normalZombies[j])
      }
    }
  }
};






module.exports = LevelOne;
