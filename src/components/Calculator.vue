<template lang='pug'>
div
  .flex.flex-col.gap-4
    CalculatorScreen(v-model='calculator.displayValue')
    CalculatorKeypad(
      :isAllClear='calculator.isAllClear'
      :currentOperation='calculator.currentOperation'
      @emitOperation='catchOperation'
    )
</template>

<script>
import Vue from 'vue'
import Calculator from '../plugins/calculator'

import CalculatorScreen from './calculator/Screen.vue'
import CalculatorKeypad from './calculator/Keypad.vue'

export default {
  components: {
    CalculatorScreen,
    CalculatorKeypad
  },
  data () {
    return {
      calculator: Vue.observable(new Calculator())
    }
  },
  methods: {
    catchOperation (operation, args) {
      this[operation](args)
    },
    allClear () {
      this.calculator.allClear()
    },
    clear () {
      this.calculator.clear()
    },
    negate () {
      this.calculator.negate()
    },
    addNumeral (numeral) {
      this.calculator.addNumeral(numeral)
    },
    addDecimal () {
      this.calculator.addDecimal()
    },
    performPreviousOperation () {
      this.calculator.performPreviousOperation()
    },
    setCurrentOperation (operator) {
      this.calculator.setCurrentOperation(operator)
    },
    percent () {
      this.calculator.percent()
    },
    equals () {
      this.calculator.equals()
    }
  }
}
</script>
