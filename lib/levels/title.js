function TitleScreen(ctx, highestLevelReached) {
  this.ctx = ctx;
  this.highestLevel = highestLevelReached;
  this.scrollIdx = 0;
  this.centerHoriz = 127;
  this.centerVer = 0;
  this.inputReady = true;
  this.levelSelected = false;
}

TitleScreen.prototype.play = function () {
  this.render();
  this.manageOptionScroll();
};

TitleScreen.prototype.render = function () {
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0,0,1200,700);

  this.ctx.font = "48px serif";
  this.ctx.fillStyle = "white";
  this.ctx.fillText("Tales of Zomphonia", 270 + this.centerHoriz, 120 + this.centerVer);

  this.handleSelectionRendering(0);
  this.ctx.fillText("Level 1", 435 + this.horizonOffset(0), 200 + this.centerVer);

  this.handleSelectionRendering(1);
  this.ctx.fillText("Level 2", 435 + this.horizonOffset(1), 240 + this.centerVer);

  this.handleSelectionRendering(2);
  this.ctx.fillText("Level 3", 435 + this.horizonOffset(2), 280 + this.centerVer);

  this.handleSelectionRendering(3);
  this.ctx.fillText("Level 4", 435 + this.horizonOffset(3), 320 + this.centerVer);

  this.handleSelectionRendering(4);
  this.ctx.fillText("Level 5", 435 + this.horizonOffset(4), 360 + this.centerVer);

  this.handleSelectionRendering(5);
  this.ctx.fillText("How to PLAY", 410 + this.centerHoriz, 420 + this.centerVer);

  this.ctx.globalAlpha = 1;
  this.ctx.font = "18px serif";

  var directionsHorizontalOffset = 23;
  this.ctx.fillText(
    "Use the arrow keys to navigate",
    455 + directionsHorizontalOffset, 490
  );

  this.ctx.fillText(
    "Press space to choose",
    490 + directionsHorizontalOffset, 520
  );

  this.ctx.fillText(
    "To scroll, hold 'u'",
    510 + directionsHorizontalOffset, 550

  )
};

TitleScreen.prototype.handleSelectionRendering = function (optionIdx) {
  if(optionIdx === this.scrollIdx) {
    this.ctx.globalAlpha = 1;
    this.ctx.font = "24px serif";
  } else {
    this.ctx.globalAlpha = 0.5;
    this.ctx.font = "18px serif";
  }
};

TitleScreen.prototype.horizonOffset = function (optionIdx) {
  if(optionIdx === this.scrollIdx) {
    if(this.scrollIdx === 5) { return (this.centerHoriz - 60); }
    return (this.centerHoriz - 10);
  } else {
    return (this.centerHoriz);
  }
};

TitleScreen.prototype.manageOptionScroll = function () {

  if(this.inputReady) {
    if(key.isPressed("up")) {
      this.scrollUp();
    }
    if(key.isPressed("down")) {
      this.scrollDown();
    }
    this.readyNextInput()
  }

  if(key.isPressed("space") || key.isPressed("enter")) {
    if(this.scrollIdx === 5) {
      this.levelSelected = 0.5
    } else {

      this.levelSelected = this.scrollIdx + 1
    }
  }
};

TitleScreen.prototype.scrollDown = function () {
  this.scrollIdx = (this.scrollIdx + 1) % 6
  while (!this.validIdx()) {
    this.scrollIdx = (this.scrollIdx + 1) % 6
  }
};

TitleScreen.prototype.scrollUp = function () {
  this.scrollIdx = (this.scrollIdx - 1)
  if(this.scrollIdx === - 1) { this.scrollIdx = 5; }

  while (!this.validIdx()) {
    this.scrollIdx = (this.scrollIdx - 1) % 6
  }
};

TitleScreen.prototype.readyNextInput = function () {
  this.inputReady = false;

  var self = this;
  setTimeout(function () {
    self.inputReady = true;
  }, 110)
};

TitleScreen.prototype.validIdx = function () {
  switch(this.highestLevel) {
    case 1: return [0, 5].includes(this.scrollIdx);          break;
    case 2: return [0, 1, 5].includes(this.scrollIdx);       break;
    case 3: return [0, 1, 2, 5].includes(this.scrollIdx);    break;
    case 4: return [0, 1, 2, 3, 5].includes(this.scrollIdx); break;
    case 5: return true;                                     break;
  }
};

TitleScreen.prototype.lost = function () {
  return false;
};

//OPTIONS:IDX
//Level1:0
//Level2:1
//Level3:2
//Level4:3
//Level5:4
//How To Play:5

module.exports = TitleScreen;
