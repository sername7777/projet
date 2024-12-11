const cursor = document.getElementById('cursor');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const startBtn = document.getElementById('startBtn');
const menu = document.getElementById('menu');
const gameOverScreen = document.getElementById('gameOver');
const finalScore = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');

let score = 0;
let level = 1; // Niveau
let cursorSpeed = 0.05;
let isGameActive = false;
let gameInterval;
let gameTimer;


startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);

function startGame() {
    score = 0;
    level = 1;
    cursorSpeed = 0.05;
    isGameActive = true;
    scoreElement.textContent = `Score: ${score}`;
    levelElement.textContent = `Niveau: ${level}`;
    startBtn.disabled = true;
    menu.style.display = 'none'; // Cache le menu
    cursor.style.opacity = 1; // Affiche le curseur
    cursor.style.left = `${window.innerWidth / 2}px`;
    cursor.style.top = `${window.innerHeight / 2}px`;

    document.addEventListener('mousemove', moveCursor);
    gameInterval = setInterval(updateScore, 100);
    gameTimer = setTimeout(endGame, 60000); // Fin du jeu après 60 secondes
}

function moveCursor(event) {
    if (!isGameActive) return;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const cursorX = parseFloat(cursor.style.left || 0);
    const cursorY = parseFloat(cursor.style.top || 0);

    // Calculer la nouvelle position du curseur
    const newCursorX = cursorX + (mouseX - cursorX - 25) * cursorSpeed;
    const newCursorY = cursorY + (mouseY - cursorY - 25) * cursorSpeed;

    cursor.style.left = `${newCursorX}px`;
    cursor.style.top = `${newCursorY}px`;

    // Vérifier la collision
    const distance = Math.sqrt(
        Math.pow(mouseX - (newCursorX + 25), 2) +
        Math.pow(mouseY - (newCursorY + 25), 2)
    );

    if (distance < 25) {
        endGame(); // Collision détectée
    }
}

function updateScore() {
    if (!isGameActive) return;

    score++;
    scoreElement.textContent = `Score: ${score}`;

    if (score % 10 === 0) {
        level++;
        levelElement.textContent = `Niveau: ${level}`;
        cursorSpeed += 0.05; // Augmenter la vitesse à chaque niveau
    }
}

function endGame() {
    isGameActive = false;
    cursor.style.opacity = 0; // Masque le curseur à la fin du jeu
    clearInterval(gameInterval);
    clearTimeout(gameTimer);

    saveScoreToDatabase(score);

    finalScore.textContent = score;
    gameOverScreen.style.display = 'block'; // Affiche l'écran de fin
}

function restartGame() {
    gameOverScreen.style.display = 'none';
    startBtn.disabled = false;
    menu.style.display = 'block';
    cursor.style.opacity = 0; // Cache le curseur lors du menu
}

function saveScoreToDatabase(score) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_score.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(`score=${score}`);

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Score sauvegardé !');
        } else {
            console.error('Erreur lors de la sauvegarde du score');
        }
    };
}
