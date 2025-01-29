class Mole {
  constructor() {
    this.board = document.getElementById("game-board");
    //the mole
    this.mole = document.createElement("img");
    this.mole.src = "./images/CustomEdited-Mole.png";
    this.mole.style.position = "absolute";
    this.mole.style.width = "100px";
    this.mole.style.height = "100px";
    //position the moles at the top of the board to start and can only move inside the limits of the board
    this.mole.style.top = Math.floor(Math.random() * 600) + "px";
    this.mole.style.left = Math.floor(Math.random() * 950) + "px";
    //add the mole class so I can see the transition in css
    this.mole.classList.add("mole");
    //add the mole to the board
    this.board.appendChild(this.mole);
    //direction of the moles
    this.directionX = 0;
    this.directionY = 0;
    //to start the moles at a random position
    this.top = Math.floor(Math.random() * 600 - 100);
    this.left = Math.floor(Math.random() * 950 - 100);
    //timer for the movement of the moles
    this.gameDuration = 60;
    this.remainingTime = this.gameDuration;
    this.timer = null;
    this.move();
  }

  //function that moves the moles randomly around the board automatically
  move() {
    // Create an interval for the moles to move
    this.timer = setInterval(() => {
      // Randomly change the mole's direction every 1 second
      this.remainingTime -= 1;

      // Randomly decide the direction of movement (left, right, up, down)
      const randomDirection = Math.floor(Math.random() * 4);

      // Adjust movement based on random direction
      if (randomDirection === 0) {
        this.directionX = 80; // move right
        this.directionY = 0;
      } else if (randomDirection === 1) {
        this.directionX = -80; // move left
        this.directionY = 0;
      } else if (randomDirection === 2) {
        this.directionX = 0;
        this.directionY = 80; // move down
      } else {
        this.directionX = 0;
        this.directionY = -80; // move up
      }

      // Update the mole's position based on the direction
      this.left += this.directionX;
      this.top += this.directionY;

      // Avoid going out of the limits of the board
      if (this.left < 0) this.left = 0; // prevent going left beyond 0 and keep moving right if at the left edge
      if (this.left > 950 - 100) this.left = 950 - 100; // prevent going right beyond board width (100px for mole size)
      if (this.top < 0) this.top = 0; // prevent going up beyond 0
      if (this.top > 600 - 100) this.top = 600 - 100; // prevent going down beyond board height (100px for mole size)

      /* // Check for nearby holes and avoid them
      const holes = document.querySelectorAll(".hole");
      holes.forEach((hole) => {
        const holeRect = hole.getBoundingClientRect();
        const moleRect = this.mole.getBoundingClientRect();

        // If the mole is near a hole, change its direction to avoid it
        if (
          Math.abs(moleRect.left - holeRect.left) < 50 &&
          Math.abs(moleRect.top - holeRect.top) < 50
        ) {
          // If the mole is too close to the hole, change direction
          if (randomDirection === 0 || randomDirection === 1) {
            this.directionX = randomDirection === 0 ? -10 : 10; // Move left or right
          } else {
            this.directionY = randomDirection === 2 ? -10 : 10; // Move up or down
          }
        }
      }); */

      // Update the position of the mole on the board
      this.mole.style.left = `${this.left}px`;
      this.mole.style.top = `${this.top}px`;

      // Stop the mole's movement when the game is over
      if (this.remainingTime === 0) {
        clearInterval(this.timer);
      }
    }, 1000); // Change position every 1 second
  }
}
