const alg2_btn = document.getElementById("alg2")
const cs_btn = document.getElementById("cs")

const pickContainer = document.querySelector(".subject-select")
const gameContainer = document.querySelector(".main-game")

alg2_btn.onclick = function() {
    startQuiz()
}

function startQuiz() {
    pickContainer.classList.add("hidden")
    gameContainer.classList.remove("hidden")
}