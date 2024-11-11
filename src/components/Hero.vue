<script setup>
defineProps({
  title: {
    type: String,
    default: "Become a Super Saiyan!",
  },
  description: {
    type: String,
    default: "To achieve it, you need to be a Saiyan!",
  },
});
</script>

<template>
  <!-- Hero -->
  <section class="bg-secondary py-20">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
    >
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
          {{ title }}
        </h1>
        <p class="my-4 text-xl text-white">
          {{ description }}
        </p>
      </div>
    </div>
  </section>
</template>
