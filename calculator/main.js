class Calculator {
  constructor(){
    // Elements
    this.$calculatorDisplay = document.querySelector('.calculator-display>h1');
    this.$inputBtns = document.querySelectorAll('button');
    this.$clearBtn = document.getElementById('clear-btn');

    // Global value
    this.firstValue = 0;
    this.operatorValue = '';
    this.awaitingNextValue = false;
    this.calculate = {
      '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
      '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
      '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
      '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
      '=': (firstNumber, secondNumber) => secondNumber,
    };
  }

  // Get number after click
  sendNumberValue(value){
    if (this.awaitingNextValue){
      this.$calculatorDisplay.textContent = value;
      this.awaitingNextValue = false;
    } else {
      const displayValue = this.$calculatorDisplay.textContent;
      this.$calculatorDisplay.textContent = displayValue === '0' ? value : displayValue + value;
    }
  }

  // Get operator after click
  useOperator(operator){
    const currentDisplayValue = +this.$calculatorDisplay.textContent;
    console.log(currentDisplayValue);
    if (this.operatorValue && this.awaitingNextValue) {
      this.operatorValue = operator;
      return ;
    }

    if (!this.firstValue){
      this.firstValue = currentDisplayValue;
    } else {
      const calculation = this.calculate[this.operatorValue](this.firstValue, currentDisplayValue);
      this.$calculatorDisplay.textContent = calculation;
      this.firstValue = calculation;
    }
    this.operatorValue = operator;
    this.awaitingNextValue = true;
  }

  // When add decimal we control decimal count
  addDecimal(){
    // if operator pressed
    if (this.awaitingNextValue) return ;
    if (!this.$calculatorDisplay.textContent.includes('.')){
      this.$calculatorDisplay.textContent = this.$calculatorDisplay.textContent + '.';
    }
  }

  // On click we clear display filed and reset all globals values
  clearDisplay(){
    this.$calculatorDisplay.textContent = '0';
  }

  load(){
    this.$inputBtns.forEach(btn => {
      if (!btn.classList.length){
        btn.addEventListener('click', (event) => this.sendNumberValue(event.target.value));
      } else if (btn.classList.contains('operator')){
        btn.addEventListener('click', (event) => this.useOperator(event.target.value));
      } else if (btn.classList.contains('decimal')) {
        btn.addEventListener('click', () => this.addDecimal());
      }
    });
    this.$clearBtn.addEventListener('click', () => this.clearDisplay());
  }
}

const calculator = new Calculator();
calculator.load();