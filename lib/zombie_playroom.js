var LevelOne = require('./levels/level_one');
var LevelTwo = require('./levels/level_two');
var LevelThree = require('./levels/level_three');


function ZombiePlayeroom (ctx) {

  // this.levelOne = new LevelOne(ctx)
  // this.levelTwo = new LevelTwo(ctx)
  this.levelThree = new LevelThree(ctx)

  ctx.beginPath();
  ctx.rect(0, 0, 1300, 800);
  ctx.fillStyle = "black";
  ctx.fill();
}

ZombiePlayeroom.prototype.draw = function () {
  // this.levelOne.play()
  // this.levelTwo.play();
  this.levelThree.play();

};


module.exports = ZombiePlayeroom;
