let display = document.getElementById('display');
let historyDropdown = document.getElementById('history');
let historyList = [];

function appendNumber(num) {
  if (display.innerText === '0') display.innerText = '';
  let lastChar = display.innerText.slice(-1);
  // If last character is ')' then insert '*' before number
  if (lastChar === ')') {
    display.innerText += '*';
  }
  display.innerText += num;
}

function appendOperator(op) {
  let lastChar = display.innerText.slice(-1);
  if (['+', '-', '*', '/'].includes(lastChar)) {
    display.innerText = display.innerText.slice(0, -1);
  }
  display.innerText += op;
}

function appendBracket(bracket) {
  if (display.innerText === '0' && bracket === '(') {
    display.innerText = '';
  }
  let lastChar = display.innerText.slice(-1);
  if (bracket === '(') {
    if (!['+', '-', '*', '/', '('].includes(lastChar)) {
      display.innerText += '*';
    }
  } else if (bracket === ')') {
    if (['+', '-', '*', '/', '('].includes(lastChar)) {
      // prevent wrong closing bracket after operator
      return;
    }
  }
  display.innerText += bracket;
}

function clearDisplay() {
  display.innerText = '0';
}

function backspace() {
  if (display.innerText.length === 1) {
    display.innerText = '0';
  } else {
    display.innerText = display.innerText.slice(0, -1);
  }
}

function calculate() {
  try {
    let expression = display.innerText;
    let result = eval(expression);
    display.innerText = result;
    addToHistory(expression + " = " + result);
  } catch (err) {
    display.innerText = 'Error';
  }
}

function addToHistory(entry) {
  historyList.push(entry);
  updateHistoryDropdown();
}

function updateHistoryDropdown() {
  historyDropdown.innerHTML = '<option value="">History</option>';
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
    let selectedHistory = historyList[selectedIndex];
    display.innerText = selectedHistory.split(' = ')[0];
  }
}

// Keyboard Input
document.addEventListener('keydown', function(event) {
  if (!isNaN(event.key)) {
    appendNumber(event.key);
  } else if (['+', '-', '*', '/'].includes(event.key)) {
    appendOperator(event.key);
  } else if (event.key === '(' || event.key === ')') {
    appendBracket(event.key);
  } else if (event.key === 'Backspace') {
    backspace();
  } else if (event.key === 'Enter' || event.key === '=') {
    calculate();
  } else if (event.key === '.') {
    appendNumber('.');
  }
});
