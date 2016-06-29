var ScrollingUtil = require('./scrolling_util');
var TitleScreen = require('./levels/title');
var HowToPlay = require('./levels/how_to_play');
var LevelOne = require('./levels/level_one');
var LevelTwo = require('./levels/level_two');
var LevelThree = require('./levels/level_three');
var LevelFour = require('./levels/level_four');
var LevelFive = require('./levels/level_five');
var EndGame = require('./levels/end_game');


function ZombiePlayeroom (ctx) {
  this.ctx = ctx
  this.currentLevelNumber = 0;
  this.highestLevel = 1;

  this.instantiateNewLevel();
  this.instantiationNeeded = false;
  this.returningToTitleScreen = false;

  this.drawBackground();
}

ZombiePlayeroom.prototype.draw = function () {
  ScrollingUtil.manageScrolling();
  this.currentLevel.play();
  this.manageLevelTransitions();
};

ZombiePlayeroom.prototype.instantiateNewLevel = function () {
  switch (this.currentLevelNumber) {
    case  0: this.currentLevel = new TitleScreen(this.ctx, this.highestLevel); break;
    case .5: this.currentLevel = new HowToPlay(this.ctx);  break;
    case  1: this.currentLevel = new LevelOne(this.ctx);   break;
    case  2: this.currentLevel = new LevelTwo(this.ctx);   break;
    case  3: this.currentLevel = new LevelThree(this.ctx); break;
    case  4: this.currentLevel = new LevelFour(this.ctx);  break;
    case  5: this.currentLevel = new LevelFive(this.ctx);  break;
    case  6: this.currentLevel = new EndGame(this.ctx);    break;
  }
};

ZombiePlayeroom.prototype.handleLevelLoss = function () {
  this.returningToTitleScreen = true;
  if(this.currentLevel.finished()) {
    this.currentLevelNumber = 0;
    this.instantiateNewLevel()
  }
};

ZombiePlayeroom.prototype.leaveHowToPlay = function () {
  this.currentLevelNumber = 0;
  this.instantiateNewLevel();
};

ZombiePlayeroom.prototype.goToSelectedLevel = function () {
  this.currentLevelNumber = this.currentLevel.levelSelected;
  this.currentLevel.levelSelected = false;
  this.instantiateNewLevel();
};

ZombiePlayeroom.prototype.changeCurrentLevel = function () {
  if(this.currentLevelNumber === 6) {
    this.currentLevelNumber = 0;
  } else {
    this.currentLevelNumber += 1;
    this.highestLevel = Math.max(this.highestLevel, this.currentLevelNumber);
    this.highestLevel = Math.min(this.highestLevel, 5);
  }
  this.instantiateNewLevel();
};

ZombiePlayeroom.prototype.manageLevelTransitions = function () {
  if (this.currentLevel.lost()) {
    this.handleLevelLoss();
  } else if (this.currentLevelNumber >= 1 && this.currentLevel.finished()) {
      this.changeCurrentLevel();
  } else if (this.currentLevelNumber === 0.5 && this.currentLevel.finished()){
    this.leaveHowToPlay();
  } else {
    if( this.currentLevel.levelSelected ) { this.goToSelectedLevel(); }
  }
};

ZombiePlayeroom.prototype.drawBackground = function () {
  this.ctx.beginPath();
  this.ctx.rect(0, 0, 1300, 800);
  this.ctx.fillStyle = "black";
  this.ctx.fill();
};




module.exports = ZombiePlayeroom;
