const startScreen = document.getElementById("screen-welcome");
const startGameBtn = document.getElementById("btn-start");
const endScreen = document.getElementById("screen-end");
const gameScreen = document.getElementById("screen-game");
const playerScore = document.getElementById("score-player");
const computerScore = document.getElementById("score-cpu");
const playerchoice = document.querySelectorAll(".choice-btn");
const winStatus = document.getElementById("btn-menu");
const computerPanel = document.getElementById("computer-choice-holder");
const playerPanel = document.getElementById("player-choice-holder");

// screen state
startGameBtn.addEventListener("click", () => {
  startScreen.classList.remove("screen--active");

  gameScreen.classList.add("screen--active");
  gameScreen.classList.remove("hidden");
});

// game state
playerScore.textContent = 0;
computerScore.textContent = 0;
computerMove = "";
playerMove = "";
winStatus.textContent = "play";
let roundStatus = winStatus.textContent;
computerPanel.textContent = "?";
playerPanel.textContent = "?";
const choices = ["rock", "paper", "scissors"];
const moves = {
  rock: "🎱",
  paper: "📄",
  scissors: "✂️",
};

// computer move
function generateComputerMove() {
  let randomIndex = Math.floor(Math.random() * choices.length);
  if (randomIndex === 0) computerMove = "rock";
  if (randomIndex === 1) computerMove = "paper";
  if (randomIndex === 2) computerMove = "scissors";
  return computerMove;
}

// player choice
playerchoice.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (
      Number(playerScore.textContent) === 5 ||
      Number(computerScore.textContent) === 5
    ) {
      gameScreen.classList.remove("screen--active");
      gameScreen.classList.add("hidden");

      endScreen.classList.add("screen--active");
      endScreen.classList.add("end--lose");
      endScreen.classList.remove("hidden");
    }

    move = choice.id;
    playerMove = move.replace("btn-", "");
    computerMove = generateComputerMove();

    playerPanel.textContent = moves[playerMove];

    generateComputerMove();
    computerPanel.textContent = moves[computerMove];

    let winner = getWinner(playerMove, computerMove);
    updateWinner(winner);
    winStatus.textContent = roundStatus;
  });
});

function getWinner(player, computer) {
  if (player === computer) {
    return "draw";
  }

  if (player === "rock" && computer === "scissors") {
    return "player";
  } else if (player === "rock" && computer === "paper") {
    return "computer";
  }

  if (player === "paper" && computer === "rock") {
    return "player";
  } else if (player === "paper" && computer === "scissors") {
    return "computer";
  }

  if (player === "scissors" && computer === "paper") {
    return "player";
  } else if (player === "scissors" && computer === "rock") {
    return "computer";
  }
}

function updateWinner(winner) {
  if (winner === "draw") roundStatus = "draw";

  if (winner === "player") {
    roundStatus = "you win";
    playerScore.textContent++;
  }

  if (winner === "computer") {
    roundStatus = "you lose";
    computerScore.textContent++;
  }
}
