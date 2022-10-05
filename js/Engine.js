// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    // We add the background image to the game
    addBackground(this.root);

    this.scoreBoard = new Text(this.root, '20px', '20px')
    this.score = 0;
    this.scoreBoard.update(`Score: ${this.score}`);

    this.sfx = document.querySelector('#sfx2');
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    // Game Over
    if (this.isPlayerDead()) {
      const playerSprite = this.player.domElement;
      this.root.removeChild(playerSprite);

      //* Explode ------------------------
      this.sfx.currentTime = 0;
      this.sfx.play();

      const explosion = document.createElement('img');
      explosion.src = 'images/impact.gif';
      explosion.style.position = 'absolute';
      explosion.style.top = '265px';
      explosion.style.left = `${this.player.x - 63}px`
      explosion.style.zIndex = '11';
      this.root.appendChild(explosion);
      setTimeout(() => {this.root.removeChild(explosion)}, 1200);
      //* --------------------------------
      
      setTimeout(() => {
        // window.alert('Game Over!');
        endScreen(this.score); 
      }, 2000);

      return;
    }

    // Firing logic
    if (this.player.isFiring) {
      const target = this.enemies.find(enemy => enemy.x === this.player.x)

      if (target) {
        target.destroyed = true;
        
        //* Explode ------------------------
        this.sfx.currentTime = 0;
        this.sfx.play();

        const explosion = document.createElement('img');
        explosion.src = 'images/explosion1.gif';
        explosion.style.position = 'absolute';
        explosion.style.width = '275px';
        explosion.style.opacity = '0.6';
        explosion.style.top = `${target.y}px`;
        explosion.style.left = `${target.x - 70}px`
        explosion.style.zIndex = '11';
        this.root.appendChild(explosion);
        setTimeout(() => {this.root.removeChild(explosion)}, 600);
        //* --------------------------------

        this.root.removeChild(target.domElement)

        // Increment score
        this.score += 1000;
        this.scoreBoard.update(`Score: ${this.score}`);

        const memeTime = (time, img, top = 130) => {
          const meme = document.createElement('img');
          meme.src = `images/${img}`;
          meme.style.opacity = '0.6';
          meme.style.width = '375px';
          meme.style.position = 'absolute';
          meme.style.left = '0';
          meme.style.top = `${top}px`;
          this.root.appendChild(meme);
          setTimeout(() => {this.root.removeChild(meme)}, time);
        }

        if (this.score === 5000)   {memeTime(5000, 'timneric.gif');}
        if (this.score === 30000)  {memeTime(5000, 'math.gif');}
        if (this.score === 60000)  {memeTime(5000, 'timneric.gif');}
        if (this.score === 90000)  {memeTime(5000, 'blinking.gif', 10);}
        if (this.score === 120000) {memeTime(5000, 'thumbsup.gif');}
        if (this.score === 150000) {memeTime(5000, 'yelling.gif');}

        if (this.score === 9000) {
          const nine = document.querySelector('#nine');
          nine.currentTime = 0;
          nine.play();
        }
      }
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    let isHit = false
    this.enemies.forEach(enemy => {
      // | X HIT RANGE              || Y HIT RANGE                     |            
      if (enemy.x === this.player.x && enemy.y >= 290 && enemy.y <= 400) {
        isHit = true;
      }   
    })
    return isHit;
  };
}
