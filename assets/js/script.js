let value = 0;
let _x = 0;
let _y = 0;
let _operator;
let result = 0;

const buttons = document.querySelectorAll("button");
const displayMainText = document.querySelector(".display h3");
const displayPrevText = document.querySelector(".display p");
const numButtons = document.querySelectorAll(".numbers button");
const operatorButtons = document.querySelectorAll(".sidebar button");
const equalsBtn = document.querySelector("button.equals");
const clearBtn = document.querySelector("button.clear");

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

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
numButtons.forEach(btn => btn.addEventListener("click", clickedNum));
operatorButtons.forEach(btn => btn.addEventListener("click", clickedOperator));
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
        displayPrevText.textContent = displayPrevText.textContent.slice(0, displayPrevText.textContent.length);
        return;
    }
    displayPrevText.textContent += `${_y} `;
    operate(_operator, _x, _y);
}

function clickedNum(e) {
    let isDecimal = displayMainText.textContent.includes(".") && this.classList.contains("decimal");
    if (this.classList.contains("equals") || isDecimal) return;
    
    value = e.srcElement.textContent.trim();
    let mainText = displayMainText.textContent;
    if (mainText == 0 && !mainText.includes(".") && value != ".") displayMainText.textContent = value;
    else displayMainText.textContent += value;
    value = displayMainText.textContent;
}

function clickedOperator(e) {
    _operator = e.srcElement.textContent.trim();
    _x = Number(value);
    value = 0;
    displayMainText.textContent = value;
    displayPrevText.textContent += `${_x} ${_operator} `;
}

function buttonClicked(e) {
    let isDecimal = displayMainText.textContent.includes(".") && this.classList.contains("decimal");
    if (this.classList.contains("equals") || isDecimal) return;
    this.classList.add("clicked");
}

function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("clicked");
}