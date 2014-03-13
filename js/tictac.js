var canvas;
var ctx;
var height = 600;
var width = 600;
var cellWidth = width / 10;
var cellHeight = height / 10;
var currentTurn;
var player1Wins = 0;
var player2Wins = 0;
var move = 0;
var gameStatus = [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];

window.onload = function (){
    canvas = document.getElementById('tictac');
    ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;
    canvas.onclick = onCanvasClick;

    refresh();
    currentTurn = 1;
};

function refresh() {
    drawGame();
    drawMove();
}

function drawGame() {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    for (var i = 1; i < 10; i++) {
        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(cellWidth * i, 0);
        ctx.lineTo(cellWidth * i, height);
        ctx.stroke();
        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, cellHeight * i);
        ctx.lineTo(width, cellHeight * i);
        ctx.stroke();
    };
}


function drawMove() {
    for (var i = 0 ; i <= 9 ; i++){
        for (var j = 0 ; j <= 9 ; j++){
            var cell = gameStatus[i][j];
            if(cell == 1) {
                drawX(i, j);
                gameStatus[i][j] = "X";
                move++;
            } else if (cell == 2){
                drawO(i,j);
                gameStatus[i][j] = "O";
                move++;
            }
        }
    }
}

function drawX(X, Y) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(X * cellWidth + 5, Y * cellHeight + 5);
    ctx.lineTo(X * cellWidth + cellWidth - 5, Y * cellHeight + cellHeight - 5);
    ctx.stroke();
 
    // From top left to bottom right of the cell
    ctx.beginPath();
    ctx.moveTo(X * cellWidth + cellWidth - 5, Y * cellHeight + 5);
    ctx.lineTo(X * cellWidth + 5, Y * cellHeight + cellHeight - 5);
    ctx.stroke();
}

function drawO(X, Y) {
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.arc(X * cellWidth + cellWidth / 2, Y * cellHeight + cellHeight / 2 , cellWidth / 2 - 5, 0, 360, false);
    ctx.stroke();
}

function onCanvasClick(e) {
    var coordinate = getMouseLocation(e);
    var cell = getCellFromLocation(coordinate);
    processCellClick(cell);
}
 
// Getting mouse locations
function getMouseLocation(e) {
 
    var mouseX = e.pageX - canvas.offsetLeft;
    var mouseY = e.pageY - canvas.offsetTop;
 
    return { x: mouseX, y: mouseY };
}
 
// Getting cell location
function getCellFromLocation(coordinate) {
    var cellCoordinate = { x: 0, y: 0 };
    for (var i = 1 ; i <= 10 ; i++){
        if (coordinate.x > cellWidth * i) cellCoordinate.x = i;
        if (coordinate.y > cellHeight * i) cellCoordinate.y = i;
    }
    return cellCoordinate;
}

function processCellClick(cell) {
    var text = document.getElementById("turnText");
    if (gameStatus[cell.x][cell.y] != 0) return;
    gameStatus[cell.x][cell.y] = currentTurn;
        var score = document.getElementById("score");
    score.innerHTML = "" + player1Wins + " : " + player2Wins;
    refresh();
    if (currentTurn == 1) currentTurn = 2;
    else currentTurn = 1;
    text.innerHTML = "Player " + currentTurn + "'s turn";

    checkSolved();
}

function containing (a, b) {
    return a.indexOf(b) >= 0;
}

