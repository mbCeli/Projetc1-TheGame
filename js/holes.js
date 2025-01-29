class Hole {
    constructor() {
        this.hole = document.createElement("img");
        this.hole.src = "./images/CustomEdited-Hole.png";
        this.hole.style.position = "absolute";
        this.hole.style.width = "100px";
        this.hole.style.height = "100px";
        this.board.appendChild(this.hole);
    }
}