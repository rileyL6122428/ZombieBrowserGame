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
  this.player = new Player(600, 320, ctx);

  this.torches = [
    new Torch(595, 20, this.player),
    new Torch(1130, 300, this.player),
    new Torch(595, 580, this.player),
    new Torch(50, 300, this.player),
    new Torch(20, 20, this.player)
  ];

  this.wall = new Wall(600, 320, 1100, 600, this.player);
  this.unmovingObjs = [this.wall].concat(this.torches);

  this.normalZombies = [
    new NormalZombie(410, 410, this.player, 0),
    new NormalZombie(420, 420, this.player, 0),
    new NormalZombie(430, 430, this.player, 0),

    new NormalZombie(440, 440, this.player, 0),
    new NormalZombie(450, 450, this.player, 0),
    new NormalZombie(460, 460, this.player, 0)
  ]
  this.runnerZombie = new RunnerZombie(400, 400, this.player, 0);

  this.boneZombies = [
    new BoneZombie(1140, 600, this.player, 0, this.wall, this.torches[0]),
    new BoneZombie(50, 40, this.player, 0, this.wall, this.torches[1])
  ];
  this.zombies = this.boneZombies;

  this.movingObjs = this.zombies.concat(this.player)
}

LevelThree.prototype.registerHerd = function () {
  for (var i = 0; i < this.zombies.length; i++) {
    for (var j = 0; j < this.zombies.length; j++) {
      if(i !== j) {
        this.zombies[i].registerOtherZombie(this.zombies[j])
      }
    }
  }
};

module.exports = LevelFive;
