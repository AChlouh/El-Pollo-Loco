let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];
let character;
let isGameOverEnabled = false;


function init() {
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
    hideStartScreen();
    showCounters();
    setInterval(updateCounters, 200);
}


function hideStartScreen() {
    document.querySelector(".startscreen").style.display = "none";

}

function replay() {
    isGameOverEnabled = false;
    document.getElementById("gameOver").style.display = 'none'; // Blende das Game Over-Element aus
    let winner = document.getElementById("winner");
    if (winner) winner.style.display = 'none'; // Blende das Winner-Element aus
    world = null;
    init();
}


function reload() {
    location.reload();
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


function updateCounters() {
    if (world && world.character) {
        document.getElementById('coinCount').innerText = world.character.coins;
        document.getElementById('bottleCount').innerText = world.character.bottles;
    }
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});


window.addEventListener("keyup", (e) => {
    console.log(e.keyCode);
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

window.onload = function () {
    document.querySelector('.counter-container.in-canvas').style.display = 'none';
}

function hideCounters() {
    document.querySelector('.counter-container.in-canvas').style.display = 'none';
}

function showCounters() {
    document.querySelector('.counter-container.in-canvas').style.display = 'flex';
}

// Füge das am Ende von game.js hinzu:

// Mobile Rotation Check
function createRotationScreen() {
    let rotationDiv = document.createElement('div');
    rotationDiv.id = 'rotationScreen';
    rotationDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        flex-direction: column;
        color: white;
        font-family: Arial, sans-serif;
        text-align: center;
    `;

    rotationDiv.innerHTML = `
        <div style="font-size: 60px; margin-bottom: 20px; animation: spin 2s linear infinite;">📱</div>
        <div style="font-size: 24px; margin-bottom: 10px;">Bitte drehe dein Gerät</div>
        <div style="font-size: 16px; opacity: 0.8;">Für die beste Spielerfahrung verwende das Querformat</div>
        <style>
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(90deg); }
            }
        </style>
    `;

    document.body.appendChild(rotationDiv);
}

function checkOrientation() {
    let rotationScreen = document.getElementById('rotationScreen');

    if (!rotationScreen) {
        createRotationScreen();
        rotationScreen = document.getElementById('rotationScreen');
    }

    const isMobile = window.innerWidth <= 1024;
    const isPortrait = window.innerHeight > window.innerWidth;

    if (isMobile && isPortrait) {
        rotationScreen.style.display = 'flex';
        // Pausiere Spiel-Sounds oder Animationen hier
        if (world && world.character && world.character.walking_sound) {
            world.character.walking_sound.pause();
        }
    } else {
        rotationScreen.style.display = 'none';
    }
}

// Event Listeners für Rotation
window.addEventListener('orientationchange', function () {
    setTimeout(checkOrientation, 100);
});

window.addEventListener('resize', checkOrientation);

// Initial Check beim Laden
window.addEventListener('load', checkOrientation);