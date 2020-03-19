const canvas = document.getElementById("snake");
const contexte = canvas.getContext("2d"); 

// Create the unit 

const box = 32 ; 

// Load images 

const ground = new Image();
ground.src = "image/bg2.png";

const foodImg = new Image();
foodImg.src = "image/food.png";

// Create the snake 

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// Create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// Create the score var 

let score = 0;

// Control the snake 

let d; 

document.addEventListener("keydown", direction);

function direction(event){
    let key = event.keyCode;

    if( key === 37 && d != "RIGHT"){
        d = "LEFT";
    }
    else if(key === 38 && d != "DOWN" ){
        d = "UP";        
    }
    else if(key === 39 && d != "LEFT"){
        d = "RIGHT";       
    }
    else if(key === 40 && d != "UP"){
        d = "DOWN";        
    }
}

// Cheack collision function 
function collision(head, array){
    for(let i = 0; i < array.length; i ++ ){
        if(head.x == array[i].x && head.y == array[i].y){
            return true; 
        }
    }
    return false; 
}


// Draw everything to the canvas 

function draw(){

    contexte.drawImage(ground,0,0);

    for( let i = 0; i < snake.length ; i++) {
        contexte.fillStyle = ( i == 0) ?  "red" : "white";
        contexte.fillRect(snake[i].x,snake[i].y,box,box);

        contexte.strokeStyle = "red";
        contexte.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    contexte.drawImage(foodImg, food.x, food.y);
    
    // Old head position 
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // wich direction 
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box; 
    if( d == "RIGHT") snakeX += box; 
    if( d == "DOWN") snakeY += box; 

    // If the snake eats the food 
    if (snakeX == food.x && snakeY == food.y){
        score++; 
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // We don't remove the tail 
    } else {
        // Remove the tail 
            snake.pop();
    }

    // Add New Head 
    let newHead = {
        x : snakeX, 
        y : snakeY
    } 

    // Game Over 
    if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)){
        clearInterval(game);
    }

    snake.unshift(newHead);

    contexte.fillStyle = "white";
    contexte.font = "45px Changa one";
    contexte.fillText(score,2*box,1.6*box);
}

// Call draw function every 100ms 

let game = setInterval(draw,150);