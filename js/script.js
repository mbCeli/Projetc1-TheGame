
window.onload = function () {
    /*Bring all elements that will be used*/
    const beginButton = document.getElementById("begin-button");
    const againButton = document.getElementById("again-button");
    const gameStats = document.getElementById("game-stats");
    const gameHoles = document.getElementById("holes");

    /*Declare a new game variable. I use let because everytime the startGame function 
    is called, the variable will be redefined*/
    let game;

    /*Add event listener to the begin button so when it is clicked, the startGame function 
    is called*/
    beginButton.addEventListener("click", function() {
        console.log("Begin Button Clicked");
        startGame();
    });

    /*The function that starts the game, has to show the game, create a new game (reassing 
    the game variable), show the game and start the game created*/
    function startGame() {

        console.log("Game Started");
        game = new Game();
        game.start();
    }
};
