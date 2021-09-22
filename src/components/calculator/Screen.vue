<template lang='pug'>
.card.glass
  .card-body.text-right.text-4xl.font-mono
    | {{ value }}
</template>

<script>
export default {
  props: [
    'value'
  ]
}
</script>
