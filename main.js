
let VIDEO=null;
let CANVAS = null;
let CONTEXT = null;
let SCALER = 0.8;
let SIZE = {x:0, y:0, width:0, height:0,rows:3,colums:3};
let PIECES = [];
let SELECTED_PIECE = null;
let START_TIME = null;
let END_TIME = null;



function main(){
    // Get the video element
    CANVAS = document.getElementById("mycanvas");
    CONTEXT = CANVAS.getContext("2d");  
    addEventListeners();
    
    let promise  = navigator.mediaDevices.getUserMedia({video:true });
    promise.then((stream)=>{
        VIDEO = document.createElement("video");
        VIDEO.srcObject = stream;
        VIDEO.play();

        VIDEO.onloadeddata = () =>{
            handleresize();
            initalization(SIZE.rows,SIZE.colums)
          
            updateCanvas()
        }

    }).catch((error)=>{
        alert("camers erro" + error)
    })
}

function changeDifficulty(){
    let diff = document.getElementById("difficulty").value;
    switch(diff){
        case "easy":
            initalization(3,3);
            break;
        case "medium":
            initalization(5,5);
            break;
        case "hard":
            initalization(10,10);
            break;
        case "insane":
            initalization(40,40);    
            break;
        case "god":
            initalization(100, 100);
            break;

    }
}

function restart(){
    START_TIME = new Date().getTime();
    END_TIME = null;
    randomizePieces();
    document.getElementById("menuItems").style.display="none";
   
    

}
function menu(){
    document.getElementById("menuItems").style.display="block";
    document.getElementById("youwin").style.display="none";

       
}

function updateTime(){
    let now = new Date().getTime();
    if(START_TIME != null){
        if(END_TIME != null){
            document.getElementById("time").innerHTML = formatTime(END_TIME - START_TIME);
        }else{
             result = formatTime(now - START_TIME);
             document.getElementById("timeTaken").innerHTML = result;
             document.getElementById("time").innerHTML =result;
            
        }
    }
}

function isComplete(){
    for(let i = 0; i < PIECES.length; i++){
        if(PIECES[i].correct == false){
            return false;
        }
    }
    if (END_TIME == null) {
        END_TIME = new Date().getTime(); // Set the end time when the game is complete
    }
    return youwin();
}

function youwin(){
    document.getElementById("youwin").style.display="block";
    return true;
}

