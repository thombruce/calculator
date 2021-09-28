<template lang='pug'>
.card.glass
  .card-body.text-right.text-4xl.font-mono
    | {{ displayValue }}
</template>

<script>
export default {
  props: [
    'calculator'
  ],
  computed: {
    displayValue () {
      return this.calculator.displayValue
    }
  }
}
</script>
