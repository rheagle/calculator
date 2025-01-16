

const add = function(a, b) {
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const multiply = function(a, b) {
    return a * b;
}

const divide = function(a, b) {
    if (b === 0) {
        return "Divide by zero error."
    }
    return a / b;
}

const num1 = 6;
const operator = "/";
const num2 = 3;

const operate = function(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);    
        default:
            return "Invalid operator";
    }
}

const result = operate(operator, num1, num2);
console.log(result);

const buttonsContainer = document.getElementById("buttons-container");
const display = document.createElement("div");
display.style.height = "25px";
display.style.width = "150px";
display.style.border = "2px solid black";
display.style.backgroundColor = "lightGrey";
display.style.fontSize = "20px";
buttonsContainer.appendChild(display);


const numbersContainer = document.createElement("div");
const operatorsContainer = document.createElement("div");
buttonsContainer.appendChild(numbersContainer);
buttonsContainer.appendChild(operatorsContainer);

//for (let i = 0; i <= 9; i++)
const numberValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
numberValues.forEach((numb) => {
    const newNumBtn = document.createElement("button");
    newNumBtn.textContent = numb;
    //newNumBtn.id = `button${i}`;
    newNumBtn.onclick = () => addToDisplay(numb);
    numbersContainer.appendChild(newNumBtn);
}); 

const operatorArray = ["+", "-", "*", "/", "="];
operatorArray.forEach((oper) => {
   // (let i = 0; i < operatorArray.length; i++) {
        const newOperBtn = document.createElement("button");
        newOperBtn.textContent = oper;
        newOperBtn.onclick = () => addToDisplay(oper);
        operatorsContainer.appendChild(newOperBtn);
});


const clear = document.createElement("button");
clear.textContent = "clear";
buttonsContainer.appendChild(clear);

//const operatorChosen = false;
let displayString = "";

function addToDisplay(character) {
    displayString += character;
    updateDisplay();
}

function updateDisplay() {
    display.textContent = displayString;
}

