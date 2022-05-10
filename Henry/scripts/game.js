const subjectPick  = document.querySelector("#subject-pick")
const subjectTitle = document.querySelector("#subject-title")
const subjectList = document.querySelector("#subject-list")
const subjectItems = document.querySelectorAll(".subject-item") // ayo variabless

const gameContainer = document.querySelector("#game")
const progressNum = document.querySelector("#progressNum")
const progressBarFill = document.querySelector("#progressBarFill")

const instructContain = document.querySelector("#instructions")

const scoreTxt = document.querySelector("#score")
const timerTxt = document.querySelector("#timer")
const questionTxt = document.querySelector("#question")

const continueBtn = document.querySelector("#continue")
const understandBtn = document.querySelector("#understand")
const tipMessage = document.querySelector("#tip-message")

const choiceItems = document.querySelectorAll(".choice-item")
const choiceTexts = document.querySelectorAll(".choice-text")

const resultsContain = document.querySelector("#results")
const resultCongrat = document.querySelector("#result-congrat")
const resultScore = document.querySelector("#result-score")

const DefaultTimer = 15

window.onload = gamePageLoad // ok i pull up window

let subject; // our subject for game

function gamePageLoad() {
  continueBtn.classList.add("hide")

  subjectTitle.classList.toggle("fade-in") // i love chu homie fade transition

  setTimeout(() => {
    subjectList.classList.toggle("fade-in")
  }, 300);
}

let clicked = false // check if the user has already selected a subject, preventing overlap (CEO EXPLANATION!)

let questionsContent; // to get question content later
let questionIndex = 0; // start at 0, moves on later

let score = 0;
let timer = DefaultTimer;

let answered = false;

let currentSubject;

var countdownInterval;

subjectItems.forEach((subject) => {
  let hsKey = subject.id + "HS"

  let subjectHS = localStorage.getItem(hsKey)
  if (subjectHS) {
    let hsText = subject.querySelector(".highscore")
    hsText.textContent = "High Score: " + subjectHS
  }

  subject.onclick = () => {
    if (clicked) return; // NO MORE OVERLAP LOL

    clicked = true // Ho ho ho

    console.log(subject.id)

    if (subject.id in subjectQuestions) {
      currentSubject = subject.id
      questionsContent = subjectQuestions[subject.id]
      console.log(questionsContent)
    }
    
    subjectTitle.classList.toggle("fade-in")
    subjectList.classList.toggle("fade-in")

    setTimeout(showRules, 400);
  }
})

function showRules() {
  subjectPick.classList.add("hide")

  instructContain.classList.remove("hide")
  
  setTimeout(function() {
    instructContain.classList.add("fade-in")
  }, 300);
}

function continueQuiz() {
  instructContain.classList.remove("fade-in")

  setTimeout(function() {
    gameContainer.classList.remove("hide")
  }, 300)
  setTimeout(startQuiz, 600);
}

understandBtn.onclick = () => {
  continueQuiz()
}

function updateValues() {
  scoreTxt.textContent = score
  timerTxt.textContent = timer
}

function setupQuestion() {
  const content = questionsContent[questionIndex]
  questionTxt.innerHTML = content.question

  choiceItems.forEach((choiceItem) => {
    let choiceText = choiceItem.querySelector(".choice-text")

    let choice = content.choices[choiceText.dataset.choicenum - 1]

    if (choice != undefined) {
      choiceText.innerHTML = choice
      choiceItem.classList.remove("hide")
    } else {
      choiceItem.classList.add("hide")
    }
  })
}

function countDown() {
  timer -= 1

  if (timer <= 0) {
    choicePicked()
    timerTxt.textContent = "Time's Up!"
    tipMessage.textContent = "You didn't even pick an answer, I'm disappointed."
    return;
  }

  updateValues()
}

function startQuiz() {
  instructContain.classList.add("hide")

  tipMessage.textContent = ""
  progressNum.textContent = "Question " + (questionIndex + 1) + "/" + questionsContent.length
  progressBarFill.style.width = (((questionIndex+1)/(questionsContent.length)) * 100) + "%"
  answered = false

  timer = DefaultTimer

  continueBtn.classList.remove("hide")
  continueBtn.classList.remove("fade-in")

  choiceItems.forEach((choiceItem) => {
    choiceItem.classList.remove("incorrect")
    choiceItem.classList.remove("correct")
    choiceItem.classList.remove("disabledChoice")
  })

  // console.log(gameContainer)
  gameContainer.classList.add("fade-in")

  countdownInterval = setInterval(countDown, 1000);

  updateValues()
  setupQuestion()
}

function showCorrectAnswer() {
  choiceItems.forEach((choiceItem) => {
    choiceItem.classList.add("disabledChoice")

    let choiceText = choiceItem.querySelector(".choice-text")
    if (choiceText.textContent === questionsContent[questionIndex].answer) {
      choiceItem.classList.add("correct")
    } else if (choiceText.dataset.choicenum - 1 === questionsContent[questionIndex].answerIndex) {
      choiceItem.classList.add("correct")
    } else if (questionsContent[questionIndex].answer === "ALL") {
      choiceItem.classList.add("correct")
    }
  })
}

function choicePicked(choiceItem) {
  clearInterval(countdownInterval);

  if (answered) return;

  answered = true

  if (choiceItem) {
    let choiceText = choiceItem.querySelector(".choice-text")

    if (choiceText.textContent === questionsContent[questionIndex].answer || questionsContent[questionIndex].answer === "ALL" || (questionsContent[questionIndex].answerIndex && (choiceText.dataset.choicenum - 1 === questionsContent[questionIndex].answerIndex))) {
      tipMessage.textContent = "You got it correct! Good job!"
      score += 1
    } else {
      tipMessage.textContent = "Oh no, you got it wrong. But you can always do extra work!"
      choiceItem.classList.add("incorrect")
    }
  }

  updateValues()

  showCorrectAnswer()

  continueBtn.classList.add("fade-in")
}

function gameResults() {
  if (score === questionsContent.length) {
    resultCongrat.textContent = "YOU ACED THE QUIZ!"
  } else if (score === 0) { 
    resultCongrat.textContent = "Oh no, super bad."
  } 
  resultScore.textContent = "You were able to score " + score + " points out of " + questionsContent.length + " questions!"

  let hsKey = currentSubject + "HS"

  let subjectScore = localStorage.getItem(hsKey)
  if (subjectScore) {
    if (score > subjectScore) {
      localStorage.setItem(hsKey, score);
    }
  } else {
    localStorage.setItem(hsKey, score);
  }

  gameContainer.classList.add("hide")
  resultsContain.classList.remove("hide")
  resultsContain.classList.add("fade-in")
}

choiceItems.forEach((choiceItem) => {
  choiceItem.onclick = () => {
    choicePicked(choiceItem)
  }
})

continueBtn.onclick = () => {
  gameContainer.classList.remove("fade-in")

  if (questionIndex + 1 === questionsContent.length) {
    console.log("already finished")
    setTimeout(gameResults , 800);
    return
  }

  questionIndex += 1

  setTimeout(startQuiz, 700);
}