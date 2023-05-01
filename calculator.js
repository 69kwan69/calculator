class Calculator {
    constructor(prevOperand, currOperand) {
        this.prevOperand = prevOperand;
        this.currOperand = currOperand;
        this.operation = null;
    }

    handleNumberInput(number) {
        if (number === '.' && this.currOperand.includes('.')) return;
        this.currOperand += number;
    }

    handleOperation(operator) {
        const res = this.calculate();
        this.operation = operator;

        if (this.currOperand) {
            this.prevOperand = (res) ? res : this.currOperand;
            this.currOperand = '';
        }
    }

    updateDisplay() {
        if (this.prevOperand && this.operation) {
            prevOperand.textContent = `${this.prevOperand} ${this.operation}`;
        }

        currOperand.textContent = this.currOperand;
        console.log(this.prevOperand, this.operation, this.currOperand);
    }

    clear() {
        this.prevOperand = ''
        this.currOperand = ''
        this.operation = null;
    }

    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1);
    }

    calculate() {
        if (!this.prevOperand || !this.currOperand) return '';
        switch (this.operation) {
            case '+':
                return parseFloat(this.prevOperand) + parseFloat(this.currOperand);
            case '−':
                return parseFloat(this.prevOperand) - parseFloat(this.currOperand);
            case '×':
                return parseFloat(this.prevOperand) * parseFloat(this.currOperand);
            case '÷':
                return parseFloat(this.prevOperand) / parseFloat(this.currOperand);
            default:
                break;
        }
    }
}

function handleKeyboardInput(key) {
    const calculatorBtn = document.querySelector(`[data-key='${key}']`);
    if (calculatorBtn) calculatorBtn.click();
}


const prevOperand = document.querySelector('.prev-operand');
const currOperand = document.querySelector('.curr-operand');

const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const clrBtn = document.querySelector('[data-clr]');
const delBtn = document.querySelector('[data-del]');
const equalsBtn = document.querySelector('[data-equals]');
const plusMinusBtn = document.querySelector('[data-plus-minus]');


const myCalculator = new Calculator(prevOperand.textContent, currOperand.textContent);


numberBtns.forEach(button => button.addEventListener('click', () => {
    myCalculator.handleNumberInput(button.dataset.number);
    myCalculator.updateDisplay();
}))

operatorBtns.forEach(button => button.addEventListener('click', () => {
    myCalculator.handleOperation(button.dataset.operator);
    myCalculator.updateDisplay();
}))

clrBtn.addEventListener('click', () => {
    myCalculator.clear();
    myCalculator.updateDisplay();
})

delBtn.addEventListener('click', () => {
    myCalculator.delete();
    myCalculator.updateDisplay();
})

equalsBtn.addEventListener('click', () => {
    const res = myCalculator.calculate();
    if (isNaN(res)) return;
    currOperand.textContent = res;
    prevOperand.textContent = '';
    myCalculator.clear();
})

window.addEventListener('keyup', e => handleKeyboardInput(e.key));