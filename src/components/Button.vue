<script setup>
import { defineProps } from "vue";

defineProps({
  openModal: Function,
});
</script>
<template>
  <button
    class="h-[36px] bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg text-center text-sm"
  >
    <slot></slot>
  </button>
</template>
