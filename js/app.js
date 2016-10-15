// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.random() * (300 - 100) + 100;
    this.width = 75;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.collisionDetect(this);
    this.x += this.speed * dt;

    if (this.x > ctx.canvas.width){
      this.x = -100; // enemy initial position
      this.speed = Math.random() * (300 - 100) + 100; // Max speed: 300, min speed: 100
    }

};

Enemy.prototype.collisionDetect = function (enemyObj) {
  if (enemyObj.x < player.x + player.width &&
      enemyObj.x + enemyObj.width > player.x &&
      enemyObj.y === player.y) {
  // reset player position
    player.alive = false;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.startingPointX = 200;
  this.startingPointY = 400;
  this.x = this.startingPointX;
  this.y = this.startingPointY;
  this.width = 75;
  this.alive = true;
  this.speed = Math.random() * (300 - 100) + 100;
};

Player.prototype.update = function(dt){
  if (this.alive === false) {
    while (this.y <= this.startingPointY) {
      this.y += 100 * dt;
      console.log(this.y);
    }
    // this.x = this.startingPointX;
    // this.y = this.startingPointY;
    this.alive = true;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key_pressed) {
  switch (key_pressed) {
    case 'left':
      if (this.x === 0) {
        this.x = this.x;
      } else {
        this.x -= block_width;
      }
      break;
    case 'right':
      if (this.x === 400) {
        this.x = this.x;
      } else {
        this.x += block_width;
      }
      break;
    case 'up':
      if (this.y === -10) {
        this.y = this.y;
      } else {
        this.y -= block_height;
      }
      break;
    case 'down':
      if (this.y == 400) {
        this.y = this.y;
      } else {
        this.y += block_height;
      }
        break;
  }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player();


// Create three enemies
for (var i = 0; i < 3; i++) {
  // Assign an enemy for each row.
  switch (i) {
    case 0:               // top enemy row
      row = 72;
      break;
    case 1:               // middle enemy row
      row = 154;
      break;
    case 2:               // bottom enemy row
      row = 236;
      break;
  }
  allEnemies.push(new Enemy(-100, row));
}

// Global Variables
var block_width = 100;
var block_height = 82;



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
