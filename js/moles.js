class Mole {
  constructor() {
    this.board = document.getElementById("game-board");
    //the mole
    this.mole = document.createElement("img");
    this.mole.src = "./images/CustomEdited-Mole.png";
    this.mole.style.position = "absolute";
    this.mole.style.width = "100px";
    this.mole.style.height = "100px";
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
    this.move();
  }

  //stop the movement of the moles when the game is over
  stopMoving() {
    clearInterval(this.movementTimer); // Clear the movement interval
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

      // Update the position of the mole on the board
      this.mole.style.left = `${this.left}px`;
      this.mole.style.top = `${this.top}px`;
      console.log(
        `Mole moving from (${this.left}, ${this.top}) to (${newLeft}, ${newTop})`
      );
    }, 800);
  }
  // Hide the mole
  hide() {
    this.mole.style.display = "none";
  }
}
