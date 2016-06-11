var util = require("./util")

function Player(x, y){
  this.x = x;
  this.y = y;
  this.speed = 5;
}

Player.prototype.render = function (ctx) {
  util.render_circle.call(this, 25, "blue", ctx);
};

Player.prototype.moveRight = function () {
  this.x += this.speed;
};

Player.prototype.moveLeft = function () {
  this.x -= this.speed;
};

Player.prototype.moveUp = function () {
  this.y -= this.speed;
};

Player.prototype.moveDown = function () {
  this.y += this.speed;
};


module.exports = Player;
