const quizData = [
    {
        question: 'What is the name of the closest galaxy to the Milky Way?',
        i: 'Black Eye',
        ii: 'Bodes',
        iii: 'Andromeda',
        iv: 'Cartwheel',
        correct: 'iii'
    },
    {
        question: 'Who discovered the sea path from Europe to India?',
        i: 'Chistopher Colombus',
        ii: 'James Cook',
        iii: 'Jessica Watson',
        iv: 'Vasco da Gama',
        correct:'iv' 
    },
    {
        question: 'Select the pair solution to the equation: x + 2y = 15 ',
        i: '(1,7)',
        ii: '(3,4)',
        iii:'(6,9)',
        iv: '(5,3)',
        correct: 'i'
    },
    {
        question: 'What is the speed of light?',
        i: '300 million m/s',
        ii: '300 m/s',
        iii: '30 m/s',
        iv: '300 thousand m/s',
        correct: 'i'
    },
    {
        question: 'complete the sentence: Better to have it and not use it than',
        i: 'spending money to make it',
        ii: 'throwing it away',
        iii: 'to use it and not have it',
        iv: 'having it stolen',
        correct: 'iii'
    }
];

const quiz = document.getElementById("quiz");
const checked = document.querySelectorAll(".answer");
const question = document.getElementById('Question');
const i_text = document.getElementById('i_text');
const ii_text = document.getElementById('ii_text');
const iii_text = document.getElementById('iii_text');
const iv_text = document.getElementById('iv_text');
const nextQuestionBtn = document.getElementById('nextQ')


let currentQuestion = 0;
let score = 0;

loadQuiz(); // everytime an answer is submited the quiz will be loaded

function loadQuiz(){
    uncheck();
    const currentQuizData = quizData[currentQuestion];
    question.innerText = currentQuizData.question;
    i_text.innerText = currentQuizData.i;
    ii_text.innerText = currentQuizData.ii;
    iii_text.innerText = currentQuizData.iii;
    iv_text.innerText = currentQuizData.iv;

}

function checkSelection(){ // we can go to the next question if we answered the current one
    
    let answer = undefined;
    
    checked.forEach((check) => {
        if (check.checked){
            answer = check.id;
        }
    });
    return answer;
}


function uncheck() {
    checked.forEach((check) => {
        check.checked = false;
    });
}



nextQuestionBtn.addEventListener('click', () => {
    const answer = checkSelection();

    if(answer){
        if(answer === quizData[currentQuestion].correct){
            score++;
        }
        currentQuestion++;
        if (currentQuestion < quizData.length) { 
            loadQuiz();
        } else {
            quiz.innerHTML = `<h2>You answered correctly to ${score} questions!</h2> <button onClick =
            "location.reload()">Play Again</button>`;
        }

    }

});