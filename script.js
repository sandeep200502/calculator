let display = document.getElementById('display');
let historyDropdown = document.getElementById('history');
let historyList = [];
let pendingCloseBracket = false;
let openBracketCount = 0;
let closeBracketCount = 0;

function updateBracketCounter() {
  document.getElementById('open-count').innerText = `Opened: ${openBracketCount}`;
  document.getElementById('close-count').innerText = `Closed: ${closeBracketCount}`;
}

function appendNumber(num) {
  if (display.innerText === '0') display.innerText = '';
  handleImplicitMultiplication();
  display.innerText += num;
}

function appendOperator(op) {
  if (display.innerText === '0') return;

  let lastChar = display.innerText.slice(-1);

  // If last char is operator, replace it
  if (['+', '-', '*', '/'].includes(lastChar)) {
    display.innerText = display.innerText.slice(0, -1) + op;
  } else {
    display.innerText += op;
  }
}

function appendBracket(bracket) {
  if (bracket === '(') {
    if (display.innerText === '0') display.innerText = '';
    let lastChar = display.innerText.slice(-1);

    // If last is a number or ), insert multiplication before (
    if (!isNaN(lastChar) || lastChar === ')') {
      display.innerText += '*';
    }

    display.innerText += '(';
    pendingCloseBracket = true;
    openBracketCount++;
    updateBracketCounter();
  } else if (bracket === ')' && pendingCloseBracket) {
    confirmPendingBracket();
  }
}

function confirmPendingBracket() {
  let openBrackets = (display.innerText.match(/\(/g) || []).length;
  let closeBrackets = (display.innerText.match(/\)/g) || []).length;

  if (openBrackets > closeBrackets) {
    display.innerText += ')';
    closeBracketCount++;
    updateBracketCounter();
    pendingCloseBracket = false;
  }
}

function clearDisplay() {
  display.innerText = '0';
  pendingCloseBracket = false;
  openBracketCount = 0;
  closeBracketCount = 0;
  updateBracketCounter();
}

function backspace() {
  if (display.innerText.length === 1) {
    clearDisplay();
    return;
  }
  
  let lastChar = display.innerText.slice(-1);

  if (lastChar === '(') {
    openBracketCount--;
  } else if (lastChar === ')') {
    closeBracketCount--;
  }
  
  display.innerText = display.innerText.slice(0, -1);
  updateBracketCounter();
}

function calculate() {
  try {
    let expression = display.innerText;

    // Ensure brackets are balanced
    let openBrackets = (expression.match(/\(/g) || []).length;
    let closeBrackets = (expression.match(/\)/g) || []).length;

    if (openBrackets !== closeBrackets) {
      alert("Mismatch in brackets!");
      return;
    }

    let result = eval(expression);
    display.innerText = result;

    // Save to history
    historyList.push(`${expression} = ${result}`);
    updateHistoryDropdown();
  } catch (err) {
    display.innerText = 'Error';
  }
}

function updateHistoryDropdown() {
  historyDropdown.innerHTML = '<option value="">Select a calculation</option>';
  historyList.forEach((item, index) => {
    let option = document.createElement('option');
    option.value = index;
    option.text = item;
    historyDropdown.appendChild(option);
  });
}

function loadHistory() {
  let selectedIndex = historyDropdown.value;
  if (selectedIndex !== "") {
    display.innerText = historyList[selectedIndex].split(' = ')[0];
  }
}

function handleImplicitMultiplication() {
  let lastChar = display.innerText.slice(-1);
  if (lastChar === ')' || (!isNaN(lastChar) && lastChar !== '')) {
    appendOperator('*');
  }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
  if (!isNaN(event.key)) {
    appendNumber(event.key);
  } else if (['+', '-', '*', '/'].includes(event.key)) {
    appendOperator(event.key);
  } else if (event.key === '(') {
    appendBracket('(');
  } else if (event.key === ')' || event.key === ' ') {
    confirmPendingBracket();
  } else if (event.key === 'Enter' || event.key === '=') {
    calculate();
  } else if (event.key === 'Backspace') {
    backspace();
  } else if (event.key === '.') {
    appendNumber('.');
  }
});
