// Elements
// const root = document.getElementById('app');
const gameEngine = new Engine(root);

// Startscreen
// const screen = document.createElement('div');
// screen.id = 'screen';
// screen.classList.add('active');
// root.appendChild(screen);




// Handlers
const keydownHandler = (event) => {
  if (event.code === 'ArrowLeft') {
    gameEngine.player.moveLeft();
  }

  if (event.code === 'ArrowRight') {
    gameEngine.player.moveRight();
  }

  if (event.code === 'Space') {
    gameEngine.player.shoot();
  }
};

const startGame = (event) => {
  if (event.code === 'Enter') {
    // Remove listener to avoid double-triggering
    document.removeEventListener('keydown', startGame);
    // Raise intro screen
    screen.classList.remove('active');
    // Start bgm
    const audio = document.querySelector('#bgm');
    audio.currentTime = 0;
    audio.play();
    // Start game
    gameEngine.gameLoop();
  }
}

// Listeners
document.addEventListener('keydown', keydownHandler);
document.addEventListener('keydown', startGame);



