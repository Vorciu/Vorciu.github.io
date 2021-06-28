class Powerups {
    constructor(x, y) {
        var powerupArray = ["Scorex2", "Scorex5", "Enlarge", "Reduce", "Reverse"];
        var randomNumber = Math.floor(Math.random() * powerupArray.length);
        this.x = x;
        this.y = y;
        this.width = 48;
        this.height = 18;
        this.image = new Image();
        this.isPowerupCaught = false;
        this.time = 0;
        this.powerupType = powerupArray[randomNumber];
        if (this.powerupType === "Scorex2") {
            this.image.src = "images/Scorex2.png";
        } else if (this.powerupType === "Scorex5") {
            this.image.src = "images/Scorex5.png";
        } else if (this.powerupType === "Enlarge") {
            this.image.src = "images/Enlarge.png";
        } else if (this.powerupType === "Reduce") {
            this.image.src = "images/Reduce.png";
        } else { //Reverse
            this.image.src = "images/Reverse.png";
        }

    }



    update() {
        ctx = myGameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.y++;

        if (this.y == myPlatform.y && this.x >= myPlatform.x && this.x <= myPlatform.x + myPlatform.width) {
            this.isPowerupCaught = true;
            this.time++;
        }
        
    }
}




class Block {

    constructor(x, y) {
        var typeArray = ["typeA", "typeB"];
        var randomNumber = Math.floor(Math.random() * typeArray.length);
        this.image = new Image();
        this.width = 50;
        this.height = 20;
        this.x = x;
        this.y = y;
        this.blockType = typeArray[randomNumber];
        if (this.blockType === "typeA") {
            this.image.src = "images/blok1a.jpg"; //niebieski
        } else {
            this.image.src = "images/blok1b.jpg"; //zielony
        }
    }

    update() {
        ctx = myGameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    newPos() {
            this.y += this.height;
    }



}


class Ball {
    constructor(radius, speedX, speedY) {
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.x = Math.floor((Math.random() * 400) + 70); 
        this.y = Math.floor((Math.random() * 40) + 150);  
        this.image = new Image();
        this.image.src = "images/pilka.png";
        this.mass = 2;
        this.dx = Math.random(-5, 4);
        this.dy = Math.random(-4, 4);
        this.pos = new PVector(x, y);
        this.vel = new PVector(this.dx, this.dy);


    }
    update() {
        ctx = myGameArea.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.drawImage(this.image, this.x, this.y, 10, 10);
        ctx.closePath();
    }

    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }




    checkBallCollision(otherBall) {
        this.speedX = this.speedX;
        this.speedY = this.speedY;
        otherBall.speedX = otherBall.speedX;
        otherBall.speedY = otherBall.speedY;
        var dx = otherBall.x - this.x,
            dy = otherBall.y - this.y,
            dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.radius + otherBall.radius) {
            var angle = Math.atan2(dy, dx),
                sin = Math.sin(angle),
                cos = Math.cos(angle),

                pos0 = { x: 0, y: 0 }, 

                pos1 = rotate(dx, dy, sin, cos, true),

                vel0 = rotate(this.speedX, this.speedY, sin, cos, true),

                vel1 = rotate(otherBall.speedX, otherBall.speedY, sin, cos, true),
                vxTotal = vel0.x - vel1.x;
            vel0.x = ((this.mass - otherBall.mass) * vel0.x + 2 * otherBall.mass * vel1.x) /
                (this.mass + otherBall.mass);
            vel1.x = vxTotal + vel0.x;

            pos0.x += vel0.x;
            pos1.x += vel1.x;

            var pos0F = rotate(pos0.x, pos0.y, sin, cos, false),
                pos1F = rotate(pos1.x, pos1.y, sin, cos, false);

            otherBall.x = this.x + pos1F.x;
            otherBall.y = this.y + pos1F.y;
            this.x = this.x + pos0F.x;
            this.y = this.y + pos0F.y;

            var vel0F = rotate(vel0.x, vel0.y, sin, cos, false),
                vel1F = rotate(vel1.x, vel1.y, sin, cos, false);
            this.speedX = vel0F.x;
            this.speedY = vel0F.y;
            otherBall.speedX = vel1F.x;
            otherBall.speedY = vel1F.y;
        }
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



