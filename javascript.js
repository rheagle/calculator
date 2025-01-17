
const buttonsContainer = document.getElementById("buttons-container");

//create display element
const display = document.createElement("div");
display.style.height = "25px";
display.style.width = "150px";
display.style.border = "2px solid black";
display.style.backgroundColor = "lightGrey";
display.style.fontSize = "20px";
buttonsContainer.appendChild(display);

//create divs for number and operator buttons
const numbersContainer = document.createElement("div");
const operatorsContainer = document.createElement("div");
const otherContainer = document.createElement("div");
buttonsContainer.appendChild(numbersContainer);
buttonsContainer.appendChild(operatorsContainer);
buttonsContainer.appendChild(otherContainer);

//create number buttons & make them functional
const numberValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
numberValues.forEach((numb) => {
    const newNumBtn = document.createElement("button");
    newNumBtn.textContent = numb;
    newNumBtn.onclick = () => addToDisplay(numb);
    numbersContainer.appendChild(newNumBtn);
}); 

//create operator buttons & make them functional & store operator value
const operatorArray = ["+", "-", "*", "/"];
operatorArray.forEach((oper) => {
        const newOperBtn = document.createElement("button");
        newOperBtn.textContent = oper;
        newOperBtn.onclick = () => {
            addToDisplay(oper);
            operator = oper; }
        operatorsContainer.appendChild(newOperBtn);
});

//create = button
const equals = document.createElement("button");
equals.textContent = "=";
otherContainer.appendChild(equals);

//create "." button to let users input decimals
const decimal = document.createElement("button");
decimal.textContent = ".";
otherContainer.appendChild(decimal);
decimal.onclick = () => addToDisplay(".");

//create clear button and make it functional
const clear = document.createElement("button");
clear.textContent = "clear";
buttonsContainer.appendChild(clear);
clear.addEventListener("click", () => {
    display.textContent = "";
    displayString = "";
});

//create delete button
const deleteButton = document.createElement("button");
deleteButton.textContent = "delete";
buttonsContainer.appendChild(deleteButton);
deleteButton.onclick = () => {
    removeFromDisplay(displayString);
    updateDisplay();
}

//functions for display
let displayString = "";

function addToDisplay(character) {
    displayString += character;
    updateDisplay();
}

function updateDisplay() {
    display.textContent = displayString;
}

function removeFromDisplay(str) {
    displayString = str.slice(0, -1);
}

//add keyboard support
document.addEventListener("keydown", (inEvent) => {
    const key = inEvent.key; //get the key pressed
    //handle number keys
    if (!isNaN(key)) { //check if key is a number
        addToDisplay(key);
    }
    //handle operators
    else if (["+", "-", "*", "/"].includes(key)) {
        addToDisplay(key);
        operator = key; //store operator
    }
    //handle decimal 
    else if (key === ".") {
        addToDisplay(".");
    }
    //handle enter key for =
    else if (key === "Enter" || key === "=") {
        equals.click(); //trigger equals button's click event
    }
    //handle backspace key for delete
    else if (key === "Backspace") {
        deleteButton.click(); //trigger delete button's click event
    }
    //handle esc button for clear
    else if (key === "Escape") {
        clear.click(); //trigger clear button's click event
    }
});

//split displayString to assign values to num1 and num2 variables
function splitString() {
    const operatorIndex = displayString.search(/[+-/*]/);

    if (operatorIndex !== -1) {
        num1 = displayString.slice(0, operatorIndex);
        num2 = displayString.slice(operatorIndex + 1);
    } else {
        num1 = displayString;
    }
    num1 = Number(num1);
    num2 = Number(num2);
    }


//functions for each mathematical operation
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
        return "error."
    }
    return a / b;
}

//define variables for calculation
let num1 = "";
let operator = "";
let num2 = "";

//function to show result in display
function displayResult(answer) {
    display.textContent = answer;
}

//function to perform operation indicated by user input
const operate = function(c, a, b) {
    let result;
    if (c == "+") {
        result = add(a, b);
    } else if (c == "-") {
        result = subtract(a, b);
    } else if (c == "*") {
        result = multiply(a, b);
    } else if (c == "/") {
        result = divide(a, b);
    }
    displayResult(result);

}

//run operation
/*equals.onclick = () => {
    splitString();
    operate(operator, num1, num2);
}*/

// Modify the equals button's onclick to evaluate the full displayString
equals.onclick = () => {
    try {
        // Safely evaluate the displayString
        const result = Function(`"use strict"; return (${displayString})`)();
        displayResult(result);
        displayString = result.toString(); // Allow chaining operations
    } catch (error) {
        displayResult("Error"); // Handle invalid input
        displayString = ""; // Clear invalid expression
    }
};

