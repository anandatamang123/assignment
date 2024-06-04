document.getElementById('start-quiz-button').addEventListener('click', startQuiz);

let currentQuestionIndex = 0;
let score = 0;
let timer;

const questions = [
    {
        question: "Where is the EURO 2024 going to be held?",
        options: ["United States Of America", "Peoples Republic of China", "Nepal", "Germany"],
        correct: 3
    },
    {
        question: "How Many Teams are participating in EURO 2024?",
        options: ["16", "20", "24", "18"],
        correct: 0
    },
    {
        question: "Which is the most popular sport in the world?",
        options: ["Football", "Cricket", "Ludo", "Table Tennis"],
        correct: 0
    },
    {
        question: "Does Nepal Play in EURO CUP?",
        options: ["No","Yes"],
        correct: 0
    },
    {
        question: "How many times England win FIFA WORLD CUP?",
        options: ["3", "2", "1", "0"],
        correct: 2
    },
    {
        question: "Who won the English Premier League 2023 2024 season?",
        options: ["Arsenal", "Manchester United", "Manchester City", "Liverpool"],
        correct: 2
    }
];

function startQuiz() {
    document.getElementById('initial-screen').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    displayQuestion();
    startTimer();
    updateProgressBar();
}

function displayQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById('question').textContent = questionData.question;

    const answerOptions = document.getElementById('answer-options');
    answerOptions.innerHTML = '';
    questionData.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.innerHTML = `
            <input type="radio" name="answer" value="${index}" id="option${index}">
            <label for="option${index}">${option}</label>
        `;
        answerOptions.appendChild(optionElement);
    });
}

document.getElementById('submit-button').addEventListener('click', handleSubmit);

function handleSubmit() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        const answerIndex = parseInt(selectedOption.value);
        if (answerIndex === questions[currentQuestionIndex].correct) {
            score++;
            document.getElementById('feedback').textContent = 'Correct!';
        } else {
            document.getElementById('feedback').textContent = 'Incorrect!';
        }
        document.getElementById('score').textContent = score;
        setTimeout(nextQuestion, 1000);
    } else {
        document.getElementById('feedback').textContent = 'Please select an answer.';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    updateProgressBar();
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        document.getElementById('feedback').textContent = '';
        resetTimer();
    } else {
        endQuiz();
    }
}

function startTimer() {
    let timeLeft = 30;
    document.getElementById('timer').textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleSubmit();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    startTimer();
}

function updateProgressBar() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById('quiz-container').innerHTML = `
        <h2>Quiz Over!</h2>
        <p>Your final score is ${score} out of ${questions.length}</p>
        <p>${getFeedbackMessage(score)}</p>
    `;
}

function getFeedbackMessage(score) {
    if (score === questions.length) {
        return "Excellent work!";
    } else if (score > questions.length / 2) {
        return "Good job!";
    } else {
        return "Better luck next time!";
    }
}

