<template lang='pug'>
div
  .flex.flex-col.gap-4
    CalculatorScreen(v-model='calculator.displayValue')
    CalculatorKeypad(
      :isAllClear='isAllClear'
      :currentOperation='calculator.currentOperation'
      @emitOperation='catchOperation'
    )
</template>

<script>
import calculator, {
  isAllClear,
  clear,
  allClear,
  negate,
  addNumeral,
  addDecimal,
  performPreviousOperation,
  setCurrentOperation,
  percent,
  equals
} from '../plugins/calculator'

import CalculatorScreen from './calculator/Screen.vue'
import CalculatorKeypad from './calculator/Keypad.vue'

export default {
  components: {
    CalculatorScreen,
    CalculatorKeypad
  },
  computed: {
    calculator,
    isAllClear
  },
  methods: {
    catchOperation (operation, args) {
      this[operation](args)
    },
    allClear,
    clear,
    negate,
    addNumeral,
    addDecimal,
    performPreviousOperation,
    setCurrentOperation,
    percent,
    equals
  }
}
</script>
