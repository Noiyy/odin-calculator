let value = 0;
let _x = 0;
let _y = 0;
let _operator;
let result = 0;
let previousValue = "";

const buttons = document.querySelectorAll("button");
const displayMainText = document.querySelector(".display h3");
const displayPrevText = document.querySelector(".display p");
const numButtons = document.querySelectorAll(".numbers button");
const operatorButtons = document.querySelectorAll(".sidebar button");
const equalsBtn = document.querySelector("button.equals");
const clearBtn = document.querySelector("button.clear");

function add(x, y) {
    return x + y;
}
function subtract(x, y) {
    return x - y;
}
function multiply(x, y) {
    return x * y;
}
function divide(x, y) {
    return x / y;
}

function operate(operator, x, y) {
    if (!result) displayPrevText.textContent += "=";
    switch (operator) {
        case "+":
            result = Math.round( add(x, y) * 100) / 100;
            break;
        case "-":
            result = Math.round( subtract(x, y) * 100) / 100;
            break;
        case "x":
            result = Math.round( multiply(x, y) * 100) / 100;
            break;
        case "/":
            result = Math.round( divide(x, y) * 100) / 100;
            break;
    }
    displayMainText.textContent = result;
}

buttons.forEach(btn => {
    btn.addEventListener("click", buttonClicked);
    btn.addEventListener("transitionend", removeTransition);
});
numButtons.forEach(btn => {
    btn.addEventListener("click", clickedNum);
});
operatorButtons.forEach(btn => {
    btn.addEventListener("click", clickedOperator);
});
equalsBtn.addEventListener("click", clickedEquals);
clearBtn.addEventListener("click", clearCalculator);

function clearCalculator() {
    value = _x = _y = result = 0;
    _operator = null;
    displayMainText.textContent = 0;
    displayPrevText.textContent = "";
}

function clickedEquals() {
    if (!_x && !_y && !_operator) return;
    _y = Number(value);
    if (_y == 0 && _operator == "/") {
        alert("You cannot divide by zero!");
        displayPrevText.textContent = displayPrevText.textContent.slice(0, displayPrevText.textContent.length-1);
        return;
    }
    operate(_operator, _x, _y);
}

function clickedNum(e) {
    if (this.classList.contains("equals")) return;
    value = e.srcElement.textContent.trim();
    if (displayMainText.textContent == 0) displayMainText.textContent = value;
    else displayMainText.textContent += value;
    value = displayMainText.textContent;
}

function clickedOperator(e) {
    _operator = e.srcElement.textContent.trim();
    _x = Number(value);
    value = 0;
    displayMainText.textContent = value;
}

function buttonClicked(e) {
    this.classList.add("clicked");
    if (this.classList.contains("equals")) return;
    displayPrevText.textContent += e.srcElement.textContent.trim();
}

function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("clicked");
}