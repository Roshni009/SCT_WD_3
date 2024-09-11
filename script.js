let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('.reset-btn');
let newGame = document.querySelector('.new-btn');
let msg = document.querySelector('#msg-btn');
let msgContainer = document.querySelector('.msg-container')


let turnX = true; //playerX, playerO

let count = 0; // To Track Draw

let winPatterns = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8]
];

const resetGame = () => {
    turnX = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add('hide')
};

let playerTurn = (player) => {
    if(turnX){
       player.innerHTML = "X";
       turnX = false;
    }
    else {
        player.innerHTML = "O"
        turnX = true;
    }
    player.disabled = true;
    count ++;

    let isWinner = checkWinner();

    if(count === 9 && !isWinner) {
         gameDraw();
    }
    
    
}

const gameDraw = () => {
    msg.innerText = `Game was draw.`;
    msgContainer.classList.remove('hide');
    disableBoxes();
}


boxes.forEach((box) => {
    box.addEventListener('click', () => {
      playerTurn(box);
      

    })
})

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}


const showWinner = (winner) => {
   msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        
        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return true;
             
            }
        }
    }
   
    };

newGame.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);

