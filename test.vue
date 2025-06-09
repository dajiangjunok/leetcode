<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
  size: Number
})
</script>

<template>
  <div :class="`mt-${size}`">
    <template name="default"></template>
  </div>
</template>
