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
            input.addEventListener('input', saveAnswer);
            questionElement.appendChild(input);
        } else if (question.type === 'radio') {
            question.options.forEach(option => {
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `q${i}`;
                radio.value = option;
                radio.checked = userAnswers[`q${i}`] === option;
                radio.addEventListener('click', saveAnswer);

                const radioLabel = document.createElement('label');
                radioLabel.textContent = option;

                questionElement.appendChild(radio);
                questionElement.appendChild(radioLabel);
                questionElement.appendChild(document.createElement('br'));
            });
        } else if (question.type === 'checkbox') {
            question.options.forEach(option => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = `q${i}`;
                checkbox.value = option;
                checkbox.checked = userAnswers[`q${i}`] && userAnswers[`q${i}`].includes(option);
                checkbox.addEventListener('click', saveAnswer);

                const checkboxLabel = document.createElement('label');
                checkboxLabel.textContent = option;

                questionElement.appendChild(checkbox);
                questionElement.appendChild(checkboxLabel);
                questionElement.appendChild(document.createElement('br'));
            });
        } else if (question.type === 'dropdown') {
            const select = document.createElement('select');
            select.name = `q${i}`;
            question.options.forEach(option => {
                const selectOption = document.createElement('option');
                selectOption.value = option;
                selectOption.textContent = option;
                selectOption.selected = userAnswers[`q${i}`] === option;
                select.appendChild(selectOption);
            });
            select.addEventListener('change', saveAnswer);
            questionElement.appendChild(select);
        }

        questionContainer.appendChild(questionElement);
    }

    document.getElementById('prev-button').disabled = currentPage === 0;
    document.getElementById('next-button').disabled = end >= questions.length;
    document.getElementById('submit-button').style.display = end >= questions.length ? 'inline-block' : 'none';
}

function saveAnswer(event) {
    const name = event.target.name;
    if (event.target.type === 'checkbox') {
        if (!userAnswers[name]) {
            userAnswers[name] = [];
        }
        if (event.target.checked) {
            userAnswers[name].push(event.target.value);
        } else {
            userAnswers[name] = userAnswers[name].filter(value => value !== event.target.value);
        }
    } else {
        userAnswers[name] = event.target.value;
    }
}

function nextPage() {
    if (currentPage < Math.ceil(questions.length / 5) - 1) {
        currentPage++;
        displayPage();
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displayPage();
    }
}

function submitQuiz() {
    clearInterval(timer);

    let score = 0;
    let answeredQuestions = 0;

    questions.forEach((question, index) => {
        const userAnswer = userAnswers[`q${index}`];
        if (userAnswer !== undefined) {
            answeredQuestions++;
            if (question.type === 'text' || question.type === 'dropdown') {
                if (userAnswer.toLowerCase() === question.answer.toLowerCase()) {
                    score++;
                }
            } else if (question.type === 'radio') {
                if (userAnswer === question.answer) {
                    score++;
                }
            } else if (question.type === 'checkbox') {
                if (JSON.stringify(userAnswer.sort()) === JSON.stringify(question.answer.sort())) {
                    score++;
                }
            }
        }
    });

    const timeTaken = 180 - timeRemaining;
    alert(`Your score is ${score} out of ${answeredQuestions}.\nTime taken: ${Math.floor(timeTaken / 60)} minutes ${timeTaken % 60} seconds`);
}
