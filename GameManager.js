function pauseGame() {
    if (computerAI == true) {
        gameWonOrLost = false;
    }

    if (gameWonOrLost == true) {
        gameWonOrLost = false;
    }
    isGamePaused = true;
}

function unpauseGame() {

    if (computerAI == true) {
        gameWonOrLost = false;
    }

    if (gameWonOrLost == true) {
        gameWonOrLost = false;
    }
    isGamePaused = false;
}

function timer() {
    if (isGamePaused == false && gameWonOrLost == false) {
        time ++;
    }
}


function powerupsTimer() {
    powerupTimer++;
}


function notGameTimeTimer() {
        additionalTimer++;
}


cancel = setInterval(timer, 1000);
cancel2 = setInterval(notGameTimeTimer, 1000);


function hideScores() {
    var x = document.getElementById("players");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function gameLost() {
    alert("You lose!");
    console.log(additionalTimer);
    console.log(time);

    if (computerAI == false) {
        gameWonOrLost = true;
        if (additionalTimer >= time + 10) {
            score = 0;
            time = 0;
            clearInterval(myGameArea.interval);
            isLeftPlatformEnabled = false;
            myLeftPlatform = null;
            gamemode1 = false;
            gamemode2 = false;
            powerupsArray = null;
            computerAI = false;
            gameWonOrLost = false;
            additionalTimer = 0;
            startGame();
        }
    } else {
        score = 0;
        time = 0;
        clearInterval(myGameArea.interval);
        isLeftPlatformEnabled = false;
        myLeftPlatform = null;
        gamemode1 = false;
        gamemode2 = false;
        powerupsArray = null;
        computerAI = false;
        gameWonOrLost = false;
        additionalTimer = 0;
        startGame();
    }
   
}

function gameWon() {
    alert("You win!");
    if (computerAI == false) {
        gameWonOrLost = true;
        if (additionalTimer >= time + 10) {

            score = 0;
            time = 0;
            clearInterval(myGameArea.interval);
            isLeftPlatformEnabled = false;
            myLeftPlatform = null;
            gamemode1 = false;
            gamemode2 = false;
            powerupsArray = null;
            computerAI = false;
            gameWonOrLost = false;

            additionalTimer = 0;
            startGame();
        }
    } else {
        score = 0;
        time = 0;
        clearInterval(myGameArea.interval);
        isLeftPlatformEnabled = false;
        myLeftPlatform = null;
        gamemode1 = false;
        gamemode2 = false;
        powerupsArray = null;
        computerAI = false;
        gameWonOrLost = false;

        additionalTimer = 0;
        startGame();
    }
    
    
}

function platformMoveLeft() {
    if (reverseEffect == false) {
        if (myGameArea.key && myGameArea.key == 37) {
            myPlatform.speedX -= platformSpeed;
        }
    }
    else {
        if (myGameArea.key && myGameArea.key == 39) {
            myPlatform.speedX += platformSpeed;
        }
    }
    
}

function platformMoveRight() {
    if (reverseEffect == false) {
        if (myGameArea.key && myGameArea.key == 39) {
            myPlatform.speedX += platformSpeed;
        }
    }
    else {
        if (myGameArea.key && myGameArea.key == 37) {
            myPlatform.speedX -= platformSpeed;
        }
    }
    
}




function deactivatePowerup(powerup) {
    //console.log(powerup.time);
        if (powerup.powerupType === "Scorex2" || powerup.powerupType === "Scorex5") {
            scoreMultiplier = 1;
        } else if (powerup.powerupType === "Enlarge" || powerup.powerupType === "Reduce") {
            myPlatform.width = paddleWidth;
        } else {
            reverseEffect = false; 
        }
        
        console.log("powerupdestroyed");
}

function powerupEffect(powerup) {
    if (powerup.powerupType === "Scorex2" && powerup.isPowerupCaught == true) {
        scoreMultiplier = 2;
        powerup.isPowerupCaught == false;
        
    } else if (powerup.powerupType === "Scorex5" && powerup.isPowerupCaught == true) {
        scoreMultiplier = 5;
        powerup.isPowerupCaught == false;
       
    } else if (powerup.powerupType === "Enlarge" && powerup.isPowerupCaught == true) {
        myPlatform.width *= 1.2;
        powerup.isPowerupCaught == false;
        
    } else if (powerup.powerupType === "Reduce" && powerup.isPowerupCaught == true) {
        myPlatform.width *= 0.8;
        powerup.isPowerupCaught == false;
       
    } else { //reverse
        if (powerup.isPowerupCaught == true) {
            reverseEffect = true;
            powerup.isPowerupCaught == false;
           
        }
        
    }
}





function addNewBall() {
    if (typeBBlockCounter >= 5) {
        myBalls.push(new Ball(ballRadius, ballSpeed, ballSpeed))
        typeBBlockCounter = 0;
    }
}



function addDestroyed() {
    random = Math.floor((Math.random() * destroyedBlocksPosition.length) + 1);
    //console.log(random);
    
    for (i = 0; i < brickCols; i++) {
        for (j = 0; j < brickRows; j++) {
                if (destroyedBlocksPosition[random] == i * j) {
                    x = (blockWidth) * i + offsetX;
                    y = (blockHeight) * j + offsetY;
                    myObstacles.push(new Block(x, y));
                    destroyedBlocksPosition.splice(random, 1);
                }
        }
    }

   

}



function addNewBlockLine() {
    for (i = 0; i < brickCols; i++) {
            x = (blockWidth) * i + offsetX;
            y = (blockHeight) * 1 + offsetY;
            myObstacles.push(new Block(x, y));
    }
    
}


