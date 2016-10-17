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
      this.x = -100; // enemy initial x position
      this.speed = Math.random() * (300 - 100) + 100; // Max speed: 300, min speed: 100
    }
};

// Method to detect when the enemy and the player touch each other.  If so, the player
// alive attribute is change to false.
Enemy.prototype.collisionDetect = function (enemyObj) {
  if (enemyObj.x < player.x + player.width &&
      enemyObj.x + enemyObj.width > player.x &&
      enemyObj.y === player.y) {
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
  this.reset();
  this.width = 75;
  this.alive = true;
  this.speed = Math.random() * (300 - 100) + 100;
  this.times_touched = 0;
};


Player.prototype.update = function(){
  // In case of one enemy touch the player this is reset to original position
  if (this.alive === false) {
      this.reset();
      this.alive = true;
      //increment times_touched by one.
      this.times_touched += 1;
    }
  // In case of winning the player is reset to original position
  if (this.y == WINNING_AREA) {
    this.reset();
  }

  // In case player is touched three times, the game stop
  if (this.times_touched == 3){
    // window.cancelAnimationFrame(Engine.main);
    // Game_Over();
    alert("GAME OVER!!!");
    document.location.reload();
    this.times_touched = 0;
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
        this.x -= BLOCK_WIDHT;
      }
      break;
    case 'right':
      if (this.x === 400) {
        this.x = this.x;
      } else {
        this.x += BLOCK_WIDHT;
      }
      break;
    case 'up':
      if (this.y === -10) {
        this.y = this.y;
      } else {
        this.y -= BLOCK_HEIGHT;
      }
      break;
    case 'down':
      if (this.y == 400) {
        this.y = this.y;
      } else {
        this.y += BLOCK_HEIGHT;
      }
        break;
  }
};

Player.prototype.reset = function() {
  this.x =  200;
  this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();


// Create three enemies, one for each row.
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

// Constant Values
var BLOCK_WIDHT = 100;
var BLOCK_HEIGHT = 82;
var WINNING_AREA = -10; // "y" area for winning (water)


//
var Game_Over = function(){
  var message = "Game Over";
  console.log(message);
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.font = "30pt Impact";
  ctx.textAlign = "center";
  ctx.lineWidth = 3;
  };

Game_Over.prototype.render = function() {
  ctx.fillText(message, ctx.canvas.width / 2, ctx.canvas.height / 2);
  ctx.strokeText(message, ctx.canvas.width / 2, ctx.canvas.height / 2);
};



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
