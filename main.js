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


//Variables
let firstNum;
let secondNum;
let operator;
let operatorSymbol;
let currentEquation;
let currentlyOperating = false;
let readyToClear = false;
let oneDec = false;
let twoDec = false;

const updateOutput = () => {
    output.textContent = "";
    if (currentlyOperating === false) {
        (operator === undefined && secondNum === undefined) ? currentEquation = `${firstNum}` :
        (secondNum === undefined) ? currentEquation = `${firstNum} ${operatorSymbol}` :
        currentEquation = `${firstNum} ${operatorSymbol} ${secondNum}`;
        output.textContent = currentEquation;
    } else {
        output.textContent = currentEquation;
        firstNum = currentEquation;
        currentlyOperating = false;
    }
}




//actual calculator
const operate = () => {
    currentEquation = operator(Number(firstNum), Number(secondNum));
    currentlyOperating = true;
    updateOutput();
    readyToClear = true;
    secondNum = undefined;
};

//press number button
const updateCurrentNum = (btn) => {
    if (readyToClear === false) {
        let newNum;
        newNum = btn;
        (firstNum === undefined) ? firstNum = newNum :
        (operator === undefined) ? firstNum += newNum :
        (secondNum === undefined) ? secondNum = newNum :
        secondNum += newNum;
    } else {
        clearCalc();
        readyToClear = false;
        updateCurrentNum(btn);
    }
    
    updateOutput();
};


//press operator
const updateCurrentOperator = (btn) => {
    readyToClear = false;
    switch (btn) {
        case ("add") :
            operator = add;
            operatorSymbol = "+";
            break;
        case ("subtract") :
            operator = subtract;
            operatorSymbol = "-";
            break;
        case ("multiply") :
            operator = multiply;
            operatorSymbol = "x"
            break;
        case ("divide") :
            operator = divide;
            operatorSymbol = "/";
            break;
    }
    secondNum = undefined;
    updateOutput();
};

const doNothing = () => {
    
}


const decimal = () => {
    (firstNum === undefined) ? (
        firstNum = "0.",
        oneDec = true
    ) : (operator === undefined && oneDec === false) ? (
        firstNum = firstNum + ".",
        oneDec = true,
        console.log(oneDec)
    ) : (secondNum === undefined && operator !== undefined) ? (
        secondNum = "0.",
        twoDec = true
    ) : (twoDec === false && operator !== undefined) ? (
        secondNum = secondNum + ".",
        twoDec = true
    ) : doNothing();
    updateOutput();
};

const clearCalc = () => {
    output.textContent = "0"
    firstNum = undefined;
    secondNum = undefined;
    operator = undefined;
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
            operate();
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