// constants
const next = document.querySelector(".continue-btn");
const infoBox = document.querySelector(".info-box");
const buttons = document.querySelectorAll(".btn");

const alg2_btn = document.querySelector("#alg2");
const cs_btn = document.querySelector("#cs");

const optionsContainer = document.querySelector(".options-container");

const gameContainer = document.querySelector(".game-container");
const timerText = document.querySelector("#timer_txt");
const scoreText = document.querySelector("#score_txt");
const questionTxt = document.querySelector("#question");

const progressTxt = document.querySelector(".progress h3")
const progressBarFill = document.querySelector(".progress-bar .progress-fill")

const continueQuizBtn = document.querySelector(".continue-quiz");

const choiceButtons = document.querySelectorAll(".choice-container");

const resultsContainer = document.querySelector(".results-container");
const resultsScoreText = document.querySelector(".results-container .score-result-text");

next.onclick = function () {
  infoBox.style.opacity = 0;
  buttons.forEach(function (btn) {
    btn.style.pointerEvents = "all";
  });
};

let questions = [];
let currentSubject;

cs_btn.onclick = function () {
  currentSubject = "cs";
  questions = CS_Questions;
  setupQuiz();
};

alg2_btn.onclick = function () {
  currentSubject = "alg2";
  setupQuiz();
};

let timeLeft = 15;
let userScore = 0;
let currentQuestion = 0;

function setupQuiz() {
  optionsContainer.style.display = "none";
  gameContainer.classList.remove("hide");
  console.log(questions);

  startQuestion();
}

let timerInt;
function timerStart() {
  timeLeft -= 1;
  timerText.textContent = timeLeft;

  if (timeLeft == 0) {
    optionChosen();
  }
}

function startQuestion() {
  choiceButtons.forEach((choice) => {
    choice.classList.remove("disable");
    choice.classList.remove("correct");
    choice.classList.remove("incorrect");
  });

  progressTxt.textContent = "Question " + (currentQuestion + 1) + "/" + (questions.length)
  progressBarFill.style.width = ((currentQuestion / (questions.length-1))*100) + "%"

  continueQuizBtn.style.pointerEvents = "none";
  questionTxt.textContent = questions[currentQuestion].q;

  choiceButtons.forEach((choice) => {
    let choiceText = choice.querySelector(".choice-text");
    choiceText.textContent =
      questions[currentQuestion].options[choice.dataset.index];
  });

  timeLeft = 15;
  timerText.textContent = timeLeft;
  timerInt = setInterval(timerStart, 1000);
}

choiceButtons.forEach((choice) => {
  choice.onclick = function () {
    optionChosen(choice);
  };
});

continueQuizBtn.onclick = function () {
  currentQuestion += 1;
  if (currentQuestion > questions.length - 1) {
    endResults();
  } else {
    startQuestion();
  }
};

function optionChosen(choiceChose) {
  clearInterval(timerInt);

  choiceButtons.forEach((choice) => {
    choice.classList.add("disable");
    if (choice.dataset.index == questions[currentQuestion].answer) {
      choice.classList.add("correct");
    }
  });

  if (choiceChose) {
    if (choiceChose.dataset.index == questions[currentQuestion].answer) {
      userScore += 1;
      scoreText.textContent = userScore;
    } else {
      choiceChose.classList.add("incorrect");
    }
  }

  continueQuizBtn.style.pointerEvents = "all";
}

function endResults() {
  gameContainer.classList.add("hide");
  resultsContainer.classList.remove("hide")
  resultsScoreText.textContent = userScore + "/" + questions.length
}
