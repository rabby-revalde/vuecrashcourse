<script setup>
import { ref } from "vue";
import { useContactsStore } from "@/stores/contactStore";
import { RouterLink } from "vue-router";
import GridView from "./GridList.vue";
import ListView from "./List.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import Modal from "../modals/Modal.vue";

import ButtonComponent from "../Button.vue";
const contactStore = useContactsStore();

const isActiveView = ref(true);
const toggleView = () => {
  isActiveView.value = !isActiveView.value;
};

defineProps({
  limit: Number,
  isShowButton: {
    type: Boolean,
    default: true,
  },
});
const isOpen = ref(false);
const isEdit = ref(false);
const selectedID = ref();
const contactTarget = ref({});

const closeModal = () => {
  isOpen.value = false;
  isEdit.value = false;
};
const openModal = () => {
  isOpen.value = true;
};

const contactUpdate = (id) => {
  isEdit.value = true;
  selectedID.value = id;
  contactTarget.value = contactStore.contacts.find((job) => job.id === id);
  openModal();
};

const addNewContact = () => {
  isEdit.value = false;
  openModal();
};
const deleteContact = (id) => {
  contactStore.deleteContact(id);
};
</script>

<template>
  <Modal
    :closeModal="closeModal"
    :isOpen="isOpen"
    :contactTarget="contactTarget"
    :isEdit="isEdit"
    :selectedID="selectedID"
  />

  <section class="bg-blue-50 px-4 py-10">
    <div class="container m-auto">
      <div class="flex mb-5">
        <div class="mb-4">
          <h2 class="text-3xl font-bold text-primary mb-3">
            Contacts Information
          </h2>
          <p>
            Your list of customer appear here. To add a new customer, <br />
            click on the Add new contact button.
          </p>
        </div>
        <div class="mode-view ml-auto flex self-end" v-if="!isShowButton">
          <div class="self-center mr-10">
            <ButtonComponent @click="addNewContact" type="button">
              + Add new contact
            </ButtonComponent>
          </div>
          <div class="self-center">
            <i
              v-if="isActiveView"
              @click="toggleView"
              class="cursor-pointer hover:bg-violet-200 pi pi-list text-2xl text-primary border-2 rounded p-1 border-primary m-1"
            ></i>
            <i
              v-else
              @click="toggleView"
              class="hover:bg-violet-200 cursor-pointer pi pi-th-large text-2xl text-primary border-2 rounded p-1 border-primary m-1"
            ></i>
          </div>
        </div>
      </div>

      <!-- show loading spinner on fetch -->
      <div v-if="contactStore.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>
      <div v-else class="border-t pt-6">
        <div
          v-if="isActiveView"
          class="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4"
        >
          <GridView
            v-for="(contact, index) in contactStore.sortedContacts.slice(
              0,
              limit || contactStore.contacts.length
            )"
            :key="index"
            :contact="contact"
            :contactUpdate="contactUpdate"
            :deleteContact="deleteContact"
          />
        </div>
        <div v-else>
          <ul
            class="grid grid-cols-5 my-2 py-2 px-5 text-md bg-primary text-white"
          >
            <li class="font-bold">Name</li>
            <li class="font-bold col-span-2">Email</li>
            <li class="font-bold">Phone</li>
            <li class="font-bold">Action</li>
          </ul>
          <ListView
            v-for="(contact, index) in contactStore.contacts.slice(
              0,
              limit || contactStore.contacts.length
            )"
            :key="contact.id"
            :contact="contact"
            :contactUpdate="contactUpdate"
            :deleteContact="deleteContact"
            :index="index"
          />
        </div>
      </div>
      <section v-if="isShowButton" class="m-auto max-w-lg my-10 px-6">
        <RouterLink
          to="/contacts"
          class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
          >View All Contacts</RouterLink
        >
      </section>
    </div>
  </section>
</template>
