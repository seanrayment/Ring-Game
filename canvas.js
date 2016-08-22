var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

//Ring Variables
var angle = 0;
var increment = 0.1;
var width = 2;
var radius = 200;
var startingX = canvas.width/ 2;
var startingY = canvas.height / 2;

//Inner Ring Variables
var innerRadius = radius - 8;
var innerWidth = 3*width;
var RED = 255;
var GREEN = 0;
var BLUE = 255;

//Ball Variables
var x = canvas.width/2;
var y = canvas.height/2;
var dx = 5;
var dy = -4;
var ballRadius = 10;

var xPosition;
var yPosition;

var score = 0;

var canReset = true;

document.addEventListener("mousemove", mouseMoveHandler, false);

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function ballPhysics() {
    if ((x + dx) > (canvas.width - ballRadius) || (x + dx) < ballRadius) {
       dx = -dx 
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy
    }
    
    x += dx;
    y += dy;
    
}

function drawRing() {
    ctx.beginPath();
    ctx.arc(startingX, startingY, innerRadius, 0, Math.PI*2);
    ctx.lineWidth = 3*width;
    ctx.strokeStyle =      'rgb(' + 
                            RED   + ',' +
                            GREEN + ',' +
                            BLUE  + ')';
    //ctx.strokeStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    ctx.stroke();
}

function checkPosition() {
    //if (angle <= Math.PI * 2) {
        
    if (x > startingX - innerRadius + innerWidth && x < startingX + innerRadius - innerWidth && y > startingY - innerRadius + innerWidth && y < startingY + innerRadius - innerWidth) {

            ctx.beginPath();
            ctx.arc(startingX,startingY, radius, 0, angle + increment, false); // <-- add the arc to the path
            ctx.lineWidth = width;
            ctx.strokeStyle = "rgb(0,0,255)";
            ctx.stroke();
            
            angle += increment;
            
            
    if (angle >= Math.PI * 2) {
        angle = 0;
        innerRadius -= 5;
        radius -= 5;
        dx *= 1.03;
        dy *= 1.03;
        score += 10;
        canReset = true;
        RED = Math.floor(Math.random() * (255));
        GREEN = Math.floor(Math.random() * (255));
        BLUE = Math.floor(Math.random() * (255));
        incremenet += .1;
        alert("Your score was " + score);
    }
        
    }else {
        radius = 200
        innerRadius = radius - 8;
        score = 0;
        
        if (canReset) {
            dx = 5;
            dy = -4;
            canReset = false;
        }
    }
        //}else {
            //angle = 0;
        //}
        
    //} 
    
}

function gameLoop() {
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    ballPhysics();
    drawBall();
    drawRing();
    checkPosition();
    
    ctx.font = "16px serif";
    ctx.fillText(xPosition, 10, 20);
    ctx.fillText(yPosition, 10, 40);
    
    ctx.fillText("Score: " + score, 420, 20);

}

function mouseMoveHandler(e) {
    
    xPosition = e.clientX;
    yPosition = e.clientY;
    
    if (e.clientX >= canvas.offsetLeft && e.clientX <= canvas.width + canvas.offsetLeft) {
        startingX = e.clientX - canvas.offsetLeft;
    }
    
    if (e.clientY > 0 && e.clientY < canvas.height) {
        startingY = e.clientY - canvas.offsetTop;
    }
    
}

setInterval(gameLoop, 20);