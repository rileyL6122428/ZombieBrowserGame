var Util = require('../util');
var Level = require('./level');
var Torch = require('../torch');
var Wall = require('../wall');
var Player = require('../player');
var BoneZombie = require('../zombies/bone_zombie');

function LevelFour(ctx) {
  this.ctx = ctx;
  Level.call(this);
  this.player = new Player(600, 175, ctx);

  this.fadeInTextHeader = "LEVEL 4";
  this.fadeInTextSubtitle = "You've come a long way.";

  this.fadeOutTextHeader = "LEVEL 5";
  this.fadeOutTextSubtitle = "... good luck."

  this.torches = [
    new Torch(595, 20, this.player),
    new Torch(1130, 300, this.player),
    new Torch(595, 580, this.player),
    new Torch(50, 300, this.player),
  ];

  this.wall = new Wall (600, 320, 1100, 600, this.player);
  this.unmovingObjs = [this.wall].concat(this.torches);

  this.boneZombies = [
    new BoneZombie(1140, 600, this.player, 0, this.wall, this.torches[0]),
    new BoneZombie(50, 40, this.player, 0, this.wall, this.torches[1]),
    new BoneZombie(1140, 40, this.player, 0, this.wall, this.torches[2]),
    new BoneZombie(50, 600, this.player, 0, this.wall, this.torches[3])
  ];
  this.zombies = this.boneZombies;

  this.movingObjs = this.zombies.concat(this.player)
}

Util.inherits(LevelFour, Level);

module.exports = LevelFour;
