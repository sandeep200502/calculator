let display = document.getElementById('display');
let currentInput = '';

function appendNumber(num) {
  if (display.innerText === '0') display.innerText = num;
  else display.innerText += num;
}

function appendOperator(op) {
  display.innerText += op;
}

function appendFunction(func) {
  display.innerText += func;
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
  } catch (err) {
    display.innerText = 'Error';
  }
}

function convertValue() {
  let conversionType = document.getElementById('conversion').value;
  let value = parseFloat(display.innerText);
  
  if (isNaN(value)) {
    display.innerText = 'Error';
    return;
  }

  switch(conversionType) {
    case 'CtoF':
      display.innerText = (value * 9/5) + 32;
      break;
    case 'FtoC':
      display.innerText = (value - 32) * 5/9;
      break;
    case 'kmToMiles':
      display.innerText = (value * 0.621371).toFixed(5);
      break;
    case 'milesToKm':
      display.innerText = (value / 0.621371).toFixed(5);
      break;
  }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
  if (!isNaN(event.key)) {
    appendNumber(event.key);
  } else if (['+', '-', '*', '/', '.', '(', ')'].includes(event.key)) {
    appendOperator(event.key);
  } else if (event.key === 'Enter' || event.key === '=') {
    calculate();
  } else if (event.key === 'Backspace') {
    backspace();
  }
});
