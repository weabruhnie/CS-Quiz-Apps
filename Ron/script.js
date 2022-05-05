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

const csButton = document.querySelector("#cs")

const tryAgainButton = document.querySelector("#again")

let currentIndex;
let index = 0;
let answeredQuestions =[]; // array of anwered question indexes
let score = 0;

const opt1 = document.querySelector(".option1")
const opt2 = document.querySelector(".option2")
const opt3 = document.querySelector(".option3")
const opt4 = document.querySelector(".option4")

let questions = []

csButton.onclick = function() {
    pickContain.classList.add("hide")
    mainContain.classList.remove("hide")
    questions = CS_Questions

    totalQuestionsSpan.innerHTML = questions.length

    randomQuestion();
    answersTracker();
}

function load(){
    questionNumberSpan.innerHTML = index + 1
    question.innerHTML = questions[currentIndex].q;
    opt1.innerHTML = questions[currentIndex].options[0]    
    opt2.innerHTML = questions[currentIndex].options[1]
    opt3.innerHTML = questions[currentIndex].options[2]
    opt4.innerHTML = questions[currentIndex].options[3]
    index++
}

//Check if selected answer is correct or wrong
function check(element){
    if(element.id == questions[currentIndex].answer){
        element.className="correct"
        updateAnswersTracker("correct")
        score++
    }
    else {
        element.className="wrong"
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
        randomQuestion();
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

        if(options[i].id == questions[currentIndex].answer){
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

//Function to select a random question
function randomQuestion(){
    let randomNumber = Math.floor(Math.random()*questions.length);
    if(index == questions.length){
        quizOver();
    }
    else{
        if(answeredQuestions.length > 0){
            if(answeredQuestions.includes(randomNumber)){
                randomQuestion();
            }
            else {
                currentIndex = randomNumber;
                load();
            }
        }
        if(answeredQuestions.length == 0){
            currentIndex = randomNumber
            load()
        }
        //add the question to list of anwered questions
        answeredQuestions.push(randomNumber)
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
    answersTrackerContainer.children[index -1].classList.add(newClass)
}

//Displays the quiz-over page if quiz is over
function quizOver(){
    document.querySelector(".quiz-over").classList.add("show")
    correctAnswersSpan.innerHTML = score;
    totalQuestionsSpan2.innerHTML = questions.length
    percentageSpan.innerHTML=Math.round((score/questions.length)*100) + "%"
}

function tryAgain(){
    window.location.reload(); // reload the page to do the quiz again
}

tryAgainButton.onclick = tryAgain