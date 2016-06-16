function Wall (x, y, width, height, player) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.player = player;

  this.image = document.getElementById("environment2");

  this.image2 = document.getElementById("environment");
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
  ctx.clearRect(this.x, this.y, self.width, self.height);

  //floor
  ctx.drawImage(
    this.image2,
    10,
    8,
    25,
    20,
    this.x - this.width/2 - 15,
    this.y - this.height/2 - 20,
    this.width + 23,
    this.height + 32
  );
  //top and bottom
  for (var i = 0; i < 38; i++) {
    ctx.drawImage(this.image, 97, 290, 30, 36, 40 + i * 30, -12, 30, 36);
    ctx.drawImage(this.image, 97, 290, 30, 44, 35 + i * 30, 632, 30, 44);
  }

  //left & right border
  for (var i = 0; i < 27; i++) {
    ctx.drawImage(this.image, 86,275,20,23,15,20 + 23 * i ,20,23);
    ctx.drawImage(this.image, 86,275,20,23,1156,20 + 23 * i ,20,23);
  }

  //top left corner
  ctx.drawImage(this.image, 89, 260, 30, 32, 17, -12, 35, 34);
  //top right corner
  ctx.drawImage(this.image, 109, 260, 30, 32, 1146, -10, 33, 35);
  //bottom right corner
  ctx.drawImage(this.image, 115, 285, 25, 35, 1153, 627, 27, 35);
  //bottom left corner
  ctx.drawImage(this.image, 83, 285, 25, 35, 12, 627, 27, 35);

};

Wall.prototype.rightBoundary = function () {
  return (this.x + this.width / 2);
};

Wall.prototype.leftBoundary = function () {
  return (this.x - this.width / 2);
};

Wall.prototype.topBoundary = function () {
  return (this.y - this.height / 2);
};

Wall.prototype.bottomBoundary = function () {
  return(this.y + this.height / 2);
};


module.exports = Wall;
