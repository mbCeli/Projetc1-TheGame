class Game {
  constructor() {
    this.board = document.getElementById("game-board");
    this.startScreen = document.getElementById("start-screen");
    this.gameOverScreen = document.getElementById("game-over-screen");
    this.gameOverStats = document.getElementById("game-over-stats");
    this.gameStats = document.getElementById("game-stats");
    // Create holes with index (0 to 8)
    this.holes = [];
    for (let i = 0; i < 9; i++) {
      this.holes.push(new Hole(i)); // Pass the index to the Hole constructor
    }
   /*  this.player = new Player; */
    this.moles = [new Mole, new Mole, new Mole, new Mole];
    this.gameDuration = 30;
    this.remainingTime = this.gameDuration;
    this.timeRemainingContainer = document.getElementById("time-left");
    this.timer = null;
    this.gameOver = false;
    this.lives = 3;
    this.score = 0;
    this.finalScore = document.getElementById("final-score");
    this.finalMessage = document.createElement("p");
    this.gameOverStats.appendChild(this.finalMessage);
  }

  start() {
    //Hide the start screen
    this.startScreen.style.display = "none";

    //Show the game display where the player will play
    this.gameStats.style.display = "flex";

    //Start the timer countdown
    this.startCountdown();

    //Start the game loop
    this.gameLoop();
  }

  startCountdown() {
    console.log("Countdown started");
    this.timer = setInterval(() => {
      console.log("timer started");
      this.remainingTime -= 1;

      const minutes = Math.floor(this.remainingTime / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (this.remainingTime % 60).toString().padStart(2, "0");

      this.timeRemainingContainer.innerText = `${minutes}:${seconds}`;

      if (this.remainingTime === 0) {
        console.log("Time's up!");
        clearInterval(this.timer);
        this.endGame();
      }
    }, 1000);
  }

  gameLoop() {
    //Place the holes
    this.holes.forEach((hole) => hole.show());

    //Move the moles
    this.moles.forEach((mole) => mole.move());

    //Check if the game is over
    if (this.gameOver === true) {
      clearInterval(this.timer);
      this.endGame();
    }
  }

  endGame() {
    this.gameOver = true;

    this.moles.forEach((mole) => mole.stopMoving());

    // Hide all moles from the game board
    this.moles.forEach((mole) => mole.hide());

    // Hide all holes from the game board
    this.holes.forEach((hole) => hole.hide());

    // Show the game over screen
    this.gameOverScreen.style.display = "flex";

    // Hide the game display
    this.gameStats.style.display = "none";

    // Show the final score
    this.finalScore.innerText = this.score;

    // Show a message based on the final score below the score
    if (this.score <= 200) {
      console.log("the if works");
      this.finalMessage.innerText = "Our revenge has been fulfilled";
    } else if (this.score <= 400 && this.finalScore > 200) {
      this.finalMessage.textContent = "You are good but not good for us";
    } else if (this.score <= 600 && this.finalScore > 400) {
      this.finalMessage.textContent =
        "You are the master of the mallet... and the mole's holes";
    }
  }
}
