const ul = document.getElementById('ul')
const nextButton = document.getElementById('btnNext');
const quizbox = document.getElementById('questionBox')
const opt1 = document.getElementById('opt1')
const opt2 = document.getElementById('opt2')
const opt3 = document.getElementById('opt3')
const opt4 = document.getElementById('opt4')

const scoreCardText = document.querySelector("#scoreCard")
const timerCardText = document.querySelector("#timeCard")

const cardsList = document.querySelector(".cards-list")

const optionItems = document.querySelectorAll(".options #ul li")

const quizWrap = document.querySelector(".quiz-wrapper")
const optionsWrap = document.querySelector(".options-wrapper")
const rulesWrap = document.querySelector(".rules-wrapper")
const resultsWrap = document.querySelector(".results-wrapper")

const scoreTxt = document.querySelector(".score-txt")

const rulesContinue = document.querySelector(".rules-wrapper .continue-btn")

const alg_btn = document.querySelector("#algebra2 button")
const cs_btn = document.querySelector("#cs button")

const alg_hsTxt = document.querySelector("#algebra2 .highscore")
const cs_hsTxt = document.querySelector("#cs .highscore")

const returnBtn = document.querySelector(".return-btn")

const timerBarFill = document.querySelector(".timer-bar-fill")

let index = 0
let score = 0

let timeLeft = 15;

let questions = [];
let topic;

let algHs = localStorage.getItem("algebra") || 0
let csHs = localStorage.getItem("cs") || 0

alg_hsTxt.innerHTML = algHs
cs_hsTxt.innerHTML = csHs

alg_btn.onclick = function() {
    topic = "algebra"
    questions = alg2_questions
    showRules()
}

cs_btn.onclick = function() {
    topic = "cs"
    questions = CS_questions
    showRules()
}

function showRules() {
    optionsWrap.classList.add("hidden")
    rulesWrap.classList.remove("hidden")
}

rulesContinue.onclick = function() {
    quizWrap.classList.remove("hidden")
    rulesWrap.classList.add("hidden")
    load()
}

function preventClick(){
    for(let i=0; i<ul.children.length; i++){
        ul.children[i].style.pointerEvents="none";
    }
}

function allowClick(){
    for(let i=0; i<ul.children.length; i++){
        ul.children[i].style.pointerEvents="auto";
        ul.children[i].className=''
    }
}

function timerFunc() {
    timeLeft -= 1;
    timerCardText.innerHTML = timeLeft
    timerBarFill.style.width = ((timeLeft/15)*100) + "%"

    if (timeLeft <= 0) {
        check()
    }
}

let timerInterval

function load(){
    timeLeft = 15;
    timerCardText.innerHTML = timeLeft
    timerBarFill.style.width = ((timeLeft/15)*100) + "%"

    if(index<=questions.length-1){
        allowClick()
        quizbox.innerHTML=index+1 + ". " + questions[index].question;
        opt1.innerHTML=questions[index].choices[0];
        opt2.innerHTML=questions[index].choices[1];
        opt3.innerHTML=questions[index].choices[2];
        opt4.innerHTML=questions[index].choices[3];

        timerInterval = setInterval(timerFunc, 1000)
    }
    else {
        results()
    }
}

function results() {
    quizWrap.classList.add("hidden")
    resultsWrap.classList.remove("hidden")
    scoreTxt.innerHTML = score + "/" + questions.length

    let hs = localStorage.getItem(topic) || 0

    if (score > hs) {
        localStorage.setItem(topic, score)
    }
}

function next(){
    index++;
    load();
}

function check(ele){
    clearInterval(timerInterval)

    if (ele) {
        if(ele.dataset.index==questions[index].answer){
            score++;
            ele.className="correct";
            scoreCard();
        } else {
            ele.className="wrong";
        }
    }

    optionItems.forEach((opt) => {
        opt.classList.add("disabled")
        if(opt.dataset.index==questions[index].answer){
            opt.className="correct";
        }
    })
}

function scoreCard(){
    scoreCardText.innerHTML = score;
}

function button(ele){
    check(ele)
    preventClick();
}

returnBtn.onclick = () => {
    window.location.reload()
}