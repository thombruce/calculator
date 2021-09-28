<template lang='pug'>
div.max-w-prose.h-full.flex.content-center.justify-center.m-auto
  .card.bordered.w-full.m-auto
    .card-body
      Calculator
</template>

<script>
import Calculator from '@thombruce/calculator/src/components/Calculator.vue'

export default {
  components: {
    Calculator
  }
}
</script>
