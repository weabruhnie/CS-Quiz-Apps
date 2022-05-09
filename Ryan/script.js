const home_wrap = document.querySelector(".home-wrap")
const home_title = home_wrap.querySelector(".home-title h1")
const start_btn = home_wrap.querySelector(".start-btn")
const subject_options = home_wrap.querySelector(".subject-options")

const algebra_btn = subject_options.querySelector("#algebra")
const cs_btn = subject_options.querySelector("#cs")

const rule_wrap = document.querySelector(".rules")
const rule_continue_btn = rule_wrap.querySelector(".rules-box .continue-btn")
const rule_back_btn = rule_wrap.querySelector(".rules-box .back-btn")

const game_wrap = document.querySelector(".game-main-wrap")
const questionText = game_wrap.querySelector("#questionText")
const questionChoices = game_wrap.querySelectorAll(".question-choices .choice-item")

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

algebra_btn.onclick = () => {
    
    showRules()
}

cs_btn.onclick = () => {
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

function makeQuestion() {
    // console.log(questions, currentQuestion)
    let qContent = questions[currentQuestion] // get current question through array index
    console.log(qContent)
    questionText.textContent = qContent.q

    questionChoices.forEach(choice => {
        let choiceMainTxt = choice.querySelector(".choice-text .choice-main-txt")
        choiceMainTxt.textContent = qContent.choices[choice.dataset.index]
    });
}