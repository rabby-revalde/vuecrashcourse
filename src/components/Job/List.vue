<script setup>
import { defineProps, ref, computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  contact: Object,
  contactUpdate: Function,
  deleteContact: Function,
  index: Number,
});
</script>

<template>
  <ul
    :class="`grid grid-cols-5 my-2 py-2 px-5 rounded text-sm ${
      index % 2 !== 0 ? 'bg-semiviolet' : 'bg-white'
    }`"
  >
    <li class="font-bold text-primary">
      <RouterLink :to="`/contacts/${contact?.id}`">{{
        contact?.name
      }}</RouterLink>
    </li>
    <li class="col-span-2">
      <a :href="`mailto:${contact?.email}`">{{ contact?.email }}</a>
    </li>
    <li>
      <a :href="`tel:${contact?.phone}`">{{ contact?.phone }}</a>
    </li>
    <li class="flex">
      <i
        @click="contactUpdate(contact.id)"
        class="pi pi-pencil text-cuviolet mr-3 cursor-pointer"
      ></i>
      <i
        @click="deleteContact(contact?.id)"
        class="pi pi-trash text-red-400 mx-1 cursor-pointer"
      ></i>
    </li>
  </ul>
</template>
