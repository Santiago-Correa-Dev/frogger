// Enemies our player must avoid
var Enemy = function(x, y, speed,points) {
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 3 + 1;
    this.sprite = 'images/enemy-bug.png';
    this.points = 0;
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.speed * dt;
    this.x += this.speed;
    if (this.x >= 505) {
        this.x = 0;
    };

    // Collision Handler
    if (this.x >= player.x - 20 && this.x <= player.x + 20 && this.y >= player.y - 10 && this.y <= player.y + 10) {
        player.reset();
        ctx.clearRect(0, 0, 505, 606);
        this.x = 0;
        alert('You lose');

    } else if (player.y < 0) {
        player.reset();
        alert('You won');
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Draws Player on the screen, required method for game
class Player extends Enemy {

    constructor() {
        super()
        this.x = 200;
        this.y = 300;
        this.sprite = 'images/char-boy.png';
    };

    // Update the player's position, required method for game
    update(dt) {
        this.speed * dt;
    };

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    reset() {
        this.x = 200;
        this.y = 300;
    };

    //Handles key events and moves Player accordingly.
    handleInput(value) {
        if (value === 'up' && this.y > 0) {
            this.y -= 80;
        } else if (value === 'down' && this.y < 350) {
            this.y += 80;
        } else if (value === 'left' && this.x > 0) {
            this.x -= 100;
        } else if (value === 'right' && this.x < 400) {
            this.x += 100;
        };
    }
};



let player = new Player();

let allEnemies = [new Enemy(0, 50), new Enemy(100, 140), new Enemy(300, 220), new Enemy(40, 50), new Enemy(140, 140), new Enemy(200, 220)];

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