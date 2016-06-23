#Tales of Zomphonia

[Tales of Zomphonia Live][git_page]
[git_page]: https://rileyl6122428.github.io/game.html

A 2d browser game. Players light torches while evading capture by zombies to
progress through levels. On the title screen, the arrow keys are used to
navigate options and the space bar is used to choose an option. When actually
playing the game, the arrow keys are used to move the player avatar. Pressing
the space bar while moving the player up, down, left, or right will teleport the
player. Teleporting has a "cool down" of three seconds (i.e. you have to wait
three seconds before consecutively teleporting).

##Languages, Libraries and Assets
Tales of Zomphonia is written in JavaScript. It renders in an HTML [canvas][canvas_wiki]
element.

Player input is supported through the [keymaster library][keymaster_lib]. The
code for selective scrolling was posted by stack overflow user [galambalazs.][stack_overflow_post]

All art assets were taken from OpenGameArt.org. The player sprite sheet was
created by user [sylvius fischer.][player_sprite_sheet] The zombie sprite sheets
were created by user [Reemax.][zombie_sprite_sheet] The floor and wall level art
were created by user [Buch.][wall_and_floor] The torch and fire sprites were
created by user [rubberduck.][torch_and_fire]


[canvas_wiki]:  https://en.wikipedia.org/wiki/Canvas_element
[keymaster_lib]: https://github.com/madrobby/keymaster
[stack_overflow_post]: http://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
[player_sprite_sheet]: http://opengameart.org/content/fumiko-complete-charset
[zombie_sprite_sheet]: http://opengameart.org/content/zombie-and-skeleton-32x48
[wall_and_floor]:http://opengameart.org/content/dungeon-tileset
[torch_and_fire]: http://opengameart.org/content/pixel-art-castle-tileset

##Code Snippets

###Zombie Movement
Zombie movement is achieved through superposition/ decomposition of vectors.
When awakened, each normal (green) zombie has a chase player vector (`chasePlayerVec`)
added to its position. The vector points directly at the player and has
magnitude equal to the speed of the zombie. The specific direction and the
decomposition into x and y components of the `chasePlayerVec` are calculated
with trigonometry:

```JavaScript
  Zombie.prototype.chasePlayerVec = function () {
    this.theta = this.calculateTheta(this.player);
    var xComp = Math.cos(this.theta) * this.speed;
    var yComp = Math.sin(this.theta) * this.speed;
    return [xComp, yComp];
  };
```
where `calculateTheta` is defined to be the following helper method.

```JavaScript
  Zombie.prototype.calculateTheta = function (target) {
    return Math.atan2(this.y - target.y, target.x - this.x);
  };
```

To ensure that normal zombies do not occupy the same space as they chase the
player, a separation vector is added to the chase player vector to get each
zombies movement vector. If n is the total number of normal zombies in a level,
the separation vector for a specific normal zombie is the sum of n - 1 new
vectors, each corresponding to one of the other normal zombies. The direction of
the vectors points away from the other normal zombie.

The magnitude of the vector is as an exponential decay:
2^(-`distance`/`herdingCoefficent`). In short, the magnitude of each individual
separation vector gets larger as the `distance` between two zombies decreases, and
the magnitude caps out at 1 (i.e. 2^0 = 1). The `herdingCoefficent` determines
how quickly the magnitude of the separation vector approaches 1 as the distance
between two zombies becomes small. The greater the `herdingCoefficent`, the more
"personal space" is maintained between zombies. Here is the corresponding code:

```JavaScript
  Zombie.prototype.separationVec = function () {
    var separationVec = [0, 0];
    var self = this;

    this.otherZombies.forEach(function (zombie){
      var magnitude = self.separationMagnitude(Util.distance(self.x, zombie.x, self.y, zombie.y));
      var theta = self.calculateTheta(zombie);
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
```

The `chasePlayerVec` and `separationVec` are then summed to get the final
`movementVec`. The `Util.limitVector` function limits the magnitude of the
resultant vector to the zombie's speed.

```JavaScript
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
```
Movement for the runner (blue) zombie works similarly. The only difference is
that the speed of the runner zombie is greater.

Movement for bone zombies is simplified from the normal zombie movement. Bone
zombies do not have any separation vectors added to their movement, so they can
occupy the same space as another zombie in the same level. Also, their movement
occurs in phases: they charge at the player in a straight line until they hit a
wall. Once they hit a wall, they cooldown for a brief period of time, then begin
another charge at the player. The cooldown phase is ended by a setTimeout
callback. Here is the corresponding code:

```JavaScript
  BoneZombie.prototype.chasePlayer = function () {
    this.chargeAndCoolDown();
  };

  BoneZombie.prototype.chargeAndCoolDown = function () {
    if (this.chargeReady) { this.charge(); }
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
    this.x += this.movementVec[0];
    this.y -= this.movementVec[1];
  };

  BoneZombie.prototype.coolDown = function () {
    this.startCoolDown = false;

    var self = this;
    setTimeout(function (){
      self.calibrateMovementVector();
      self.chargeReady = true;
    }, 500);
  };

  BoneZombie.prototype.calibrateMovementVector = function () {
    this.movementVec = this.chasePlayerVec();
  };
```

###Animation

When awake and chasing the player, zombies are animated through a series of
three out of twelve frames. One frame corresponds to the left foot being
positioned in front of the zombie, another the right, and the final frame being
neither. Which three of the twelve frames a zombie uses to animate its
motion depends on the current direction it is moving towards. A zombie is moving
either UP, DOWN, LEFT, or RIGHT. A helper method inherited by all zombie types
determines which specific animation function should be called:

```JavaScript
  Zombie.prototype.animate = function (ctx) {
    switch (Util.direction(this.theta)) {
      case "RIGHT": this.animateRight(ctx); break;
      case "LEFT" : this.animateLeft(ctx);  break;
      case "DOWN" : this.animateDown(ctx);  break;
      case "UP"   : this.animateUp(ctx);    break;
    }
  };
```

where ctx in the above snippet is the canvas context. An example of one of the
specific animation functions can be seen below. A full animation cycle is
completed once every full second. The canvas api is used to grab the specific
section of the zombie sprite sheet corresponding to the desired frame (`this.image`
denotes the entire zombie sprite sheet).

```JavaScript
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
```

Basic player animation is accomplished through similar means. Warping animation
for the player is much more complicated. In this game, warping is performed
through a series of timed callbacks. The high level outline for warping is shown
below. The `direction`, `entrance`, and `exit` arguments extend the use of the
warp function so that it can animate the player in and out of levels at their
beginnings and ends.

```JavaScript
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
```

##Pending Features

* Greater variety in zombie types
* Additional levels
* More attractive styling for the title screen
* A visually appealing game ending
* Minimal soundtrack and sound effects
* Roaming movement for zombies that are not chasing the player.
* Cookies that store a users progress through levels
