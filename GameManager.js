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



function addNewBall() {
    //if (typeBBlockCounter >= 5) {
        myBalls.push(new Ball(ballRadius, ballSpeed, ballSpeed))
    //}
}



function addDestroyed() {
    let spliceTimer = 
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

/*checkLastLineBlock() {
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 1; j++) {
            x = (blockWidth) * i + offsetX;
            y = (blockHeight) * (j + lastBlockLine) + offsetY;
            myObstacles.push(new Block(x, y));
        }

    }

    return lastBlockLine;
}*/


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


function gamemode1f() { //- 1 tryb oznacza ze nadal mamy zawsze 30 bloków tylko dok³adamy bloki w trakcieich zbijania. Algorytm do wymyœlenia wybierzemy najlepszy. 
    //Zasada taka ze ma niebyæ sytuacji w której jest mniej ni¿ 5 klocków na ekranie i max 25. Pomiêdzy t¹wartoœci¹ niektóre klocki pojawiamy ponownie
    if (destroyedBlocksPosition.length >= 5) {
        //setInterval(spliceDestroyed, 5000);
        //setInterval(checkDestroyed, 7500)
            
        addDestroyed();


            //blockAddFlag = false;
        

    }
}


