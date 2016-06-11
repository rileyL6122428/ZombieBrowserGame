var Player = require("./player");
var NormalZombie = require("./zombies/normal_zombie");
var BoneZombie = require("./zombies/bone_zombie");

function ZombiePlayeroom (ctx) {
  var image = document.getElementById("test");

  this.player = new Player(500, 100);
  this.normalZombies = []
  for (var i = 0; i < 3; i++) {
    this.normalZombies.push(new NormalZombie(100 * i , 200, this.player, image));
  }

  var that = this;
  this.normalZombies.forEach(function (zombie, idx1){
    // debugger
    for (var idx2 = 0; idx2 < that.normalZombies.length; idx2++) {
      if (idx1 !== idx2) { zombie.registerOtherZombie(that.normalZombies[i]); }
    }
  })

  // this.sampleZombie = new NormalZombie(500, 200, this.player, 0, image);
  // this.boneZombie = new BoneZombie(400, 200, this.player, 0, image);
  this.ctx = ctx;

  this.testImage = new Image();
  this.testImage.src = './images/zombie_n_skeleton2.png'
}

ZombiePlayeroom.prototype.draw = function () {

  var that = this
  this.normalZombies.forEach(function (zombie) {
    zombie.render(that.ctx);
    // zombie.animate(that.ctx);
    zombie.doZombieThings();
  })

  this.player.render(this.ctx);
  this.managePlayerMovement();
};

ZombiePlayeroom.prototype.managePlayerMovement = function () {
  if(key.isPressed("d")) { this.player.moveRight(); }
  if(key.isPressed("s")) { this.player.moveDown(); }
  if(key.isPressed("a")) { this.player.moveLeft(); }
  if(key.isPressed("w")) { this.player.moveUp(); }
};

module.exports = ZombiePlayeroom;
