/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var GameView = __webpack_require__(1);
	
	
	var canvasEl = document.getElementById("game-canvas");
	var ctx = canvasEl.getContext('2d');
	ctx.canvas.height = 750;
	ctx.canvas.width  = 1192;
	
	var gameView = new GameView(ctx, canvasEl.width, canvasEl.height);
	gameView.start();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var ZombiePlayroom = __webpack_require__(2);
	
	function GameView (ctx, width, height) {
	  this.ctx = ctx;
	  this.game = new ZombiePlayroom(ctx);
	  this.viewWidth = width;
	  this.viewHeight = height;
	  this.frameRate = 50;
	}
	
	GameView.prototype.start = function () {
	  var self = this;
	  var interval = setInterval( function () {
	    self.game.draw();
	  }, 1000/this.frameRate);
	
	};
	
	module.exports = GameView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var ScrollingUtil = __webpack_require__(3);
	var TitleScreen = __webpack_require__(4);
	var HowToPlay = __webpack_require__(5);
	var LevelOne = __webpack_require__(6);
	var LevelTwo = __webpack_require__(15);
	var LevelThree = __webpack_require__(16);
	var LevelFour = __webpack_require__(18);
	var LevelFive = __webpack_require__(20);
	var EndGame = __webpack_require__(21);
	
	
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	
	var keys = {32:1, 37: 1, 38: 1, 39: 1, 40: 1};
	
	function enableScroll() {
	    if (window.removeEventListener)
	        window.removeEventListener('DOMMouseScroll', preventDefault, false);
	    window.onmousewheel = document.onmousewheel = null;
	    window.onwheel = null;
	    window.ontouchmove = null;
	    document.onkeydown = null;
	}
	
	function disableScroll() {
	  if (window.addEventListener) // older FF
	      window.addEventListener('DOMMouseScroll', preventDefault, false);
	  window.onwheel = preventDefault; // modern standard
	  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	  window.ontouchmove  = preventDefault; // mobile
	  document.onkeydown  = preventDefaultForScrollKeys;
	}
	
	function preventDefault(e) {
	  e = e || window.event;
	  if (e.preventDefault)
	      e.preventDefault();
	  e.returnValue = false;
	}
	
	function preventDefaultForScrollKeys(e) {
	    if (keys[e.keyCode]) {
	        preventDefault(e);
	        return false;
	    }
	}
	
	module.exports = {
	  manageScrolling: function() {
	    disableScroll();
	    if(key.isPressed("u")) { enableScroll() }
	  }
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

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
	  this.ctx.fillText(
	    "Level 1",
	    435 + this.horizonOffset(0),
	    200 + this.centerVer
	  );
	
	  this.handleSelectionRendering(1);
	  this.ctx.fillText(
	    this.levelSelectionText(2),
	    435 + this.horizonOffset(1),
	    240 + this.centerVer
	  );
	
	  this.handleSelectionRendering(2);
	  this.ctx.fillText(
	    this.levelSelectionText(3),
	    435 + this.horizonOffset(2),
	    280 + this.centerVer
	  );
	
	  this.handleSelectionRendering(3);
	  this.ctx.fillText(
	    this.levelSelectionText(4),
	    435 + this.horizonOffset(3),
	    320 + this.centerVer
	  );
	
	  this.handleSelectionRendering(4);
	  this.ctx.fillText(
	    this.levelSelectionText(5),
	    435 + this.horizonOffset(4),
	    360 + this.centerVer
	  );
	
	  this.handleSelectionRendering(5);
	  this.ctx.fillText(
	    "How to PLAY",
	    410 + this.centerHoriz + this.horizonOffset(5),
	    420 + this.centerVer
	  );
	
	  this.ctx.globalAlpha = 1;
	  this.ctx.font = "18px serif";
	
	  var directionsHorizontalOffset = 23;
	  this.ctx.fillText(
	    "Use the arrow keys to navigate",
	    457 + directionsHorizontalOffset, 490
	  );
	
	  this.ctx.fillText(
	    "Press space or enter to choose",
	    460 + directionsHorizontalOffset, 520
	  );
	
	  this.ctx.fillText(
	    "To scroll, hold 'u'",
	    510 + directionsHorizontalOffset, 550
	  )
	};
	
	
	
	TitleScreen.prototype.levelSelectionText = function (levelNumber) {
	  if(this.highestLevel >= levelNumber) {
	    return ("Level " + levelNumber);
	  } else {
	    return "Locked";
	  }
	};
	
	TitleScreen.prototype.handleSelectionRendering = function (optionIdx) {
	  if(optionIdx === this.scrollIdx  && optionIdx === 5) {
	    this.ctx.globalAlpha = 1;
	    this.ctx.font = "24px serif";
	  } else if (optionIdx === this.scrollIdx) {
	    this.ctx.globalAlpha = 1;
	    this.ctx.font = "24px serif";
	  }
	   else {
	    this.ctx.globalAlpha = 0.5;
	    this.ctx.font = "18px serif";
	  }
	};
	
	TitleScreen.prototype.horizonOffset = function (optionIdx) {
	  if(optionIdx === this.scrollIdx) {
	    if(this.scrollIdx === 5) { return (-13); }
	    return (this.centerHoriz - 10);
	  } else {
	    if(optionIdx === 5) { return -2;}
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
	
	module.exports = TitleScreen;


/***/ },
/* 5 */
/***/ function(module, exports) {

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
	    "Press b.",
	    500 + this.centerHor, 400 + this.centerVer
	  )
	
	};
	
	HowToPlay.prototype.finished = function () {
	  return key.isPressed("b");
	};
	
	HowToPlay.prototype.lost = function () {
	  return false;
	};
	
	module.exports = HowToPlay;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(7);
	var Level = __webpack_require__(8);
	var Torch = __webpack_require__(10);
	var Wall = __webpack_require__(11);
	var Player = __webpack_require__(12);
	var NormalZombie = __webpack_require__(13);
	
	function LevelOne(ctx) {
	  this.ctx = ctx;
	  Level.call(this);
	
	  this.fadeInTextHeader = "LEVEL 1"
	  this.fadeInTextSubtitle = "We all start somewhere."
	
	  this.fadeOutTextHeader = "LEVEL 2"
	  this.fadeOutTextSubtitle = "Doing great."
	
	  this.player = new Player(100, 420, ctx);
	
	  this.torches = [
	    new Torch(80, 60, this.player),
	    new Torch(580, 250, this.player),
	    new Torch(1080, 60, this.player)
	  ];
	
	  this.wall = new Wall (600, 320, 1100, 600, this.player);
	  this.unmovingObjs = [this.wall].concat(this.torches);
	
	  this.normalZombies = [
	    new NormalZombie(240,  95, this.player, 0),
	    new NormalZombie(300, 340, this.player, 0),
	    new NormalZombie(480, 520, this.player, 0),
	    new NormalZombie(900, 130, this.player, 0),
	    new NormalZombie(780, 380, this.player, 0)
	  ];
	  this.registerHerd();
	  this.zombies = this.normalZombies;
	
	  this.movingObjs = this.normalZombies.concat(this.player)
	}
	
	Util.inherits(LevelOne, Level);
	
	LevelOne.prototype.registerHerd = function () {
	  for (var i = 0; i < this.normalZombies.length; i++) {
	    for (var j = 0; j < this.normalZombies.length; j++) {
	      if(i !== j) {
	        this.normalZombies[i].registerOtherZombie(this.normalZombies[j])
	      }
	    }
	  }
	};
	
	
	
	
	
	
	module.exports = LevelOne;


