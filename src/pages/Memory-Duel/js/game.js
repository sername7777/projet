let cards = [];
let revealedCards = [];
let score = 0;
let pairsRemaining = 0;
let difficulty = 'medium';
let username = '';
let totalCards = 16;
let timerInterval;
let timeRemaining = 0;  // In seconds

const gameBoard = document.getElementById('gameBoard');
const startGameBtn = document.getElementById('startGameBtn');
const difficultySelect = document.getElementById('difficulty');
const timerDurationSelect = document.getElementById('timerDuration'); // Timer duration select
const newGameBtn = document.getElementById('newGameBtn');
const scoreElement = document.getElementById('score');
const pairsRemainingElement = document.getElementById('pairsRemaining');
const usernameInput = document.getElementById('username');
const usernameDisplay = document.getElementById('usernameDisplay');
const timerDisplay = document.getElementById('timerDisplay');  // Timer display

const menu = document.querySelector('.menu');
const gameBoardContainer = document.querySelector('.game-board-container');

difficultySelect.addEventListener('change', (e) => {
    difficulty = e.target.value;
});

startGameBtn.addEventListener('click', () => {
    username = usernameInput.value;
    if (username) {
        initializeGame();
    } else {
        alert("Veuillez entrer un pseudonyme !");
    }
});

newGameBtn.addEventListener('click', initializeGame);

function initializeGame() {
    usernameDisplay.textContent = username;  // Display the player's username
    menu.style.display = 'none';  // Hide the menu
    gameBoardContainer.style.display = 'block';  // Show the game
    setDifficulty();
    createBoard();
    resetGame();
    startTimer();  // Start the timer when the game begins
}

function setDifficulty() {
    switch (difficulty) {
        case 'easy':
            totalCards = 8;
            break;
        case 'medium':
            totalCards = 16;
            break;
        case 'hard':
            totalCards = 24;
            break;
    }
    pairsRemaining = totalCards / 2;
    pairsRemainingElement.textContent = pairsRemaining;

    // Get the selected timer duration
    timeRemaining = parseInt(timerDurationSelect.value);
    updateTimerDisplay();
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            alert("Temps écoulé ! Vous avez perdu !");
            newGameBtn.style.display = 'block';  // Show the new game button
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function createBoard() {
    cards = generateCards();
    shuffle(cards);
    gameBoard.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.card = card;
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', onCardClick);
        gameBoard.appendChild(cardElement);
    });
}

function generateCards() {
    let cardList = [];
    const characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    
    const shuffledCharacters = characters.sort(() => 0.5 - Math.random()).slice(0, totalCards / 2);
    
    cardList = [...shuffledCharacters, ...shuffledCharacters];
    return cardList;
}

function onCardClick(event) {
    const card = event.target;
    if (revealedCards.length < 2 && !card.classList.contains('revealed')) {
        card.classList.add('revealed');
        card.textContent = card.dataset.card;
        revealedCards.push(card);

        if (revealedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    if (revealedCards[0].dataset.card === revealedCards[1].dataset.card) {
        score += 10;
        pairsRemaining--;
        pairsRemainingElement.textContent = pairsRemaining;
        scoreElement.textContent = score;
        revealedCards = [];
        
        if (pairsRemaining === 0) {
            clearInterval(timerInterval);  // Stop the timer when the game is finished
            setTimeout(() => {
                alert("Vous avez gagné ! Félicitations!");
                newGameBtn.style.display = 'block';  // Show the new game button
            }, 500);
        }
    } else {
        setTimeout(() => {
            revealedCards.forEach(card => {
                card.classList.remove('revealed');
                card.textContent = '';
            });
            revealedCards = [];
        }, 1000);
    }
}

function resetGame() {
    score = 0;
    pairsRemaining = totalCards / 2;
    scoreElement.textContent = score;
    pairsRemainingElement.textContent = pairsRemaining;
    newGameBtn.style.display = 'none';  // Hide the new game button initially
    clearInterval(timerInterval);  // Stop any previous timer
    startTimer();  // Start a new timer
    updateTimerDisplay();
}
