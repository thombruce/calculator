import Vue from 'vue'
import { create, all } from 'mathjs'

const math = create(all, { number: 'BigNumber' })

// State
const state = Vue.observable({
  currentValue: 0,
  operativeValue: 0,
  displayValue: '0',
  currentOperation: '',
  newEntry: true
})

// Getters
export const isAllClear = () => state.displayValue === '0' && state.newEntry === true

// Actions
export const clear = () => {
  state.operativeValue = 0
  state.displayValue = '0'
  state.newEntry = true
}

export const allClear = () => {
  clear()
  state.currentValue = 0
  state.currentOperation = ''
}

export const negate = () => {
  if (state.displayValue.startsWith('-')) {
    state.displayValue = state.displayValue.slice(1)
  } else {
    state.displayValue = '-' + state.displayValue
  }
  state.operativeValue = Number(state.displayValue)
  state.newEntry = false
}

export const addNumeral = (numeral) => {
  if (state.newEntry) {
    state.displayValue = numeral
    state.newEntry = false
  } else if (state.displayValue.match(/^-?0$/)) {
    state.displayValue = state.displayValue.replace('0', numeral)
  } else {
    state.displayValue += numeral
  }
  state.operativeValue = Number(state.displayValue)
}

export const addDecimal = () => {
  if (!state.displayValue.match(/\./)) {
    state.displayValue += '.'
  }
  state.newEntry = false
}

export const performPreviousOperation = () => {
  if (state.currentOperation) {
    state.currentValue = math.evaluate(`${state.currentValue} ${state.currentOperation} ${state.operativeValue}`)
  } else {
    state.currentValue = Number(state.operativeValue)
  }
  state.displayValue = String(state.currentValue)
}

export const setCurrentOperation = (operator) => {
  if (!state.newEntry) performPreviousOperation()
  state.currentOperation = operator
  state.newEntry = true
}

export const percent = () => {
  if (state.currentOperation === '*' || state.currentOperation === '/' || state.currentOperation === '') {
    state.operativeValue = math.evaluate(`${state.operativeValue} / 100`)
  } else {
    state.operativeValue = math.evaluate(`${state.currentValue} / 100 * ${state.operativeValue}`)
  }
  state.displayValue = String(state.operativeValue)
  state.newEntry = true
}

export const equals = () => {
  performPreviousOperation()
  state.newEntry = true
}

export default () => state

// shallow clone
// export default ()=> ({...state})
// or deep clone
// export default ()=> JSON.parse(JSON.stringify(state))
