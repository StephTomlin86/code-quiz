let choice1 = document.getElementById("1");
let choice2 = document.getElementById("2");
let choice3 = document.getElementById("3");
let choice4 = document.getElementById("4");
let counter = document.getElementById("count");
let start = document.getElementById("start");
let choices = document.getElementById("choices");
let instructions = document.getElementById("instructions");
let questionContainer = document.getElementById("questionContainer");
let ending = document.getElementById("ending");
let score = document.getElementById("score");
let timer = document.getElementById("timer");
let initialInput = document.getElementById("initials");
let initialsBtn = document.getElementById("initialsBtn");
let goBack = document.getElementById("goBack");
let resetHighScores = document.getElementById("resetHighScore");
let highScoreList = document.getElementById("highScoreList");
let highScoreContainer = document.getElementById("highScore");
let highScoreBtn = document.getElementById("highScoreBtn");
let returnToStartBtn = document.getElementById("returnToStartBtn");
let timeLeft = 60;

let questions = [
  {
    question: "Which of the following is not a reserved word in JavaScript?",
    choice1: "Interface",
    choice2: "Throws",
    choice3: "Program",
    choice4: "Short",
    correct: "3",
  },
  {
    question:
      "How do you write an ‘if’ statement for executing some code if “i” is NOT equal to 5?",
    choice1: "if(i<>5)",
    choice2: "if i<>5",
    choice3: "if(i!=5)",
    choice4: "if i!=5",
    correct: "3",
  },
  {
    question: "What is the correct syntax for adding comments in JavaScript?",
    choice1: "<!-This is a comment-&gt",
    choice2: "//This is a comment",
    choice3: "-This is a comment",
    choice4: "**This is a comment**",
    correct: "2",
  },
  {
    question:
      "String values must be enclosed within ___________ when being assigned to variables.",
    choice1: "Commas",
    choice2: "Curly Brackets",
    choice3: "Quotes",
    choice4: "Parenthesis",
    correct: "3",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choice1: "JavaScript",
    choice2: "Terminal / Bash",
    choice3: "For Loops",
    choice4: "console.log",
    correct: "4",
  },
];

let lastQuestionIndex = questions.length - 1;

let runningQuestionIndex = 0;

function renderQuestion() {
  let q = questions[runningQuestionIndex];
  question.innerHTML = "<p>" + q.question + "<p>";
  choice1.innerHTML = q.choice1;
  choice2.innerHTML = q.choice2;
  choice3.innerHTML = q.choice3;
  choice4.innerHTML = q.choice4;
}

function answerIsCorrect() {
  console.log("correct");
}

function answerIsWrong() {
  console.log("wrong");
  timeLeft -= 10;
}

function checkAnswer(answer) {
  if (questions[runningQuestionIndex].correct == answer) {
    answerIsCorrect();
  } else {
    answerIsWrong();
  }

  if (runningQuestionIndex < lastQuestionIndex) {
    runningQuestionIndex++;
    renderQuestion();
  } else {
    clearInterval(timeLeft);

    questionContainer.classList.add("hide");
    questionContainer.classList.remove("show");
    choices.classList.add("hide");
    choices.classList.remove("show");
    ending.classList.add("show");
    ending.classList.remove("hide");
    score.innerHTML = timeLeft;
    timer.classList.add("hide");
    timer.classList.remove("show");
  }
}

function beginQuiz() {
  countDown();
  renderQuestion();

  if (start.classList.contains("show")) {
    start.classList.add("hide");
    start.classList.remove("show");
  }
  if (choices.classList.contains("hide")) {
    choices.classList.add("show");
    choices.classList.remove("hide");
  }
  if (instructions.classList.contains("show")) {
    instructions.classList.add("hide");
    instructions.classList.remove("show");
  }
  if (questionContainer.classList.contains("hide")) {
    questionContainer.classList.add("show");
    questionContainer.classList.remove("hide");
  }
  timer.classList.add("show");
  timer.classList.remove("hide");
}

// This function is what counts the clock down by 1 second
function countDown() {
  //console.log("countdown"); //this console.log tests if the addEventListener is working. Used for debugging.
  setInterval(function () {
    // This if statement prevents the timer from counting below zero.
    if (timeLeft <= 0) {
      clearInterval((timeLeft = 0));
    }
    // this causes the countdown to decrement by one each second
    counter.innerHTML = timeLeft;
    timeLeft -= 1;
  }, 1000);
}

function saveToLocalStorage() {
  localStorage.setItem("initials", initialInput.value);
  localStorage.setItem("score", score.textContent);
}

// function getFromLocalStorage() {
//   let storedInitials = localStorage.getItem("initials");
//   let storedScore = localStorage.getItem("score");
// }

function addToHighscore() {
  // preventDefault prevents the form asking for user initials from submitting
  event.preventDefault();
  saveToLocalStorage();
  let storedInitials = localStorage.getItem("initials");
  let storedScore = localStorage.getItem("score");
  highScoreList.innerHTML =
    "<li>" + storedInitials + ": " + storedScore + "</li>";
}

// This function will show the high score container and hide the other containers
function viewHighScore() {
  highScoreContainer.classList.add("show");
  highScoreContainer.classList.remove("hide");
  if (start.classList.contains("show")) {
    start.classList.add("hide");
    start.classList.remove("show");
  }
  if (choices.classList.contains("show")) {
    choices.classList.add("hide");
    choices.classList.remove("show");
  }
  if (instructions.classList.contains("show")) {
    instructions.classList.add("hide");
    instructions.classList.remove("show");
  }
  if (questionContainer.classList.contains("show")) {
    questionContainer.classList.add("hide");
    questionContainer.classList.remove("show");
  }
  if (ending.classList.contains("show")) {
    ending.classList.add("hide");
    ending.classList.remove("show");
  }
  if (timer.classList.contains("show")) {
    timer.classList.add("hide");
    timer.classList.remove("show");
  }
}

function returnToStart() {
  start.classList.add("show");
  start.classList.remove("hide");
  instructions.classList.add("show");
  instructions.classList.remove("hide");
  if (highScoreContainer.classList.contains("show")) {
    highScoreContainer.classList.add("hide");
    highScoreContainer.classList.remove("show");
  }
  if (choices.classList.contains("show")) {
    choices.classList.add("hide");
    choices.classList.remove("show");
  }
  if (questionContainer.classList.contains("show")) {
    questionContainer.classList.add("hide");
    questionContainer.classList.remove("show");
  }
  if (ending.classList.contains("show")) {
    ending.classList.add("hide");
    ending.classList.remove("show");
  }
  if (timer.classList.contains("show")) {
    timer.classList.add("hide");
    timer.classList.remove("show");
  }
}

//To begin the quiz, this add Event will trigger
start.addEventListener("click", beginQuiz);
//This high score button allows the viewer to see the high score
highScoreBtn.addEventListener("click", viewHighScore);
//when user submits their score & initials, it will save high score to local storage
initialsBtn.addEventListener("click", addToHighscore);
//this button will return the user to the start screen from the high score screen
returnToStartBtn.addEventListener("click", returnToStart);
//this button will return the user to the start screen from the end screen
goBack.addEventListener("click", returnToStart);
//local storage saved values
// let storedInitials = localStorage.getItem("initials");
// let storedScore = localStorage.getItem("score");
