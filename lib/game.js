var Player = require("./player");
var NormalZombie = require("./zombies/normal_zombie");

function Game (ctx) {
  // var image = document.getElementById("test");
  //
  // this.player = new Player(500, 100);
  // this.sampleZombie = new NormalZombie(500, 200, this.player, 0, image);
  // this.ctx = ctx;
  //
  // this.testImage = new Image();
  // this.testImage.src = './images/zombie_n_skeleton2.png'
}

Game.prototype.draw = function () {

  // this.sampleZombie.render(this.ctx);
  // this.sampleZombie.animate(this.ctx);
  // this.player.render(this.ctx);
  // this.managePlayerMovement();
  // this.sampleZombie.doZombieThings();
};

Game.prototype.managePlayerMovement = function () {
  // if(key.isPressed("d")) { this.player.moveRight(); }
  // if(key.isPressed("s")) { this.player.moveDown(); }
  // if(key.isPressed("a")) { this.player.moveLeft(); }
  // if(key.isPressed("w")) { this.player.moveUp(); }
};

module.exports = Game;
