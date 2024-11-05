<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <section class="text-center flex flex-col justify-center items-center h-96">
    <i class="pi pi-exclamation-triangle text-yellow-900 text-7xl mb-5"></i>
    <h1 class="text-6xl font-bold mb-4">404 Not Found</h1>
    <p class="text-xl mb-5">
      This page does not exist! <br />
      The Sadness :(
    </p>
    <RouterLink
      to="/"
      class="text-white bg-secondary hover:bg-cuviolet rounded-md px-3 py-2 mt-4"
      >Return Home</RouterLink
    >
  </section>
</template>
