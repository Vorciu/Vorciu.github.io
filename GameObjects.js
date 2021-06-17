class Ball {
    constructor(radius, speedX, speedY) {
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.x = Math.floor((Math.random() * 400) + 70); // do zmiany
        this.y = Math.floor((Math.random() * 40) + 150);  // do zmiany
        this.image = new Image();
        this.image.src = "images/pilka.jpg";
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
        ctx.drawImage(this.image, this.x , this.y);
        ctx.closePath();

        /*if ((this.pos.x <= this.rad && this.vel.x < 0) ||
            (this.pos.x >= 480 - 1 - this.rad && this.vel.x > 0)) {
            this.vel.x = -this.vel.x;
        }
        if ((this.pos.y <= this.rad && this.vel.y < 0) ||
            (this.pos.y >= 640 - 1 - this.rad && this.vel.y > 0)) {
            this.vel.y = -this.vel.y;
        }
        this.pos.add(this.vel);*/
    }

    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }




    checkBallCollision(otherBall) {
        var dx = otherBall.x - this.x,
            dy = otherBall.y - this.y,
            dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.radius + otherBall.radius) {
            //calculate angle, sine, and cosine
            var angle = Math.atan2(dy, dx),
                sin = Math.sin(angle),
                cos = Math.cos(angle),

                //rotate ball0's position
                pos0 = { x: 0, y: 0 }, //point

                //rotate ball1's position
                pos1 = rotate(dx, dy, sin, cos, true),

                //rotate ball0's velocity
                vel0 = rotate(this.speedX, this.speedY, sin, cos, true),

                //rotate ball1's velocity
                vel1 = rotate(otherBall.speedX, otherBall.speedY, sin, cos, true),

                //collision reaction
                vxTotal = vel0.x - vel1.x;
            vel0.x = ((this.mass - otherBall.mass) * vel0.x + 2 * otherBall.mass * vel1.x) /
                (this.mass + otherBall.mass);
            vel1.x = vxTotal + vel0.x;

            //update position
            pos0.x += vel0.x;
            pos1.x += vel1.x;

            //rotate positions back
            var pos0F = rotate(pos0.x, pos0.y, sin, cos, false),
                pos1F = rotate(pos1.x, pos1.y, sin, cos, false);

            //adjust positions to actual screen positions
            otherBall.x = this.x + pos1F.x;
            otherBall.y = this.y + pos1F.y;
            this.x = this.x + pos0F.x;
            this.y = this.y + pos0F.y;

            //rotate velocities back
            var vel0F = rotate(vel0.x, vel0.y, sin, cos, false),
                vel1F = rotate(vel1.x, vel1.y, sin, cos, false);
            this.vx = vel0F.x;
            this.vy = vel0F.y;
            otherBall.vx = vel1F.x;
            otherBall.vy = vel1F.y;
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



    ballCrashWithPlatform(wall) {
        var myCircleX = this.x;
        var myCircleY = this.y;
        var myCircleRadius = this.radius;
        var baseBallSpeedX = ballSpeed;
        //var baseBallSpeedY = ballSpeed;

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
                    //this.speedX *= -1;
                } else if ((myCircleX < otherleft + platform10width * 4 && myCircleX >= otherleft + platform10width * 3) || (myCircleX <= otherright - platform10width * 3 && myCircleX >= otherright - platform10width * 4)) {
                    this.speedX = baseBallSpeedX * 1.5;
                    //this.speedX *= -1;
                } else {
                    this.speedX = baseBallSpeedX;
                }
                this.speedY *= -1;
            }
        }

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