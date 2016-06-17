function HowToPlay(ctx) {
  this.ctx = ctx;
  this.centerVer = 0;
  this.centerHor = 0;
}

HowToPlay.prototype.play = function () {
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0,0,1200,700);

  this.ctx.font = "48px serif";
  this.ctx.fillStyle = "white";
  this.ctx.fillText("How to PLAY", 300 + this.centerHor, 120 + this.centerVer);

  this.ctx.font = "24px serif"
  this.ctx.fillText("CONTROLS :", 281 + this.centerHor, 170 + this.centerVer);
  this.ctx.fillText("LEVEL PROGRESSION :", 160 + this.centerHor, 260 + this.centerVer);
  this.ctx.fillText("ZOMBIES :", 300 + this.centerHor, 350 + this.centerVer);
  this.ctx.fillText("TO TITLE SCREEN :", 204 + this.centerHor, 400 + this.centerVer);

  this.ctx.fillText(
    "Use the arrow keys to move. Hold space and press",
    500 + this.centerHor, 170 + this.centerVer
  )

  this.ctx.fillText(
    "a direction to warp. Warp cooldown is 3 seconds.",
    500 + this.centerHor, 210 + this.centerVer
  )

  this.ctx.fillText(
    "Light all torches to progress to the next level.",
    500 + this.centerHor, 260 + this.centerVer
  );
  this.ctx.fillText(
    "Torches are lit by standing near them.",
    500 + this.centerHor, 300 + this.centerVer
  )

  this.ctx.fillText(
    "E-V-A-D-E.",
    500 + this.centerHor, 350 + this.centerVer
  );

  this.ctx.fillText(
    "Press enter.",
    500 + this.centerHor, 400 + this.centerVer
  )

};

HowToPlay.prototype.finished = function () {
  return key.isPressed("enter");
};

HowToPlay.prototype.lost = function () {
  return false;
};

module.exports = HowToPlay;
