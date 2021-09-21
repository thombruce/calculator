<template lang='pug'>
.grid.grid-cols-4.gap-4
  button.btn.btn-error(v-if="isAllClear" @click="$emit('emitOperation', 'allClear')") AC
  button.btn.btn-warning(v-else @click="$emit('emitOperation', 'clear')") C
  button.btn(@click="$emit('emitOperation', 'negate')") +/-
  button.btn(@click="$emit('emitOperation', 'percent')") %
  button.btn(@click="$emit('emitOperation', 'setCurrentOperation', '/')" :class="(currentOperation === '/') ? 'btn-accent' : ''") ÷
  button.btn(@click="$emit('emitOperation', 'addNumeral', '7')") 7
  button.btn(@click="$emit('emitOperation', 'addNumeral', '8')") 8
  button.btn(@click="$emit('emitOperation', 'addNumeral', '9')") 9
  button.btn(@click="$emit('emitOperation', 'setCurrentOperation', '*')" :class="(currentOperation === '*') ? 'btn-accent' : ''") ×
  button.btn(@click="$emit('emitOperation', 'addNumeral', '4')") 4
  button.btn(@click="$emit('emitOperation', 'addNumeral', '5')") 5
  button.btn(@click="$emit('emitOperation', 'addNumeral', '6')") 6
  button.btn(@click="$emit('emitOperation', 'setCurrentOperation', '-')" :class="(currentOperation === '-') ? 'btn-accent' : ''") -
  button.btn(@click="$emit('emitOperation', 'addNumeral', '1')") 1
  button.btn(@click="$emit('emitOperation', 'addNumeral', '2')") 2
  button.btn(@click="$emit('emitOperation', 'addNumeral', '3')") 3
  button.btn(@click="$emit('emitOperation', 'setCurrentOperation', '+')" :class="(currentOperation === '+') ? 'btn-accent' : ''") +
  button.btn.col-span-2(@click="$emit('emitOperation', 'addNumeral', '0')") 0
  button.btn(@click="$emit('emitOperation', 'addDecimal')") .
  button.btn.btn-primary(@click="$emit('emitOperation', 'equals')") =
</template>

<script>
export default {
  props: [
    'isAllClear',
    'currentOperation'
  ]
}
</script>
