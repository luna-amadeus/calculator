const btns = document.querySelectorAll("button");
const display = document.querySelector("#display");
const output = document.querySelector("#output");
const zeroBox = document.querySelector("#zerowarningbox");








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
let triedZeroDiv = false;

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

const divideByZeroCheck = () => {
    if (operator === divide && secondNum === "0" && triedZeroDiv === false) {
        clearCalc();
        btns.forEach(btn => {
            btn.style.display = "none";
        })
        display.style.display = "none";
        const zeroWarning = document.createElement("h1");
        const promiseBtn = document.createElement("button");
        promiseBtn.textContent = "I promise";
        zeroWarning.textContent = "PROMISE YOU WON'T DO THAT AGAIN.";
        zeroBox.appendChild(zeroWarning);
        zeroBox.appendChild(promiseBtn);
        promiseBtn.addEventListener("click", (e) => {
            zeroBox.removeChild(zeroWarning);
            btns.forEach(btn => btn.style.display = "inline-block");
            display.style.display = "block";
            zeroBox.removeChild(promiseBtn);
            clearCalc();
            promiseBtn.removeEventListener("click", (e));
        })
        triedZeroDiv = true;
    } else if (operator === divide && secondNum === "0" && triedZeroDiv === true) {
        btns.forEach(btn => {
            btn.style.display = "none";
        })
        display.style.display = "none";
        const banned = document.createElement("h1");
        banned.textContent = "You have been banned from using calculator.";
        zeroBox.appendChild(banned);
    }
}


//actual calculator
const operate = () => {
    decimalCheck();
    divideByZeroCheck();
    if (secondNum !== undefined && secondNum !== "-") {
        currentEquation = operator(Number(firstNum), Number(secondNum));
        currentlyOperating = true;
        updateOutput();
        readyToClear = true;
        secondNum = undefined;
        operator = undefined;
    } else if (secondNum === undefined && operator !== undefined) {
        secondNum = firstNum;
        operate();
    }
};

//press number button
const updateCurrentNum = (btn) => {
    if (btn === "0" && (firstNum === "0" || firstNum === "0." || secondNum === "0" || secondNum === "0.")) {
        doNothing();
    } else {
        if (readyToClear === false) {
            let newNum;
            newNum = btn;
            (firstNum === undefined || firstNum === "0") ? firstNum = newNum :
            (operator === undefined) ? firstNum += newNum :
            (secondNum === undefined || secondNum === "0") ? secondNum = newNum :
            secondNum += newNum;
        } else {
            clearCalc();
            readyToClear = false;
            updateCurrentNum(btn);
        }
        
        updateOutput();
    }
};

const decimalCheck = () => {
    if (oneDec === true && firstNum.at(-1) === ".") {
        firstNum = firstNum.slice(0, -1);
        updateOutput();
    }
    if (twoDec === true && secondNum.at(-1) === ".") {
        secondNum = secondNum.slice(0, -1);
        updateOutput();
    }
}

const makeNegative = (num) => {
    (num === "first") ? firstNum = "-" : (num === "second") ? secondNum = "-" : doNothing();
    updateOutput();
}

const makePositive = (num => {
    (num === "first") ? firstNum = "" : (num === "second") ? secondNum = "" : doNothing();
    updateOutput();
})

//press operator
const updateCurrentOperator = (btn) => {
    decimalCheck();
    if (operator === undefined) {
        readyToClear = false;
        switch (btn) {
            case ("add") :
                if (firstNum === "-") {
                    makePositive(first);
                } else {
                    operator = add;
                    operatorSymbol = "+";
                }
                break;
            case ("subtract") :
                if (firstNum !== undefined && operator === undefined) {
                    operator = subtract;
                    operatorSymbol = "-";
                } else if (firstNum === undefined) {
                    makeNegative("first");
                }
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
    } else if (secondNum === undefined && btn === "subtract") {
        makeNegative("second");
    } else if (secondNum === undefined && btn !== "subtract") {
        operator = undefined;
        updateCurrentOperator(btn);
    } else if (secondNum === "-") {
        if (btn === "add") {
            makePositive("second");
        } else {
        doNothing();
        }
    } else {
        operate();
        updateCurrentOperator(btn);
    }
};

const doNothing = () => {
    
}


const decimal = () => {
    if (readyToClear === false) {
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
    } else {
        clearCalc();
        readyToClear = false;
        decimal();
    }
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