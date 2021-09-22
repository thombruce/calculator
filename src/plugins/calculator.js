import { create, all } from 'mathjs'

const math = create(all, { number: 'BigNumber' })

export class Calculator {
  constructor () {
    this.currentValue = 0
    this.operativeValue = 0
    this.displayValue = '0'
    this.currentOperation = ''
    this.newEntry = true
  }

  // Getters
  get isAllClear () {
    return this.displayValue === '0' && this.newEntry === true
  }

  // Actions
  clear () {
    this.operativeValue = 0
    this.displayValue = '0'
    this.newEntry = true
  }

  allClear () {
    this.clear()
    this.currentValue = 0
    this.currentOperation = ''
  }

  negate () {
    if (this.displayValue.startsWith('-')) {
      this.displayValue = this.displayValue.slice(1)
    } else {
      this.displayValue = '-' + this.displayValue
    }
    this.operativeValue = Number(this.displayValue)
    this.newEntry = false
  }

  addNumeral (numeral) {
    if (this.newEntry) {
      this.displayValue = numeral
      this.newEntry = false
    } else if (this.displayValue.match(/^-?0$/)) {
      this.displayValue = this.displayValue.replace('0', numeral)
    } else {
      this.displayValue += numeral
    }
    this.operativeValue = Number(this.displayValue)
  }

  addDecimal () {
    if (!this.displayValue.match(/\./)) {
      this.displayValue += '.'
    }
    this.newEntry = false
  }

  performPreviousOperation () {
    if (this.currentOperation) {
      this.currentValue = math.evaluate(`${this.currentValue} ${this.currentOperation} ${this.operativeValue}`)
    } else {
      this.currentValue = Number(this.operativeValue)
    }
    this.displayValue = String(this.currentValue)
  }

  setCurrentOperation (operator) {
    if (!this.newEntry) this.performPreviousOperation()
    this.currentOperation = operator
    this.newEntry = true
  }

  percent () {
    if (this.currentOperation === '*' || this.currentOperation === '/' || this.currentOperation === '') {
      this.operativeValue = math.evaluate(`${this.operativeValue} / 100`)
    } else {
      this.operativeValue = math.evaluate(`${this.currentValue} / 100 * ${this.operativeValue}`)
    }
    this.displayValue = String(this.operativeValue)
    this.newEntry = true
  }

  equals () {
    this.performPreviousOperation()
    this.newEntry = true
  }
}

export default Calculator
