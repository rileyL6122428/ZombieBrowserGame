var Player = require("./player");
var NormalZombie = require("./zombies/normal_zombie");
var BoneZombie = require("./zombies/bone_zombie");
var Torch = require('./torch');
var Wall = require('./wall');

function ZombiePlayeroom (ctx) {
  this.ctx = ctx;
  this.image = document.getElementById("environment2");
  this.player = new Player(500, 100, this.ctx);
  this.wall = new Wall(600, 320, 1100, 600, this.player);

  this.torch = new Torch(40, 30, this.player);
  this.normalZombies = []
  for (var i = 0; i < 3; i++) {
    this.normalZombies.push(new NormalZombie(100 * i + 150, 200, this.player,0));
  }

  var that = this;
  this.normalZombies.forEach(function (zombie, idx1){
    for (var idx2 = 0; idx2 < that.normalZombies.length; idx2++) {
      if (idx1 !== idx2) { zombie.registerOtherZombie(that.normalZombies[idx2]); }
    }
  })

  // this.sampleZombie = new NormalZombie(500, 200, this.player, 0, image);
  // this.boneZombie = new BoneZombie(400, 200, this.player, 0, image);
}

ZombiePlayeroom.prototype.draw = function () {
  //background
  this.ctx.beginPath();
  this.ctx.rect(0, 0, 1300, 800);
  this.ctx.fillStyle = "black";
  this.ctx.fill();

  this.wall.render(this.ctx);
  this.torch.render(this.ctx)

  var that = this
  this.normalZombies.forEach(function (zombie) {
    // zombie.render(that.ctx);
    zombie.animate(that.ctx);
    zombie.doZombieThings();
  })

  this.player.render(this.ctx);
  this.managePlayerMovement();
};

ZombiePlayeroom.prototype.managePlayerMovement = function () {
  this.player.moving = false;
  if(key.isPressed("f")) {
    if(key.isPressed("w") && this.player.warpReady) { this.player.warpUp(); }
    if(key.isPressed("s") && this.player.warpReady) { this.player.warpDown(); }
    if(key.isPressed("d") && this.player.warpReady) { this.player.warpRight(); }
    if(key.isPressed("a") && this.player.warpReady) { this.player.warpLeft(); }
  }

  if(!this.player.warping) {
    if(key.isPressed("w")) { this.player.moveUp(); }
    if(key.isPressed("s")) { this.player.moveDown(); }
    if(key.isPressed("d")) { this.player.moveRight(); }
    if(key.isPressed("a")) { this.player.moveLeft(); }
  }
  this.wall.containPlayer();
};

module.exports = ZombiePlayeroom;
