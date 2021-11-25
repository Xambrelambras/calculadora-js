'use strict';

const display = document.getElementById('display');
const numbers = document.querySelectorAll('[id*=Key]');
const operators = document.querySelectorAll('[id*=Operator]');

let newNumber = true;
let oldNumber;
let operator;

const calculate = () => {
  if (operator != undefined) {
    const currentNumber = parseFloat(display.textContent);
    newNumber = true;

    const result = eval(`${oldNumber}${operator}${currentNumber}`);
    updateDisplay(result);
  }
}

const updateDisplay = (text) => {
  if (newNumber) {
    display.textContent = text;
    newNumber = false;
  } else {
    display.textContent += text;
  }
}

/* --- NUMBERS --- */
const insertNumber = (event) => {
  updateDisplay(event.target.textContent);
}

numbers.forEach((number) => {
  number.addEventListener('click', insertNumber);
});

/* --- OPERATORS --- */
const selectOperator = (event) => {
  if (!newNumber) {
    calculate();
    newNumber = true;
    operator = event.target.textContent;
    oldNumber = parseFloat(display.textContent);
  }
}

operators.forEach((operator) => {
  operator.addEventListener('click', selectOperator);
});

/* --- EQUAL --- */
const activateEqual = () => {
  calculate();
  operator = undefined;
}

document.getElementById('equal').addEventListener('click', activateEqual);

/* --- CLEAR DISPLAY --- */
const clearDisplay = () => {
  display.textContent = '';
}

document.getElementById('cancelEntry').addEventListener('click', clearDisplay);

/* --- CANCEL ENTRY --- */
const clearCalculate = () => {
  clearDisplay();
  operator = undefined;
  oldNumber = undefined;
  newNumber = true;
}

document.getElementById('clearCalculate').addEventListener('click', clearCalculate);

/* --- BACKSPACE --- */
const removeLastNumber = () => {
  display.textContent = display.textContent.slice(0, -1);
}

document.getElementById('backspace').addEventListener('click', removeLastNumber);

/* --- REVERSE SIGN --- */
const reverseSign = () => {
  newNumber = true;
  updateDisplay(display.textContent * -1);
}

document.getElementById('reverse').addEventListener('click', reverseSign);

/* --- DECIMAL --- */
const insertDecimal = () => {
  if (!display.textContent.includes('.')) {
    if (display.textContent != '') {
      updateDisplay('.');
    } else {
      updateDisplay('0.');
    }
  }
}

document.getElementById('decimal').addEventListener('click', insertDecimal);

/* --- MAP KEYS --- */
const mapKeys = {
  '0': '0Key',
  '1': '1Key',
  '2': '2Key',
  '3': '3Key',
  '4': '4Key',
  '5': '5Key',
  '6': '6Key',
  '7': '7Key',
  '8': '8Key',
  '9': '9Key',
  '+': 'additionOperator',
  '-': 'subtractionOperator',
  '*': 'multiplicationOperator',
  '/': 'divisionOperator',
  '.': 'decimal',
  ',': 'decimal',
  'c': 'cancelEntry',
  'Enter': 'equal',
  'Backspace': 'backspace',
  'Escape': 'clearCalculate',
}

const mapKeyboard = (event) => {
  const key = event.key;

  const allowedKey = () => Object.keys(mapKeys).includes(key);

  if (allowedKey()) document.getElementById(mapKeys[key]).click();
}

document.addEventListener('keydown', mapKeyboard);
