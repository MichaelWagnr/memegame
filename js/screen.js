const root = document.getElementById('app');

const screen = document.createElement('div');
screen.id = 'screen';
screen.classList.add('active');
root.appendChild(screen);

// Start screen 
const startScreen = () => {
    // Start screen content:
    const html = `
    <div class="container">
        <h1>MEME FEVER DREAM</h1>
        <img src="images/cats.png" alt="Villian">
        <p>You are trapped in a nightmare of old memes... <br><br> All your bases are belong to us. You have no chance to survive. Make your time.</p>
        <p class="instructions">
            <span class="button arrow">&#10229;</span>      
            <span>move left</span>
            <span class="button arrow">&#10230;</span>      
            <span>move right</span>
            <span class="button">space</span> <span>firin mah laz0r</span>
            <span class="button">enter</span> 
            <span>start game</span>
        </p>
    </div>
    `;

    screen.innerHTML = html;
}

const endScreen = (score) => {
    // Remove previous HTML
    screen.innerHTML = '';
    
    // End Screen content:
    const html = `
    <div class="container">
        <h1>GAME OVER</h1>
        <img src="images/end.png" alt="Game Over">
        <h2>SCORE: ${score}</h2>
        <p id="score-message">${score >= 9000 ? '(It\'s over 9000!)' : ''}</p>
        <p id="gameover">You just lost the game.</p>
    </div>
    `

    screen.innerHTML = html;

    // Scroll in End screen
    screen.classList.add('active');

    // The memes just won't stop
    const message = document.querySelector('#gameover');
    setTimeout(() => {message.textContent = 'Fs in the chat.'}, 3000)
    setTimeout(() => {message.textContent = 'Consequences will never be the same.'}, 6000)
    setTimeout(() => {message.textContent = 'Refresh the page to backtrace it and try again.'}, 9000)

}

// On page load run startScreen to populate Start screen
startScreen();