let display = document.getElementById('display');
let historyDropdown = document.getElementById('history');
let historyList = [];

function appendNumber(num) {
  if (display.innerText === '0') display.innerText = num;
  else display.innerText += num;
}

function appendOperator(op) {
  display.innerText += op;
}

function clearDisplay() {
  display.innerText = '0';
}

function backspace() {
  display.innerText = display.innerText.slice(0, -1) || '0';
}

function calculate() {
  try {
    let expression = display.innerText;
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
