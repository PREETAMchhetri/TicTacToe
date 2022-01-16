const box = document.querySelectorAll(".box")
const playerId = document.getElementById("playerId")
const resetBoard = document.querySelector("#resetBoard")
const resetBoardAll = document.querySelector("#resetAll")
const line = document.querySelector(".line")
const p1Score = document.getElementById("p1")
const p2Score = document.getElementById("p2")
const winningPlayer = document.getElementById("winningPlayer")
const winningImage = document.querySelector(".victoryImg")
let ct = 0

let turn = "X"
let gameover = false
let player1 = 0
let player2 = 0
const audioElement = new Audio("../music/background.mp3")
const ting = new Audio("../music/ting.wav")
const gameOver = new Audio("../music/gameover.mp3")

var playerDetails = {
    "p1": 0, "p2": 0
}
localStorage.setItem("score", JSON.stringify(playerDetails))

const changeTurn = () => {
    return turn === "X" ? "O" : "X"
}

function reset() {

    resetBoard.innerText = "Reset"
    let game = document.querySelectorAll('.game-text')
    game.forEach(item => {
        item.innerText = ""
    })
    turn = "X"
    playerId.innerText = "Player " + turn + " turn"
    line.style.opacity = 0
    line.style.transform = ""
    winningPlayer.innerText = ""
    winningPlayer.style.transform = ""
    winningImage.style.display = "none"
    ct = 0

}
function resetAll() {

    let game = document.querySelectorAll('.game-text')
    game.forEach(item => {
        item.innerText = ""
    })

    turn = "X"
    playerId.innerText = "Player " + turn + " turn"
    line.style.opacity = 0
    line.style.transform = ""
    winningPlayer.innerText = ""
    winningPlayer.style.transform = ""
    winningImage.style.display = "none"

    p1Score.innerText = 0
    p2Score.innerText = 0
    player1 = 0
    player2 = 0
    playerDetails.p1 = player1
    playerDetails.p2 = player2
    localStorage.setItem("score", JSON.stringify(playerDetails))
    ct = 0
}


function winner(gameText, e) {
    winningPlayer.innerText = "Player " + gameText[e[0]].innerText + " won";
    line.style.transform = `translate(${e[3]}vh, ${e[4]}vh) rotate(${e[5]}deg)`
    line.style.opacity = 1

    winningPlayer.style.transform = "scale(3)"
    winningImage.style.display = "flex"
    gameOver.play()
    if (gameText[e[0]].innerText === "X") {
        player1 += 1
        p1Score.innerText = player1
        playerDetails.p1 = player1
        localStorage.setItem("score", JSON.stringify(playerDetails))
        console.log(localStorage.getItem("score"))
    } else {
        player2 += 1
        p2Score.innerText = player2
        playerDetails.p2 = player2
        localStorage.setItem("score", JSON.stringify(playerDetails))
    }
    gameover = true
    resetBoard.innerText = "Play Again"

    // return
}

const checkWin = (ct) => {
    if (ct === 9) {
        console.log("sds")
        reset()
    }
    let win = [
        [0, 1, 2, 5, 10, 0],
        [3, 4, 5, 5, 30, 0],
        [6, 7, 8, 5, 51, 0],
        [0, 3, 6, -15, 30, 90],
        [1, 4, 7, 5, 30, 90],
        [2, 5, 8, 25, 30, 90],
        [0, 4, 8, 5, 31, 45],
        [2, 4, 6, 5, 31, -45]
    ]

    let gameText = document.querySelectorAll(".game-text")
    win.forEach(e => {
        if ((gameText[e[0]].innerText === gameText[e[1]].innerText) && (gameText[e[1]].innerText === gameText[e[2]].innerText) && (gameText[e[0]].innerText !== "")) {
            winner(gameText, e)
        }
    })
}


box.forEach(element => {
    let text = element.querySelector(".game-text")
    element.addEventListener("click", () => {

        audioElement.play()
        ting.play()
        if (text.innerText === "") {
            text.innerText = turn
            turn = changeTurn()
            ct += 1
            checkWin(ct)
            if (!gameover) {
                playerId.innerText = "Player " + turn + " turn"
            }
        }



    })
})




resetBoard.addEventListener("click", reset)
resetBoardAll.addEventListener("click", resetAll)