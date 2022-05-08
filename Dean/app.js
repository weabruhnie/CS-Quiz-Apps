const quiz = document.getElementById('quiz');
const answerElements = document.querySelectorAll('.answer');
const questionElement = document.getElementById('question');
const aTtext = document.getElementById('a_text'); 
const bTtext = document.getElementById('b_text'); 
const cTtext = document.getElementById('c_text'); 
const dTtext = document.getElementById('d_text'); 

const submitBtn = document.getElementById('submit');

const quizData = quizData_CS

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];
    questionElement.innerHTML = currentQuizData.question;
    aTtext.innerHTML = currentQuizData.a;
    bTtext.innerHTML = currentQuizData.b;
    cTtext.innerHTML = currentQuizData.c;
    dTtext.innerHTML = currentQuizData.d;
}

function deselectAnswers() {
    answerElements.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;
    answerElements.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id;
        }
    })

    return answer;
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();

    if(answer) {
        if(answer == quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;

        if(currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `<h2>You answered ${score}/${quizData.length} questions correctly</h2>
            <button onClick="location.reload()">Reload</button>
            `
        }
    }
})