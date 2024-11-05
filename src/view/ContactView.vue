<script setup>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { useContactsStore } from "@/stores/contactStore";
import BackButton from "@/components/BackButton.vue";

const route = useRoute();
const contactID = route.params.id;
const store = useContactsStore();

const deleteContact = async () => {
  store.deleteContact(contactID);
};

onMounted(() => store.fetchContact(contactID));
</script>

<template>
  <BackButton />
  <section v-if="!store.isLoading" class="bg-lightviolet">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-4 w-full gap-6 justify-center">
        <div class="col-span-1">
          <p class="text-gray-600">Full Name</p>
          <p class="text-lg font-bold">{{ store.contact.name }}</p>
        </div>
        <div class="col-span-2">
          <p class="text-gray-600">Email Address</p>
          <p class="text-lg font-semibold">{{ store.contact.email }}</p>
        </div>
        <div class="col-span-1">
          <p class="text-gray-600">Contact Number</p>
          <p class="text-lg font-semibold">{{ store.contact.phone }}</p>
        </div>
        <p></p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 class="text-xl font-bold mb-6">Manage Contact</h3>
        <RouterLink
          :to="`/jobs/edit/${store.contact.id}`"
          class="bg-primary hover:bg-secondary text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
          >Edit Contact</RouterLink
        >
        <button
          @click="deleteContact"
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
        >
          Delete Contact
        </button>
      </div>
    </div>
  </section>
  <!-- show loading spinner on fetch -->
  <div v-else="store.isLoading" class="text-center text-gray-500 py-6">
    <PulseLoader />
  </div>
</template>
