<template lang='pug'>
  #app.p-10
    .card.bordered
      .card-body
        Calculator
</template>

<script>
import Calculator from './components/Calculator.vue'

export default {
  name: 'App',
  components: {
    Calculator
  }
}
</script>
