let display = document.getElementById('display');
let historyDropdown = document.getElementById('history');
let historyList = [];
let pendingCloseBracket = false;

function appendNumber(num) {
  handleImplicitMultiplication();
  if (display.innerText === '0') display.innerText = num;
  else display.innerText += num;
}

function appendOperator(op) {
  if (display.innerText === '0' && op !== '(') return; // ignore operator first

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
    handleImplicitMultiplication();
    display.innerHTML += `<span class="open-bracket">(</span><span id="pending-bracket" class="pending-bracket">)</span>`;
    pendingCloseBracket = true;
  } else if (bracket === ')' && pendingCloseBracket) {
    confirmPendingBracket();
  }
}

function confirmPendingBracket() {
  const pending = document.getElementById('pending-bracket');
  if (pending) {
    pending.id = '';
    pending.classList.remove('pending-bracket');
  }
  pendingCloseBracket = false;
}

function clearDisplay() {
  display.innerText = '0';
  pendingCloseBracket = false;
}

function backspace() {
  display.innerHTML = display.innerHTML.slice(0, -1);
}

function calculate() {
  try {
    let expression = display.innerText.replace(/[^-()\d/*+.]/g, '');
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

// Handle implicit multiplication
function handleImplicitMultiplication() {
  let lastChar = display.innerText.slice(-1);
  if (lastChar === ')' || lastChar === '(' || !isNaN(lastChar)) {
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
