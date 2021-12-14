'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;

let score = 10, highscore = 0, gameover = 0;

function displayMessage(message) {
    document.querySelector(".message").textContent = message;
}

function decreaseScore() {
    if (score > 0) {
        score--;
    }

    if(score === 0) {
        displayMessage("👎 You lost the game!");

        // Losing style
        document.querySelector(".number").textContent = secretNumber;
        document.querySelector("body").style.backgroundColor = "#d62029";
        document.querySelector(".number").style.width = "30rem";

        gameover = 1;
    }

    document.querySelector(".score").textContent = score;
}

function correctGuess() {
    displayMessage("🎊 Correct number!");

    // Update highscore
    highscore = Math.max(highscore, score);
    document.querySelector(".highscore").textContent = highscore;

    // Celebration style
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    gameover = 1;
}

function incorrectGuess(guess) {
    const message = guess > secretNumber ? "📈 Too high!" : "📉 Too low!";
    displayMessage(message);
    decreaseScore();
}

// Check logic
function check(guess) {
    if(!guess) {
        displayMessage("⛔ No number!");
    }
    else if(guess === secretNumber) {
        correctGuess();
    }
    else {
        incorrectGuess(guess);
    }
}

document.querySelector(".check").addEventListener("click", () => {
    if(!gameover) {
        const guess = Number(document.querySelector(".guess").value);
        check(guess);
    }
});

// Play again logic
document.querySelector(".again").addEventListener("click", () => {

    displayMessage("Start guessing...");

    // Reset secret number
    document.querySelector(".number").textContent = "?";
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
    secretNumber = Math.trunc(Math.random() * 20) + 1;

    // Reset score
    score = 10;
    document.querySelector(".score").textContent = score;

    gameover = 0;
});