const ul = document.getElementById('ul')
const nextButton = document.getElementById('btnNext');
const quizbox = document.getElementById('questionBox')
const opt1 = document.getElementById('opt1')
const opt2 = document.getElementById('opt2')
const opt3 = document.getElementById('opt3')
const opt4 = document.getElementById('opt4')

const scoreCardText = document.querySelector("#scoreCard")

const optionItems = document.querySelectorAll(".options #ul li")

const quizWrap = document.querySelector(".quiz-wrapper")
const optionsWrap = document.querySelector(".options-wrapper")
const rulesWrap = document.querySelector(".rules-wrapper")

const rulesContinue = document.querySelector(".rules-wrapper .continue-btn")

const alg_btn = document.querySelector("#algebra2 button")
const cs_btn = document.querySelector("#cs button")

const alg_hsTxt = document.querySelector("#algebra2 .highscore")
const cs_hsTxt = document.querySelector("#cs .highscore")


let index = 0
let score = 0

let timeLeft = 15;

let questions = [];
let topic;

alg_btn.onclick = function() {
    topic = "algebra"
    questions = alg2_questions
    showRules()
}

cs_btn.onclick = function() {
    topic = "cs"
    questions = alg2_questions
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

function load(){
    if(index<=questions.length-1){
        allowClick()
        quizbox.innerHTML=index+1 + ". " + questions[index].question;
        opt1.innerHTML=questions[index].choices[0];
        opt2.innerHTML=questions[index].choices[1];
        opt3.innerHTML=questions[index].choices[2];
        opt4.innerHTML=questions[index].choices[3];
    }
    else {
        quizbox.innerHTML="Quiz Completed!";
        ul.style.display="none";
        nextButton.style.display="none";
    }
}

function next(){
    index++;
    load();
}

function check(ele){
    if(ele.dataset.index==questions[index].answer){
        score++;
        ele.className="correct";
        scoreCard();
    } else {
        ele.className="wrong";
    }

    optionItems.forEach((opt) => {
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