let display = document.getElementById('display');
let extraOptions = document.getElementById('extra-options');
let currentInput = '';

function appendNumber(number) {
  if (display.innerText === '0') {
    display.innerText = number;
  } else {
    display.innerText += number;
  }
}

function appendOperator(operator) {
  display.innerText += operator;
}

function clearDisplay() {
  display.innerText = '0';
}

function backspace() {
  display.innerText = display.innerText.slice(0, -1) || '0';
}

function calculate() {
  try {
    display.innerText = eval(display.innerText);
  } catch (error) {
    display.innerText = 'Error';
  }
}

function toggleScientific() {
  extraOptions.classList.toggle('hidden');
}

function convertOptions() {
  extraOptions.classList.remove('hidden');
}

function convert(type) {
  let value = parseFloat(display.innerText);
  if (isNaN(value)) {
    display.innerText = 'Error';
    return;
  }

  if (type === 'CtoF') {
    display.innerText = (value * 9/5) + 32;
  } else if (type === 'kmToMiles') {
    display.innerText = (value * 0.621371).toFixed(5);
  }
}
