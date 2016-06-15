var Game = require("./game.js");
var TestRoom = require("./zombie_playroom");

function GameView (ctx, width, height) {
  this.ctx = ctx;
  this.game = new TestRoom(ctx);
  this.viewWidth = width;
  this.viewHeight = height;
  this.frameRate = 50;
}

GameView.prototype.start = function () {
  var self = this;
  var interval = setInterval( function () {
    self.game.draw();
    if(key.isPressed("q")) { clearInterval( interval ); } //NOTE this line for testing purposes
  }, 1000/this.frameRate);

};

module.exports = GameView;
