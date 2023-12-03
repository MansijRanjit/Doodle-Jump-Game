let canvas= document.querySelector("canvas");
canvas.width=boardWidth;
canvas.height=boardHeight;
let context= canvas.getContext("2d");

let doodler;
let platformArray;
let score;
let maxscore;
let gameover;

init();
//Initial Condition
function init(){
    //doodler
    doodler=new Doodler(157,460,46,46);
    doodler.velocityY=INITIAL_VELOCITY;
    
    //platform
    platformArray=[];
    placePlatforms();
    
    //score
    score=0;
    maxscore=0;
    
    //game over
    gameover=false;
}

//Reseting to initial condition
function restart(e){
    if(e.code == "Space" && gameover){
        init();
    }
}

animate();
function animate(){
    requestAnimationFrame(animate);

    if(gameover){return;}

    context.clearRect(0,0,canvas.width,canvas.height);
    doodler.draw(context);
    platformArray.forEach(platform =>platform.draw(context));
   
    moveDoodler();
    document.addEventListener("keydown",restart);
    doodler.x+=doodler.velocityX;

    //doodler moves outside board/frame
    if(doodler.x >boardWidth){
        doodler.x=0;
    }
    else if(doodler.x + doodler.width<0){
        doodler.x=boardWidth;
    }

    doodler.velocityY+=GRAVITY;
    doodler.y+=doodler.velocityY;

    platformArray.forEach(platform => {
        if(doodler.velocityY<0 && doodler.y<boardHeight*2/4){//if doodler y is less than 3/4 part of board height and doodler is moving up
            platform.y-= INITIAL_VELOCITY;//move platform down
        }

        if(collisionDetection(doodler,platform) && doodler.velocityY>=0){//collision detected and doodler is falling down
            doodler.velocityY=INITIAL_VELOCITY;
        }
    })

    //Gameover Condition
    if(doodler.y>boardHeight){
        gameover=true;

        context.fillStyle="red"
        context.font="40px sans-serif";
        context.fillText("Game Over",boardWidth/2 -100,boardHeight*2/4);

        context.fillStyle="black"
        context.font="20px sans-serif";
        context.fillText("Press Space to restart",90,boardHeight*3/4);
    }

    //Adding new platform
    while(platformArray.length>0 && platformArray[0].y>=boardHeight){
        platformArray.shift();
        newPlatform();
    }

    //Score Adding Section
    updateScore();
    context.fillStyle="gray";
    context.font="20px sans-serif";
    context.fillText("Score:",5,20);
    context.fillText(score,65,20)
}

function moveDoodler(){
    if(keys.A || keys.ArrowLeft){
        doodler.velocityX=-SPEED;
        doodler.img=left_image;
    }
    else if( keys.D || keys.ArrowRight){
        doodler.velocityX =SPEED;
        doodler.img=right_image;
    }
    else{
        doodler.velocityX=0
    }
}

function placePlatforms(){
    platformArray=[];

    let platform1=new Platform(boardWidth/2,boardHeight-40,platformWidth,platformHeight);
    platformArray.push(platform1)
  
    for (let i=0;i<6;i++){
        let randx=Math.floor(Math.random()*boardWidth*3/4);

        let platform=new Platform(randx,boardHeight-140-75*i,platformWidth,platformHeight)

        platformArray.push(platform);
    }
}

function newPlatform(){
    let randx=Math.floor(Math.random()*boardWidth*3/4);

    let platform=new Platform(randx,-platformHeight,platformWidth,platformHeight)//create platform just above canvas

    platformArray.push(platform);
}

function updateScore(){

    if(platformArray[0].y> doodler.y+300)
    {
        score++
    }
}