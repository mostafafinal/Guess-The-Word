// Setting The Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Create By Final`;

// Setting Game Options
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;

// Manage Words
let guessWord = "";
const words = ["elzero", "create", "branch", "append", "manage"];
guessWord = words[Math.trunc(Math.random() * words.length)];
console.log(guessWord);

function generateinputs() {
  const inputsContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numberOfTries; i++) {
    // Creating Each Try Container
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    // Disabled Tries
    if (i !== 1) {
      tryDiv.classList.add("disabled-inputs");
    }

    // Creating Each Try inputs
    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");

      tryDiv.appendChild(input);
    }
    inputsContainer.appendChild(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();
  // Setting Inputs Navigation

  // Disabling All Disabled Inputs From Being Navigated
  const allDisabledInputs = document.querySelectorAll(".disabled-inputs input");
  allDisabledInputs.forEach((input) => (input.disabled = true));

  // Converting All Inputs' Value To Upper Case
  const allInputs = document.querySelectorAll("input");
  allInputs.forEach((input) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
    });
    // Setting Inputs Key Navigation
    input.addEventListener("keydown", function (event) {
      // Getting Each Input Index
      const currentInputIndex = Array.from(allInputs).indexOf(event.target);
      // Next Field Focus
      if (event.key === "ArrowRight") {
        const nextInput = currentInputIndex + 1;
        if (nextInput < allInputs.length) allInputs[nextInput].focus();
      }
      // Previous Field Focus
      if (event.key === "ArrowLeft") {
        const previousInput = currentInputIndex - 1;
        if (previousInput >= 0) allInputs[previousInput].focus();
      }
    });
  });
}

// Handle Check Button
const checkWord = document.querySelector(".check");
checkWord.addEventListener("click", handleWord);

function handleWord() {
  // inputfield word iteration
  for (let i = 1; i <= numberOfLetters; i++) {
    let inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
    let successGuess = true;
    let letter = inputField.value.toLowerCase();
    let correetLetter = guessWord[i - 1];
    // Game Logic
    if (letter === correetLetter) {
      inputField.classList.add("yes-in-place");
    } else if (guessWord.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }
}

window.onload = function () {
  generateinputs();
};