function checkSolved() {
    var winningstrRow = "";
    var winningstrCol = "";
    var winningstrDiaLeftDown = ["", "", "", "", "", ""];
    var winningstrDiaRightUp = ["", ""];

    for (var i = 0 ; i < 10 ; i++){
        for (var j = 0 ; j < 10 ; j++){
            winningstrRow+= "" + gameStatus[i][j];
            winningstrCol+= "" + gameStatus[j][i];
            
        }
        winningstrDiaLeftDown[0]+= "" + gameStatus[i][i];
        winningstrDiaRightUp[0]+= "" + gameStatus[i][9-i];
        
        if (i == 0){
           winningstrDiaLeftDown[1]+= "" + gameStatus[i][(i+1)%10]; 
           winningstrDiaLeftDown[2]+= "" + gameStatus[i][(i+2)%10]; 
           winningstrDiaLeftDown[3]+= "" + gameStatus[i][(i+3)%10]; 
           winningstrDiaLeftDown[4]+= "" + gameStatus[i][(i+4)%10]; 
           winningstrDiaLeftDown[5]+= "" + gameStatus[i][(i+5)%10];
           winningstrDiaLeftDown[6]+= "" + gameStatus[(i+1)%10][i];  
           winningstrDiaLeftDown[7]+= "" + gameStatus[(i+2)%10][i]; 
           winningstrDiaLeftDown[8]+= "" + gameStatus[(i+3)%10][i]; 
           winningstrDiaLeftDown[9]+= "" + gameStatus[(i+4)%10][i];
           winningstrDiaRightUp[1]+= "" + gameStatus[i][(8-i)%10];
           winningstrDiaRightUp[2]+= "" + gameStatus[i][(7-i)%10];
           winningstrDiaRightUp[3]+= "" + gameStatus[i][(6-i)%10];
           winningstrDiaRightUp[4]+= "" + gameStatus[i][(5-i)%10];
           winningstrDiaRightUp[6]+= "" + gameStatus[(i+1)%10][9-i];  
           winningstrDiaRightUp[7]+= "" + gameStatus[(i+2)%10][9-i]; 
           winningstrDiaRightUp[8]+= "" + gameStatus[(i+3)%10][9-i]; 
           winningstrDiaRightUp[9]+= "" + gameStatus[(i+4)%10][9-i];
           winningstrDiaRightUp[10]+= "" + gameStatus[(i+5)%10][9-i];
   
        }
        if(i > 0 && i < 10){
           winningstrDiaLeftDown[1]+= "" + gameStatus[i][(i+1)%10]; 
           winningstrDiaLeftDown[2]+= "" + gameStatus[i][(i+2)%10]; 
           winningstrDiaLeftDown[3]+= "" + gameStatus[i][(i+3)%10]; 
           winningstrDiaLeftDown[4]+= "" + gameStatus[i][(i+4)%10]; 
           winningstrDiaLeftDown[5]+= "" + gameStatus[i][(i+5)%10];
           winningstrDiaLeftDown[6]+= "" + gameStatus[(i+1)%10][i];  
           winningstrDiaLeftDown[7]+= "" + gameStatus[(i+2)%10][i]; 
           winningstrDiaLeftDown[8]+= "" + gameStatus[(i+3)%10][i]; 
           winningstrDiaLeftDown[9]+= "" + gameStatus[(i+4)%10][i];
           winningstrDiaRightUp[1]+= "" + gameStatus[i][(8-i)%10];
           winningstrDiaRightUp[2]+= "" + gameStatus[i][(7-i)%10];
           winningstrDiaRightUp[3]+= "" + gameStatus[i][(6-i)%10];
           winningstrDiaRightUp[4]+= "" + gameStatus[i][(5-i)%10];
           winningstrDiaRightUp[5]+= "" + gameStatus[i][(4-i)%10];    
           winningstrDiaRightUp[6]+= "" + gameStatus[(i+1)%10][9-i];  
           winningstrDiaRightUp[7]+= "" + gameStatus[(i+2)%10][9-i]; 
           winningstrDiaRightUp[8]+= "" + gameStatus[(i+3)%10][9-i]; 
           winningstrDiaRightUp[9]+= "" + gameStatus[(i+4)%10][9-i];
           winningstrDiaRightUp[10]+= "" + gameStatus[(i+5)%10][9-i];
        }
                
    }  

    if(containing(winningstrRow, "XXXXX") || containing(winningstrCol, "XXXXX")){
        endMsg("Congratulations! Player1 wins!!!");
        player1Wins++;
    }
    if(containing(winningstrRow, "OOOOO") || containing(winningstrCol, "OOOOO")){
        endMsg("Congratulations! Player2 wins!!!");
        player2Wins++;
    }
    for(var i = 0; i <10 ; i++){
      if(containing(winningstrDiaLeftDown[i], "XXXXX") || containing(winningstrDiaRightUp[i], "XXXXX")){
        endMsg("Congratulations! Player1 wins!!!");
        player1Wins++;
      }else if(containing(winningstrDiaLeftDown[i], "OOOOO") || containing(winningstrDiaRightUp[i], "OOOOO")){
        endMsg("Congratulations! Player2 wins!!!");
        player2Wins++;
      }
    }
    if(containing(winningstrDiaRightUp[10], "XXXXX")){
        endMsg("Congratulations! Player1 wins!!!");
        player1Wins++;
    }else if(containing(winningstrDiaRightUp[10], "OOOOO")){
        endMsg("Congratulations! Player2 wins!!!");
        player2Wins++;
    }

     if(move == 100){
        endMsg("Sorry guys, it is draw!!!");
     }
}
 

function endMsg(msg) {
    alert(msg);
    gameStatus = [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];
    currentTurn = 1;
    ctx.clearRect(0, 0, width, height);
    move = 0;
    var text = document.getElementById("turnText");
    text.innerHTML = "Player " + currentTurn + "'s turn";
    var score = document.getElementById("score");
    score.innerHTML = "" + player1Wins + " : " + player2Wins;
    refresh();


}