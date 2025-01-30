class Player {
  constructor() {
    this.board = document.getElementById("game-board");
    this.holesContainer = document.getElementById("holes");
    this.playerElement = document.createElement("img");
    this.playerElement.src = "./images/Temporary-Player.png"; 
    this.playerElement.style.position = "absolute";
    this.playerElement.style.width = "60px"; 
    this.playerElement.style.height = "60px"; 
    this.board.appendChild(this.playerElement);

    this.currentHoleIndex = 0; // Start at first hole
    this.isVisible = false; // At the beginning of the game the player is not visible
    this.updatePlayerPosition(); // This is to update the player's position on the board
  }

  // Move the player to a specific hole based on the keyboard keys pressed
  move(direction) {
    if (this.isVisible === true) return; // I dont want the player to be able to move is he is visible 

    // Move up (index changes by 3 for each row)
    if (direction === "up" && this.currentHoleIndex > 2) {
      this.currentHoleIndex -= 3;
    }
    // Move down
    else if (direction === "down" && this.currentHoleIndex < 6) {
      this.currentHoleIndex += 3;
    }
    // Move left
    else if (direction === "left" && this.currentHoleIndex % 3 !== 0) {
      this.currentHoleIndex -= 1;
    }
    // Move right
    else if (direction === "right" && this.currentHoleIndex % 3 !== 2) {
      this.currentHoleIndex += 1;
    }

    this.updatePlayerPosition();
  }

  // Update the player's position on the board
  updatePlayerPosition() {
    const selectedHoleIndex = this.currentHoleIndex;
    const row = Math.floor(selectedHoleIndex / 3); // Calculate the row (0, 1, 2)
    const col = selectedHoleIndex % 3; // Calculate the column (0, 1, 2)

    // Set the gap values for holes
    const gapX = 300; // Horizontal gap between holes (adjust if needed)
    const gapY = 200; // Vertical gap between holes (adjust if needed)

    // Calculate the position of the hole using the row and column
    const holeTop = row * gapY - 10// Add -10 for offset
    const holeLeft = col * gapX + 10// Add 20 for offset

    // Now, place the player in the center of the hole
    const holeCenterX = holeLeft + gapX / 2;
    const holeCenterY = holeTop + gapY / 2;

    // Move the player to the center of the hole
    this.playerElement.style.left = `${
      holeCenterX - this.playerElement.width / 2
    }px`;
    this.playerElement.style.top = `${
      holeCenterY - this.playerElement.height / 2
    }px`;
  }

  // Make the player appear in the selected hole
  appear() {
    //Once a hole is selected by the player, make the player visible (appear)
    if (this.isVisible === true) return; // if the player is visible, do nothing

    this.isVisible = true;
    this.playerElement.style.display = "block";
    this.updatePlayerPosition(); // update the position
  }

  // Hide the player back into the hole
  hide() {
    if (this.isVisible === false) return; // if the player is not visible, do nothing

    this.isVisible = false;
    this.playerElement.style.display = "none";
  }
}
