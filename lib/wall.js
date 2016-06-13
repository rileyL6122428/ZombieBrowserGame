function Wall (x, y, width, height, player) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.player = player;
}

Wall.prototype.containPlayer = function () {
  if (this.player.x > this.x + this.width / 2) {
    this.player.x = this.x + this.width / 2;
  }
  if (this.player.x < this.x - this.width / 2) {
    this.player.x = this.x - this.width / 2;
  }
  if (this.player.y < this.y - this.height / 2) {
    this.player.y = this.y - this.height / 2;
  }
  if (this.player.y > this.y + this.height / 2) {
    this.player.y = this.y + this.height / 2;
  }
};

Wall.prototype.render = function (ctx) {

  // ctx.fillStyle = "black"
  ctx.beginPath();
  ctx.moveTo(this.x - this.width/2, this.y - this.height/2);
  ctx.lineTo(this.x + this.width/2, this.y - this.height/2);
  ctx.lineTo(this.x + this.width/2, this.y + this.height/2);
  ctx.lineTo(this.x - this.width/2, this.y + this.height/2);
  ctx.lineTo(this.x - this.width/2, this.y - this.height/2);
  ctx.stroke();
};

module.exports = Wall;
