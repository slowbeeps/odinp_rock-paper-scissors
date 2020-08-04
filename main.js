// Store all the DOM nodes
const messageDiv = document.querySelector('#message-div');
const scoreDiv = document.querySelector('#score-div');
const playGameDiv = document.querySelector('#playgame-div')
const selectionBtnsNode = document.querySelectorAll('div#selections-div > div');
const rockDiv = document.querySelector('#rock');
const paperDiv = document.querySelector('#paper');
const scissorsDiv = document.querySelector('#scissors');

// Declare variables:
let playerSelection, computerSelection, playerRoundsWon = 0,
    compRoundsWon = 0,
    ties = 0,
    roundCounter = 0;

// Randomly decides computer's play:
function computerPlay() {
    let comPlayNum = Math.floor(Math.random() * 3);
    if (comPlayNum == 0) {
        return "rock";
    } else if (comPlayNum == 1) {
        return "paper";
    } else if (comPlayNum == 2) {
        return "scissors";
    }
}

// Play the actual round and count rounds
function playRound(playerSelection, computerSelection) {
    roundCounter++;
    computerSelection = computerPlay();
    if ((playerSelection == "rock" && computerSelection == "rock")) {
        ties++;
        return ("Computer chose " + computerSelection + ", and You chose " + playerSelection +
            ". It's a tie, stop copying me!") // rock vs rock - tie
    } else if ((playerSelection == "rock") && (computerSelection == "paper")) {
        compRoundsWon++;
        return ("Computer chose " + computerSelection + ", and You chose " + playerSelection +
            ". You lose! get good LMAO."); // rock vs paper - comp wins
    } else if ((playerSelection == "rock") && (computerSelection == "scissors")) {
        playerRoundsWon++;
        return ("Computer chose " + computerSelection + ", and You chose " + playerSelection +
            ". You win! But not for long.") // rock vs scissors - player wins
    } else if ((playerSelection == "paper") && (computerSelection == "paper")) {
        ties++;
        return ("Computer chose " + computerSelection + ", and You chose " + playerSelection +
            ". It's a tie, stop copying me!") // paper vs paper - tie
    } else if ((playerSelection == "paper") && (computerSelection == "scissors")) {
        compRoundsWon++;
        return ("Computer chose " + computerSelection + ", and You chose " + playerSelection +
            ". You lose! get good LMAO.") // paper vs scissors - comp wins 
    } else if ((playerSelection == "paper") && (computerSelection == "rock")) {
        playerRoundsWon++;
        return ("Computer chose " + computerSelection + ", and You chose " + playerSelection +
            ". You win! But not for long.") // paper vs rock - player wins
    } else if ((playerSelection == "scissors") && (computerSelection == "scissors")) {
        ties++;
        return ("Computer chose " + computerSelection + ", and You chose " + playerSelection +
            ". It's a tie, stop copying me!") // scissors vs scissors - tie
    } else if ((playerSelection == "scissors") && (computerSelection == "paper")) {
        playerRoundsWon++;
        return ("Computer chose " + computerSelection + ", and You chose " + playerSelection +
            ". You lose! get good LMAO.") // scissors vs paper - player wins
    } else if ((playerSelection == "scissors") && (computerSelection == "rock")) {
        compRoundsWon++;
        return ("You win! But not for long.") // scissors vs rock - comp wins
    }
}

function playAgain() {
    roundCounter = 0;
    playerRoundsWon = 0;
    compRoundsWon = 0;
    ties = 0;
    playGameDiv.textContent = "playing";
    playGameDiv.style.cssText = "color: rgba(0, 0, 0, 0.397);";
    messageDiv.textContent = "Choose your play";
    scoreDiv.textContent = "";
    playGameDiv.removeEventListener('click', playAgain);
}
selectionBtnsNode.forEach((node) => {
    node.addEventListener('click', (e) => {
        playGameDiv.textContent = "playing";
        playGameDiv.style.cssText = "color: rgba(0, 0, 0, 0.397);";
        if (roundCounter == 5) {
            if (compRoundsWon > playerRoundsWon) {
                messageDiv.textContent = ("You lose!");
            } else if (compRoundsWon < playerRoundsWon) {
                messageDiv.textContent = ("You win the game");
            } else if (compRoundsWon == playerRoundsWon) {
                messageDiv.textContent = ("We tie!");
            }
            playGameDiv.textContent = "Play again";
            playGameDiv.style.cssText = "color: black;"
            playGameDiv.addEventListener('click', playAgain);
            return;
        }
        playerSelection = node.textContent;
        messageDiv.textContent = `'${(playRound(playerSelection, computerSelection))}'`;
        scoreDiv.innerHTML = `Wins: ${playerRoundsWon}<br> Losses: ${compRoundsWon}<br> Ties: ${ties}`;
    })
})