let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let stepCount = 0;
let winPatterns = [
    [0, 1, 2],
    [3, 4, 5],  
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box clicked");
        if (turnO){
            box.innerText = "O";
            box.style.color = "black";
            turnO = false;
        }
        else{
            box.innerText = "X";
            box.style.color = "pink";
            turnO = true;
        }
        box.disabled = true;
        stepCount += 1;
        checkWin();
    });
});

const disableBoxes = () => {
    for (let box of boxes){
        box.disabled = true;
        stepCount = 0;
    }
}

const enableBoxes = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
        stepCount = 0;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations ${winner}, you win!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const matchDrawn = () => {
    msg.innerText = `Match is drawn!!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWin = () => {
    let noResult = true;
    for(let pattern of winPatterns) {
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);
        // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;  
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                noResult = false;
                showWinner(pos1Val);
            }
        }
    }
    if (stepCount === 9 && noResult){
        matchDrawn();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);