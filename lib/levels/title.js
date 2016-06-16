function TitleScreen(ctx) {
  this.ctx = ctx;
  this.highestLevel = 1;
  this.scrollIdx = 0;
  this.centerHoriz = 0;
  this.centerVer = 0;
  this.inputReady = true;
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
  this.ctx.fillText("Tales of Zombies", 300 + this.centerHoriz, 120 + this.centerVer);

  this.handleSelectionRendering(0);
  this.ctx.fillText("Level 1", 435 + this.centerHoriz, 200 + this.centerVer);

  this.handleSelectionRendering(1);
  this.ctx.fillText("Level 2", 435 + this.centerHoriz, 240 + this.centerVer);

  this.handleSelectionRendering(2);
  this.ctx.fillText("Level 3", 435 + this.centerHoriz, 280 + this.centerVer);

  this.handleSelectionRendering(3);
  this.ctx.fillText("Level 4", 435 + this.centerHoriz, 320 + this.centerVer);

  this.handleSelectionRendering(4);
  this.ctx.fillText("Level 5", 435 + this.centerHoriz, 360 + this.centerVer);

  this.handleSelectionRendering(5);
  this.ctx.fillText("How to PLAY", 410, 420);

  this.ctx.globalAlpha = 1;
};

var unselectedOpacity = 0.5;
var selectedOpacity = 1;
var selectedSize = "24px serif";
var unselectedSize = "18px serif";

TitleScreen.prototype.handleSelectionRendering = function (optionIdx) {
  if(optionIdx === this.scrollIdx) {
    this.ctx.globalAlpha = selectedOpacity;
    this.ctx.font = selectedSize;
  } else {
    this.ctx.globalAlpha = unselectedOpacity;
    this.ctx.font = unselectedSize;
  }
};

TitleScreen.prototype.manageOptionScroll = function () {

  if(this.inputReady) {
    if(key.isPressed("up")) {
      this.scrollUp();
      // console.log("test up");
    }
    if(key.isPressed("down")) {
      this.scrollDown();
      // console.log("test down");
    }
    this.readyNextInput()
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



//OPTIONS:IDX
//Level1:0
//Level2:1
//Level3:2
//Level4:3
//Level5:4
//How To Play:5

module.exports = TitleScreen;
