<template lang='pug'>
div
  .flex.flex-col.gap-4
    .card.glass
      .card-body.text-right.text-4xl.font-mono
        | {{ displayValue }}
    .grid.grid-cols-4.gap-4
      button.btn.btn-error(v-if="isAllClear" @click='allClear()') AC
      button.btn.btn-warning(v-else @click='clear()') C
      button.btn(@click='negate()') +/-
      button.btn(@click='percent()') %
      button.btn(@click="setCurrentOperation('/')" :class="(currentOperation === '/') ? 'btn-accent' : ''") ÷
      button.btn(@click="addNumeral('7')") 7
      button.btn(@click="addNumeral('8')") 8
      button.btn(@click="addNumeral('9')") 9
      button.btn(@click="setCurrentOperation('*')" :class="(currentOperation === '*') ? 'btn-accent' : ''") ×
      button.btn(@click="addNumeral('4')") 4
      button.btn(@click="addNumeral('5')") 5
      button.btn(@click="addNumeral('6')") 6
      button.btn(@click="setCurrentOperation('-')" :class="(currentOperation === '-') ? 'btn-accent' : ''") -
      button.btn(@click="addNumeral('1')") 1
      button.btn(@click="addNumeral('2')") 2
      button.btn(@click="addNumeral('3')") 3
      button.btn(@click="setCurrentOperation('+')" :class="(currentOperation === '+') ? 'btn-accent' : ''") +
      button.btn.col-span-2(@click="addNumeral('0')") 0
      button.btn(@click="addDecimal()") .
      button.btn.btn-primary(@click="equals()") =
</template>

<script>
/* eslint no-eval: "off" */

export default {
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
      switch (this.currentOperation) {
        case '+':
          this.currentValue += Number(this.operativeValue)
          break
        case '-':
          this.currentValue -= Number(this.operativeValue)
          break
        case '*':
          this.currentValue *= Number(this.operativeValue)
          break
        case '/':
          this.currentValue /= Number(this.operativeValue)
          break
        default:
          this.currentValue = Number(this.operativeValue)
          break
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
        this.operativeValue = Number(this.operativeValue) / 100
      } else {
        this.operativeValue = Number(this.currentValue) / 100 * Number(this.operativeValue)
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
