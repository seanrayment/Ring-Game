var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

//Getting DOM elements to edit later on
var start_screen = document.getElementById('start_screen');
var description = document.getElementById('description');

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
var canReset = false;
var gameInterval

document.addEventListener("mousemove", mouseMoveHandler, false);


//the onclick function called on the start button
function start() {
    start_screen.style.display = "none";
    canvas.style.display = "block";

    canvas.addEventListener('touchstart', function(e) {
        startingX = e.touches[0].clientX;
        startingY = e.touches[0].clientY;
        e.preventDefault();
    });

    canvas.addEventListener('touchmove', function(e) {
        startingX = e.touches[0].clientX;
        startingY = e.touches[0].clientY;
        e.preventDefault();
    })

    canvas.onwheel = function(e) {
        e.preventDefault();
    }

    gameInterval = setInterval(gameLoop, 20);


}

//gameloop calls most other functions each frame
function gameLoop() {
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    ballPhysics();
    drawBall();
    drawRing();
    checkPosition();
    
    ctx.font = "16px serif";
    //ctx.fillText(xPosition, 10, 20);
    //ctx.fillText(yPosition, 10, 40);
    
    ctx.fillText("Score: " + score, 420, 20);

}

//draws the ball to the screen at its position
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//bounces of the sides
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

//redraws the ring with the updated radius
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

//checks if ball is in the ring
//if it is check to see if ring is complete
//else game is over
function checkPosition() {
    //if (angle <= Math.PI * 2) {
        
    if (x > startingX - innerRadius + innerWidth && x < startingX + innerRadius - innerWidth && y > startingY - innerRadius + innerWidth && y < startingY + innerRadius - innerWidth) {

            ctx.beginPath();
            ctx.arc(startingX,startingY, radius, 0, angle + increment, false); // <-- add the arc to the path
            ctx.lineWidth = width;
            ctx.strokeStyle = "rgb(0,0,255)";
            ctx.stroke();
            
            angle += increment;
            
    //has the outer ring completed 360 degrees      
    if (angle >= Math.PI * 2) {
        angle = 0;

        //decrease the size of the ring
        innerRadius -= 5;
        radius -= 5;

        //increase the speed of the ball
        dx *= 1.03;
        dy *= 1.03;
        score += 10;
        canReset = true;

        //randomizes the color
        RED = Math.floor(Math.random() * (255));
        GREEN = Math.floor(Math.random() * (255));
        BLUE = Math.floor(Math.random() * (255));

        //increases the increment so the game plays faster
        incremenet += .1;
    }
    
    //if the ball is not within the circle
    }else {
        //resets the ring variables
        radius = 200
        innerRadius = radius - 8;
        
        //WHEN THE GAME ENDS
        if (canReset) {
            dx = 5;
            dy = -4;
            canvas.style.display = "none";
            start_screen.style.display = "block";
            description.innerHTML = "Your score was: "+score;
            canReset = false;
            score = 0;
            clearInterval(gameInterval);
        }
    }
        //}else {
            //angle = 0;
        //}
        
    //} 
    
}

//moves the ring position to be centered on the mouse
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

