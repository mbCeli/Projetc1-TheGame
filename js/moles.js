class Mole {
    constructor() {
        this.board = document.getElementById("game-board");
        this.mole = document.createElement("img");
        this.mole.src = "./images/CustomEdited-Mole.png";
        this.mole.style.position = "absolute";
        this.mole.style.width = "100px";
        this.mole.style.height = "100px";
    
        //position the moles at the top of the board to start and can only move inside the limits of the board
        this.mole.style.top = "0px";
        this.mole.style.bottom = "0px";
        this.mole.style.right = Math.floor(Math.random() * 600) + "px";
        this.mole.style.left = Math.floor(Math.random() * 600) + "px";
        this.board.appendChild(this.mole);
    }

    //function that moves the moles randomly around the board automatically
    move() {

    }
}