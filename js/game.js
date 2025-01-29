class Game {
  constructor() {
    this.board = document.getElementById("game-board");
    this.startScreen = document.getElementById("start-screen");
    this.gameOverScreen = document.getElementById("game-over-screen");
    this.gameOverStats = document.getElementById("game-over-stats");
    this.gameStats = document.getElementById("game-stats");
    this.gameHoles = document.getElementById("holes");
    this.player;
    this.moles = [new Mole];
    this.gameDuration = 10;
    this.remainingTime = this.gameDuration;
    this.timeRemainingContainer = document.getElementById("time-left");
    this.timer = null;
    this.gameOver = false;
    this.lives = 3;
    this.score = 500;
    this.finalScore = document.getElementById("final-score");
    this.finalMessage = document.createElement("p");
    this.gameOverStats.appendChild(this.finalMessage);
  }

  start() {
    //Hide the start screen
    this.startScreen.style.display = "none";

    //Show the game display where the player will play
    this.gameStats.style.display = "flex";
    this.gameHoles.style.display = "flex";

    //Start the timer countdown
    this.startCountdown();

    //Start the game loop
    this.gameLoop();
  }

  startCountdown() {
    console.log("Countdown started");
    this.timer = setInterval(() => {
      console.log("timer started")
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
    //Move the moles
    this.moles.forEach((mole) => mole.move());

/*     //Update the player's position
    this.player.update(); */

    //Check if the game is over
    if (this.gameOver === true) {
      clearInterval(this.timer);
      this.endGame();
    }
  }

/*   update() {
    //Checks the player's position when moves
    this.player.move();

    //Check for collisions between the player and the moles
    this.moles.forEach((mole) => {

        //If a mole collisions with the player, the mole will hit the player and the 
        //player will lose a life and the score will decrease by 20
        if(mole.checkCollision(this.player) = true) {
            this.moles.forEach((mole) => mole.hit(this.player));
            this.lives -= 1;
            this.score -= 20;
        }

        //the score will increase by 10 every 5 seconds
        if (this.remainingTime % 5 === 0) {
        this.score += 10;
        }
    });

    //If the player loses all of their lives, the game is over  
    if (this.player.lives === 0) {
      this.endGame();
    }
  } */

  endGame() {
    this.gameOver = true;

    //Show the game over screen
    this.gameOverScreen.style.display = "flex";

    //Hide the game display
    this.gameStats.style.display = "none";
    this.gameHoles.style.display = "none";


    //Show the final score
    this.finalScore.innerText = this.score;

    if(this.score <= 200)  {
      //show a message based on the final score below the score
        this.finalMessage.innerText = "Our revenge has been fulfilled";
    } else if(this.score <= 400 && this.finalScore > 200) {
        this.finalMessage.textContent = "You are good but not good for us";
    } else if(this.score <= 600 && this.finalScore > 400) {
        this.finalMessage.textContent = "You are the master of the mallet... and the mole's holes";
    }
  }
}
