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
    const newNum = parseInt(btn);
    (firstNum === undefined) ? firstNum = newNum :
    (operator === undefined) ? firstNum = firstNum * 10 + newNum :
    (secondNum === undefined) ? secondNum = newNum :
    secondNum = secondNum * 10 + newNum;
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
    firstNum = firstNum + ".";
};

const completeEquation = () => {
    console.log(operate());
};

const clearCalc = () => {
    console.log("The calculator has been cleared");
};

const clickBtn = (e) => {
    const btnPressed = e.target.id;
    switch (btnPressed) {
        case "1" : case "2" : case "3" : case "4" : case "5" : case "6" : case "7" : case "8" : case "9" : case "0" :
            updateCurrentNum(btnPressed);
            break;
        case "add" :
        case "subtract" :
        case "multiply" :
        case "divide" :
            updateCurrentOperator(btnPressed);
            break;
        case "point" :
            decimal();
            break;
        case "equals" :
            completeEquation();
            break;
        case "clear" :
            clearCalc();
            break;
        default :
            console.log("ERROR");
            break;
    }
};



btns.forEach(btn => btn.addEventListener("click", (e) => clickBtn(e)));