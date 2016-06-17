var Util = require('./util');

function Level() {
  this.phase = 0;
  this.beginFadeIn = false;
  this.loaded = false;
  this.enterPlayer = false;
  this.playerExited = false;
  this.backDropOpacity = 1;
  this.lostAnimationCalled = false;
  this.lostAnimationCompleted = false;
  this.showSubitle = false;
}

Level.prototype.allTorchesLit = function () {
  for (var i = 0; i < this.torches.length; i++) {
    if(!this.torches[i].lit) { return false; }
  }
  return true;
};

Level.prototype.animateZombies = function () {
  var self = this
  this.zombies.forEach(function(zombie) {
    zombie.animate(self.ctx)
  });
};

Level.prototype.animateMovingObjects = function () {
  var self = this
  this.movingObjs.forEach(function(obj) {
    obj.animate(self.ctx)
  });
};

Level.prototype.renderUnmovingObjects = function () {
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
  if(key.isPressed("space")) {
    if(key.isPressed("up") && this.player.warpReady) { this.player.warpUp(); }
    if(key.isPressed("down") && this.player.warpReady) { this.player.warpDown(); }
    if(key.isPressed("right") && this.player.warpReady) { this.player.warpRight(); }
    if(key.isPressed("left") && this.player.warpReady) { this.player.warpLeft(); }
  }

  if(!this.player.warping) {
    if(key.isPressed("up")) { this.player.moveUp(); }
    if(key.isPressed("down")) { this.player.moveDown(); }
    if(key.isPressed("right")) { this.player.moveRight(); }
    if(key.isPressed("left")) { this.player.moveLeft(); }
  }
  this.wall.containPlayer();
};

Level.prototype.manageInteraction = function () {
  this.moveZombies();
  this.managePlayerMovement();
};

Level.prototype.play = function () {
  switch (this.phase) {
    case 0: this.setup();      break;
    case 1: this.executeBeg(); break;
    case 2: this.executeMid(); break;
    case 3: this.executeEnd(); break;
  }
};

Level.prototype.setup = function () {
  this.phase += 1
  var self = this
  setTimeout(function() { self.beginFadeIn = true }, 1600)
  setTimeout(function() { self.showSubitle = true}, 800);
};

Level.prototype.executeBeg = function () {
  if(!this.enterPlayer){
    this.renderUnmovingObjects();
    this.animateZombies();
  } else {
    this.render();
  }
  if (!this.loaded && this.backDropOpacity > 0) { this.drawCurtains(); }
  if (this.beginFadeIn && !this.loaded) { this.fadeIn() }
};

Level.prototype.fadeIn = function () {
  if (this.backDropOpacity > 0) {
    this.backDropOpacity -= 0.01;
  } else {
    this.loaded = true;
    Util.warpPlayerIn(this);
  }
};

Level.prototype.fadeOut = function () {
  this.backDropOpacity += 0.01;
  if (this.backDropOpacity > 1) { this.phase += 1}
};

Level.prototype.drawCurtains = function () {
  this.ctx.globalAlpha = this.backDropOpacity
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0,0,1200,700);

  this.ctx.fillStyle = "white"
  if(!this.lost()) { this.ctx.fillText(this.fadeInTextHeader, 100, 100); }

  this.ctx.fillStyle = "red"
  if(this.phase === 1 && this.showSubitle) { this.ctx.fillText(this.fadeInTextSubtitle, 100, 140); }
  // if(this.phase !== 1 && !this.lost()) { this.ctx.fillText(this.fadeOutTextSubtitle, 100, 140)}

  this.ctx.globalAlpha = 1;
};

Level.prototype.executeMid = function () {
  if(this.levelWon()) {
    this.phase += 1;
    Util.warpPlayerOut(this)
  } else if(this.lost()) {
    this.renderUnmovingObjects();
    this.animateZombies();
    if(!this.lostAnimationCalled) {
      this.lostAnimationCalled = true;
      var self = this;
      Util.lostAnimation(self.player, self.ctx, self);
    }
    if(this.lostAnimationCompleted) { this.phase = 3; }
  } else {
    this.render();
    this.manageInteraction();
  }
};

Level.prototype.executeEnd = function () {
  if(this.playerExited || this.lost()) {
    this.renderUnmovingObjects();
    this.animateZombies();
    this.fadeOut()
    this.drawCurtains();
  } else {
    this.render()
  }
};

Level.prototype.finished = function () {
  return (this.phase === 4);
};

Level.prototype.lost = function () {
  return Util.lost(this.zombies);
};

module.exports = Level
