import { create, all } from 'mathjs'

const math = create(all, { number: 'BigNumber' })

export class Calculator {
  constructor () {
    this.currentExpression = ''
    this.displayValue = '0'
  }

  // Actions
  allClear () {
    this.displayValue = '0'
    this.currentExpression = ''
  }

  del () {
    this.currentExpression = this.currentExpression.slice(0, -1)
  }

  addNumeral (numeral) {
    this.currentExpression += numeral
  }

  addDecimal () {
    this.currentExpression += '.'
  }

  performPreviousOperation () {
    this.displayValue = math.evaluate(this.currentExpression)
  }

  setCurrentOperation (operator) {
    this.performPreviousOperation()
    this.currentExpression += `${operator}`
  }

  percent () {
    this.currentExpression += '%'
  }

  equals () {
    this.performPreviousOperation()
  }
}

export default Calculator
