let value, _x, _y, result = 0;
let _operator, btn;
let doneCalc = false;

const buttons = document.querySelectorAll("button");
const displayMainText = document.querySelector(".display h3");
const displayPrevText = document.querySelector(".display p");
const numButtons = document.querySelectorAll(".numbers button");
const operatorButtons = document.querySelectorAll(".sidebar button");
const equalsBtn = document.querySelector("button.equals");
const clearBtn = document.querySelector("button.clear");
const deleteBtn = document.querySelector("button.delete");

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

function operate(operator, x, y) {
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
deleteBtn.addEventListener("click", deleteInput);
window.addEventListener("keydown", pressInput);

function pressInput(e) {
    btn = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if (e.keyCode == 13) btn = document.querySelector("button.equals");
    if (!btn) return;
    const btnType = btn.parentElement.parentElement;
    buttonClicked(e, btn);

    if (btnType.className == "numbers") {
        if (btn.classList.contains("equals")) clickedEquals();
        else clickedNum(e, btn);
    } else if (btnType.className == "optionsContainer") clickedOperator(e, btn);
    else if (btnType.id == "calculator") {
        if (btn.classList.contains("clear")) clearCalculator();
        if (btn.classList.contains("delete")) deleteInput();
    }
}

function deleteInput() {
    if (displayMainText.textContent != 0 && !result) {
        displayMainText.textContent = displayMainText.textContent.slice(0, displayMainText.textContent.length-1);
        if (!displayMainText.textContent) displayMainText.textContent = 0;
        value = Number(displayMainText.textContent);
    }
}

function clearCalculator() {
    value = _x = _y = result = 0;
    _operator = null;
    displayMainText.textContent = 0;
    displayPrevText.textContent = "";
}

function clickedEquals() {
    if (!_x && !_y && !_operator || displayPrevText.textContent.includes("=")) return;
    _y = Number(value);
    if (_y == 0 && _operator == "/") {
        alert("You cannot divide by zero!");
        displayPrevText.textContent = displayPrevText.textContent.slice(0, displayPrevText.textContent.length);
        return;
    }
    displayPrevText.textContent += `${_y} =`;
    operate(_operator, _x, _y);
}

function clickedNum(e, button) {
    const btnClass = button ? button.classList : this.classList;
    let isDecimal = displayMainText.textContent.includes(".") && btnClass.contains("decimal");
    if (btnClass.contains("equals") || displayPrevText.textContent.includes("=") || isDecimal) return;
    
    value = button ? button.textContent.trim() : e.srcElement.textContent.trim();
    let mainText = displayMainText.textContent;
    if (mainText == 0 && !mainText.includes(".") && value != "." || doneCalc) {
        displayMainText.textContent = value;
        doneCalc = false;
    } else displayMainText.textContent += value;
    value = displayMainText.textContent;
}

function clickedOperator(e, button) {
    if (displayPrevText.textContent.includes("=")) return;  
    if (_operator) {
        _y = Number(value);
        operate(_operator, _x, _y);
        _operator = button ? button.textContent.trim() : e.srcElement.textContent.trim();
        displayPrevText.textContent += `${_y} ${_operator} `;

        _x = result;
        value = _y = result = 0;
        doneCalc = true;

    } else {
        _operator = button ? button.textContent.trim() : e.srcElement.textContent.trim();
        if (_x) _y = Number(value);
        else _x = Number(value);
        displayMainText.textContent = value = 0;
        displayPrevText.textContent += `${_x} ${_operator} `;
    }
}

function buttonClicked(e, button) {
    let isDecimal = button ? displayMainText.textContent.includes(".") && button.classList.contains("decimal")
    : displayMainText.textContent.includes(".") && this.classList.contains("decimal");
    if (displayPrevText.textContent.includes("=") || isDecimal) return;
    if (button) button.classList.add("clicked");
    else this.classList.add("clicked");
}

function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("clicked");
}