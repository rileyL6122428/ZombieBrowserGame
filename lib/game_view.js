var ZombiePlayroom = require("./zombie_playroom");

function GameView (ctx, width, height) {
  this.ctx = ctx;
  this.game = new ZombiePlayroom(ctx);
  this.viewWidth = width;
  this.viewHeight = height;
  this.frameRate = 50;
}

GameView.prototype.start = function () {
  var self = this;
  var interval = setInterval( function () {
    self.game.draw();
  }, 1000/this.frameRate);

};

module.exports = GameView;
