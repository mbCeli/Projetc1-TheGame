
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
  beginButton.addEventListener("click", function () {
    startGame();
  });

  /*The function that starts the game, has to show the game, create a new game (reassing 
    the game variable), show the game and start the game created*/
  function startGame() {
    game = new Game();
    game.start();

    // Add the handleKeydown function as an event listener for the keydown event
    window.addEventListener("keydown", handleKeydown);
  }

  /*Here the function that controls the pressing of the keys*/
  function handleKeydown(event) {
    event.preventDefault(); //pare evitar acciones por defecto del event

    switch (event.key) {
      case "ArrowUp":
      case "w":
        game.player.move("up");
        break;

      case "ArrowDown":
      case "s":
        game.player.move("down");
        break;

      case "ArrowLeft":
      case "a":
        game.player.move("left");
        break;

      case "ArrowRight":
      case "d":
        game.player.move("right");
        break;

      case " ":
        if (game.player.isVisible) {
          game.player.hide(); // Hide the player if visible
        } else {
          game.player.appear(); // The player appears if hidden
        }
        break;
    }
  }

  /*The again button, restarts the game, starts a new game and hides the game over screen*/
  againButton.addEventListener("click", function () {
    game.gameOverScreen.style.display = "none";
    game = new Game();
    game.start();
  });
};
