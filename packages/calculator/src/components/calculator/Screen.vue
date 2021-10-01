<template lang='pug'>
.card.glass
  input.input.input-ghost.input-sm.mt-2.mx-4(v-model='currentExpression')
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
  }
}
</script>
