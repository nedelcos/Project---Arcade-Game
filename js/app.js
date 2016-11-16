// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x = this.x + this.speed * dt;

// TODO: Randomize x start positions

  if (this.x > 505) {
    this.x = -30;
  }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Created Player class based on the Enemy class sample
// Assigned boy png to sprite

var Player = function(x,y) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
};
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(dt) {
  if (this.x < 0) {
    this.x = 0;
  }
  else if (this.x > 400) {
    this.x = 400;
  }
  // TODO: Set timeout and a congrats message :)
  else if (this.y === 0) {
    this.y = 300;
  }
  else if (this.y < 0) {
    this.y = 0;
  }
  else if (this.y > 300) {
    this.y = 300;
  }
};

Player.prototype.checkCollisions = function() {
  for (i = 0; i < allEnemies.length; i++) {
    if (player.x === allEnemies[i].x && player.y === allEnemies[i].y) {
      player.x = 200;
      player.y = 300;
    }
  }
}

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  switch(key) {
      case "up":
        this.y = this.y - 85;
        break;
      case "down":
        this.y = this.y + 85;
        break;
      case "left":
        this.x = this.x - 100;
        break;
      case "right":
        this.x = this.x + 100;
        break;
    };
  };


// Now instantiate your objects.
var bugSlow = new Enemy(0, 60, 125);
var bugMed = new Enemy(-20, 140, 190);
var bugFast = new Enemy(-80, 225, 270);
// Place all enemy objects in an array called allEnemies
var allEnemies = [bugSlow, bugFast, bugMed];

// Place the player object in a variable called player
var player = new Player(200,300);
player.update();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
