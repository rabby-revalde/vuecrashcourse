<script setup>
import NavBar from "@/components/NavBar.vue";
import { RouterView } from "vue-router";
import { useContactsStore } from "./stores/contactStore";

const contactStore = useContactsStore();
contactStore.fetchContacts();
</script>

<template>
  <NavBar />
  <div class="container-2xl">
    <RouterView />
  </div>
</template>
