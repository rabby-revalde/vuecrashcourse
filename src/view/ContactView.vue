<script setup>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useContactsStore } from "@/stores/contactStore";
import BackButton from "@/components/BackButton.vue";

const route = useRoute();
const contactID = route.params.id;
const store = useContactsStore();

onMounted(() => store.fetchContact(contactID));
const dummyTransaction = [
  { id: "001", date: "9/23/2024", mechant: "Penshoppe", amount: 1000 },
  { id: "002", date: "9/24/2024", mechant: "Bench", amount: 2000 },
  { id: "003", date: "9/25/2024", mechant: "Unitop", amount: 4000 },
  { id: "004", date: "9/26/2024", mechant: "Grandmall", amount: 10000 },
  { id: "005", date: "9/27/2024", mechant: "Penshoppe", amount: 3000 },
  { id: "006", date: "9/28/2024", mechant: "Penshoppe", amount: 5000 },
];
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
    </div>
    <div class="container mx-auto">
      <ul class="grid grid-cols-4 my-2 py-2 px-5 text-md bg-primary text-white">
        <li class="font-bold">Date</li>
        <li class="font-bold col-span-2">Merchant</li>
        <li class="font-bold">Amount</li>
      </ul>
      <ul
        v-for="(transaction, idx) in dummyTransaction"
        :key="idx"
        :class="`grid grid-cols-4 my-2 py-2 px-5 rounded text-sm bg-semiviolet`"
      >
        <li class="font-bold text-primary">{{ transaction?.date }}</li>
        <li class="font-bold text-primary col-span-2">
          {{ transaction?.mechant }}
        </li>
        <li class="font-bold text-primary">{{ transaction?.amount }}</li>
      </ul>
      <div class="total flex py-10">
        <h2 class="text-2xl">total</h2>
        <p class="ml-auto">56,000</p>
      </div>
    </div>
  </section>
  <!-- show loading spinner on fetch -->
  <div v-else class="text-center text-gray-500 py-6">
    <PulseLoader />
  </div>
</template>
