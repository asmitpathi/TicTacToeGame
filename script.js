let boxes= document.querySelectorAll(".box");
let resetGame_btn= document.querySelector("#reset-game-btn");
let newGame_btn= document.querySelector("#new-game-btn");
let msgContainer= document.querySelector(".msg-container");
let msg= document.querySelector("#msg");

let turnO= true; //track the turn of playerO
let count=9;

//winning patterns
const winPatterns=[
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
];

//reset game
const resetGame= () => {
    turnO=true;
    count=9;
    enableBoxes();
    msgContainer.classList.add("hide");
};

//box click event
boxes.forEach((box)=>{
    box.addEventListener("click", () => {
        if(turnO ===true){               //playerO
            box.innerText="O";
            box.style.color="#b0413e";
            turnO= false;
        }
        else{                            //playerX
            box.innerText="X";
            box.style.color="#4266ab";
            turnO=true;
        }
        box.disabled= true;              //If the box is clicked another, nothing will happen
        count--;
        checkWinner();
    })
})

//disable the boxes
const disableBoxes= () => {
    for(let box of boxes){
        box.disabled=true;
    }
};

//enable the boxes
const enableBoxes= () => {
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

//check for winner
const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1= boxes[pattern[0]].innerText;
        let pos2= boxes[pattern[1]].innerText;
        let pos3= boxes[pattern[2]].innerText;

        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1===pos2 && pos2===pos3){
                showWinner(pos1);
            }
        }
        //draw condition
        if(count==0){
            showDraw();
        }
    }
};

//Display message congratulating the winner
const showWinner= (winner)=> {
    msg.innerText=`Congratulations, The winner is Player${winner} !!!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw= () => {
    msg.innerText=`It's a Draw! No Winner.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

newGame_btn.addEventListener("click", resetGame);
resetGame_btn.addEventListener("click", resetGame);