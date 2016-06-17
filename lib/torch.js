var Util = require('./util.js');

function Torch (x, y, player) {
  this.x = x;
  this.y = y;
  this.lit = false;
  this.player = player;

  this.torchImage = document.getElementById("torch-base");
  this.fireImage = document.getElementById('fire')

}

Torch.prototype.checkLitStatus = function () {
  if (Util.distance(this.x + 10, this.player.x, this.y + 10, this.player.y) < 30){
    this.lit = true;
  }
};

Torch.prototype.render = function (ctx) {
  ctx.drawImage(this.torchImage, 231, 171, 18, 54, this.x, this.y, 18, 48);
  this.checkLitStatus();
  var millisecondCounter = (new Date()).getMilliseconds();
  if(this.lit) {
    if (millisecondCounter < 250) {
      ctx.drawImage(this.fireImage, 40, 0, 12, 25, this.x - 4, this.y - 10, 18, 28);
    } else if (millisecondCounter >= 250 && millisecondCounter < 500){
      ctx.drawImage(this.fireImage, 72, 0, 12, 25, this.x - 4, this.y - 10, 18, 28);
    } else if (millisecondCounter >= 500 && millisecondCounter < 750) {
      ctx.drawImage(this.fireImage, 104, 0, 12, 25, this.x - 4, this.y - 10, 18, 28);
    } else  {
      ctx.drawImage(this.fireImage, 136, 0, 12, 25, this.x - 4, this.y - 10, 18, 28);
    }
  }
};

module.exports = Torch;
