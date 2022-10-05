const root = document.getElementById('app');

const screen = document.createElement('div');
screen.id = 'screen';
screen.classList.add('active');
root.appendChild(screen);

// Start screen 
const startScreen = () => {
    // Start screen content:
    const html = `

    `;

    screen.innerHTML = html;
}

const endScreen = (score) => {
    // Remove previous HTML
    screen.innerHTML = '';
    
    // End Screen content:
    const html = `
    
    `

    screen.innerHTML = html;

    // Scroll in End screen
    screen.classList.add('active');
}

// On page load run startScreen to populate Start screen
startScreen();