let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset');
let newGameBtn = document.querySelector('#newGame');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turnO = true; //player O starts first
let count = 0;//If count reaches 9 and no winner, it's a draw

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],      
];

const resetGame = () => {
     turnO = true;
     count = 0;
     enableBoxes();
     msgContainer.classList.add('hide');
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){ //player O's turn
            box.innerText = "O";
            box.classList.add('colorO');
            box.classList.remove('colorX');
            box.classList.add('bgcolorO');
            //box.classList.remove('bgcolorX');
            turnO = false;
        }else{ //player X's turn
            box.innerText = "X";
            box.classList.add('colorX');
            box.classList.remove('colorO');
            box.classList.add('bgcolorX');
            //box.classList.remove('bgcolorO');
            turnO = true;
        }
        box.disabled = true;
        count++;
        
        let isWinner = checkWinner();

        if (!isWinner && count === 9){ 
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove('hide');
    disableBoxes();
};

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove('colorO', 'colorX', 'bgcolorO', 'bgcolorX');
    }
}

const showWinner = (winner) => {
    msg.innerText = `Player ${winner} wins!`;
    msgContainer.classList.remove('hide');
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText; 

        if(pos1 !== "" && pos2 !== "" && pos3 !== ""){
            if(pos1 === pos2 && pos2 === pos3){
                showWinner(pos1); //Pos1 value is same as pos2 and pos3
                return true;
            }
        }
    }
    return false;
}

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);

