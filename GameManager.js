function pauseGame() {
    isGamePaused = true;
}

function unpauseGame() {
    isGamePaused = false;
}


/*function restartGame() {

    myGameArea.stop();

    //enableLeftPlatform();
    startGame();
}*/



function timer() {
    if (isGamePaused == false && stopTimer == false) {
        time += 1;
    }
}

var cancel = setInterval(timer, 1000);

function hideScores() {
    var x = document.getElementById("players");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function gameLost() {
    keyPressed = false;
    stopTimer = true;
    score = 0;
    time = 0;
    clearInterval(myGameArea.interval);
    isLeftPlatformEnabled = false;
    myLeftPlatform = null;
    
    alert("You lose!");
    startGame();
}

function gameWon() {
    //stopTimer = true;
    //clearInterval(myGameArea.interval);
    alert("You win!");
    isLeftPlatformEnabled = false;
    myLeftPlatform = null;
    startGame();
}

function platformMoveLeft() {
    if (myGameArea.key && myGameArea.key == 37) {
        myPlatform.speedX -= platformSpeed;
    }
}

function platformMoveRight() {
    if (myGameArea.key && myGameArea.key == 39) {
        myPlatform.speedX += platformSpeed;
    }
}

