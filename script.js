const box = document.querySelectorAll(".box")
const playerId = document.getElementById("playerId")
const resetBoard = document.querySelector("#resetBoard")
const line = document.querySelector(".line")
let turn = "X"
let gameover = false

const changeTurn = () => {
    return turn === "X" ? "O" : "X"
}

function reset() {

    let game = document.querySelectorAll('.game-text')
    game.forEach(item => {
        item.innerText = ""
    })
    turn = "X"
    playerId.innerText = "Player " + turn + " turn"
    line.style.opacity = 0
    line.style.transform = ""
    document.getElementById("winningPlayer").innerText = ""
}

const checkWin = () => {
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
            document.getElementById("winningPlayer").innerText = "Player " + gameText[e[0]].innerText + " won";
            line.style.transform = `translate(${e[3]}vh, ${e[4]}vh) rotate(${e[5]}deg)`
            line.style.opacity = 1
            gameover = true
        }
    })
}

box.forEach(element => {
    let text = element.querySelector(".game-text")
    element.addEventListener("click", () => {
        if (text.innerText === "") {
            text.innerText = turn
            turn = changeTurn()
            checkWin()
            if (!gameover) {
                playerId.innerText = "Player " + turn + " turn"
            }
        }

    })
})




resetBoard.addEventListener("click", reset)