function formatTime(time){
    let minutes = Math.floor(time / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = time % 1000;
    return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}:${(milliseconds < 100 ? "0" : "")}${(milliseconds < 10 ? "0" : "")}${milliseconds}`;
}

function addEventListeners(){
    CANVAS.addEventListener("mousedown",onMouseDown);
    CANVAS.addEventListener("mousemove",onMouseMove);
    CANVAS.addEventListener("mouseup",onMouseUp);
    CANVAS.addEventListener("touchstart",onTouchStart);
    CANVAS.addEventListener("touchmove",onTouchMove);
    CANVAS.addEventListener("touchend",onTouchEnd);
}

function onTouchStart(e){
    let loc = {x:e.touches[0].clientX,
         y:e.touches[0].clientY};
    onMouseDown(loc);
}
function onTouchMove(e){
    let loc = {x:e.touches[0].clientX, 
        y:e.touches[0].clientY};
    onMouseMove(loc);
}
function onTouchEnd(e){
    onMouseUp();
}

function onMouseDown(e){
    SELECTED_PIECE = getPressedPiece(e);
    const index = PIECES.indexOf(SELECTED_PIECE);
    if(index > -1){
        PIECES.splice(index, 1);
        PIECES.push(SELECTED_PIECE);
    }
    if(SELECTED_PIECE != null){
        SELECTED_PIECE.offset = {
            x:e.x - SELECTED_PIECE.x,
            y:e.y - SELECTED_PIECE.y
        }
        SELECTED_PIECE.correct = false;
    }
}

function onMouseMove(e){
    if(SELECTED_PIECE != null){
        SELECTED_PIECE.x = e.x - SELECTED_PIECE.offset.x;
        SELECTED_PIECE.y = e.y - SELECTED_PIECE.offset.y;
        
    }
}
function onMouseUp(){
    if(SELECTED_PIECE.isClose()){
        SELECTED_PIECE.snap();
        if(isComplete() && END_TIME == null){
            let now = new Date().getTime();
            END_TIME = now;
        }
    }

    SELECTED_PIECE=null;

}

function getPressedPiece(loc){
    for(let i = PIECES.length -1 ; i >= 0; i--){
        if(loc.x>PIECES[i].x && loc.x < PIECES[i].x + PIECES[i].width &&
             loc.y > PIECES[i].y && loc.y< PIECES[i].y+PIECES[i].height)
             {
                return PIECES[i];

        }
    }
    return null;
}
function handleresize(){
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;
    let resizer = SCALER *
    Math.min(
       window.innerWidth/VIDEO.videoWidth,
       window.innerHeight/VIDEO.videoHeight
    );
    SIZE.width = resizer*VIDEO.videoWidth;
    SIZE.height = resizer*VIDEO.videoHeight;
    SIZE.x= window.innerWidth/2 - SIZE.width/2;
    SIZE.y = window.innerHeight/2 - SIZE.height/2;
    
}


function updateCanvas(){
    CONTEXT.clearRect(0,0, CANVAS.width, CANVAS.height)
   
    CONTEXT.globalAlpha = 0.5;
   
    CONTEXT.drawImage(VIDEO,
        SIZE.x, SIZE.y,
        SIZE.width, SIZE.height
    );
    CONTEXT.globalAlpha = 1;

    for (let i = 0; i < PIECES.length; i++){
        PIECES[i].draw(CONTEXT);
    }
    
    updateTime();
    window.requestAnimationFrame(updateCanvas);

}

function initalization(rows,cols){
    SIZE.rows =  rows;
    SIZE.colums = cols;
    PIECES =[]
    for(let i = 0; i < SIZE.rows; i++){
        for(let j = 0; j < SIZE.colums; j++){
            PIECES.push(new Piece(i,j))
        }
    }
}


function randomizePieces(){
   for(let i = 0; i < PIECES.length; i++){
    let location = {
        x:Math.random()* (CANVAS.width - PIECES[i].width),
        y:Math.random()* (CANVAS.height - PIECES[i].height)
    }
    PIECES[i].x = location.x
    PIECES[i].y = location.y
    PIECES[i].correct = false
   }

}


class Piece{
    constructor(rowIndex, colIndex) {
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.width = SIZE.width / SIZE.colums;
        this.height = SIZE.height / SIZE.rows;
        this.x = SIZE.x + this.colIndex * this.width;
        this.y = SIZE.y + this.rowIndex * this.height;
        this.xCorrect = this.x;
        this.yCorrect = this.y;
        this.correct = true;
    }
    

    draw(contex){
        contex.beginPath();

        contex.drawImage(
            VIDEO,
           this.colIndex * VIDEO.videoWidth / SIZE.colums,
           this.rowIndex * VIDEO.videoHeight / SIZE.rows,
           VIDEO.videoWidth / SIZE.colums,
           VIDEO.videoHeight / SIZE.rows,
           this.x,
           this.y,
           this.width,
           this.height

        );
        
        contex.rect(
            this.x,
            this.y,
            this.width,
            this.height
        
        );
        contex.stroke();
    }

    isClose(){
        if(distance({x:this.x,y:this.y},
            {x:this.xCorrect,y:this.yCorrect}) < this.width/3){
                return true;
            }
        return false;

    }
    snap(){
        this.x = this.xCorrect;
        this.y = this.yCorrect;
        this.correct = true;
    }
}

function distance(p1,p2){
    return Math.sqrt(
        (p1.x - p2.x) * (p1.x - p2.x) +
        (p1.y - p2.y) * (p1.y - p2.y)
    );
}

