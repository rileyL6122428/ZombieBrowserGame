var util = require("./util")

function Player(x, y){
  this.x = x;
  this.y = y;
  this.facing = "DOWN";
  this.moving = false;
  this.speed = 5;
  this.image = document.getElementById("player_spread");

  this.warping = false;
  this.warpReady = true;
}

Player.prototype.render = function (ctx) {
  util.render_circle.call(this, 25, "blue", ctx);
  this.animate(ctx);
};


Player.prototype.moveUp = function () {
  
  this.y -= this.speed;
  this.moving = true;
  this.facing = "UP";
};

Player.prototype.moveDown = function () {
  this.y += this.speed;
  this.moving = true;
  this.facing = "DOWN";
};

Player.prototype.moveRight = function () {
  this.x += this.speed;
  this.moving = true;
  this.facing = "RIGHT";
};

Player.prototype.moveLeft = function () {
  this.x -= this.speed;
  this.moving = true;
  this.facing = "LEFT";
};

Player.prototype.animate = function (ctx) {
  switch (this.facing) {
    case "DOWN":
      this.animateDown(ctx)
      break;
    case "UP":
      this.animateUp(ctx)
      break;
    case "RIGHT":
      this.animateRight(ctx)
      break;
    case "LEFT":
      this.animateLeft(ctx)
      break;
  }
};

Player.prototype.animateDown = function (ctx) {
  var millisecondCounter = (new Date()).getMilliseconds();

  if (millisecondCounter < 250 && this.moving) {
    ctx.drawImage(this.image, 69, 67, 21, 30, this.x - 22, this.y - 30, 35, 50);
  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.moving) {
    ctx.drawImage(this.image, 121, 67, 21, 30, this.x - 22, this.y - 30, 35, 50);
  } else  {
    ctx.drawImage(this.image, 95, 67, 21, 30, this.x - 22, this.y - 30, 35, 50);
  }
};

Player.prototype.animateUp = function (ctx) {
  var millisecondCounter = (new Date()).getMilliseconds();

  if (millisecondCounter < 250 && this.moving) {
    ctx.drawImage(this.image, 69, 1, 21, 30, this.x - 22, this.y - 30, 35, 50);
  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.moving) {
    ctx.drawImage(this.image, 121, 1, 21, 30, this.x - 22, this.y - 30, 35, 50);
  } else  {
    ctx.drawImage(this.image, 95, 1, 21, 30, this.x - 22, this.y - 30, 35, 50);
  }
};

Player.prototype.animateRight = function (ctx) {
  var millisecondCounter = (new Date()).getMilliseconds();

  if (millisecondCounter < 250 && this.moving) {
    ctx.drawImage(this.image, 70, 33, 23, 30, this.x - 22, this.y - 30, 35, 50);
  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.moving) {
    ctx.drawImage(this.image, 120, 33, 22, 30, this.x - 22, this.y - 30, 35, 50);
  } else  {
    ctx.drawImage(this.image, 95, 33, 21, 30, this.x - 22, this.y - 30, 35, 50);
  }
};

Player.prototype.animateLeft = function (ctx) {
  var millisecondCounter = (new Date()).getMilliseconds();

  if (millisecondCounter < 250 && this.moving) {
    ctx.drawImage(this.image, 69, 98, 23, 30, this.x - 22, this.y - 30, 35, 50);
  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.moving) {
    ctx.drawImage(this.image, 120, 98, 21, 30, this.x - 22, this.y - 30, 35, 50);
  } else  {
    ctx.drawImage(this.image, 95, 98, 21, 30, this.x - 22, this.y - 30, 35, 50);
  }
};

Player.prototype.warp = function () {

};


module.exports = Player;
