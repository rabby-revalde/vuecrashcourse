<script setup>
import Card from "@/components/CardComponent/Card.vue";
import { RouterLink } from "vue-router";
import Button from "../Button.vue";
</script>

<template>
  <!-- Developers and Employers -->
  <section class="py-4">
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <Card>
          <h2 class="text-2xl font-bold">For Developers</h2>
          <p class="mt-2 mb-4">
            Browse our Vue Contacts and start your career today
          </p>
          <RouterLink
            to="/contacts"
            class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
          >
            Browse Jobs
          </RouterLink>
        </Card>
        <Card bg="bg-semiviolet">
          <h2 class="text-2xl font-bold">For Employers</h2>
          <p class="mt-2 mb-4">
            List your contact to find the perfect developer for the role
          </p>
          <Button> Add new Job </Button>
        </Card>
      </div>
    </div>
  </section>
</template>
