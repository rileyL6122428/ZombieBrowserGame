var util = require("./util")

function Player(x, y, ctx){
  this.x = x;
  this.y = y;
  this.ctx = ctx
  this.facing = "DOWN";
  this.moving = false;
  this.speed = 5;
  this.image = document.getElementById('player_spread');
  this.width = 30;
  this.height = 44;

  this.xOffset = 20;

  this.warping = false;
  this.warpReady = true;
}

Player.prototype.animate = function (ctx) {
  // util.render_circle.call(this, 25, "blue", ctx);
  if(!this.warping) {this.animateRegular(ctx);}
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

Player.prototype.animateRegular = function (ctx) {
  switch (this.facing) {
    case "DOWN" :this.animateDown(ctx);  break;
    case "UP"   :this.animateUp(ctx);    break;
    case "RIGHT":this.animateRight(ctx); break;
    case "LEFT" :this.animateLeft(ctx);  break;
  }
};

Player.prototype.animateDown = function (ctx) {
  var millisecondCounter = (new Date()).getMilliseconds();

  if (millisecondCounter < 250 && this.moving) {
    ctx.drawImage(this.image, 69, 67, 21, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.moving) {
    ctx.drawImage(this.image, 121, 67, 21, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
  } else  {
    ctx.drawImage(this.image, 95, 67, 21, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
  }
};

Player.prototype.animateUp = function (ctx) {
  var millisecondCounter = (new Date()).getMilliseconds();

  if (millisecondCounter < 250 && this.moving) {
    ctx.drawImage(this.image, 69, 1, 21, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.moving) {
    ctx.drawImage(this.image, 121, 1, 21, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
  } else  {
    ctx.drawImage(this.image, 95, 1, 21, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
  }
};

Player.prototype.animateRight = function (ctx) {
  var millisecondCounter = (new Date()).getMilliseconds();

  if (millisecondCounter < 250 && this.moving) {
    ctx.drawImage(this.image, 70, 33, 23, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.moving) {
    ctx.drawImage(this.image, 120, 33, 22, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
  } else  {
    ctx.drawImage(this.image, 95, 33, 21, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
  }
};

Player.prototype.animateLeft = function (ctx) {
  var millisecondCounter = (new Date()).getMilliseconds();

  if (millisecondCounter < 250 && this.moving) {
    ctx.drawImage(this.image, 69, 98, 23, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.moving) {
    ctx.drawImage(this.image, 120, 98, 21, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
  } else  {
    ctx.drawImage(this.image, 95, 98, 21, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
  }
};

Player.prototype.warpUp = function () {
  this._warp([120, 161], [165, 225], [241, 225], [120, 127], "UP")
};


Player.prototype.warpDown = function (entrance, exit) {
  this._warp([190, 160], [190, 192], [190, 160], [140, 225], "DOWN", entrance, exit);
};

Player.prototype.warpRight = function () {
  this._warp([215, 128], [261, 160], [190, 129], [239, 129], "RIGHT");
};

Player.prototype.warpLeft = function () {
  this._warp([261, 128], [215, 160], [190, 225], [71, 225], "LEFT");
};

Player.prototype.warpIncrementer = function (direction, distance) {
  switch(direction) {
    case "DOWN" : this.y += distance; break;
    case "RIGHT": this.x += distance; break;
    case "LEFT" : this.x -= distance; break;
    case "UP"   : this.y -= distance; break;
  }
};

Player.prototype._warp = function (img1, img2, img3, img4, direction, entrance, exit) {
  this.warping = true;
  this.warpReady = false;
  var self = this;

  if (!entrance) {
    frame1 = setInterval(function () {
      self.ctx.drawImage(self.image, img1[0], img1[1], 27, 35, self.x - self.xOffset, self.y -30, self.width, self.height);
      // console.log("hello?");
    },1000/50)
    setTimeout(function(){
      clearInterval(frame1);
      frame2 = setInterval(function () {
        self.ctx.drawImage(self.image, img2[0], img2[1], 27, 34, self.x - self.xOffset, self.y - 30, self.width, self.height);
      }, 1000 / 50)
    }, 100)

    setTimeout(function () { clearInterval(frame2); }, 200)
  }

  if(!exit) {
    setTimeout (function () {
      self.warpIncrementer(direction, 135);
      frame3 = setInterval(function () {
        self.ctx.drawImage(self.image, img3[0], img3[1], 27, 35, self.x - self.xOffset, self.y -30, self.width, self.height);
      }, 1000/50)
    }, 500)

    setTimeout (function () {
      clearInterval(frame3);
      self.warpIncrementer(direction, 20);
      frame4 = setInterval(function () {
        self.ctx.drawImage(self.image, img4[0], img4[1], 27, 34, self.x - self.xOffset, self.y - 30, self.width, self.height);
      }, 1000/50)
    }, 610)

    setTimeout(function(){
      self.warping = false;
      clearInterval(frame4)
    }, 710)

    setTimeout(function () { self.warpReady = true; }, 3710)
  }
};

module.exports = Player;
