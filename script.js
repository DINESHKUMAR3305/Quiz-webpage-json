let currentPage = 0;
let timer;
let timeRemaining = 180; // 3 minutes in seconds
let userAnswers = {};
let questions = [
    {
        "type": "checkbox",
        "content": "Which of the following is not a metal?",
        "options": ["Sand", "Iron", "Silver", "Water"],
        "answer": ["Sand", "Water"]
    },
    {
        "type": "radio",
        "content": "Which of the following is not available on Earth?",
        "options": ["Vibranium", "Iron", "Silver", "Water"],
        "answer": "Vibranium"
    },
    {
        "type": "dropdown",
        "content": "Select the District which is not in Tamil Nadu",
        "options": ["Ariyalur", "Pune", "Madurai"],
        "answer": "Pune"
    },
    {
        "type": "text",
        "content": "Capital of India",
        "answer": "Delhi"
    },
    {
        "type": "text",
        "content": "12 + 22 + 66",
        "answer": "100"
    },
    {
        "type": "checkbox",
        "content": "Which of the following are states of India?",
        "options": ["Tamil Nadu", "San Francisco", "Kerala", "Washington"],
        "answer": ["Tamil Nadu", "Kerala"]
    },
    {
        "type": "text",
        "content": "What is the capital of Tamil Nadu?",
        "answer": "Chennai"
    },
    {
        "type": "radio",
        "content": "Which one is the national fruit of India?",
        "options": ["Apple", "Carrot", "Mango"],
        "answer": "Mango"
    },
    {
        "type": "checkbox",
        "content": "Which of the following are programming languages?",
        "options": ["Python", "HTML", "CSS", "Java"],
        "answer": ["Python", "Java"]
    },
    {
        "type": "dropdown",
        "content": "Select the largest continent in the world",
        "options": ["Australia", "Africa", "Asia"],
        "answer": "Africa"
    },
    {
        "type": "radio",
        "content": "Is 2 + 2 equal to 2 * 2?",
        "options": ["Yes", "No"],
        "answer": "Yes"
    },
    {
        "type": "text",
        "content": "Who is the current Prime Minister of India?",
        "answer": "Narendra Modi"
    },
    {
        "type": "radio",
        "content": "Which one is a vegetable?",
        "options": ["Apple", "Carrot", "Potato"],
        "answer": "Carrot"
    },
    {
        "type": "radio",
        "content": "Which color is not present in a rainbow?",
        "options": ["Violet", "Black", "Yellow"],
        "answer": "Black"
    },
    {
        "type": "text",
        "content": "Number of states in India",
        "answer": "29"
    },
    {
        "type": "checkbox",
        "content": "Which of the following are primary colors?",
        "options": ["Red", "Orange", "Green", "Yellow", "Blue"],
        "answer": ["Red", "Green", "Blue"]
    },
    {
        "type": "text",
        "content": "(10 + 11) - 20 / 2 is equal to",
        "answer": "11"
    },
    {
        "type": "radio",
        "content": "Which is the national animal of India?",
        "options": ["Peacock", "Tiger", "Camel"],
        "answer": "Tiger"
    },
    {
        "type": "checkbox",
        "content": "Which of the following are Avengers?",
        "options": ["Iron Man", "Batman", "Black Widow", "Superman", "Spider Man"],
        "answer": ["Iron Man", "Black Widow", "Spider Man"]
    },
    {
        "type": "dropdown",
        "content": "Which country has the highest population?",
        "options": ["China", "Russia", "India"],
        "answer": "India"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    startTimer();
    loadQuestions();
});

function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        document.getElementById('time').textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

function loadQuestions() {
    displayPage();
}

function displayPage() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    const start = currentPage * 5;
    const end = Math.min(start + 5, questions.length);

    for (let i = start; i < end; i++) {
        const question = questions[i];
        const questionElement = document.createElement('div');
        questionElement.className = 'question';

        const label = document.createElement('label');
        label.textContent = question.content;
        questionElement.appendChild(label);

        if (question.type === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = `q${i}`;
            input.value = userAnswers[`q${i}`] || '';
            input.addEventListener('input', (e) => {
                userAnswers[`q${i}`] = e.target.value;
            });
            questionElement.appendChild(input);
        } else if (['radio', 'checkbox'].includes(question.type)) {
            question.options.forEach(option => {
                const input = document.createElement('input');
                input.type = question.type;
                input.name = `q${i}`;
                input.value = option;
                if(question.type === 'radio'){
                    input.checked = userAnswers[`q${i}`] === option;
                }else{
                    input.checked = userAnswers[`q${i}`] && userAnswers[`q${i}`].includes(option);
                }
                
                input.addEventListener('change', (e) => {
                    if (question.type === 'radio') {
                        userAnswers[`q${i}`] = e.target.value;
                    } else {
                        if (!userAnswers[`q${i}`]) userAnswers[`q${i}`] = [];
                        if (e.target.checked) {
                            userAnswers[`q${i}`].push(option);
                        } else {
                            userAnswers[`q${i}`] = userAnswers[`q${i}`].filter(opt => opt !== option);
                        }
                    }
                });

                const optionLabel = document.createElement('label');
                optionLabel.textContent = option;

                questionElement.appendChild(input);
                questionElement.appendChild(optionLabel);
            });
        } else if (question.type === 'dropdown') {
            const select = document.createElement('select');
            select.name = `q${i}`;
            question.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                optionElement.selected = userAnswers[`q${i}`] === option;
                select.appendChild(optionElement);
            });
            select.addEventListener('change', (e) => {
                userAnswers[`q${i}`] = e.target.value;
            });
            questionElement.appendChild(select);
        }

        questionContainer.appendChild(questionElement);
    }

    document.getElementById('prev-button').style.display = currentPage === 0 ? 'none' : 'inline-block';
    document.getElementById('next-button').style.display = end === questions.length ? 'none' : 'inline-block';
    document.getElementById('submit-button').style.display = end === questions.length ? 'inline-block' : 'none';
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displayPage();
    }
}

function nextPage() {
    const start = currentPage * 5;
    const end = Math.min(start + 5, questions.length);
    if (end < questions.length) {
        currentPage++;
        displayPage();
    }
}

function submitQuiz() {
    clearInterval(timer);
    document.getElementById('prev-button').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';
    document.getElementById('submit-button').style.display = 'none';
    document.getElementById('retake-button').style.display = 'inline-block';
    
    let correctAnswersCount = 0;
    questions.forEach((question, index) => {
        const userAnswer = userAnswers[`q${index}`];
        const correctAnswer = question.answer;
        const isCorrect = Array.isArray(correctAnswer)
            ? userAnswer && correctAnswer.sort().toString() === userAnswer.sort().toString()
            : userAnswer === correctAnswer;

        if (isCorrect) {
            correctAnswersCount++;
        }
    });

    const timeTaken = 180 - timeRemaining;
    alert(`You scored ${correctAnswersCount} out of ${questions.length}. Time taken: ${Math.floor(timeTaken / 60)} minutes and ${timeTaken % 60} seconds.`);
}

function retakeQuiz() {
    currentPage = 0;
    timeRemaining = 180;
    userAnswers = {};
    document.getElementById('retake-button').style.display = 'none';
    loadQuestions();
    startTimer();
}
