class Mole {
  constructor(holes, player, game) {
    this.board = document.getElementById("game-board");
    this.holes = holes; // Save the holes for collision checking
    this.player = player;
    this.game = game;
    //the mole
    this.mole = document.createElement("img");
    this.mole.src = "./images/CustomEdited-Mole.png";
    this.mole.style.position = "absolute";
    this.mole.style.width = "100px";
    this.mole.style.height = "100px";
    this.mole.style.zIndex = 10;
    // to start the moles at a random position on the board
    this.mole.style.top = Math.floor(Math.random() * (600 - 100)) + "px";
    this.mole.style.left = Math.floor(Math.random() * (950 - 100)) + "px";
    // add the mole class so I can see the transition in css
    this.mole.classList.add("mole");
    // add the mole to the board
    this.board.appendChild(this.mole);
    // direction of the moles
    this.directionX = 0;
    this.directionY = 0;
    // to keep the position of the moles inside the limits of the board
    this.top = Math.floor(Math.random() * (600 - 100));
    this.left = Math.floor(Math.random() * (950 - 100));
    // timer for the movement of the moles
    this.movementTimer = null;
    this.collisionDetected = false;
    this.move();
  }

  //stop the movement of the moles when the game is over
  stopMoving() {
    clearInterval(this.movementTimer); // Clear the movement interval
  }

  updateMolePosition() {
    this.mole.style.left = `${this.left}px`;
    this.mole.style.top = `${this.top}px`;
  }

  move() {
    // Create an interval for the moles to move
    this.movementTimer = setInterval(() => {
      // Randomly decide the direction of movement (left, right, up, down)
      const randomDirection = Math.floor(Math.random() * 4);

      // Adjust movement based on random direction
      if (randomDirection === 0) {
        this.directionX = 50; // move right
        this.directionY = 0;
      } else if (randomDirection === 1) {
        this.directionX = -50; // move left
        this.directionY = 0;
      } else if (randomDirection === 2) {
        this.directionX = 0;
        this.directionY = 50; // move down
      } else {
        this.directionX = 0;
        this.directionY = -50; // move up
      }

      // Update the mole's position based on the direction
      let newLeft = this.left + this.directionX;
      let newTop = this.top + this.directionY;

      // Avoid going out of the limits of the board
      if (newLeft < 0) newLeft = 0; // prevent going left beyond 0
      if (newLeft > 950 - 100) newLeft = 950 - 100; // prevent going right beyond board width
      if (newTop < 0) newTop = 0; // prevent going up beyond 0
      if (newTop > 600 - 100) newTop = 600 - 100; // prevent going down beyond board height

      // Only update the position if the new position is valid (within bounds)
      this.left = newLeft;
      this.top = newTop;

      this.updateMolePosition(); // Update mole position on the screen

      console.log(`Mole moved to (${this.left}, ${this.top})`);

      // Check for collision with the player
      this.checkMolePlayerCollision();
    }, 800);
  }

  checkMolePlayerCollision() {
    if (this.collisionDetected) return;

    const moleRect = this.mole.getBoundingClientRect();
    const moleLeft = moleRect.left;
    const moleTop = moleRect.top;
    const moleRight = moleLeft + moleRect.width;
    const moleBottom = moleTop + moleRect.height;

    const playerRect = this.player.playerElement.getBoundingClientRect();
    const playerLeft = playerRect.left;
    const playerTop = playerRect.top;
    const playerRight = playerLeft + playerRect.width;
    const playerBottom = playerTop + playerRect.height;

    if (
      moleLeft < playerRight &&
      moleRight > playerLeft &&
      moleTop < playerBottom &&
      moleBottom > playerTop
    ) {
      console.log("Collision detected");

      // Mark the collision as detected
      this.collisionDetected = true;

      // Subtract points from the game object
      if (this.game.score >= 20) {
        this.game.score -= 20;
      } else {
        this.game.score = 0;
      }

      this.game.updateScore();
      console.log("Score updated");

      // Prevent mole from going over player
      if (this.directionX > 0) {
        this.left -= 50;
      } else if (this.directionX < 0) {
        this.left += 50;
      } else if (this.directionY > 0) {
        this.top -= 50;
      } else if (this.directionY < 0) {
        this.top += 50;
      }

      this.updateMolePosition();
    }
  }

  // Hide the mole
  hide() {
    this.mole.style.display = "none";
  }
}
