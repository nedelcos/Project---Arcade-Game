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
  this.score = 0;
};
// This method does 2 things
// 1. It keeps the player from going out canvas
// 2. It keeps track of each time the player reaches water (scoreboard system)
Player.prototype.update = function(dt) {
  if (this.x < 0) {
    this.x = 0;
  }
  else if (this.x > 400) {
    this.x = 400;
  }
  else if (this.y === 0) {
    this.resetPlayer();
    this.score += 1;
    $("#score").empty();
    $("#score").append("Your Score:" + " " + player.score);
  }
  else if (this.y < 0) {
    this.y = 0;
  }
  else if (this.y > 300) {
    this.y = 300;
  }
};

// This method resets the player's position to default, each time it is called
Player.prototype.resetPlayer = function() {
  this.x = 200;
  this.y = 300;
}

//This method calls resetPlayer method each time the player and a bug are in the same position on canvas (same x and y)
Player.prototype.checkCollisions = function() {
  for (i = 0; i < allEnemies.length; i++) {
    if (this.x < allEnemies[i].x + 75 &&
        this.x + 65 > allEnemies[i].x &&
        this.y < allEnemies[i].y + 50 &&
        this.y + 70 > allEnemies[i].y) {
      this.resetPlayer()
      alert("The bug ate you!")
    }
  }
}

// This method draws the player in the canvas
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This method tells the player to increase or decreas x or y position when the assigned keys are pressed
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



// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies[0] = new Enemy(0, 60, 125);
allEnemies[1] = new Enemy(-20, 140, 190);
allEnemies[2] = new Enemy(-80, 225, 270);

// Place the player object in a variable called player
var player = new Player(200,300,0);
$("#score").append("let's see how far you cand get")
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


// SCOREBOARD
