module.exports = {
  warpPlayerIn: function (level) {
    level.player.warpDown(true)
    level.enterPlayer = true;
    setTimeout(function () {
      level.phase += 1;
    }, 300)
  },

  warpPlayerOut: function (level) {
    level.player.warpDown(false, true)
    setTimeout(function(){
      level.playerExited = true
    }, 400)
  },

  lost: function (zombies) {
    for (var i = 0; i < zombies.length; i++) {
      if(zombies[i].playerCaptured()) { return true; }
    }
    return false;
  },

  lostAnimation: function(player, ctx, level) {
    flicker1 = setInterval(function () {
      player.animate(ctx);
    }, 100)
    setTimeout(function () { clearInterval(flicker1) }, 210);

    setTimeout(function () {
      flicker2 = setInterval(function () {
        player.animate(ctx);
      }, 100)
      setTimeout(function() { clearInterval(flicker2) }, 310);
    }, 400);

    var fadeSpritePositions = [[0,0], [0,0], [0,0], [0,0]];
    var fadeSpriteDeltas = [[10, 10], [10, -10], [-10, 10], [-10, -10]];
    var fadeAlpha = 1;

    setTimeout(function () {
      fadeAway = setInterval(function () {
        ctx.globalAlpha = fadeAlpha;
        for(var i = 0; i < fadeSpritePositions.length; i++) {
          fadeSpritePositions[i] = [
            fadeSpritePositions[i][0] + fadeSpriteDeltas[i][0],
            fadeSpritePositions[i][1] + fadeSpriteDeltas[i][1]
          ]
          ctx.translate(fadeSpritePositions[i][0], fadeSpritePositions[i][1])
          player.animate(ctx)
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
        ctx.globalAlpha = 1;
        fadeAlpha -= 0.1;
      }, 100)

      setTimeout(function () {
        clearInterval(fadeAway);
        level.lostAnimationCompleted = true;
      }, 900)
    }, 800)
  },

  endGameAnimation: function (endScreen) {
    // var image = document.getElementById('player_spread');
    thanks = setInterval(function () {
      endScreen.ctx.fillStyle = "white";
      endScreen.ctx.font = "48px serif"
      endScreen.ctx.fillText("THANKS FOR PLAYING", 300, 280);
    },20)

    setTimeout(function () {
      clearInterval(thanks);
      endScreen.endSequenceFinished = true;
    }, 2000)
  }
};
