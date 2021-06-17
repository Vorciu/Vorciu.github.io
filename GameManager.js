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




function spliceDestroyed(){
    

}


function addDestroyed() {
    random = Math.floor(Math.random() * destroyedBlocksPosition.length);
    console.log(destroyedBlocksPosition[random]);
    
    for (i = 0; i < brickCols; i++) {
        for (j = 0; j < brickRows; j++) {
            if (destroyedBlocksPosition[random] == i * j) {
                x = (blockWidth) * i + offsetX;
                y = (blockHeight) * j + offsetY;
                myObstacles.push(new Block(x, y));
            }
            
        }
    }

    destroyedBlocksPosition.splice(1, random);
    console.log(destroyedBlocksPosition.length);

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

function gamemode2f() { //2 tryb to trudniejszy co 20-30 sekund dok³adamy ponad najwy¿sz¹ now¹ 1 liniêklocków.

}


function destroyedBlocksPos() {

}