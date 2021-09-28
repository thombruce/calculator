<template lang='pug'>
div
  .flex.flex-col.gap-4
    CalculatorScreen(:calculator='calculator')
    CalculatorKeypad(:calculator='calculator')
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
  }
}
</script>