/***/ },
/* 7 */
/***/ function(module, exports) {

	var Util = {
	  render_circle: function ( radius, color, ctx) {
	    ctx.fillStyle = color;
	    ctx.beginPath();
	
	    ctx.arc(
	      this.x,
	      this.y,
	      radius,
	      0,
	      2 * Math.PI,
	      false
	    );
	
	    ctx.fill();
	  },
	
	  inherits: function (child, parent) {
	    var Surrogate = function () {};
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate();
	    child.prototype.constructor = child;
	  },
	
	  distance: function (x1, x2, y1, y2) {
	    return Math.sqrt( Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) );
	  },
	
	  direction: function (theta) {
	    if (theta <  Math.PI / 4 && theta > -1 * Math.PI / 4)    { return "RIGHT"; }
	    if (theta < -Math.PI / 4 && theta > -3 * Math.PI / 4)    { return "DOWN";  }
	    if (theta >  Math.PI / 4 && theta <  3 * Math.PI / 4)    { return "UP";    }
	    if (theta <=  Math.PI     && theta >  3 * Math.PI / 4 ||
	        theta > -Math.PI     && theta < -3 * Math.PI / 4)    { return "LEFT";  }
	
	  },
	
	  limitVector: function (vector, limit) {
	    var oldMagnitude = this.distance(0, vector[0], 0, vector[1]);
	    if (oldMagnitude < limit) { return vector }
	    var normalizer = limit / oldMagnitude;
	    return [ vector[0] * normalizer, vector[1] * normalizer];
	  }
	}
	
	module.exports = Util;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(9);
	
	function Level() {
	  this.phase = 0;
	  this.beginFadeIn = false;
	  this.loaded = false;
	  this.enterPlayer = false;
	  this.playerExited = false;
	  this.backDropOpacity = 1;
	  this.lostAnimationCalled = false;
	  this.lostAnimationCompleted = false;
	  this.showSubitle = false;
	}
	
	Level.prototype.allTorchesLit = function () {
	  for (var i = 0; i < this.torches.length; i++) {
	    if(!this.torches[i].lit) { return false; }
	  }
	  return true;
	};
	
	Level.prototype.animateZombies = function () {
	  var self = this
	  this.zombies.forEach(function(zombie) {
	    zombie.animate(self.ctx)
	  });
	};
	
	Level.prototype.animateMovingObjects = function () {
	  var self = this
	  this.movingObjs.forEach(function(obj) {
	    obj.animate(self.ctx)
	  });
	};
	
	Level.prototype.renderUnmovingObjects = function () {
	  var self = this
	  this.unmovingObjs.forEach(function(obj) {
	    obj.render(self.ctx)
	  });
	};
	
	Level.prototype.render = function () {
	  this.renderUnmovingObjects();
	  this.animateMovingObjects();
	};
	
	Level.prototype.levelWon = function () {
	  return this.allTorchesLit();
	};
	
	Level.prototype.moveZombies = function () {
	  this.zombies.forEach(function(zombie) {
	    zombie.doZombieThings();
	  });
	};
	
	Level.prototype.managePlayerMovement = function () {
	  this.player.moving = false;
	  if(key.isPressed("space")) {
	    if(key.isPressed("up") && this.player.warpReady) { this.player.warpUp(); }
	    if(key.isPressed("down") && this.player.warpReady) { this.player.warpDown(); }
	    if(key.isPressed("right") && this.player.warpReady) { this.player.warpRight(); }
	    if(key.isPressed("left") && this.player.warpReady) { this.player.warpLeft(); }
	  }
	
	  if(!this.player.warping) {
	    if(key.isPressed("up")) { this.player.moveUp(); }
	    if(key.isPressed("down")) { this.player.moveDown(); }
	    if(key.isPressed("right")) { this.player.moveRight(); }
	    if(key.isPressed("left")) { this.player.moveLeft(); }
	  }
	  this.wall.containPlayer();
	};
	
	Level.prototype.manageInteraction = function () {
	  this.moveZombies();
	  this.managePlayerMovement();
	};
	
	Level.prototype.play = function () {
	  switch (this.phase) {
	    case 0: this.setup();      break;
	    case 1: this.executeBeg(); break;
	    case 2: this.executeMid(); break;
	    case 3: this.executeEnd(); break;
	  }
	};
	
	Level.prototype.setup = function () {
	  this.phase += 1
	  var self = this
	  setTimeout(function() { self.beginFadeIn = true }, 1600)
	  setTimeout(function() { self.showSubitle = true}, 800);
	};
	
	Level.prototype.executeBeg = function () {
	  if(!this.enterPlayer){
	    this.renderUnmovingObjects();
	    this.animateZombies();
	  } else {
	    this.render();
	  }
	  if (!this.loaded && this.backDropOpacity > 0) { this.drawCurtains(); }
	  if (this.beginFadeIn && !this.loaded) { this.fadeIn() }
	};
	
	Level.prototype.fadeIn = function () {
	  if (this.backDropOpacity > 0) {
	    this.backDropOpacity -= 0.01;
	  } else {
	    this.loaded = true;
	    Util.warpPlayerIn(this);
	  }
	};
	
	Level.prototype.fadeOut = function () {
	  this.backDropOpacity += 0.01;
	  if (this.backDropOpacity > 1) { this.phase += 1}
	};
	
	Level.prototype.drawCurtains = function () {
	  this.ctx.globalAlpha = this.backDropOpacity
	  this.ctx.fillStyle = "black";
	  this.ctx.fillRect(0,0,1200,700);
	
	  this.ctx.fillStyle = "white"
	  if(!this.lost()) { this.ctx.fillText(this.fadeInTextHeader, 100, 100); }
	
	  this.ctx.fillStyle = "red"
	  if(this.phase === 1 && this.showSubitle) { this.ctx.fillText(this.fadeInTextSubtitle, 100, 140); }
	  // if(this.phase !== 1 && !this.lost()) { this.ctx.fillText(this.fadeOutTextSubtitle, 100, 140)}
	
	  this.ctx.globalAlpha = 1;
	};
	
	Level.prototype.executeMid = function () {
	  if(this.levelWon()) {
	    this.phase += 1;
	    Util.warpPlayerOut(this)
	  } else if(this.lost()) {
	    this.renderUnmovingObjects();
	    this.animateZombies();
	    if(!this.lostAnimationCalled) {
	      this.lostAnimationCalled = true;
	      var self = this;
	      Util.lostAnimation(self.player, self.ctx, self);
	    }
	    if(this.lostAnimationCompleted) { this.phase = 3; }
	  } else {
	    this.render();
	    this.manageInteraction();
	  }
	};
	
	Level.prototype.executeEnd = function () {
	  if(this.playerExited || this.lost()) {
	    this.renderUnmovingObjects();
	    this.animateZombies();
	    this.fadeOut()
	    this.drawCurtains();
	  } else {
	    this.render()
	  }
	};
	
	Level.prototype.finished = function () {
	  return (this.phase === 4);
	};
	
	Level.prototype.lost = function () {
	  return Util.lost(this.zombies);
	};
	
	module.exports = Level


