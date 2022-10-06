class Engine {
  constructor(theRoot) {
    this.root = theRoot;
    this.player = new Player(this.root);
    this.enemies = [];
  
    addBackground(this.root);

    this.scoreBoard = new Text(this.root, '20px', '20px')
    this.score = 0;
    this.scoreBoard.update(`Score: ${this.score}`);

    this.sfx = document.querySelector('#sfx2');
  }

  gameLoop = () => {
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();

    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    while (this.enemies.length < MAX_ENEMIES) {
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
