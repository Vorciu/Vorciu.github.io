function pauseGame() {
    isGamePaused = true;
}

function unpauseGame() {
    isGamePaused = false;
}

function timer() {
    if (isGamePaused == false && stopTimer == false) {
        time ++;
    }
}

cancel = setInterval(timer, 1000);


function hideScores() {
    var x = document.getElementById("players");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function gameLost() {

    stopTimer = true;
    score = 0;
    time = 0;
    clearInterval(myGameArea.interval);
    isLeftPlatformEnabled = false;
    myLeftPlatform = null;
    gamemode1 = false;
    gamemode2 = false;
    powerupsArray = null;
    alert("You lose!");
    startGame();
}

function gameWon() {
    stopTimer = true;
    score = 0;
    time = 0;
    clearInterval(myGameArea.interval);
    isLeftPlatformEnabled = false;
    myLeftPlatform = null;
    gamemode1 = false;
    gamemode2 = false;
    powerupsArray = null;
    alert("You win!");
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




function destroyPowerup() {
    if ((time - powerupTime) >= 5) {
        shift(powerupsArray);
        console.log("powerupdestroyed");
    }
}





function addNewBall() {
    if (typeBBlockCounter >= 5) {
        myBalls.push(new Ball(ballRadius, ballSpeed, ballSpeed))
        typeBBlockCounter = 0;
    }
}



function addDestroyed() {
    random = Math.floor(Math.random() * destroyedBlocksPosition.length);
    //console.log(destroyedBlocksPosition[random]);
    
    for (i = 0; i < brickCols; i++) {
        for (j = 0; j < brickRows; j++) {
                if (destroyedBlocksPosition[random] == i * j) {
                    x = (blockWidth) * i + offsetX;
                    y = (blockHeight) * j + offsetY;
                    myObstacles.push(new Block(x, y));
                }
        }
    }

    destroyedBlocksPosition.splice(1, random); //50 razy na sekunde
    //console.log(destroyedBlocksPosition.length);

}



function addNewBlockLine() {
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 1; j++) {
            x = (blockWidth) * i + offsetX;
            y = (blockHeight) * j + offsetY;
            myObstacles.push(new Block(x, y)); //50
        }

    }
    //lastBlockLine++;
}