/***/ },
/* 9 */
/***/ function(module, exports) {

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


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(7);
	
	function Torch (x, y, player) {
	  this.x = x;
	  this.y = y;
	  this.lit = false;
	  this.player = player;
	
	  this.torchImage = document.getElementById("torch-base");
	  this.fireImage = document.getElementById('fire')
	
	}
	
	Torch.prototype.checkLitStatus = function () {
	  if (Util.distance(this.x + 10, this.player.x, this.y + 10, this.player.y) < 30){
	    this.lit = true;
	  }
	};
	
	Torch.prototype.render = function (ctx) {
	  ctx.drawImage(this.torchImage, 231, 171, 18, 54, this.x, this.y, 18, 48);
	  this.checkLitStatus();
	  var millisecondCounter = (new Date()).getMilliseconds();
	  if(this.lit) {
	    if (millisecondCounter < 250) {
	      ctx.drawImage(this.fireImage, 40, 0, 12, 25, this.x - 4, this.y - 10, 18, 28);
	    } else if (millisecondCounter >= 250 && millisecondCounter < 500){
	      ctx.drawImage(this.fireImage, 72, 0, 12, 25, this.x - 4, this.y - 10, 18, 28);
	    } else if (millisecondCounter >= 500 && millisecondCounter < 750) {
	      ctx.drawImage(this.fireImage, 104, 0, 12, 25, this.x - 4, this.y - 10, 18, 28);
	    } else  {
	      ctx.drawImage(this.fireImage, 136, 0, 12, 25, this.x - 4, this.y - 10, 18, 28);
	    }
	  }
	};
	
	module.exports = Torch;


/***/ },
/* 11 */
/***/ function(module, exports) {

	function Wall (x, y, width, height, player) {
	  this.x = x;
	  this.y = y;
	  this.width = width;
	  this.height = height;
	  this.player = player;
	
	  this.image = document.getElementById("environment2");
	
	  this.image2 = document.getElementById("environment");
	}
	
	Wall.prototype.containPlayer = function () {
	  if (this.player.x > this.x + this.width / 2) {
	    this.player.x = this.x + this.width / 2;
	  }
	  if (this.player.x < this.x - this.width / 2) {
	    this.player.x = this.x - this.width / 2;
	  }
	  if (this.player.y < this.y - this.height / 2) {
	    this.player.y = this.y - this.height / 2;
	  }
	  if (this.player.y > this.y + this.height / 2) {
	    this.player.y = this.y + this.height / 2;
	  }
	};
	
	Wall.prototype.render = function (ctx) {
	  ctx.clearRect(this.x, this.y, self.width, self.height);
	
	  //floor
	  ctx.drawImage(
	    this.image2,
	    10,
	    8,
	    25,
	    20,
	    this.x - this.width/2 - 15,
	    this.y - this.height/2 - 20,
	    this.width + 23,
	    this.height + 32
	  );
	  //top and bottom
	  for (var i = 0; i < 38; i++) {
	    ctx.drawImage(this.image, 97, 290, 30, 36, 40 + i * 30, -12, 30, 36);
	    ctx.drawImage(this.image, 97, 290, 30, 44, 35 + i * 30, 632, 30, 44);
	  }
	
	  //left & right border
	  for (var i = 0; i < 27; i++) {
	    ctx.drawImage(this.image, 86,275,20,23,15,20 + 23 * i ,20,23);
	    ctx.drawImage(this.image, 86,275,20,23,1156,20 + 23 * i ,20,23);
	  }
	
	  //top left corner
	  ctx.drawImage(this.image, 89, 260, 30, 32, 17, -12, 35, 34);
	  //top right corner
	  ctx.drawImage(this.image, 109, 260, 30, 32, 1146, -10, 33, 35);
	  //bottom right corner
	  ctx.drawImage(this.image, 115, 285, 25, 35, 1153, 627, 27, 35);
	  //bottom left corner
	  ctx.drawImage(this.image, 83, 285, 25, 35, 12, 627, 27, 35);
	
	};
	
	Wall.prototype.rightBoundary = function () {
	  return (this.x + this.width / 2);
	};
	
	Wall.prototype.leftBoundary = function () {
	  return (this.x - this.width / 2);
	};
	
	Wall.prototype.topBoundary = function () {
	  return (this.y - this.height / 2);
	};
	
	Wall.prototype.bottomBoundary = function () {
	  return(this.y + this.height / 2);
	};
	
	
	module.exports = Wall;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(7)
	
	function Player(x, y, ctx){
	  this.x = x;
	  this.y = y;
	  this.ctx = ctx
	  this.facing = "DOWN";
	  this.moving = false;
	  this.speed = 5;
	  this.image = document.getElementById('player_spread');
	  this.width = 30;
	  this.height = 44;
	
	  this.xOffset = 20;
	
	  this.warping = false;
	  this.warpReady = true;
	}
	
	Player.prototype.animate = function (ctx) {
	  // util.render_circle.call(this, 25, "blue", ctx);
	  if(!this.warping) {this.animateRegular(ctx);}
	};
	
	
	Player.prototype.moveUp = function () {
	
	  this.y -= this.speed;
	  this.moving = true;
	  this.facing = "UP";
	};
	
	Player.prototype.moveDown = function () {
	  this.y += this.speed;
	  this.moving = true;
	  this.facing = "DOWN";
	};
	
	Player.prototype.moveRight = function () {
	  this.x += this.speed;
	  this.moving = true;
	  this.facing = "RIGHT";
	};
	
	Player.prototype.moveLeft = function () {
	  this.x -= this.speed;
	  this.moving = true;
	  this.facing = "LEFT";
	};
	
	Player.prototype.animateRegular = function (ctx) {
	  switch (this.facing) {
	    case "DOWN" :this.animateDown(ctx);  break;
	    case "UP"   :this.animateUp(ctx);    break;
	    case "RIGHT":this.animateRight(ctx); break;
	    case "LEFT" :this.animateLeft(ctx);  break;
	  }
	};
	
	Player.prototype.animateDown = function (ctx) {
	  var millisecondCounter = (new Date()).getMilliseconds();
	
	  if (millisecondCounter < 250 && this.moving) {
	    ctx.drawImage(this.image, 69, 67, 21, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
	  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.moving) {
	    ctx.drawImage(this.image, 121, 67, 21, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
	  } else  {
	    ctx.drawImage(this.image, 95, 67, 21, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
	  }
	};
	
	Player.prototype.animateUp = function (ctx) {
	  var millisecondCounter = (new Date()).getMilliseconds();
	
	  if (millisecondCounter < 250 && this.moving) {
	    ctx.drawImage(this.image, 69, 1, 21, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
	  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.moving) {
	    ctx.drawImage(this.image, 121, 1, 21, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
	  } else  {
	    ctx.drawImage(this.image, 95, 1, 21, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
	  }
	};
	
	Player.prototype.animateRight = function (ctx) {
	  var millisecondCounter = (new Date()).getMilliseconds();
	
	  if (millisecondCounter < 250 && this.moving) {
	    ctx.drawImage(this.image, 70, 33, 23, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
	  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.moving) {
	    ctx.drawImage(this.image, 120, 33, 22, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
	  } else  {
	    ctx.drawImage(this.image, 95, 33, 21, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
	  }
	};
	
	Player.prototype.animateLeft = function (ctx) {
	  var millisecondCounter = (new Date()).getMilliseconds();
	
	  if (millisecondCounter < 250 && this.moving) {
	    ctx.drawImage(this.image, 69, 98, 23, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
	  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.moving) {
	    ctx.drawImage(this.image, 120, 98, 21, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
	  } else  {
	    ctx.drawImage(this.image, 95, 98, 21, 30, this.x - this.xOffset, this.y - 30, this.width, this.height);
	  }
	};
	
	Player.prototype.warpUp = function () {
	  this._warp([120, 161], [165, 225], [241, 225], [120, 127], "UP")
	};
	
	
	Player.prototype.warpDown = function (entrance, exit) {
	  this._warp([190, 160], [190, 192], [190, 160], [140, 225], "DOWN", entrance, exit);
	};
	
	Player.prototype.warpRight = function () {
	  this._warp([215, 128], [261, 160], [190, 129], [239, 129], "RIGHT");
	};
	
	Player.prototype.warpLeft = function () {
	  this._warp([261, 128], [215, 160], [190, 225], [71, 225], "LEFT");
	};
	
	Player.prototype.warpIncrementer = function (direction, distance) {
	  switch(direction) {
	    case "DOWN" : this.y += distance; break;
	    case "RIGHT": this.x += distance; break;
	    case "LEFT" : this.x -= distance; break;
	    case "UP"   : this.y -= distance; break;
	  }
	};
	
	Player.prototype._warp = function (img1, img2, img3, img4, direction, entrance, exit) {
	  this.warping = true;
	  this.warpReady = false;
	
	  if (!entrance) {
	    this.showFrame1(img1);
	    this.executeFrame2AndClearFrame1(img2);
	  }
	
	  if(!exit) {
	    this.showFrame3(img3, direction);
	    this.executeFrame4AndClearFrame3(img4, direction)
	    this.startWarpCoolDown();
	  }
	};
	
	Player.prototype.showFrame1 = function (imgCoords) {
	  var self = this;
	
	  frame1ID = setInterval(function () {
	    self.ctx.drawImage(
	      self.image,
	      imgCoords[0], imgCoords[1],
	      27, 35,
	      self.x - self.xOffset, self.y -30,
	      self.width, self.height
	    );
	  },1000/50)
	};
	
	Player.prototype.executeFrame2AndClearFrame1 = function ( imgCoords) {
	  var self = this;
	
	  setTimeout(function(){
	    clearInterval(frame1ID);
	    frame2ID = setInterval(function () {
	      self.ctx.drawImage(
	        self.image,
	        imgCoords[0], imgCoords[1],
	        27, 34,
	        self.x - self.xOffset, self.y - 30,
	        self.width, self.height);
	    }, 1000 / 50)
	  }, 100)
	
	  setTimeout(function () { clearInterval(frame2ID); }, 200)
	};
	
	Player.prototype.showFrame3 = function (imgCoords, direction) {
	  var self = this;
	
	  setTimeout (function () {
	    self.warpIncrementer(direction, 135);
	    frame3ID = setInterval(function () {
	      self.ctx.drawImage(
	        self.image,
	        imgCoords[0], imgCoords[1],
	        27, 35,
	        self.x - self.xOffset, self.y -30,
	        self.width, self.height
	      );
	    }, 1000/50)
	  }, 500)
	};
	
	Player.prototype.executeFrame4AndClearFrame3 = function (imgCoords, direction) {
	  var self = this;
	
	  setTimeout (function () {
	    clearInterval(frame3ID);
	    self.warpIncrementer(direction, 20);
	    frame4 = setInterval(function () {
	      self.ctx.drawImage(
	        self.image,
	        imgCoords[0], imgCoords[1],
	        27, 34,
	        self.x - self.xOffset, self.y - 30,
	        self.width, self.height
	      );
	    }, 1000/50)
	  }, 610)
	
	  setTimeout(function(){
	    self.warping = false;
	    clearInterval(frame4)
	  }, 710)
	};
	
	Player.prototype.startWarpCoolDown = function () {
	  var self = this;
	  setTimeout(function () { self.warpReady = true; }, 3710)
	};
	
	module.exports = Player;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(7);
	var Zombie = __webpack_require__(14);
	
	function NormalZombie(x, y, player, theta) {
	
	
	  Zombie.call(this, x, y, player, theta, 2, document.getElementById('test'));
	  this.awakenRange = 210;
	  this.width = 35;
	  this.height = 42;
	};
	
	Util.inherits(NormalZombie, Zombie);
	
	
	NormalZombie.prototype.render = function (ctx) {
	  Util.render_circle.call(this, 25, "green", ctx);
	};
	
	NormalZombie.prototype.doZombieThings = function () {
	  this.regulateAwakenStatus();
	  if (this.awake) { this.chasePlayer(); }
	};
	
	NormalZombie.prototype.chasePlayer = function () {
	  this.move();
	};
	
	
	NormalZombie.prototype.regulateAwakenStatus = function () {
	
	  var playerDistance = Util.distance(this.x, this.player.x, this.y, this.player.y)
	  if (playerDistance < this.awakenRange) { this.awake = true }
	};
	
	NormalZombie.prototype.animateRight = function (ctx) {
	
	  var millisecondCounter = (new Date()).getMilliseconds();
	  if (millisecondCounter < 250 && this.awake) {
	    ctx.drawImage(this.image, 0, 150, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
	  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.awake) {
	    ctx.drawImage(this.image, 33, 150, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
	  } else  {
	    ctx.drawImage(this.image, 64, 150, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
	  }
	};
	
	NormalZombie.prototype.animateLeft = function (ctx) {
	  var millisecondCounter = (new Date()).getMilliseconds();
	
	  if (millisecondCounter < 250 && this.awake) {
	    ctx.drawImage(this.image, 0, 85, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
	  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.awake) {
	    ctx.drawImage(this.image, 33, 85, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
	  } else {
	    ctx.drawImage(this.image, 64, 85, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
	  }
	};
	
	NormalZombie.prototype.animateDown = function (ctx) {
	  var millisecondCounter = (new Date()).getMilliseconds();
	
	  if (millisecondCounter < 250 && this.awake) {
	    ctx.drawImage(this.image, 0, 23, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
	  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.awake) {
	    ctx.drawImage(this.image, 64, 23, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
	  } else {
	    ctx.drawImage(this.image, 33, 23, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
	  }
	};
	
	NormalZombie.prototype.animateUp = function (ctx) {
	  var millisecondCounter = (new Date()).getMilliseconds();
	
	  if (millisecondCounter < 250 && this.awake) {
	    ctx.drawImage(this.image, 0, 215, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
	  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.awake) {
	    ctx.drawImage(this.image, 64, 215, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
	  } else {
	    ctx.drawImage(this.image, 33, 215, 33, 42, this.x - 18, this.y - 25, this.width, this.height);
	  }
	};
	
	
	
	module.exports = NormalZombie;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(7);
	
	function Zombie(x, y, player, theta, speed, image) {
	  this.x = x;
	  this.y = y;
	  this.player = player;
	  this.speed = speed;
	  this.theta = theta;
	  this.image = image
	
	  this.herdingCoefficent = 40;
	
	  this.otherZombies = [];
	
	  this.awake = false;
	  this.moving = false;
	}
	
	Zombie.prototype.move = function () {
	  var chasePlayerVec = this.chasePlayerVec();
	  var separationVec = this.separationVec();
	
	  var summedVec = [
	    chasePlayerVec[0] + separationVec[0],
	    chasePlayerVec[1] + separationVec[1]
	  ]
	
	  var movementVec = Util.limitVector(summedVec, this.speed)
	  this.x += summedVec[0];
	  this.y -= summedVec[1];
	};
	
	Zombie.prototype.chasePlayerVec = function () {
	  this.theta = this.calculateTheta(this.player);
	  var xComp = Math.cos(this.theta) * this.speed;
	  var yComp = Math.sin(this.theta) * this.speed;
	  return [xComp, yComp];
	};
	
	Zombie.prototype.separationVec = function () {
	  var separationVec = [0, 0];
	  var that = this;
	
	  this.otherZombies.forEach(function (zombie){
	    var magnitude = that.separationMagnitude(Util.distance(that.x, zombie.x, that.y, zombie.y));
	    var theta = that.calculateTheta(zombie);
	    separationVec = [
	      separationVec[0] - Math.cos(theta) * magnitude,
	      separationVec[1] - Math.sin(theta) * magnitude
	    ]
	  });
	
	  return separationVec;
	};
	
	Zombie.prototype.separationMagnitude = function (distance) {
	  return Math.pow(2, -distance/this.herdingCoefficent);
	};
	
	
	Zombie.prototype.calculateTheta = function (target) {
	  return Math.atan2(this.y - target.y, target.x - this.x);
	};
	
	Zombie.prototype.registerOtherZombie = function (zombie) {
	  this.otherZombies.push(zombie);
	}
	
	Zombie.prototype.animate = function (ctx) {
	  switch (Util.direction(this.theta)) {
	    case "RIGHT": this.animateRight(ctx); break;
	    case "LEFT" : this.animateLeft(ctx);  break;
	    case "DOWN" : this.animateDown(ctx);  break;
	    case "UP"   : this.animateUp(ctx);    break;
	  }
	};
	
	Zombie.prototype.playerCaptured = function () {
	  return (
	    this.player.x < this.x + this.width  / 2 + 5 &&
	    this.player.x > this.x - this.width  / 2 - 5 &&
	    this.player.y < this.y + this.height / 2 + 5 &&
	    this.player.y > this.y - this.height / 2 - 5 &&
	    !this.player.warping
	  )
	};
	
	module.exports = Zombie;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(7);
	var Level = __webpack_require__(8);
	var Torch = __webpack_require__(10);
	var Wall = __webpack_require__(11);
	var Player = __webpack_require__(12);
	var NormalZombie = __webpack_require__(13);
	
	function LevelTwo(ctx) {
	  this.ctx = ctx;
	  Level.call(this);
	  this.player = new Player(1100, 190, ctx);
	
	  this.fadeInTextHeader = "LEVEL 2";
	  this.fadeInTextSubtitle = "Doing great.";
	
	  this.fadeOutTextHeader = "LEVEL 3";
	  this.fadeOutTextSubtitle = "Now things get interesting."
	
	  this.torches = [
	    new Torch(50, 50, this.player),
	    new Torch(50, 560, this.player),
	    new Torch(360, 265, this.player),
	    new Torch(660, 50, this.player),
	    new Torch(660, 560, this.player)
	  ];
	
	  this.wall = new Wall (600, 320, 1100, 600, this.player);
	  this.unmovingObjs = [this.wall].concat(this.torches);
	
	  this.normalZombies = [
	    new NormalZombie(690,230, this.player, 0),
	    new NormalZombie(800, 470, this.player, 0),
	    new NormalZombie(570, 420, this.player, 0),
	    new NormalZombie(900, 50, this.player, 0),
	
	    new NormalZombie(440, 70, this.player, 0),
	    new NormalZombie(200, 110, this.player, 0),
	
	    new NormalZombie(340, 340, this.player, 0),
	    new NormalZombie(260, 430, this.player, 0),
	    new NormalZombie(240, 590, this.player, 0),
	
	    new NormalZombie(50, 310, this.player, 0)
	  ];
	  this.registerHerd();
	  this.zombies = this.normalZombies;
	
	  this.movingObjs = this.normalZombies.concat(this.player)
	}
	
	Util.inherits(LevelTwo, Level);
	
	LevelTwo.prototype.registerHerd = function () {
	  for (var i = 0; i < this.normalZombies.length; i++) {
	    for (var j = 0; j < this.normalZombies.length; j++) {
	      if(i !== j) {
	        this.normalZombies[i].registerOtherZombie(this.normalZombies[j])
	      }
	    }
	  }
	};
	
	
	module.exports = LevelTwo;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(7);
	var Level = __webpack_require__(8);
	var Torch = __webpack_require__(10);
	var Wall = __webpack_require__(11);
	var Player = __webpack_require__(12);
	var NormalZombie = __webpack_require__(13);
	var RunnerZombie = __webpack_require__(17);
	
	function LevelThree(ctx) {
	  this.ctx = ctx;
	  Level.call(this);
	  this.player = new Player(600, -300, ctx);
	
	  this.fadeInTextHeader = "LEVEL 3";
	  this.fadeInTextSubtitle = "Now things get interesting.";
	
	  this.fadeOutTextHeader = "LEVEL 4";
	  this.fadeOutTextSubtitle = "You've come a long way.";
	
	  this.torches = [
	    new Torch(200, 240, this.player),
	    new Torch(980, 240, this.player),
	    new Torch(595, 430, this.player),
	    new Torch(80, 580, this.player),
	    new Torch(1100, 580, this.player)
	  ];
	
	  this.wall = new Wall (600, 320, 1100, 600, this.player);
	  this.unmovingObjs = [this.wall].concat(this.torches);
	
	  this.normalZombies = [
	    new NormalZombie(290, 200, this.player, 0),
	    new NormalZombie(80, 350, this.player, 0),
	    new NormalZombie(340, 380, this.player, 0),
	    new NormalZombie(240, 590, this.player, 0),
	
	    new NormalZombie(1090, 210, this.player, 0),
	    new NormalZombie(1130, 420, this.player, 0),
	    new NormalZombie(1050, 460, this.player, 0),
	    new NormalZombie(820, 300, this.player, 0)
	  ];
	
	  this.runnerZombie = new RunnerZombie(602, 585, this.player, 0);
	  this.zombies = this.normalZombies.concat(this.runnerZombie);
	  this.registerHerd();
	
	  this.movingObjs = this.zombies.concat(this.player)
	}
	
	Util.inherits(LevelThree, Level)
	
	LevelThree.prototype.registerHerd = function () {
	  for (var i = 0; i < this.zombies.length; i++) {
	    for (var j = 0; j < this.zombies.length; j++) {
	      if(i !== j) {
	        this.zombies[i].registerOtherZombie(this.zombies[j])
	      }
	    }
	  }
	};
	
	module.exports = LevelThree;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var NormalZombie = __webpack_require__(13);
	var Util = __webpack_require__(7);
	
	function RunnerZombie(x, y, player, theta) {
	  NormalZombie.call(this, x, y, player, theta);
	  this.speed = 5;
	  this.awakenRange = 190;
	  this.image = document.getElementById("blueZombie");
	}
	
	Util.inherits(RunnerZombie, NormalZombie)
	
	module.exports = RunnerZombie;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(7);
	var Level = __webpack_require__(8);
	var Torch = __webpack_require__(10);
	var Wall = __webpack_require__(11);
	var Player = __webpack_require__(12);
	var BoneZombie = __webpack_require__(19);
	
	function LevelFour(ctx) {
	  this.ctx = ctx;
	  Level.call(this);
	  this.player = new Player(600, 175, ctx);
	
	  this.fadeInTextHeader = "LEVEL 4";
	  this.fadeInTextSubtitle = "You've come a long way.";
	
	  this.fadeOutTextHeader = "LEVEL 5";
	  this.fadeOutTextSubtitle = "... good luck."
	
	  this.torches = [
	    new Torch(595, 20, this.player),
	    new Torch(1130, 300, this.player),
	    new Torch(595, 580, this.player),
	    new Torch(50, 300, this.player),
	  ];
	
	  this.wall = new Wall (600, 320, 1100, 600, this.player);
	  this.unmovingObjs = [this.wall].concat(this.torches);
	
	  this.boneZombies = [
	    new BoneZombie(1140, 600, this.player, 0, this.wall, this.torches[0]),
	    new BoneZombie(50, 40, this.player, 0, this.wall, this.torches[1]),
	    new BoneZombie(1140, 40, this.player, 0, this.wall, this.torches[2]),
	    new BoneZombie(50, 600, this.player, 0, this.wall, this.torches[3])
	  ];
	  this.zombies = this.boneZombies;
	
	  this.movingObjs = this.zombies.concat(this.player)
	}
	
	Util.inherits(LevelFour, Level);
	
	module.exports = LevelFour;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	Util = __webpack_require__(7);
	Zombie = __webpack_require__(14);
	
	function BoneZombie(x, y, player, theta, wall, torch) {
	  Zombie.call(this, x, y, player, theta, 13, document.getElementById("test"));
	  this.wall = wall;
	  this.chargeReady = false;
	  this.startCoolDown = true;
	  this.awake = false;
	  this.movementVec = [];
	  this.height = 48;
	  this.width = 32;
	  this.torch = torch
	};
	
	Util.inherits(BoneZombie, Zombie);
	
	BoneZombie.prototype.render = function (ctx) {
	  Util.render_circle.call(this, 25, "yellow", ctx);
	
	};
	
	BoneZombie.prototype.doZombieThings = function () {
	  this.regulateAwakenStatus();
	  if (this.awake) { this.chasePlayer(); }
	};
	
	BoneZombie.prototype.chasePlayer = function () {
	  this.chargeAndCoolDown();
	};
	
	BoneZombie.prototype.chargeAndCoolDown = function () {
	  if (this.chargeReady) { this.charge(); } // && not out of bounds?
	  if (this.startCoolDown) { this.coolDown(); }
	};
	
	BoneZombie.prototype.charge = function () {
	  if(this.outOfBounds()) {
	    this.chargeReady = false;
	    this.startCoolDown = true;
	    this.correctPosition();
	  } else {
	    this.move();
	  }
	};
	
	BoneZombie.prototype.move = function () {
	  this.x += this.movementVec[0]
	  this.y -= this.movementVec[1]
	};
	
	BoneZombie.prototype.coolDown = function () {
	  this.startCoolDown = false;
	
	  var self = this;
	  setTimeout(function (){
	    self.calibrateMovementVector();
	    self.chargeReady = true;
	  }, 500)
	};
	
	BoneZombie.prototype.calibrateMovementVector = function () {
	  this.movementVec = this.chasePlayerVec();
	};
	
	BoneZombie.prototype.regulateAwakenStatus = function () {
	  if (this.torch.lit) { this.awake = true; }
	};
	
	BoneZombie.prototype.outOfBounds = function () {
	
	  return (
	    this.x > this.wall.rightBoundary() ||
	    this.x < this.wall.leftBoundary()  ||
	    this.y < this.wall.topBoundary()   ||
	    this.y > this.wall.bottomBoundary()
	  )
	};
	
	BoneZombie.prototype.correctPosition = function () {
	  if(this.x > this.wall.rightBoundary()) { this.x = this.wall.rightBoundary() }
	  if(this.x < this.wall.leftBoundary()) { this.x = this.wall.leftBoundary() }
	  if(this.y < this.wall.topBoundary()) { this.y = this.wall.topBoundary() }
	  if(this.y > this.wall.bottomBoundary()) { this.y = this.wall.bottomBoundary() }
	};
	
	BoneZombie.prototype.animateRight = function (ctx) {
	
	  var millisecondCounter = (new Date()).getMilliseconds();
	
	  if (millisecondCounter < 250 && this.chargeReady) {
	    ctx.drawImage(this.image, 96, 144, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
	  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.chargeReady) {
	    ctx.drawImage(this.image, 160, 144, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
	  } else  {
	    ctx.drawImage(this.image, 128, 144, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
	  }
	};
	
	BoneZombie.prototype.animateLeft = function (ctx) {
	  var millisecondCounter = (new Date()).getMilliseconds();
	  if (millisecondCounter < 250 && this.chargeReady) {
	    ctx.drawImage(this.image, 96, 80, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
	  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.chargeReady) {
	    ctx.drawImage(this.image, 160, 80, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
	  } else {
	    ctx.drawImage(this.image, 128, 80, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
	  }
	};
	
	BoneZombie.prototype.animateDown = function (ctx) {
	  var millisecondCounter = (new Date()).getMilliseconds();
	  if (millisecondCounter < 250 && this.chargeReady) {
	    ctx.drawImage(this.image, 96, 16, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
	  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.chargeReady) {
	    ctx.drawImage(this.image, 160, 16, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
	  } else {
	    ctx.drawImage(this.image, 128, 16, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
	  }
	};
	
	BoneZombie.prototype.animateUp = function (ctx) {
	  var millisecondCounter = (new Date()).getMilliseconds();
	
	  if (millisecondCounter < 250 && this.chargeReady) {
	    ctx.drawImage(this.image, 96, 208, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
	  } else if (millisecondCounter >= 500 && millisecondCounter < 750 && this.chargeReady) {
	    ctx.drawImage(this.image, 160, 208, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
	  } else {
	    ctx.drawImage(this.image, 128, 208, 32, 48, this.x - 15, this.y - 20, this.width, this.height);
	  }
	};
	
	
	module.exports = BoneZombie;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(7);
	var Level = __webpack_require__(8);
	var Torch = __webpack_require__(10);
	var Wall = __webpack_require__(11);
	var Player = __webpack_require__(12);
	var NormalZombie = __webpack_require__(13);
	var RunnerZombie = __webpack_require__(17);
	var BoneZombie = __webpack_require__(19);
	
	function LevelFive(ctx) {
	  this.ctx = ctx;
	  Level.call(this);
	  this.player = new Player(600, 600, ctx);
	
	  this.fadeInTextHeader = "LEVEL 5";
	  this.fadeInTextSubtitle = "... good luck."
	
	  this.fadeOutTextHeader = "";
	  this.fadeOutTextSubtitle = "";
	
	  this.torches = [
	    new Torch(50, 40, this.player),
	    new Torch(1130, 40, this.player),
	    new Torch(595, 100, this.player),
	    new Torch(895, 260, this.player),
	    new Torch(295, 260, this.player)
	  ];
	
	  this.wall = new Wall(600, 320, 1100, 600, this.player);
	  this.unmovingObjs = [this.wall].concat(this.torches);
	
	  this.normalZombies = [
	    new NormalZombie(100, 240, this.player, 0),
	    new NormalZombie(400, 200, this.player, 0),
	    new NormalZombie(430, 350, this.player, 0),
	
	    new NormalZombie(1000, 400, this.player, 0),
	    new NormalZombie(670, 220, this.player, 0),
	    new NormalZombie(850, 150, this.player, 0)
	  ]
	  this.runnerZombie = new RunnerZombie(600, 50, this.player, 0);
	  this.zombies = this.normalZombies.concat(this.runnerZombie)
	  this.registerHerd()
	
	  this.boneZombies = [
	    new BoneZombie(1140, 600, this.player, 0, this.wall, this.torches[0]),
	    new BoneZombie(50, 600, this.player, 0, this.wall, this.torches[1])
	  ];
	
	  this.zombies = this.zombies.concat(this.boneZombies);
	
	  this.movingObjs = this.zombies.concat(this.player)
	}
	
	Util.inherits(LevelFive, Level)
	
	LevelFive.prototype.registerHerd = function () {
	  for (var i = 0; i < this.zombies.length; i++) {
	    for (var j = 0; j < this.zombies.length; j++) {
	      if(i !== j) {
	        this.zombies[i].registerOtherZombie(this.zombies[j])
	      }
	    }
	  }
	};
	
	module.exports = LevelFive;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(9);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map