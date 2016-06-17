var GameView = require('./lib/game_view');


var canvasEl = document.getElementById("game-canvas");
var ctx = canvasEl.getContext('2d');
ctx.canvas.height = 750;
ctx.canvas.width  = 1300;

var gameView = new GameView(ctx, canvasEl.width, canvasEl.height);
gameView.start();
