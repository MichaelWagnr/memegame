class Player {
  constructor(root) {
    this.x = 2 * PLAYER_WIDTH;
    const y = GAME_HEIGHT - PLAYER_HEIGHT - 10;

    this.domElement = document.createElement('img');
    this.domElement.src = 'images/player.png';
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${y}px`;
    this.domElement.style.zIndex = '10';
    root.appendChild(this.domElement);

    this.isFiring = false;
  }

  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - PLAYER_WIDTH;
    }

    this.domElement.style.left = `${this.x}px`;
  }

  moveRight() {
    if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
      this.x = this.x + PLAYER_WIDTH;
    }
    this.domElement.style.left = `${this.x}px`;
  }

  shoot() {
    const sfx = document.querySelector('#sfx')
    sfx.currentTime = 0;
    sfx.play();

    this.isFiring = true;
    const animate = setInterval(() => {
      const random = Math.floor(Math.random() * 4 + 1);
      this.domElement.src = `images/p${random}.png`
    }, 20)


    setTimeout(() => {
      this.isFiring = false;
      clearInterval(animate);
      this.domElement.src = 'images/player.png'
    }, 500);
  }
}
