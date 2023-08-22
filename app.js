class Calculator {
    constructor(displayElement) {
      this.displayElement = displayElement;
      this.currentInput = '';
      this.storedInput = '';
      this.operator = '';
    }
  
    clear() {
      this.currentInput = '';
      this.storedInput = '';
      this.operator = '';
      this.updateDisplay();
    }
  
    appendNumber(num) {
      this.currentInput += num;
      this.updateDisplay();
    }
  
    chooseOperator(operator) {
      if (this.currentInput === '') return;
      if (this.storedInput !== '') {
        this.calculate();
      }
      this.operator = operator;
      this.storedInput = this.currentInput;
      this.currentInput = '';
    }
  
    calculate() {
      const prev = parseFloat(this.storedInput);
      const current = parseFloat(this.currentInput);
      if (isNaN(prev) || isNaN(current)) return;
      switch (this.operator) {
        case '+':
          this.currentInput = (prev + current).toString();
          break;
        case '-':
          this.currentInput = (prev - current).toString();
          break;
        case '*':
          this.currentInput = (prev * current).toString();
          break;
        case '/':
          this.currentInput = (prev / current).toString();
          break;
      }
      this.operator = '';
      this.storedInput = '';
      this.updateDisplay();
    }
  
    updateDisplay() {
      this.displayElement.value = this.currentInput;
    }
  }
  
  const displayElement = document.querySelector('#display');
  const calculator = new Calculator(displayElement);
  
  // Set up event listeners for buttons and call corresponding methods
  document.querySelectorAll('.buttons button').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('operator')) {
        calculator.chooseOperator(button.innerText);
      } else if (button.classList.contains('equal')) {
        calculator.calculate();
      } else {
        calculator.appendNumber(button.innerText);
      }
    });
  });
  