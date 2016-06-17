var Util = require('./util.js');

function EndGame (ctx) {
  this.ctx = ctx;
  this.endAnimationStarted = false;
  this.endSequenceFinished = false;
}

EndGame.prototype.finished = function () {
  return this.endSequenceFinished;
};

EndGame.prototype.lost = function () {
  return false;
};

EndGame.prototype.play = function () {
  if (!this.endAnimationStarted) {
    Util.endGameAnimation(this);
    this.endAnimationStarted = true;
  }
};

module.exports = EndGame;
