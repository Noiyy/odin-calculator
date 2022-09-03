let value = 0;
let _x = 0;
let _y = 0;
let _operator;

const buttons = document.querySelectorAll("button");
const displayText = document.querySelector(".display p");
const numButtons = document.querySelectorAll(".numbers button");
const operatorButtons = document.querySelectorAll(".sidebar button");
const equalsBtn = document.querySelector("button.equals");

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
    switch (operator) {
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "x":
            return multiply(x, y);
        case "/":
            return divide(x, y);
    }
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

function clickedNum(e) {
    if (this.classList.contains("equals")) return;
    value = e.srcElement.textContent;
    if (displayText.textContent == 0)
        displayText.textContent = value;
    else
        displayText.textContent += value;
}

function clickedOperator(e) {
    _operator = e.srcElement.textContent;
    console.log(_operator);
}

function buttonClicked() {
    this.classList.add("clicked");
}

function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("clicked");
}