const btns = document.querySelectorAll("button");
const display = document.querySelector("#display");








// Basic arithmetic functions

const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    return a / b;
}

let firstNum;
let secondNum;
let operator;

const operate = () => {
    return operator(firstNum, secondNum);
}


const clickBtn = (e) => {
    console.log(e.target.id);
}



btns.forEach(btn => addEventListener("click", (e) => clickBtn(e)));