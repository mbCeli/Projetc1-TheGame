
window.onload = function () {
    /*Bring all elements that will be used*/
    const beginButton = document.getElementById("begin-button");
    const againButton = document.getElementById("again-button");
    const board = document.getElementById("game-board");
    const startScreen = document.getElementById("start-screen");
    const gameOverScreen = document.getElementById("game-over-screen");
    const gameStats = document.getElementById("game-stats");
    const gameHoles = document.getElementById("holes");

    /*Declare a new game variable. I use let because everytime the startGame function 
    is called, the variable will be redefined*/
    let game;


    /*All the screens are hidden and I want to show the start screen when the page loads*/
    startScreen.styles.display = "flex";

    /*Add event listener to the begin button so when it is clicked, the startGame function 
    is called*/
    beginButton.addEventListener("click", function () {
        startGame();
    });

    /*The function that starts the game, has to show the game, create a new game (reassing 
    the game variable), show the game and start the game created*/
    function startGame() {
        game = new Game();
        game.start();
    }

};
