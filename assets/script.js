// array to keep track of board
var board = [[0,0,0],[0,0,0],[0,0,0]];
// array to keep track of turns played
var turnsPlayed = 1;
// Get all spaces
var spaceElements = document.querySelectorAll(".space");
// get restart button
var restartButton = document.querySelector(".restart");
// get reset
var resetButton = document.querySelector(".reset-score");



// set initial score
var player1Score = 0;
var player2Score = 0;
document.querySelector("#player1-score").innerHTML = player1Score;
document.querySelector("#player2-score").innerHTML = player2Score;

// pop-up box

var popUpContainer = document.getElementById('pop-up-background-container');
var closePopUp = document.getElementById('pop-up-close');
var popUpImage = document.getElementById('pop-up-image');
var popUpText = document.getElementById('pop-up-message');
// function to show pop-up box
function showPopUp(oops){
  popUpContainer.style.display = "block";
  closePopUpFunction(oops);
}

function closePopUpFunction(oops){
  closePopUp.addEventListener('click', function(){
    console.log(oops);
    popUpContainer.style.display = "none";
    popUpText.style.left = "45%"
    popUpImage.innerHTML = "";
  })
  if(!oops){restart()};

  // how to make it work such that restart activated only on restart button?
}
// close pop-up



function displayError(){
  var oops = true;
  popUpText.innerText = "TAKEN!!!";
  popUpText.style.left = "20%";
  closePopUp.innerText = "OOPS..."
  showPopUp(oops);
}

function recordMoveCross(rowNum, colNum){
  board[rowNum][colNum] = -1;
  return board;
}

function recordMoveCircle(rowNum, colNum){
  board[rowNum][colNum] = 1;
  return board;
}

function checkDraw(turnsPlayed){
  if(turnsPlayed === 10){
    restart();
    showPopUp();
    popUpText.innerText = "DRAW!!!";
    popUpText.style.left = "20%";
    closePopUp.innerText = "Restart";
  }
}

function checkRowWin(board) {
  for (i = 0; i < 3; i++) {
    sumRow = 0;
    for (j = 0; j < 3; j++) {
      sumRow += board[i][j];
    }
    if (sumRow === -3 || sumRow === 3) {
      return true;
    }
  }
}

function checkColWin(board) {
  for(i = 0; i < 3; i++) {
    sumCol = 0;
    for(j = 0; j < 3; j++) {
      sumCol += board[j][i];
      if(sumCol === -3 || sumCol === 3) {
        return true;
      }
    }
  }
}

function checkDiagWins(board){
  sumDiag1 = 0;
  sumDiag2 = 0;
  for(i = 0; i < 3; i++ ){
    sumDiag1 += board[i][i];
    sumDiag2 += board[2-i][i];
  }
  if(sumDiag1 === -3 || sumDiag2 === -3 || sumDiag1 === 3 || sumDiag2 === 3){
    return true;
  }
}

function checkWin(board){
  if(checkRowWin(board)){
    return true;
  }else if(checkColWin(board)){
    return true;
  }else if(checkDiagWins(board)){
    return true;
  }

}

function onHover(turnsPlayed){
  if(turnsPlayed % 2 === 0){
    var els = [].slice.apply(document.getElementsByClassName("player1"));
    for (var i = 0; i < els.length; i++) {
      els[i].className = els[i].className.replace(/ *\bplayer1\b/g, "player2");
    }
  }else{
    var els = [].slice.apply(document.getElementsByClassName("player2"));
    for (var i = 0; i < els.length; i++) {
      els[i].className = els[i].className.replace(/ *\bplayer2\b/g, "player1");
    }
  }
}

