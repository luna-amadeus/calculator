const btns = document.querySelectorAll("button");
const display = document.querySelector("#display");
const output = document.querySelector("#output");








// Basic arithmetic functions

const add = (a, b) => {
    return a + b;
};

const subtract = (a, b) => {
    return a - b;
};

const multiply = (a, b) => {
    return a * b;
};

const divide = (a, b) => {
    return a / b;
};

let firstNum;
let secondNum;
let operator;
let currentNum = "firstNum";

const operate = () => {
    return operator(firstNum, secondNum);
};

const updateCurrentNum = (btn) => {
    firstNum = btn;
    secondNum = btn;
    console.log(firstNum);
};

const updateCurrentOperator = (btn) => {
    switch (btn) {
        case ("add") :
            operator = add;
            break;
        case ("subtract") :
            operator = subtract;
            break;
        case ("multiply") :
            operator = multiply;
            break;
        case ("divide") :
            operator = divide;
            break;
    }
};

const decimal = () => {
    firstNum += ".";
};

const completeEquation = () => {
    operate();
};

const clearCalc = () => {
    console.log("The calculator has been cleared");
};

const clickBtn = (e) => {
    const btnPressed = e.target.id;
    switch (btnPressed) {
        case "add" :
        case "subtract" :
        case "multiply" :
        case "divide" :
            updateCurrentOperator(btnPressed);
            break;
    }
};



btns.forEach(btn => addEventListener("click", (e) => clickBtn(e)));