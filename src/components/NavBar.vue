<script setup>
import logo from "@/assets/img/logo.png";
import { RouterLink, useRoute } from "vue-router";

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};
</script>

<template>
  <nav class="bg-secondary border-b border-primary">
    <div class="mx-auto container">
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <!-- <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" /> -->
            <i class="pi pi-megaphone text-3xl text-violet-400 font-bold"></i>
            <!-- <span class="hidden md:block text-white text-2xl font-medium ml-2"
              >ReachMe</span
            > -->
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/contacts"
                :class="[
                  isActiveLink('/contacts')
                    ? 'bg-cuviolet'
                    : 'hover:bg-cuviolet hover:text-white bg-opacity-70',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'border',
                ]"
                >Contacts</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
