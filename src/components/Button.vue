<script setup>
defineProps({
  className: String,
});
</script>
<template>
  <button
    :class="[
      `h-[36px] bg-primary hover:bg-secondary text-white px-4 py-2  rounded text-center text-sm`,
      `${className}`,
    ]"
  >
    <slot></slot>
  </button>
</template>
