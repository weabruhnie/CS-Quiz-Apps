var question= document.getElementById('question');
var quizContainer= document.getElementById('quiz-container');
var scorecard= document.getElementById('scorecard');
var options = document.querySelectorAll('.option');
var next= document.querySelector('.next');
var points= document.getElementById('score');
var span= document.querySelectorAll('span');

var subjectContainer = document.querySelector(".subject-container")
var rulesContainer = document.querySelector(".rules-container")

var startQuizBtn = document.querySelector("#start")
var returnBtn = document.querySelector("#return-home")

var buttons = document.querySelectorAll(".subject-container .option-item")

var timerText = document.querySelector("#timerTxt")
var scoreText = document.querySelector("#scoreTxt")

let questionBank = [];

let subject;

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

    if (timeLeft <= 0) {
        getAnswer()
    }
}

//function to display questions
function displayQuestion(){
    options.forEach(element => {
        element.classList.remove("disabled");
        element.classList.remove("wrong");
        element.classList.remove("correct");
    });

    timeLeft = 15;
    timerText.innerHTML = "Time Left: " + timeLeft

    timerInt = setInterval(timerFunc, 1000)

    for(var a=0;a<span.length;a++){
        span[a].style.background='none';
    }
    question.innerHTML= 'Question'+(i+1)+': '+questionBank[i].question;
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
        points.innerHTML= score+ '/'+ questionBank.length;
        quizContainer.style.display= 'none';
        scoreboard.style.display= 'block'

        let highscoreData = localStorage.getItem(subject + "HS") || 0
        if (score > highscoreData) {
            localStorage.setItem(subject + "HS", score)
        }
    }
}

//click events to next button
next.addEventListener('click',nextQuestion);

//Back to Quiz button event
function backToQuiz(){
    window.location.reload();
}