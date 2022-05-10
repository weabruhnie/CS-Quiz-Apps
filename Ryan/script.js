const home_wrap = document.querySelector(".home-wrap")
const home_title = home_wrap.querySelector(".home-title h1")
const start_btn = home_wrap.querySelector(".start-btn")
const subject_options = home_wrap.querySelector(".subject-options")

const algebra_btn = subject_options.querySelector("#algebra button")
const cs_btn = subject_options.querySelector("#cs button")

const algebra_hs = document.querySelector("#algebra .highscore")
const cs_hs = document.querySelector("#cs .highscore")

const rule_wrap = document.querySelector(".rules")
const rule_continue_btn = rule_wrap.querySelector(".rules-box .continue-btn")
const rule_back_btn = rule_wrap.querySelector(".rules-box .back-btn")

const game_wrap = document.querySelector(".game-main-wrap")
const questionText = game_wrap.querySelector("#questionText")
const questionMediaImg = game_wrap.querySelector(".media_container img")
const questionChoices = game_wrap.querySelectorAll(".question-choices .choice-item")

const game_continue_btn = game_wrap.querySelector(".continue-btn")

const timeCount = document.querySelector(".timer .main-var")
const scoreCount = document.querySelector(".score .main-var")

const result_wrap = document.querySelector(".results-wrap") 

const return_quiz_btn = document.querySelector(".return-home")

const scoreResult = document.querySelector(".score-result")

start_btn.addEventListener("transitionend", showOptions, false)

start_btn.onclick = () => {
    start_btn.classList.add("disabled-btn")
    home_title.textContent = "Starting..."

    setTimeout(() => {
        start_btn.classList.add("hidden")
    }, 1000);
    // subject_options.classList.remove("hidden")
}

function showOptions(e) {
    if (e.propertyName == "visibility" && e.target.classList.contains("hidden")) {
        home_title.textContent = "Please pick a subject:"
        start_btn.classList.add("display-none")
        start_btn.classList.add("hidden")
        subject_options.classList.remove("display-none")
        subject_options.classList.remove("hidden")
    }
}

let questions = [];  // assigining to store later questions

let timeLeft = 15; // assigining timer
let currentQuestion = 0; // assigining current question index
let userScore = 0; // assigining user score

let topic;  // assigining topic name for later saving

let algHs = localStorage.getItem("algebraHighscore") || 0;
let csHs = localStorage.getItem("csHighscore") || 0;

algebra_hs.textContent = algHs
cs_hs.textContent = csHs

algebra_btn.onclick = () => {
    topic = "algebra"
    questions = alg_questions
    showRules()
}

cs_btn.onclick = () => {
    topic = "cs"
    questions = cs_questions
    showRules() // show rules function below
}

function showRules() {
    rule_wrap.classList.remove("hidden") // show rules
}

rule_back_btn.onclick = () => {
    rule_wrap.classList.add("hidden") // hide rules -> back to home screen
}

rule_continue_btn.onclick = () => {
    rule_wrap.classList.add("hidden") // hide rules
    home_wrap.classList.add("hidden") // hide the menu with buttons
    game_wrap.classList.remove("hidden") // show the game screen
    makeQuestion()
}

let timerVar;
function startTimer() {
    timeLeft -= 1;
    timeCount.textContent = timeLeft;

    if (timeLeft <= 0) {
        showAnswers();
    }
}

function makeQuestion() {
    // console.log(questions, currentQuestion)
    let qContent = questions[currentQuestion] // get current question through array index
    // console.log(qContent)
    questionText.textContent = qContent.q

    console.log(qContent.image)
    questionMediaImg.src = qContent.image || ""

    game_continue_btn.classList.add("disabled-btn")

    questionChoices.forEach(choice => {
        choice.classList.remove("disabled")
        choice.classList.remove("correct")
        choice.classList.remove("incorrect")

        let choiceMainTxt = choice.querySelector(".choice-text .choice-main-txt")
        choiceMainTxt.textContent = qContent.choices[choice.dataset.index]
    });

    timeLeft = 15;
    timeCount.textContent = timeLeft

    timerVar = setInterval(startTimer, 1000)
}

game_continue_btn.onclick = function() {
    currentQuestion += 1

    game_wrap.classList.add("hidden")

    setTimeout(() => {

        if (currentQuestion > questions.length - 1) {
            console.log("results")
            showResults()
        } else {
            makeQuestion()
            game_wrap.classList.remove("hidden")
        }
        
    }, 500);
}

questionChoices.forEach(choice => {
    choice.onclick = function() {
        optionPicked(choice)
    }  
});

function optionPicked(pickedChoice) {
    if (pickedChoice.dataset.index == questions[currentQuestion].answer) {
        userScore++
        scoreCount.textContent = userScore
        pickedChoice.classList.add("correct")
    } else {
        pickedChoice.classList.add("incorrect")
    }

    showAnswers()
}

function showAnswers() {
    clearInterval(timerVar)

    questionChoices.forEach(choice => {
        choice.classList.add("disabled")

        if (choice.dataset.index == questions[currentQuestion].answer) {
            choice.classList.add("correct")
        }     
    });

    game_continue_btn.classList.remove("disabled-btn")
}

function showResults() {
    result_wrap.classList.remove("hidden")
    scoreResult.textContent = `You scored ${userScore} out of ${questions.length}`

    let oldHighscore = localStorage.getItem(topic + "Highscore") || 0;

    if (userScore > oldHighscore) {
        localStorage.setItem(topic + "Highscore", userScore)
    }
}

return_quiz_btn.onclick = function() {
    window.location.reload()
}