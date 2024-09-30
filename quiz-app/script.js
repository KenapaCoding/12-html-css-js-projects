// array pertanyaan dan jawaban
const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Rome", correct: false },
            { text: "Berlin", correct: false }
        ]
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: [
            { text: "Harper Lee", correct: true },
            { text: "Mark Twain", correct: false },
            { text: "Ernest Hemingway", correct: false },
            { text: "F. Scott Fitzgerald", correct: false }
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Jupiter", correct: true },
            { text: "Saturn", correct: false },
            { text: "Earth", correct: false },
            { text: "Mars", correct: false }
        ]
    },
    {
        question: "Which language is primarily used for web development?",
        answers: [
            { text: "JavaScript", correct: true },
            { text: "Python", correct: false },
            { text: "C++", correct: false },
            { text: "Java", correct: false }
        ]
    }
];

let currentQuestionIndex = 0 
let score = 0

// ambil semua element yang kita butuhkan dari "ID"
const questionContainer = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")
const resultContainer = document.getElementById("result-container")
const scoreElement = document.getElementById("score")
const restartButton = document.getElementById("restart-btn")

// buat fungsi untuk memulai quiz
function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    nextButton.style.display = 'none'
    resultContainer.style.display = 'none'
    questionContainer.style.display = 'block'

    //function untuk menampilkan question
    showQuestion()
}

function showQuestion(){
    // untuk mereset state
    resetState()

    const currentQuestion = questions[currentQuestionIndex]
    questionElement.textContent = currentQuestion.question

    // buat button untuk jawaban secara dinamis
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.textContent = answer.text
        button.classList.add('answer-btn')
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtons.appendChild(button)
    })
}

function resetState(){
    nextButton.style.display = 'none'
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct === 'true'
    if(correct) {
        score++
        selectedButton.style.backgroundColor = '#4caf50'
    } else{
        selectedButton.style.backgroundColor = '#f44336'
    }
    //disable all button after select answer
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true
        if(button.dataset.correct){
            button.style.backgroundColor = '#4caf50'
        }
    })

    // tampilkan next button jika pertanyaan masih ada
    if(currentQuestionIndex < questions.length - 1){
        nextButton.style.display = 'inline-block'
    } else{
        showResult()
    }
}

// handle event listener nextbtn

nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    showQuestion()
})

function showResult(){
    questionContainer.style.display = 'none'
    resultContainer.style.display = 'block'
    scoreElement.textContent = `Your score : ${score} / ${questions.length}`
}

restartButton.addEventListener('click', startQuiz)





startQuiz()