function onClick(element, turnsPlayed, rowNum, colNum){
  var piece = document.createElement('img');
  // check if the position has been played, if it has say it has and prevent other things from happening.
  if(turnsPlayed % 2 === 1){
    piece.src = "https://raw.githubusercontent.com/christkv/tic-tac-toe/master/public/img/cross.png";
    element.appendChild(piece);
    element.className = "space";
    // recordMoveCross is to record that the cell has a cross in it
    board = recordMoveCross(rowNum, colNum);
    // check if cross has won
    if(checkWin(board)){
      player1Score += 1;
      document.querySelector("#player1-score").innerHTML = player1Score;
      popUpImage.innerHTML = '<img src="https://raw.githubusercontent.com/christkv/tic-tac-toe/master/public/img/cross.png">';
      popUpText.innerText = "WINS!"
      closePopUp.innerText = "Restart"
      showPopUp();
      // need function to display win message rather than ugly alert and also to stop game and restart
    }
    return board;
  }else{
    piece.src = "https://raw.githubusercontent.com/christkv/tic-tac-toe/master/public/img/circle.png";
    element.appendChild(piece);
    element.className = "space";
    // recordMoveCircle is to record that the cell has a cirlce in it
    board = recordMoveCircle(rowNum, colNum);
    // check if circle win
    if(checkWin(board)){
      player2Score += 1;
      document.querySelector("#player2-score").innerHTML = player2Score;
      popUpImage.innerHTML = '<img src="https://raw.githubusercontent.com/christkv/tic-tac-toe/master/public/img/circle.png">'
      popUpText.innerText = "WINS!"
      closePopUp.innerText = "Restart"
      showPopUp();
      // need function to display win message rather than ugly alert and also to stop game and restart
    }
    return board;
  }
}

// what happens somewhere on board is clicked
function boardClick(){
  // picking the specific cell in the array
  console.log(turnsPlayed);
  var rowNum = parseInt(this.id[0]);
  var colNum = parseInt(this.id[1]);
  // check the player, highlight relevant container to indicate whose turn it is
  if (board[rowNum][colNum] !== 0){
    displayError();
  }else{
    board = onClick(this, turnsPlayed, rowNum, colNum);
    turnsPlayed += 1;
  }
  // show which player's turn it i
  onHover(turnsPlayed);
  if(!checkWin(board)){
    checkDraw(turnsPlayed);
  }
}

// restart function

function restart(){
  for(i = 0 ; i < spaceElements.length; i++){
    spaceElements[i].className = "player1 space";
  };
  for(i = 0 ; i < spaceElements.length; i++){
    spaceElements[i].innerHTML = "";
  };
  board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  turnsPlayed = 1;
  return board;
}

function reset(check){
  player1Score = 0;
  player2Score = 0;
  document.getElementById("player1-score").innerText = 0;
  document.getElementById("player2-score").innerText = 0;
  restart();
}

// Start game

function gameStart(){
  // listen to each cell
  for(i = 0; i < spaceElements.length; i++){
    // what happens on clicking a cell
    spaceElements[i].addEventListener('click', boardClick)
  }

  restartButton.addEventListener('click', restart);
  // reset score
  resetButton.addEventListener('click', reset);
}

gameStart();


// trying to show crosses or circles on hover. This method doesn't work.

// spaceElements[i].addEventListener('mouseover',function(){
//   var piece = document.createElement('img');
//   var rowNum = parseInt(this.id[0]);
//   var colNum = parseInt(this.id[1]);
//   if(board[rowNum][colNum] === 0){
//     if(this.innerHTML.indexOf('https') === -1){
//       if(turnsPlayed%2 === 1){
//         piece.src = "https://raw.githubusercontent.com/christkv/tic-tac-toe/master/public/img/cross.png";
//         this.appendChild(piece);
//       }
//     }
//   }
// });
//   spaceElements[i].addEventListener('mouseout',function(){
//     var rowNum = parseInt(this.id[0]);
//     var colNum = parseInt(this.id[1]);
//     if(board[rowNum][colNum] === 0){
//       console.log(board[rowNum][colNum])
//       this.innerHTML = '';
//     }
//   });
