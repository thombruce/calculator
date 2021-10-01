<template lang='pug'>
.grid.grid-cols-4.gap-4
  button.btn.btn-error(@click="allClear()") AC
  button.btn.btn-warning(@click="del()") DEL
  //- button.btn(disabled='disabled') √
  button.btn(@click="percent()") %
  button.btn(@click="setCurrentOperation('/')") ÷
  button.btn(@click="addNumeral('7')") 7
  button.btn(@click="addNumeral('8')") 8
  button.btn(@click="addNumeral('9')") 9
  button.btn(@click="setCurrentOperation('*')") ×
  button.btn(@click="addNumeral('4')") 4
  button.btn(@click="addNumeral('5')") 5
  button.btn(@click="addNumeral('6')") 6
  button.btn(@click="setCurrentOperation('-')") -
  button.btn(@click="addNumeral('1')") 1
  button.btn(@click="addNumeral('2')") 2
  button.btn(@click="addNumeral('3')") 3
  button.btn(@click="setCurrentOperation('+')") +
  button.btn.col-span-2(@click="addNumeral('0')") 0
  button.btn(@click="addDecimal()") .
  button.btn.btn-primary(@click="equals()") =
</template>

<script>
export default {
  props: [
    'calculator'
  ],
  methods: {
    allClear () {
      this.calculator.allClear()
    },
    del () {
      this.calculator.del()
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
