class Game {
  constructor() {
    this.board = document.getElementById("game-board");
    this.startScreen = document.getElementById("start-screen");
    this.gameOverScreen = document.getElementById("game-over-screen");
    this.gameOverStats = document.getElementById("game-over-stats");
    this.gameStats = document.getElementById("game-stats");
    this.endMessage = document.getElementById("end-message");
    // Create holes with index (0 to 8)
    this.holes = [];
    for (let i = 0; i < 9; i++) {
      this.holes.push(new Hole(i)); // Pass the index to the Hole constructor
    }

    this.player = new Player();
    this.moles = [
      new Mole(this.holes, this.player, this),
      new Mole(this.holes, this.player, this),
      new Mole(this.holes, this.player, this),
      new Mole(this.holes, this.player, this),
      new Mole(this.holes, this.player, this),
      new Mole(this.holes, this.player, this),
      new Mole(this.holes, this.player, this),
      new Mole(this.holes, this.player, this),
      new Mole(this.holes, this.player, this),
    ];
    this.gameDuration = 60;
    this.remainingTime = this.gameDuration;
    this.timeRemainingContainer = document.getElementById("time-left");
    this.timer = null;
    this.gameOver = false;
    this.heartIcons = document.getElementById("heart-icons");
    this.lives = 5;
    this.score = 0;
    this.scoreDisplay = document.getElementById("score");
    this.livesDisplay = document.getElementById("lives");
    this.playerVisibleTimer = null;
    this.finalScore = document.getElementById("final-score");
    this.finalMessage = document.createElement("p");
    this.gameLoopTimer;
    this.gameOverStats.appendChild(this.finalMessage);
  }

  start() {
    //Hide the start screen
    this.startScreen.style.display = "none";

    //Show the game display where the player will play
    this.gameStats.style.display = "flex";

    // Reset the score when starting a new game
    this.score = 0;
    this.scoreDisplay.innerText = this.score; // Update the score display

    //Start the timer countdown
    this.startCountdown();

    //Start the game loop
    this.gameLoopTimer = setInterval(() => this.gameLoop(), 1000);
  }

  startCountdown() {
    this.timer = setInterval(() => {
      this.remainingTime -= 1;

      const minutes = Math.floor(this.remainingTime / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (this.remainingTime % 60).toString().padStart(2, "0");

      this.timeRemainingContainer.innerText = `${minutes}:${seconds}`;

      if (this.remainingTime === 0) {
        clearInterval(this.timer);
        this.endGame();
      }
    }, 1000);
  }

  gameLoop() {
    if (this.gameOver === true) {
      return;
    }

    //Place the holes
    this.holes.forEach((hole) => hole.show());

    //Move the moles
    this.moles.forEach((mole) => mole.move());

    this.moles.forEach((mole) => {
      if (mole.checkMolePlayerCollision()) {
        this.lives -= 1;
        this.score -= 20;
        this.heartIcons.innerText = this.lives;
        this.scoreDisplay.innerText = this.score;
      }

      if (this.lives === 0) {
        this.endGame();
        clearInterval(this.gameLoopTimer);
      }
    });

    //Move the player
    this.player.move();

    // Update the score every second if the player is visible
    if (this.player.isVisible) {
      this.updateScore();
    }
  }

  updateHeartIcons() {
    const heartIconsContainer = document.getElementById("heart-icons");
    heartIconsContainer.innerHTML = ""; // Clear existing icons

    for (let i = 0; i < this.lives; i++) {
      const heartIcon = document.createElement("i");
      heartIcon.className = "fas fa-heart"; // Font Awesome classes for heart icon

      heartIconsContainer.appendChild(heartIcon);
    }
  }

  updateScore() {
    // Increment points by 10 every second if the player is visible
    if (this.playerVisibleTimer === null) {
      if (this.player.isVisible) {
        this.score += 10;
        this.scoreDisplay.innerText = this.score;
      }

      if (this.score <= 0) {
        this.score = 0;
        this.scoreDisplay.innerText = 0;
      }
    }
    this.updateHeartIcons(); // Update heart icons when the player loses lives
  }

  endGame() {
    this.gameOver = true;

    // Stop the movement of the moles
    this.moles.forEach((mole) => mole.stopMoving());
    // Hide all moles from the game board
    this.moles.forEach((mole) => mole.hide());

    // Hide all holes from the game board
    this.holes.forEach((hole) => hole.hide());

    // Hide the player from the game board
    this.player.hide();

    // Show the game over screen
    this.gameOverScreen.style.display = "flex";

    // Hide the game display
    this.gameStats.style.display = "none";

    // Show the final score
    this.finalScore.innerText = this.score;

    // Show a message based on the final score below the score
    if (this.score <= 0) {
      this.finalScore.innerText = 0;
      this.finalMessage.innerText = "Our revenge has been fulfilled!";
      this.finalMessage.style.color = "red";

    } else if (this.score <= 200) {
      this.finalMessage.innerText = "Our revenge has been fulfilled!";
      this.finalMessage.style.color = "red";

    } else if (this.score <= 400) {
      this.finalMessage.innerText = "You are good but not good for us";
      this.finalMessage.style.color = "firebrick";
      this.endMessage.innerText = "Not bad";
      
    } else if (this.score <= 600) {
      this.finalMessage.innerText =
        "You are the master of the mallet... and the mole's holes";
      this.finalMessage.style.color = "rgb(7, 77, 32)";
      this.endMessage.innerText = "Ok, you win!";
    } else {
      this.finalMessage.innerText = "Your score is exceptionally high!";
      this.finalMessage.style.color = "rgb(7, 77, 32)";
    }
  }
}
