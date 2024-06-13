let turn = 'X';
let gameOver = false;
let ting=new Audio("ting.mp3");
let finish = new Audio("gameover.mp3");
let music = new Audio("music.mp3")


// const mode = ()=>{
//     let sheet = document.querySelector(".colortarget");
//     let target = document.querySelector(".color");
//     target.addEventListener("click",()=>{
//         if (sheet.getAttribute("href") === "dark.css") {
//             sheet.removeAttribute("href");
//         } else {
//             sheet.setAttribute("href", "dark.css");
//         }
//     })
// }

// mode();

const mode = () => {
    let sheet = document.querySelector(".colortarget");
    let target = document.querySelector(".color");

    // Check if mode is stored in localStorage
    let storedMode = localStorage.getItem("mode");

    // If mode is stored, apply the corresponding stylesheet
    if (storedMode) {
        sheet.setAttribute("href", storedMode);
    }

    target.addEventListener("click", () => {
        if (sheet.getAttribute("href") === "dark.css") {
            sheet.removeAttribute("href");
            // Store the light mode in localStorage
            localStorage.setItem("mode", "");
        } else {
            sheet.setAttribute("href", "dark.css");
            // Store the dark mode in localStorage
            localStorage.setItem("mode", "dark.css");
        }
    });
}

mode();

const volume = () => {
    let speaker = document.querySelector(".speaker");
    speaker.addEventListener("click", () => {
        let imgSrc = speaker.getAttribute("src");
        if (imgSrc === "on.svg") {
            speaker.setAttribute("src", "stop.svg");
            // Your code to pause music (assuming 'music' is defined elsewhere)
            music.pause();
        } else {
            speaker.setAttribute("src", "on.svg");
            // Your code to play music (assuming 'music' is defined elsewhere)
            music.play();
        }
    });
}

volume();



const turnChange=()=>{
    return turn === 'X'?'O':'X'; 
}

//wincheck
const winCheck=()=>{
    let spans=document.getElementsByClassName("texts");
    let wins = [
        [0, 1, 2, -17, -124, 0],
        [3, 4, 5, -17, 10, 0],
        [6, 7, 8, -17, 164, 0],
        [0, 4, 8, -17, 16, 45],
        [2, 4, 6, -17, 16, 133],
        [0, 3, 6, -17, 16, 90],
        [1, 4, 7, -149, 16, 90],
        [2, 5, 8, 113, 16, 90]
    ]
    wins.forEach(e=>{
        if((spans[e[0]].innerText===spans[e[1]].innerText ) && (spans[e[2]].innerText === spans[e[1]].innerText) && (spans[e[0]].innerText !=="")){
            document.querySelector(".turninfo").innerText = spans[e[0]].innerText + " Won this Round !!";
            gameOver = true;
            finish.play();
            document.querySelector(".line").style.transform = `translate(${e[3]}px, ${e[4]}px) rotate(${e[5]}deg)`
            document.querySelector(".line").style.width = "384px";
        }
    })


}

//gamehandler
const gameHandler=()=>{
    let boxtexts = document.getElementsByClassName("boxtexts");
    Array.from(boxtexts).forEach(boxtext => {
        boxtext.addEventListener("click",()=>{
            let span = boxtext.querySelector(".texts");
            // if(span.innerText==="" && gameOver==false){
            //     span.innerText=turn;
            //     turn=turnChange();
            //     ting.play();
            //     winCheck();
            //     document.querySelector(".turninfo").innerText = `${turn}'s Turn !!`;
            // }
            if (!gameOver) { // Check if the game is not over
                let span = boxtext.querySelector(".texts");
                if (span.innerText === "") {
                    span.innerText = turn;
                    ting.play();
                    winCheck();
                    if (!gameOver) {
                        turn = turnChange();
                        document.querySelector(".turninfo").innerText = `${turn}'s Turn !!`;
                    }
                }
            }
        })
        
    })
}

gameHandler();

const reset = () => {
    let res = document.getElementById("reset");
    res.addEventListener("click", () => {
        let boxtexts = document.getElementsByClassName("boxtexts");
        Array.from(boxtexts).forEach(boxtext => {
            let span = boxtext.querySelector(".texts");
            span.innerText = "";
        });
        turn = 'X';
        gameOver = false;
        document.querySelector(".line").style.width = "0";
        document.querySelector(".turninfo").innerText = `${turn}'s Turn !!`;
        document.querySelector(".inform").innerText = "";
    });
}

reset();
