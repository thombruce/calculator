<template lang='pug'>
.card.glass
  input.input.input-ghost.input-sm.mt-2.mx-4(v-model='currentExpression' @keyup.enter='equals()')
  .card-body.font-mono
    div.text-right.text-4xl {{ displayValue }}
</template>

<script>
export default {
  props: [
    'calculator'
  ],
  computed: {
    currentExpression: {
      get () {
        return this.calculator.currentExpression
      },
      set (val) {
        this.calculator.currentExpression = val
      }
    },
    displayValue () {
      return this.calculator.displayValue
    }
  },
  methods: {
    equals () {
      this.calculator.equals()
    }
  }
}
</script>
