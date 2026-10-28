
let flashcards = [
    {
        question: "What is Python?",
        answer: "Python is a simple and powerful programming language."
    },
    {
        question: "What is HTML?",
        answer: "HTML is used to create the structure of web pages."
    },
    {
        question: "What is CSS?",
        answer: "CSS is used to style and design web pages."
    }
];

let currentIndex = 0;

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const showAnswerBtn = document.getElementById("showAnswerBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const counterElement = document.getElementById("counter");

const questionInput = document.getElementById("questionInput");
const answerInput = document.getElementById("answerInput");

const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");
const messageElement = document.getElementById("message");

// Display the current flashcard
function displayCard() {
    if (flashcards.length === 0) {
        questionElement.textContent = "No flashcards available";
        answerElement.textContent = "";
        answerElement.style.display = "none";
        showAnswerBtn.textContent = "Show Answer";
        counterElement.textContent = "0 / 0";
        return;
    }

    questionElement.textContent = flashcards[currentIndex].question;
    answerElement.textContent = flashcards[currentIndex].answer;

    // Hide the answer initially
    answerElement.style.display = "none";
    showAnswerBtn.textContent = "Show Answer";

    counterElement.textContent =
        (currentIndex + 1) + " / " + flashcards.length;

    questionInput.value = "";
    answerInput.value = "";
}

// Show or hide the answer
showAnswerBtn.addEventListener("click", function () {
    if (flashcards.length === 0) {
        return;
    }

    if (answerElement.style.display === "none") {
        answerElement.style.display = "block";
        showAnswerBtn.textContent = "Hide Answer";
    } else {
        answerElement.style.display = "none";
        showAnswerBtn.textContent = "Show Answer";
    }
});

// Go to the next flashcard
nextBtn.addEventListener("click", function () {
    if (flashcards.length === 0) return;

    currentIndex = (currentIndex + 1) % flashcards.length;
    displayCard();
    messageElement.textContent = "";
});

// Go to the previous flashcard
prevBtn.addEventListener("click", function () {
    if (flashcards.length === 0) return;

    currentIndex =
        (currentIndex - 1 + flashcards.length) % flashcards.length;

    displayCard();
    messageElement.textContent = "";
});

// Add a new flashcard
addBtn.addEventListener("click", function () {
    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    if (question === "" || answer === "") {
        messageElement.textContent =
            "Please enter both question and answer.";
        return;
    }

    flashcards.push({
        question: question,
        answer: answer
    });

    currentIndex = flashcards.length - 1;
    displayCard();

    messageElement.textContent = "Flashcard added successfully!";
});

// Edit the current flashcard
editBtn.addEventListener("click", function () {
    if (flashcards.length === 0) {
        messageElement.textContent = "No card available to edit.";
        return;
    }

    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    if (question === "" || answer === "") {
        messageElement.textContent =
            "Enter the updated question and answer.";
        return;
    }

    flashcards[currentIndex] = {
        question: question,
        answer: answer
    };

    displayCard();
    messageElement.textContent = "Flashcard updated successfully!";
});

// Delete the current flashcard
deleteBtn.addEventListener("click", function () {
    if (flashcards.length === 0) {
        messageElement.textContent = "No card available to delete.";
        return;
    }

    flashcards.splice(currentIndex, 1);

    if (currentIndex >= flashcards.length) {
        currentIndex = Math.max(0, flashcards.length - 1);
    }

    displayCard();
    messageElement.textContent = "Flashcard deleted successfully!";
});

// Load the first flashcard
displayCard();
