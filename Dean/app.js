const question= document.getElementById('question');
const quizContainer= document.getElementById('quiz-container');
const scorecard= document.getElementById('scorecard');
const options = document.querySelectorAll('.option');
const next= document.querySelector('.next');
const points= document.getElementById('score');
const span= document.querySelectorAll('span');

const subjectContainer = document.querySelector(".subject-container")
const rulesContainer = document.querySelector(".rules-container")

const startQuizBtn = document.querySelector("#start")
const returnBtn = document.querySelector("#return-home")

const buttons = document.querySelectorAll(".subject-container .option-item")

const quitButton = document.querySelector(".quit")

const backButton = document.querySelector(".back-btn")

const timerText = document.querySelector("#timerTxt")
const scoreText = document.querySelector("#scoreTxt")

const timerFill = document.querySelector(".timer-bar-fill")

const scoreTitle = document.querySelector("#score-title")

let questionBank = [];

let subject;

backButton.onclick = () => {
    window.location.reload()
}

buttons.forEach(element => {
    let highscoreData = localStorage.getItem(element.id + "HS") || 0
    
    let button = element.querySelector("button")
    let hsText = document.querySelector("#" + element.id + " .hs")

    hsText.textContent = "High score: " + highscoreData

    button.onclick = () => {
        subject = element.id

        if (element.id == "algebra") {
            questionBank = quizData_alg
        } else if (element.id == "cs") {
            questionBank = quizData_CS
        }

        subjectContainer.classList.add("hidden")
        rulesContainer.classList.remove("hidden")
    }
});

startQuizBtn.onclick = () => {
    rulesContainer.classList.add("hidden")
    quizContainer.classList.remove("hidden")

    displayQuestion();
}

returnBtn.onclick = () => {
    window.location.reload();
}

var i=0;
var score= 0;

let timeInt;

function timerFunc() {
    timeLeft-=1
    timerText.innerHTML = "Time Left: " + timeLeft

    timerFill.style.width = ((timeLeft / 15)*100) + "%"

    if (timeLeft <= 10 && timeLeft > 5) {
        timerFill.classList.add("middle")
    } else if (timeLeft <= 5)  {
        timerFill.classList.remove("middle")
        timerFill.classList.add("death")
    }

    if (timeLeft <= 0) {
        getAnswer()
    }
}

let timerInt;

//function to display questions
function displayQuestion(){
    options.forEach(element => {
        element.classList.remove("disabled");
        element.classList.remove("wrong");
        element.classList.remove("correct");
    });

    timeLeft = 15;
    timerText.innerHTML = "Time Left: " + timeLeft
    timerFill.style.width = ((timeLeft / 15)*100) + "%"

    timerFill.classList.remove("middle")
    timerFill.classList.remove("death")

    timerInt = setInterval(timerFunc, 1000)

    for(var a=0;a<span.length;a++){
        span[a].style.background='none';
    }
    question.innerHTML= 'Question '+(i+1)+': '+questionBank[i].question;
    options[0].innerHTML= questionBank[i].a;
    options[1].innerHTML= questionBank[i].b;
    options[2].innerHTML= questionBank[i].c;
    options[3].innerHTML= questionBank[i].d;
    stat.innerHTML= "Question"+' '+(i+1)+' '+'of'+' '+questionBank.length;
}

options.forEach(element => {
    element.onclick = () => {
        getAnswer(element)
    }
});

//function to calculate scores
function getAnswer(e){
    options.forEach(element => {
        element.classList.add("disabled");
    });

    clearInterval(timerInt)

    if (e != undefined) {
        if(e.dataset.index == questionBank[i].correct && score<questionBank.length)
        {
            score+=1; // plus one
            scoreText.innerHTML = "Score: " + score
            e.classList.add("correct");
        }
        else{
            e.classList.add("wrong");
        }
    }  

    options.forEach(element => {
        console.log(element.dataset.index)
        if (element.dataset.index == questionBank[i].correct) {
            element.classList.add("correct");
        }
    });
    // setTimeout(nextQuestion,300);
}

//function to display next question
function nextQuestion(){
    if(i<questionBank.length-1)
    {
        i+=1;
        displayQuestion();
    }
    else{
        points.innerHTML= score + '/'+ questionBank.length;
        quizContainer.style.display= 'none';
        scoreboard.style.display= 'block'

        if (score <= 2) {
            scoreTitle.innerHTML = "Ho ho ho"
        } else if (score >= 3) {
            scoreTitle.innerHTML = "Ben?"
        }

        let highscoreData = localStorage.getItem(subject + "HS") || 0
        if (score > highscoreData) {
            localStorage.setItem(subject + "HS", score)
        }
    }
}

//click events to next button
next.addEventListener('click',nextQuestion);

quitButton.onclick = () => {
    window.location.reload();
}