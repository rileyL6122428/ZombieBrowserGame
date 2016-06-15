var LevelOne = require('./levels/level_one');
var LevelTwo = require('./levels/level_two');
var LevelThree = require('./levels/level_three');
var LevelFour = require('./levels/level_four');


function ZombiePlayeroom (ctx) {

  // this.levelOne = new LevelOne(ctx)
  // this.levelTwo = new LevelTwo(ctx)
  // this.levelThree = new LevelThree(ctx)
  this.levelFour = new LevelFour(ctx)

  ctx.beginPath();
  ctx.rect(0, 0, 1300, 800);
  ctx.fillStyle = "black";
  ctx.fill();
}

ZombiePlayeroom.prototype.draw = function () {
  // this.levelOne.play()
  // this.levelTwo.play();
  // this.levelThree.play();
  this.levelFour.play();

};


module.exports = ZombiePlayeroom;
