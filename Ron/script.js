const answersTrackerContainer = document.querySelector(".answers-tracker")
const options = document.querySelector(".options").children

const pickContain = document.querySelector(".quiz-pick")
const mainContain = document.querySelector(".quiz-main")

const questionNumberSpan = document.querySelector(".question-num-value")
const question= document.querySelector(".question")
const totalQuestionsSpan = document.querySelector(".total-questions")
const correctAnswersSpan = document.querySelector(".correct-answers")
const totalQuestionsSpan2 = document.querySelector(".total-questions2")
const percentageSpan = document.querySelector(".percentage")

const csButton = document.querySelector("#cs button")
const alg2Button = document.querySelector("#algebra2 button")

const highScore = document.querySelectorAll(".hs")

const timerText = document.querySelector("#timer")

const tryAgainButton = document.querySelector("#again")

highScore.forEach(element => { // getting highscore for each subject
    let parent = element.parentNode
    let hsData = localStorage.getItem(parent.id + "HS") || 0
    element.innerHTML = "High Score: " + hsData
});

// let index;
let index = 0;
let answeredQuestions =[]; // array of anwered question indexes
let score = 0;
let timeLeft = 15

const opt1 = document.querySelector(".option1")
const opt2 = document.querySelector(".option2")
const opt3 = document.querySelector(".option3")
const opt4 = document.querySelector(".option4")

let questions = []
let topicId;

csButton.onclick = function() {
    pickContain.classList.add("hide")
    mainContain.classList.remove("hide")
    questions = CS_Questions

    totalQuestionsSpan.innerHTML = questions.length
    topicId = csButton.parentNode.id

    load();
    answersTracker();
}

alg2Button.onclick = function() {
    pickContain.classList.add("hide")
    mainContain.classList.remove("hide")
    questions = alg2_Questions

    totalQuestionsSpan.innerHTML = questions.length
    topicId = alg2Button.parentNode.id

    load();
    answersTracker();
}

let timeInt;
function timer() {
    timeLeft -= 1

    timerText.textContent = "Time left: " + timeLeft

    if (timeLeft <= 0) {
        check()
    }
}

function load() {
    timeLeft = 15;
    timerText.textContent = "Time left: " + timeLeft

    timeInt = setInterval(timer, 1000)
    // console.log(questions)
    // console.log(index)
    questionNumberSpan.innerHTML = index + 1
    question.innerHTML = questions[index].q;
    opt1.innerHTML = questions[index].options[0]    
    opt2.innerHTML = questions[index].options[1]
    opt3.innerHTML = questions[index].options[2]
    opt4.innerHTML = questions[index].options[3]
}

//Check if selected answer is correct or wrong
function check(element){
    clearInterval(timeInt)
    
    if (element != undefined) {
        if(element.id == questions[index].answer){
            element.className="correct"
            updateAnswersTracker("correct")
            score++
        } else {
            element.className="wrong"
            updateAnswersTracker("wrong")
        }
    } else {
        updateAnswersTracker("wrong")
    }
    
    disableClick();
}

//Make sure the user selected an item before clicking on the Next button
function validate(){
    if(!options[0].classList.contains("disabled")){
        alert("Please select an option")
    }
    else{
        index++
        console.log(index, questions.length)
        if (index >= questions.length) {
            quizOver()
            return;
        }
        load();
        enableClick();
    }
}

//Listener function for click event on Next button
function next(){
    validate();
}

//Function to disable click for the options
function disableClick(){
    for(let i=0; i<options.length; i++){
        options[i].classList.add("disabled")

        if(options[i].id == questions[index].answer){
            options[i].classList.add('correct');
        }
    }
}

//Function to reanable click in the options
function enableClick(){
    for(let i=0; i<options.length; i++){
        options[i].classList.remove("disabled", "correct", "wrong")

    }
}

//Set up answers tracker elements
function answersTracker(){
    for(let i=0; i< questions.length; i++){
        const div =document.createElement("div")
        answersTrackerContainer.appendChild(div);
    }
}

//Update the answers tracker elements
function updateAnswersTracker(newClass){
    answersTrackerContainer.children[index].classList.add(newClass)
}

//Displays the quiz-over page if quiz is over
function quizOver(){
    document.querySelector(".quiz-over").classList.add("show")
    correctAnswersSpan.innerHTML = score;
    totalQuestionsSpan2.innerHTML = questions.length
    percentageSpan.innerHTML= Math.round((score/questions.length)*100) + "%"

    let hsData = localStorage.getItem(topicId + "HS") || -1 // get previous high score to compare
    if (score > hsData) {
        localStorage.setItem(topicId + "HS", score)
    }
}

function tryAgain(){
    window.location.reload(); // reload the page to do the quiz again
}

tryAgainButton.onclick = tryAgain