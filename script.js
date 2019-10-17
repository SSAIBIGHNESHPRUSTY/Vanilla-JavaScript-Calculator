class Calculator {
  constructor(previousoperTextElement, currentoperTextElement) {
    this.previousoperandTextElement = previousoperandTextElement
    this.currentoperandTextElement = currentoperandTextElement
    this.clear()
  }

  clear() {
    this.currentoper = ''
    this.previousoper = ''
    this.operation = undefined
  }

  delete() {
    this.currentoper = this.currentoper.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentoper.includes('.')) return
    this.currentOperand = this.currentoper.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentoper === '') return
    if (this.previousoper !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousoper = this.currentoper
    this.currentoper = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousoper)
    const current = parseFloat(this.currentoper)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentoper = computation
    this.operation = undefined
    this.previousoper = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentoperTextElement.innerText =
      this.getDisplayNumber(this.currentoper)
    if (this.operation != null) {
      this.previousoperTextElement.innerText =
        `${this.getDisplayNumber(this.previousoper)} ${this.operation}`
    } else {
      this.previousoperTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousoperTextElement = document.querySelector('[data-previous-operand]')
const currentoperTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousoperTextElement, currentoperTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
