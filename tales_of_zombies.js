var GameView = require('./lib/game_view');


var canvasEl = document.getElementById("game-canvas");
      // canvasEl.height = window.innerHeight;
      // canvasEl.width = window.innerWidth;
      console.log(canvasEl.height);
      var ctx = canvasEl.getContext('2d');
      ctx.fillStyle = "red";
      ctx.fillRect(20,30,40,50);

var gameView = new GameView(ctx, canvasEl.width, canvasEl.height);
      gameView.start();
