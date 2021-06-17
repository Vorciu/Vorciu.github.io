class Ball {
    constructor(radius, speedX, speedY) {
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.x = Math.floor((Math.random() * 400) + 70); // do zmiany
        this.y = Math.floor((Math.random() * 40) + 150);  // do zmiany
        this.image = new Image();
        this.image.src = "images/pilka.jpg";

    }
    update() {
        ctx = myGameArea.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.drawImage(this.image, this.x , this.y);
        ctx.closePath();
    }

    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    crashWithBall(otherBall) {
        var myCircleX = this.x;
        var myCircleY = this.y;
        var myCircleRadius = this.radius;
        var thatCircleX = otherBall.x;
        var thatCircleY = otherBall.y;
        var thatCircleRadius = otherBall.radius;
        var distanceX = myCircleX - thatCircleX;
        var distanceY = myCircleY - thatCircleY;
        var crash = true;
        var distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
        if (distanceSquared > (myCircleRadius + thatCircleRadius) * (myCircleRadius + thatCircleRadius)) {
            crash = false;
        }
        return crash;
    }

    ballCrashWithWall(wall) {
        var myCircleX = this.x;
        var myCircleY = this.y;
        var myCircleRadius = this.radius;

        var otherleft = wall.x;
        var otherright = wall.x + (wall.width);
        var othertop = wall.y;
        var otherbottom = wall.y + (wall.height);

        var testX = myCircleX;
        var testY = myCircleY;

        if (myCircleX < otherleft) {
            testX = otherleft;
        } else if (myCircleX > otherright) {
            testX = otherright;
        }

        if (myCircleY < othertop) {
            testY = othertop;
        } else if (myCircleY > otherbottom) {
            testY = otherbottom;
        }

        var distanceX = myCircleX - testX;
        var distanceY = myCircleY - testY;
        var distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
        var crash = true;

        if (distanceSquared > (myCircleRadius * myCircleRadius)) {
            crash = false;
        }
        return crash;
    }



    ballCrashWithPlatform(wall) {
        var myCircleX = this.x;
        var myCircleY = this.y;
        var myCircleRadius = this.radius;
        var baseBallSpeedX = ballSpeed;
        var baseBallSpeedY = ballSpeed;

        var otherleft = wall.x;
        var otherright = wall.x + (wall.width);
        var othertop = wall.y;
        var otherbottom = wall.y + (wall.height);

        var testX = myCircleX;
        var testY = myCircleY;

        var platform10width = wall.width / 10;

        if (myCircleX < otherleft) {
            testX = otherleft;
        } else if (myCircleX > otherright) {
            testX = otherright;
        }

        if (myCircleY < othertop) {
            testY = othertop;
        } else if (myCircleY > otherbottom) {
            testY = otherbottom;
        }

        var distanceX = myCircleX - testX;
        var distanceY = myCircleY - testY;
        var distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);


        if (distanceSquared <= (myCircleRadius * myCircleRadius)) {
            if (myCircleY >= othertop) {
                this.speedX *= -1;
            } else {
                if ((myCircleX < otherleft + platform10width && myCircleX >= otherleft || myCircleX <= otherright && myCircleX > otherright - platform10width )) { 
                    this.speedX = baseBallSpeedX * 3;
                    this.speedX *= -1;
                } else if ((myCircleX < otherleft + platform10width * 3 && myCircleX >= otherleft + platform10width || myCircleX <= otherright - platform10width && myCircleX >= otherright - platform10width*3)) {
                    this.speedX = baseBallSpeedX * 2;
                    //this.speedX *= -1;
                } else if ((myCircleX < otherleft + platform10width * 4 && myCircleX >= otherleft + platform10width * 3 || myCircleX <= otherright - platform10width * 3 && myCircleX >= otherright - platform10width * 4)) {
                    this.speedX = baseBallSpeedX * 1.5;
                    //this.speedX *= -1;
                } else {
                    this.speedX = baseBallSpeedX;
                }
                this.speedY *= -1;
            }
        }

    }


    increaseBallSpeed(platform) {
        var otherleft = platform.x;
        var otherright = platform.x + (platform.width);
        var platform10width = platform.width / 10;

        var othertop = platform.y;
        var otherbottom = platform.y + (platform.height);
        var platform10height = platform.height / 10;



        this.speedX = 10;

    }

}

function component(width, height, color, x, y, type) {
    this.isOn = true;
    this.type = type;
    this.width = width;
    this.height = height;
    this.areaFactor = 1;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

    }

    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    this.crashWithRect = function (otherRect) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherRect.x;
        var otherright = otherRect.x + (otherRect.width);
        var othertop = otherRect.y;
        var otherbottom = otherRect.y + (otherRect.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

/*class Block {
       constructor(width, height, x, y, type) {
           this.width = width;
           this.height = height;
           this.x = x;
           this.y = y;
           this.type = type;
       }

   }*/