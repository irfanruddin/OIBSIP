// Display Elements
const previousOperandElement = document.getElementById("previousOperand");
const currentOperandElement = document.getElementById("currentOperand");

// Calculator Variables
let currentOperand = "0";
let previousOperand = "";
let operator = null;
let currentOperandEntered = false;

// Update Display
function updateDisplay() {
  currentOperandElement.textContent = currentOperand;

  previousOperandElement.textContent =
    operator !== null ? `${previousOperand} ${operator}` : "";
}

// Number Input
function appendNumber(number) {
  if (currentOperand === "Error") {
    clearCalculator();
  }

  currentOperandEntered = true;

  if (currentOperand === "0") {
    currentOperand = number;
  } else {
    currentOperand += number;
  }

  updateDisplay();
}

// Decimal Input
function appendDecimal() {
  if (currentOperand === "Error") {
    clearCalculator();
  }

  currentOperandEntered = true;

  if (!currentOperand.includes(".")) {
    currentOperand += ".";
  }

  updateDisplay();
}

// Clear Calculator
function clearCalculator() {
  currentOperand = "0";
  previousOperand = "";
  operator = null;
  currentOperandEntered = false;

  updateDisplay();
}

// Delete Last Character
function deleteNumber() {
  if (currentOperand === "Error") {
    clearCalculator();
    return;
  }

  currentOperand =
    currentOperand.length > 1 ? currentOperand.slice(0, -1) : "0";

  if (currentOperand === "-") {
    currentOperand = "0";
  }

  updateDisplay();
}

// Select Operator
function chooseOperator(selectedOperator) {
  if (currentOperand === "Error") return;

  if (operator === null && !currentOperandEntered) {
    return;
  }

  if (operator !== null && !currentOperandEntered) {
    operator = selectedOperator;
    updateDisplay();
    return;
  }

  if (operator !== null) {
    calculate();
  }

  if (currentOperand === "Error") return;

  previousOperand = currentOperand;
  currentOperand = "0";
  operator = selectedOperator;
  currentOperandEntered = false;

  updateDisplay();
}

// Calculate Result
function calculate() {
  if (
    operator === null ||
    previousOperand === "" ||
    currentOperand === "Error"
  ) {
    return;
  }

  const firstNumber = parseFloat(previousOperand);
  const secondNumber = parseFloat(currentOperand);

  let result;

  switch (operator) {
    case "+":
      result = firstNumber + secondNumber;
      break;

    case "-":
      result = firstNumber - secondNumber;
      break;

    case "×":
      result = firstNumber * secondNumber;
      break;

    case "÷":
      if (secondNumber === 0) {
        currentOperand = "Error";
        previousOperand = "";
        operator = null;
        currentOperandEntered = false;
        updateDisplay();
        return;
      }

      result = firstNumber / secondNumber;
      break;

    case "%":
      if (secondNumber === 0) {
        currentOperand = "Error";
        previousOperand = "";
        operator = null;
        currentOperandEntered = false;
        updateDisplay();
        return;
      }

      result = firstNumber % secondNumber;
      break;

    default:
      return;
  }

  currentOperand = String(Number(result.toFixed(10)));

  previousOperand = "";
  operator = null;
  currentOperandEntered = true;

  updateDisplay();
}

// Number Buttons
document.querySelectorAll("[data-number]").forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.dataset.number);
  });
});

// Operator Buttons
document.querySelectorAll("[data-operator]").forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperator(button.dataset.operator);
  });
});

// Special Buttons
document
  .querySelector('[data-action="clear"]')
  .addEventListener("click", clearCalculator);

document
  .querySelector('[data-action="delete"]')
  .addEventListener("click", deleteNumber);

document
  .querySelector('[data-action="decimal"]')
  .addEventListener("click", appendDecimal);

document
  .querySelector('[data-action="calculate"]')
  .addEventListener("click", calculate);

// Initial Display
updateDisplay();

// Keyboard Support
document.addEventListener("keydown", (event) => {
  const key = event.key;

  // Number keys
  if (/^[0-9]$/.test(key)) {
    appendNumber(key);
  }

  // Decimal
  else if (key === ".") {
    appendDecimal();
  }

  // Operators
  else if (["+", "-", "*", "/", "%"].includes(key)) {
    const operatorMap = {
      "+": "+",
      "-": "-",
      "*": "×",
      "/": "÷",
      "%": "%",
    };

    chooseOperator(operatorMap[key]);
  }

  // Calculate
  else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculate();
  }

  // Delete last character
  else if (key === "Backspace") {
    deleteNumber();
  }

  // Clear calculator
  else if (key === "Escape") {
    clearCalculator();
  }
});
