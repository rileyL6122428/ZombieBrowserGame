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
  }
};
