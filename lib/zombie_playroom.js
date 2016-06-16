var LevelOne = require('./levels/level_one');
var LevelTwo = require('./levels/level_two');
var LevelThree = require('./levels/level_three');
var LevelFour = require('./levels/level_four');
var LevelFive = require('./levels/level_five');


function ZombiePlayeroom (ctx) {

  this.ctx = ctx
  this.currentLevelNumber = 1;
  this.instantiateNewLevel();
  this.instantiationNeeded = false;

  ctx.beginPath();
  ctx.rect(0, 0, 1300, 800);
  ctx.fillStyle = "black";
  ctx.fill();
}

ZombiePlayeroom.prototype.draw = function () {
  this.currentLevel.play()
  if (this.currentLevel.finished()) {
    this.currentLevelNumber += 1;
    this.instantiateNewLevel();
  }
};

ZombiePlayeroom.prototype.instantiateNewLevel = function () {
  switch (this.currentLevelNumber) {
    case 1: this.currentLevel = new LevelOne(this.ctx);   break;
    case 2: this.currentLevel = new LevelTwo(this.ctx);   break;
    case 3: this.currentLevel = new LevelThree(this.ctx); break;
    case 4: this.currentLevel = new LevelFour(this.ctx);  break;
    case 5: this.currentLevel = new LevelFive(this.ctx);  break;
  }
};


module.exports = ZombiePlayeroom;
