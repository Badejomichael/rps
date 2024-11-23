let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

const rockButtonElement = document.querySelector('.rock-btn');
rockButtonElement.addEventListener('click', () => {
  playGame('rock');
});

const paperButtonElement = document.querySelector('.paper-btn');
paperButtonElement.addEventListener('click', () => {
  playGame('paper');
});

const scissorsButtonElement = document.querySelector('.scissors-btn');
scissorsButtonElement.addEventListener('click', () => {
  playGame('scissors');
});

const resetButtonElement = document.querySelector('.reset-score-btn');
resetButtonElement.addEventListener('click', () => {
  resetScore();
});

const autoPlayButtonElement = document.querySelector('.auto-play-btn');
autoPlayButtonElement.addEventListener('click', () => {
  autoPlay();
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') { 
    resetScore();
  }
});

function playGame(playerMove) {
  let result = "";
  const computerMove = pickComputerMove();
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = `${result}`;
  document.querySelector(".js-move").innerHTML = `You
<img src="./rps-images/${playerMove}-emoji.png" alt="">
<img src="./rps-images/${computerMove}-emoji.png" alt="">
Computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}. Losses: ${score.losses}. Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

const computerMove = pickComputerMove();

function resetScore() {
  const resetMessage = document.querySelector('.reset-score-message');
  resetMessage.innerHTML = `<p class=" reset-score-message-style">Are you sure you want to reset the score? <button class="yes-btn">Yes</button>
  <button class="no-btn">No</button> </p>`;

  const yesButtonElement = document.querySelector('.yes-btn') 
  yesButtonElement.addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();

    resetMessage.innerHTML = '';
  });

  const noButtonElement = document.querySelector('.no-btn') 
  noButtonElement.addEventListener('click', () => {
    resetMessage.innerHTML = '';
  });
}


let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if(!isAutoPlaying) {
    intervalId = setInterval(
    function() {
      const playerMove = pickComputerMove();
      playGame(playerMove)
    }, 1000
  )
  isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }

  if (autoPlayButtonElement.innerText === 'Auto Play') {
    autoPlayButtonElement.innerText = 'Stop Playing'
  } else {
    autoPlayButtonElement.innerText = 'Auto Play'
  }
};