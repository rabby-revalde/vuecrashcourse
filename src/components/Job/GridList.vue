<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  contact: Object,
  contactUpdate: Function,
  deleteContact: Function,
});
</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative">
    <div class="p-4 mb-14 md:mb-0">
      <div>
        <div class="text-gray-600 my-2 flex">
          <RouterLink :to="`/contacts/${contact.id}`">
            <h4 class="hover:text-primary text-lg font-bold underline">
              {{ contact.name }}
            </h4>
          </RouterLink>
          <div class="ml-auto">
            <button @click="contactUpdate(contact.id)">
              <i class="pi pi-pencil text-cuviolet mr-3 cursor-pointer"></i>
            </button>
            <i
              @click="deleteContact(contact.id)"
              class="pi pi-trash text-red-400 mx-1 cursor-pointer"
            ></i>
          </div>
        </div>

        <p class="text-sm">
          <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
        </p>
        <p class="text-sm">
          <a :href="`tel:${contact.phone}`">{{ contact.phone }}</a>
        </p>
      </div>
    </div>
  </div>
</template>
