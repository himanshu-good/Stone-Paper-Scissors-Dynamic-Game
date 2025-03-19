let playerScore = 0;
let computerScore = 0;
let timeLeft = 30;
let timerInterval;

// Elements
const timerDisplay = document.getElementById('time');
const playerScoreDisplay = document.querySelector('#player-score h1');
const computerScoreDisplay = document.querySelector('#computer-score h1');
const resultDisplay = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');

// Choices
const choices = ['rock', 'paper', 'scissors'];
const playerChoices = document.querySelectorAll('.section-1 img');

// Start Timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// End Game
function endGame() {
    resultDisplay.innerHTML = `<p>Game Over! ${
        playerScore > computerScore
            ? '🎉 You won!'
            : playerScore < computerScore
            ? '😔 Computer won!'
            : '🤝 It\'s a draw!'
    }</p>`;
    playerChoices.forEach(choice => choice.removeEventListener('click', handlePlayerChoice));
}

// Restart Game
function restartGame() {
    playerScore = 0;
    computerScore = 0;
    timeLeft = 30;
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    resultDisplay.innerHTML = '<p>Make your move!</p>';
    clearInterval(timerInterval);
    startTimer();
    playerChoices.forEach(choice => choice.addEventListener('click', handlePlayerChoice));
}

// Handle Player Choice
function handlePlayerChoice(e) {
    const playerChoice = e.target.id;
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        playerScore++;
    } else if (playerChoice !== computerChoice) {
        computerScore++;
    }

    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;

    resultDisplay.innerHTML = `<p>You chose ${playerChoice}, computer chose ${computerChoice}.</p>`;
}

// Add Event Listeners
playerChoices.forEach(choice => choice.addEventListener('click', handlePlayerChoice));
restartBtn.addEventListener('click', restartGame);

// Start the game
startTimer();
