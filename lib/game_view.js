var Game = require("./game.js");

function GameView (ctx, width, height) {
  this.ctx = ctx;
  this.game = new Game(ctx);
  this.viewWidth = width;
  this.viewHeight = height;
  this.frameRate = 50;
}

GameView.prototype.start = function () {
  var self = this;
  var interval = setInterval( function () {
    self.ctx.clearRect(0, 0, self.viewWidth, self.viewHeight);
    self.game.draw();
    // if(key.isPressed("s")) {console.log("HELLO");}
    if(key.isPressed("q")) { clearInterval( interval ); } //NOTE this line for testing purposes
  }, 1000/this.frameRate);

};

module.exports = GameView;
