var GameView = require('./lib/game_view');


var canvasEl = document.getElementById("game-canvas");

      var ctx = canvasEl.getContext('2d');
      ctx.fillRect(20,30,40,50);
      ctx.canvas.height = 750;
      ctx.canvas.width  = 1300;
      ctx.fillStyle = "red";

var gameView = new GameView(ctx, canvasEl.width, canvasEl.height);
      gameView.start();
