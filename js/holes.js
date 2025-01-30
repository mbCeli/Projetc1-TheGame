class Hole {
  constructor(index) {
    this.holesContainer = document.getElementById("holes")
    this.hole = document.createElement("img");
    this.hole.src = "./images/hole-pngtree.png";
    this.hole.style.position = "absolute";
    this.hole.style.width = "150px";
    this.hole.style.height = "130px";
    this.holesContainer.appendChild(this.hole);

    // Calculate the row and column based on index (0-8)
    this.row = Math.floor(index / 3); // 0, 1, 2 for rows
    this.col = index % 3; // 0, 1, 2 for columns
  }

  show() {
    // Gap between holes (horizontal and vertical)
    const gapX = 300; // Horizontal gap between holes (adjust if needed)
    const gapY = 200; // Vertical gap between holes (adjust if needed)

    // Set the position based on row and column index
    const topPosition = this.row * gapY + 40; // Adding 50 to center the hole vertically
    const leftPosition = this.col * gapX + 100; // Adding 100 to center the hole horizontally

    this.hole.style.top = `${topPosition}px`;
    this.hole.style.left = `${leftPosition}px`;

    // Show the hole
    this.hole.style.display = "block";
  }

  hide() {
    this.hole.style.display = "none";
  }
  
}

