const alg2_btn = document.getElementById("alg2")
const cs_btn = document.getElementById("cs")

const alg2_highscore = document.querySelector("#alg2 .highscore")
const cs_highscore = document.querySelector("#cs .highscore")

const rulesContain = document.querySelector(".rules-contain")
const startBtn = document.getElementById("start")
const returnHomeBtn = document.getElementById("return-home")

const progress = document.getElementById("progress")
const questionText = document.getElementById("question-ask")
const choices = document.querySelectorAll(".choice-item")
const choicesText = document.querySelectorAll(".choice-item p")

const continueBtn = document.getElementById("continue")

const scoreTxt = document.getElementById("score");
const timerTxt = document.getElementById("timer");

const quitBtn = document.getElementById("quit")
const timerBar = document.getElementById("timer-bar");

const pickContainer = document.querySelector(".subject-select")
const gameContainer = document.querySelector(".main-game")

const resultContain = document.querySelector(".result-contain")
const scoreResultTxt = document.getElementById("scoreResultTxt")
const retryBtn = document.getElementById("retry")
const returnBtn = document.getElementById("return")

const startTime = 15

let questions = [];

let highscoreKey

const alg2HighscoreData = localStorage.getItem("alg2")
if (alg2HighscoreData) alg2_highscore.innerHTML = "Highscore: " + alg2HighscoreData

const csHighscoreData = localStorage.getItem("cs")
if (csHighscoreData) cs_highscore.innerHTML = "Highscore: " + csHighscoreData

alg2_btn.onclick = function() {
    questions = Array.from(alg2_questions)

    highscoreKey = "alg2"

    showRules()
}

cs_btn.onclick = function() {
    questions = Array.from(cs_questions)

    highscoreKey = "cs"

    showRules()
}

function showRules() {
    rulesContain.classList.add("visible")
}

startBtn.onclick = () => {
    rulesContain.classList.remove("visible")
    startQuiz()
}

let currentQuestion = 0

let timer = startTime // seconds
let timerInterval
let score = 0;

let answered = false;

function startQuiz() {
    if (currentQuestion+1 > questions.length) {
        endGame();
        return;
    }

    timer = startTime
    timerBar.style.width = (timer/startTime)*100 + "%"
    timerTxt.innerHTML = "Time left: " + timer

    choices.forEach((choiceBtn) => {
        choiceBtn.classList.remove("disabled")
        choiceBtn.classList.remove("incorrect")
        choiceBtn.classList.remove("correct")
    })

    answered = false;

    createQuestion()

    progress.innerHTML = "Question " + (currentQuestion+1) + "/" + questions.length
    scoreTxt.innerHTML = "Score: " + score

    continueBtn.classList.remove("visible")

    pickContainer.classList.add("hidden")
    gameContainer.classList.remove("hidden")

    timerInterval = setInterval(countdown, 1000);

    console.log(questions)
}

function createQuestion() {
    let questionContent = questions[currentQuestion]

    questionText.innerHTML = questionContent.question

    for (let index = 0; index < questionContent.choices.length; index++) {
        choicesText[index].innerHTML = questionContent.choices[index];
    }
}

function countdown() {
    timer -= 1
    timerBar.style.width = (timer/startTime)*100 + "%"
    timerTxt.innerHTML = "Time left: " + timer

    if (timer < 1) {
        selectAnswer()
    }
}

function chooseCorrectAnswer() {
    let choice = choices[questions[currentQuestion].answer]
    choice.classList.add("correct")

    choices.forEach((choiceBtn) => {
        choiceBtn.classList.add("disabled")
    })
}

function selectAnswer(index) {
    answered = true;

    clearInterval(timerInterval)

    chooseCorrectAnswer()

    if (index) {
        if (index == questions[currentQuestion].answer) {
            score += 1
            scoreTxt.innerHTML = "Score: " + score
        } else {
            choices[index].classList.add("incorrect")
        }
    }

    continueBtn.classList.add("visible")
}

quitBtn.onclick = () => {
    window.location.reload(); // RELOAD THE PAGE TO RESTART QUIZ
}

continueBtn.onclick = () => {
    currentQuestion += 1
    startQuiz()
}

choices.forEach((choiceBtn) => {
    choiceBtn.onclick = function() {
        if (answered) return;
        selectAnswer(choiceBtn.dataset.choice)
    }
})

function endGame() {
    resultContain.classList.add("visible")
    scoreResultTxt.innerHTML = "Final Score: " + score + "/" + questions.length

    let oldhighscore = localStorage.getItem(highscoreKey)

    if (oldhighscore) {
        if (score > oldhighscore) {
            localStorage.setItem(highscoreKey, score)
        }
    } else {
        localStorage.setItem(highscoreKey, score)
    }
}

retryBtn.onclick = () => {
    resultContain.classList.remove("visible")
    currentQuestion = 0;
    score = 0;
    
    startQuiz();
}

returnBtn.onclick = returnHome
returnHomeBtn.onclick = returnHome

function returnHome() {
    window.location.reload(); // RELOAD THE PAGE TO RESTART QUIZ
}