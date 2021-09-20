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
      button.btn(@click='divide()' :class="currentOperation === '/' ? 'btn-accent' : ''") ÷
      button.btn(@click="addNumeral('7')") 7
      button.btn(@click="addNumeral('8')") 8
      button.btn(@click="addNumeral('9')") 9
      button.btn(@click='multiply()' :class="currentOperation === '*' ? 'btn-accent' : ''") ×
      button.btn(@click="addNumeral('4')") 4
      button.btn(@click="addNumeral('5')") 5
      button.btn(@click="addNumeral('6')") 6
      button.btn(@click='minus()' :class="currentOperation === '-' ? 'btn-accent' : ''") -
      button.btn(@click="addNumeral('1')") 1
      button.btn(@click="addNumeral('2')") 2
      button.btn(@click="addNumeral('3')") 3
      button.btn(@click='plus()' :class="currentOperation === '+' ? 'btn-accent' : ''") +
      button.btn.col-span-2(@click="addNumeral('0')") 0
      button.btn(@click="addDecimal()") .
      button.btn.btn-primary(@click="equals()") =
</template>

<script>
/* eslint no-eval: "off" */

export default {
  data () {
    return {
      displayValue: '0',
      currentExpression: '',
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
      this.displayValue = '0'
      this.currentExpression = ''
      this.currentOperation = ''
      this.newEntry = true
    },
    clear () {
      this.displayValue = '0'
      this.newEntry = true
    },
    appendOperation () {
      this.currentExpression += (this.currentOperation ? ` ${this.currentOperation} ` : '') + this.displayValue
      this.displayValue = '' + eval(this.currentExpression)
      this.currentOperation = ''
    },
    negate () {
      if (this.newEntry) {
        this.displayValue = '-0'
        this.newEntry = false
      } else if (this.displayValue.startsWith('-')) {
        this.displayValue = this.displayValue.slice(1)
      } else {
        this.displayValue = '-' + this.displayValue
      }
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
    },
    addDecimal () {
      if (this.newEntry) {
        this.displayValue = '0.'
        this.newEntry = false
      } else if (!this.displayValue.match(/\./)) {
        this.displayValue += '.'
      }
    },
    plus () {
      if (!this.newEntry) this.appendOperation()
      this.currentOperation = '+'
      this.newEntry = true
    },
    minus () {
      if (!this.newEntry) this.appendOperation()
      this.currentOperation = '-'
      this.newEntry = true
    },
    multiply () {
      if (!this.newEntry) this.appendOperation()
      this.currentOperation = '*'
      this.newEntry = true
    },
    divide () {
      if (!this.newEntry) this.appendOperation()
      this.currentOperation = '/'
      this.newEntry = true
    },
    percent () {
      if (this.currentOperation === '*' || this.currentOperation === '/' || this.currentOperation === '') {
        this.displayValue = eval(this.displayValue + '/ 100')
      } else {
        this.displayValue = eval(`(${this.currentExpression}) / 100 * ${this.displayValue}`)
      }
    },
    equals () {
      if (!this.newEntry) this.appendOperation()
      this.currentExpression = ''
    }
  }
}
</script>
