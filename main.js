// Setting The Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Create By Final`;

// Setting Game Options
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;

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
window.onload = function () {
  generateinputs();
};
