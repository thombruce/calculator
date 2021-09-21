<template lang='pug'>
div
  .flex.flex-col.gap-4
    //- Let's start using v-model; we can pass displayValue to CalculatorScreen easily!
    CalculatorScreen(v-model='displayValue')
    //- What we are actually going to want is to extract calculator logic into a custom
    //- Calculator class. We could then pass the current instance of Calculator to v-model
    //- and manipulate its properties as we like. Those properties should then persist to other
    //- components since it was instantiated at the parent, here.
    //- Key is to make this a Vue.observable object, as I have done in the past here: https://github.com/thombruce/helvellyn-gun/blob/955a77c40f79138230046a4ea1d14de309cafd3d/services/store/user.js
    CalculatorKeypad(
      :isAllClear='isAllClear'
      :currentOperation='currentOperation'
      @emitOperation='catchOperation'
    )
</template>

<script>
import { create, all } from 'mathjs'

import CalculatorScreen from './calculator/Screen.vue'
import CalculatorKeypad from './calculator/Keypad.vue'

const math = create(all, { number: 'BigNumber' })

export default {
  components: {
    CalculatorScreen,
    CalculatorKeypad
  },
  data () {
    return {
      currentValue: 0,
      operativeValue: 0,
      displayValue: '0',
      currentOperation: '',
      newEntry: true
    }
  },
  computed: {
    isAllClear () {
      return (this.displayValue === '0' && this.newEntry === true)
    }
  },
  methods: {
    catchOperation (operation, args) {
      this[operation](args)
    },
    allClear () {
      this.clear()
      this.currentValue = 0
      this.currentOperation = ''
    },
    clear () {
      this.operativeValue = 0
      this.displayValue = '0'
      this.newEntry = true
    },
    negate () {
      if (this.displayValue.startsWith('-')) {
        this.displayValue = this.displayValue.slice(1)
      } else {
        this.displayValue = '-' + this.displayValue
      }
      this.operativeValue = Number(this.displayValue)
      this.newEntry = false
    },
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
    },
    addDecimal () {
      if (!this.displayValue.match(/\./)) {
        this.displayValue += '.'
      }
      this.newEntry = false
    },
    performPreviousOperation () {
      if (this.currentOperation) {
        this.currentValue = math.evaluate(`${this.currentValue} ${this.currentOperation} ${this.operativeValue}`)
      } else {
        this.currentValue = Number(this.operativeValue)
      }
      this.displayValue = String(this.currentValue)
    },
    setCurrentOperation (operator) {
      if (!this.newEntry) this.performPreviousOperation()
      this.currentOperation = operator
      this.newEntry = true
    },
    percent () {
      if (this.currentOperation === '*' || this.currentOperation === '/' || this.currentOperation === '') {
        this.operativeValue = math.evaluate(`${this.operativeValue} / 100`)
      } else {
        this.operativeValue = math.evaluate(`${this.currentValue} / 100 * ${this.operativeValue}`)
      }
      this.displayValue = String(this.operativeValue)
      this.newEntry = true
    },
    equals () {
      this.performPreviousOperation()
      this.newEntry = true
    }
  }
}
</script>
