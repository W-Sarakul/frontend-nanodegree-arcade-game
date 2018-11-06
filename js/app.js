'use strict';

class Element {
  constructor(posX, posY) {
    this.x = posX;
    this.y = posY;
    this.sprite = '';
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Enemies our player must avoid
class Enemy extends Element {
  constructor(posX, posY) {
    super(posX, posY);
    this.sprite = 'images/enemy-bug.png';
    this.stepX = Math.floor(Math.random() * 100) + 100; // Random the velocity of each bug
    this.boundaryX = 101 * 5;
  }

  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < this.boundaryX) {
      this.x += this.stepX * dt;
    } else {
      this.x = -10;
    }
  }

  render() {
    super.render();
  }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() metphod.
class Player extends Element {
  constructor() {
    super();
    this.stepX = 101;
    this.stepY = 83;
    this.boundary = {
      left: 0,
      right: 404,
      up: 0,
      down: 410
    }
    this.x = this.stepX * 2;
    this.y = (this.stepY * 5) - 5;
    this.win = false;
    this.point = 0;
    this.medal = '';
    this.colorGem = {
      blue: 0,
      green: 0,
      orange:0
    }
    this.gem = this.colorGem.blue + this.colorGem.green + this.colorGem.orange;
    this.numChar = 0; // number of displayed character
    this.life = 8; // this score will decrease by 1 if player clash bugs
    this.sprite = [
      'images/char-boy.png',
      'images/char-cat-girl.png',
      'images/char-horn-girl.png',
      'images/char-pink-girl.png',
      'images/char-princess-girl.png'
    ];
  }

  // update
  update() {
    //update position of player
    for (let enemy of allEnemies) {
      if ((enemy.y + 10 > this.y) && (enemy.y - 10 < this.y)) {
        if ((enemy.x + enemy.stepX/2 > this.x) && (enemy.x - enemy.stepX/2 < this.x)) {
          this.x = this.stepX * 2;
          this.y = this.stepY * 5;
          this.win = false;
          this.life--;
        }
      }
    }
    // the position of the player to win the game
    if (this.y < 50) {
      this.calPoint()
      // condition of the prize
      if (this.point > 20) {
        this.medal = 'gold'
      } else if (this.point > 15) {
        this.medal  = 'silver'
      } else {
        this.medal = 'bronze'
      }
      this.win = true;
    }
    // condition to lose the game
    if (this.life === 0) {
      this.win = 'gameover';
    }
  }

  // Calculate point fron collected gems, different color has different point
  calPoint() {
    this.point = this.colorGem.green * 3 + this.colorGem.blue * 2 + this.colorGem.orange;
  }

  // Render
  render() {
    ctx.drawImage(Resources.get(this['sprite'][this.numChar]), this.x, this.y);
  }

  // Handle Keyboard Input
  handleInput(key) {
    switch (key) {
      case 'left':
        if (this.x > this.boundary.left) {
          this.x -= this.stepX;
        }
        break;
      case 'up':
        if (this.y > this.boundary.up) {
          this.y -= this.stepY;
        }
        break;
      case 'right':
        if (this.x < this.boundary.right) {
          this.x += this.stepX;
        }
        break;
        case 'down':
          if (this.y < this.boundary.down) {
            this.y += this.stepY;
          }
          break;
        case 'space':
          // to choose the character
          if ((this.x === 404) && ((this.y >= 410) && (this.y <= 415))) {
            if (this.numChar < 4) {
              this.numChar++;
            } else {
              this.numChar = 0;
            }
          }
          break;
    }
  }
  // Reset Player
  resetPlayer() {
    this.x = this.stepX * 2;
    this.y = this.stepY * 5;
    this.win = false;
    this.colorGem = {
      blue: 0,
      green: 0,
      orange:0
    }
    this.medal = '';
    this.life = 8;
  }
}

class Gem extends Element {
  constructor(color) {
    super();
    this.x = Math.floor(Math.random() * 5) * 101; // random the position of gem
    this.y = (Math.floor(Math.random() * 3) + 1) * 83; // random the position of gem
    this.vcX = -(Math.floor(Math.random() * 5)); // random the velocity of gem
    this.vcY = 5;
    this.color = color;
    this.sprite = {
      blue: 'images/Gem Blue.png',
      orange: 'images/Gem Orange.png',
      green: 'images/Gem Green.png',
    }
    this.boundary = {
      left: 0,
      right: 404,
      up: 0,
      down: 410
    }
  }

  // make the gem float around
  update(dt) {
    // make the gem mostly in the frame
    if ((this.x + this.vcX > this.boundary.right) || (this.x - this.vcX < this.boundary.left)) {
      this.vcX = -this.vcX;
    } else if ((this.y + this.vcY > this.boundary.down) || (this.y - this.vcY < this.boundary.up)) {
      this.vcY = -this.vcY;
    }
    // make the gem float
    this.x += this.vcX * dt;
    this.y += this.vcY * dt;
    this.handleCol(this.color);
  }

  // handle the collision, so player can collect the gem
  handleCol(color) {
    if ((this.y + 60 > player.y) && (this.y - 60 < player.y) && (this.x + 60 > player.x) && (this.x - 60 < player.x)) {
      player['colorGem'][color] += 1
      // random new position after player collect this gem
      this.x = Math.floor(Math.random() * 5) * 101;
      this.y = (Math.floor(Math.random() * 3) + 1) * 83;
    }
  }

  // reset
  resetGem() {
    this.x = Math.floor(Math.random() * 5) * 101;
    this.y = (Math.floor(Math.random() * 3) + 1) * 83;
    this.vcX = -(Math.floor(Math.random() * 5));
    this.vcY = 5;
  }

  render() {
    ctx.drawImage(Resources.get(this['sprite'][this.color]), this.x, this.y);
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();
var allEnemies = [];
var bug1 = new Enemy(-20, 78);
var bug2 = new Enemy(-10, 161);
var bug3 = new Enemy(-30, 244);
var bug4 = new Enemy(-10, 244);
var allGems = [];
var gem1 = new Gem('green');
var gem2 = new Gem('orange');
var gem3 = new Gem('blue');
allEnemies.push(bug1, bug2, bug3, bug4);
allGems.push(gem1, gem2, gem3);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