    ballCrashWithPlatformBottom(wall) {
        var myCircleX = this.x;
        var myCircleY = this.y;
        var myCircleRadius = this.radius;
        var baseBallSpeedX = ballSpeed;

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
                if ((myCircleX < otherleft + platform10width && myCircleX >= otherleft) || (myCircleX <= otherright && myCircleX > otherright - platform10width )) { 
                    this.speedX = baseBallSpeedX * 3;
                    this.speedX *= -1;
                } else if ((myCircleX < otherleft + platform10width * 3 && myCircleX >= otherleft + platform10width) || (myCircleX <= otherright - platform10width && myCircleX >= otherright - platform10width*3)) {
                    this.speedX = baseBallSpeedX * 2;
                } else if ((myCircleX < otherleft + platform10width * 4 && myCircleX >= otherleft + platform10width * 3) || (myCircleX <= otherright - platform10width * 3 && myCircleX >= otherright - platform10width * 4)) {
                    this.speedX = baseBallSpeedX * 1.5;
                } else {
                    this.speedX = baseBallSpeedX;
                }
                this.speedY *= -1;
            }
        }

    }



    ballCrashWithPlatformLeft(wall) {
        var myCircleX = this.x;
        var myCircleY = this.y;
        var myCircleRadius = this.radius;
        var baseBallSpeedY = ballSpeed;

        var otherleft = wall.x;
        var otherright = wall.x + (wall.width);
        var othertop = wall.y;
        var otherbottom = wall.y + (wall.height);

        var testX = myCircleX;
        var testY = myCircleY;

        var platform10height = wall.height / 10;

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
            if (myCircleX <= otherright) {
                this.speedY *= -1;
            } else {
                if ((myCircleY < othertop + platform10height && myCircleY >= othertop) || (myCircleY <= otherbottom && myCircleY > otherbottom - platform10height)) {
                    this.speedY = baseBallSpeedY * 3;
                    this.speedY *= -1;
                } else if ((myCircleY < othertop + platform10height * 3 && myCircleY >= othertop + platform10height) || (myCircleY <= otherbottom - platform10height && myCircleY >= otherbottom - platform10height * 3)) {
                    this.speedY = baseBallSpeedY * 2;
                } else if ((myCircleY < othertop + platform10height * 4 && myCircleY >= othertop + platform10height * 3) || (myCircleY <= otherbottom - platform10height * 3 && myCircleY >= otherbottom - platform10height * 4)) {
                    this.speedY = baseBallSpeedY * 1.5;
                } else {
                    this.speedY = baseBallSpeedY;
                }
                this.speedX *= -1;
            }
        } 

    }



}

class PlatformBottom {
    constructor(width, height, x, y, type) {
        this.isOn = true;
        this.type = type;
        this.width = width;
        this.height = height;
        this.areaFactor = 1;
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.image = new Image();
        if (this.type = "my") {
            this.image.src = "images/platforma3.png";
        } else {
            this.image.src = "images/platforma4.png";
        }

    }


    update() {
        ctx = myGameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    crashWithRect(otherRect) {
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



class PlatformLeft {
    constructor(width, height, x, y, type) {
        this.isOn = true;
        this.type = type;
        this.width = width;
        this.height = height;
        this.areaFactor = 1;
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.image = new Image();
        if (this.type = "my") {
            this.image.src = "images/platforma4.png";
        } else {
            this.image.src = "images/platforma3.png";
        }

    }


    update() {
        ctx = myGameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    crashWithRect(otherRect) {
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


class PVector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(pvector) {
        return new PVector(this.x + pvector.x, this.y + pvector.y);
    }

    sub(pvector) {
        return new PVector(this.x - pvector.x, this.y - pvector.y);
    }

    dot(pvector) {
        return new PVector(this.x * pvector.x + this.y * pvector.y);
    }

    mult(value) {
        return new PVector(this.x * value, this.y * value);
    }

}



function rotate(x, y, sin, cos, reverse) {
    return {
        x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
        y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
    };
}