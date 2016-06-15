function Level() {

}

Level.prototype.allTorchesLit = function () {
  for (var i = 0; i < this.torches.length; i++) {
    if(!this.torches[i].lit) { return false; }
  }
  return true;
};

// Level.prototype.drawBackground = function () {
//   this.ctx.beginPath();
//   this.ctx.rect(0, 0, 1300, 800);
//   this.ctx.fillStyle = "black";
//   this.ctx.fill();
// };

Level.prototype.animateMovingObjects = function () {

  var self = this
  this.movingObjs.forEach(function(obj) {
    obj.animate(self.ctx)
  });
};

Level.prototype.renderUnmovingObjects = function () {
  // this.drawBackground()

  var self = this
  this.unmovingObjs.forEach(function(obj) {
    obj.render(self.ctx)
  });
};

Level.prototype.render = function () {
  this.renderUnmovingObjects();
  this.animateMovingObjects();
};

Level.prototype.levelWon = function () {
  return this.allTorchesLit();
};

Level.prototype.moveZombies = function () {
  this.zombies.forEach(function(zombie) {
    zombie.doZombieThings();
  });
};

Level.prototype.managePlayerMovement = function () {
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

Level.prototype.manageInteraction = function () {
  this.moveZombies();
  this.managePlayerMovement();
};

Level.prototype.play = function () {
  this.render();
  this.manageInteraction();
};

module.exports = Level
