<script setup>
import Hero from "@/components/Hero.vue";
// import HomeCards from "@/components/CardComponent/HomeCards.vue";
import JobListings from "@/components/Job/Listings.vue";
</script>

<template>
  <Hero />
  <!-- <HomeCards /> -->
  <JobListings :limit="6" :isShowButton="true" />
</template>
