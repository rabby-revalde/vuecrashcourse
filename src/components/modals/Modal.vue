<script setup>
import { reactive, watch } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";
import { useContactsStore } from "@/stores/contactStore";
import { useValidateContact } from "@/composables/validation";

const contactStore = useContactsStore();
const props = defineProps({
  contactTarget: Object,
  isOpen: Boolean,
  isEdit: Boolean,
  closeModal: Function,
  selectedID: Number | String,
});

const form = reactive({
  name: props.contactTarget?.name || "",
  email: props.contactTarget?.email || "",
  phone: props.contactTarget?.phone || "",
  created_At: props.contactTarget?.created_At || "",
});

let isValidate = reactive({
  name: "",
  email: "",
  phone: "",
});

const handleSubmit = () => {
  const contact = {
    name: form.name,
    email: form.email,
    phone: form.phone,
    transaction: [],
  };

  const { isValid } = useValidateContact(contact);

  isValidate.name = isValid.value.name;
  isValidate.email = isValid.value.email;
  isValidate.phone = isValid.value.phone;

  if (Object.values(isValid.value).some((value) => value === false)) {
    return;
  } else {
    if (props.isEdit) {
      const updateContact = {
        ...contact,
        created_At: form.created_At,
        updated_At: new Date().toLocaleDateString(),
      };
      contactStore.updateContact(props.selectedID, updateContact);
    } else {
      const ajob = { ...contact, created_At: new Date().toLocaleDateString() };
      contactStore.createJob(ajob);
    }
  }
};

watch(
  () => props.contactTarget,
  (newTarget) => {
    if (newTarget) {
      form.name = newTarget.name;
      form.email = newTarget.email;
      form.phone = newTarget.phone;
      form.created_At = newTarget.created_At;
    }

    console.log(form);
  },
  { immediate: true }
);

watch(
  () => props.isEdit,
  (newTarget) => {
    if (!newTarget) {
      form.name = "";
      form.email = "";
      form.phone = "";
    }

    console.log(form);
  },
  { immediate: true }
);
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <i
                @click="closeModal"
                class="pi pi-times text-xl text-gray-700 absolute right-5 top-5 cursor-pointer"
              ></i>

              <section class="bg-lightviolet">
                <div class="container m-auto max-w-2xl">
                  <div class="bg-white mb-4 rounded-md p-4 md:m-0">
                    <form @submit.prevent="handleSubmit">
                      <div class="mb-4">
                        <label
                          for="contact_name"
                          class="block text-gray-700 font-bold mb-2"
                          >Name
                        </label>

                        <input
                          type="text"
                          v-model="form.name"
                          id="contact_name"
                          name="name"
                          :class="`rounded w-full py-2 px-3 border-2 ${
                            isValidate.name === false
                              ? 'border-red-500 !focus-visible:border-red-500 border-2'
                              : ''
                          }`"
                          placeholder="name"
                        />
                        <p
                          v-if="isValidate.name === false"
                          class="text-[10px] text-red-600 mt-1"
                        >
                          Name is required and must be capitalized (e.g., "John
                          Doe").
                        </p>
                      </div>
                      <div class="mb-4">
                        <label
                          for="contact_email"
                          class="block text-gray-700 font-bold mb-2"
                          >Email Address</label
                        >
                        <input
                          type="email"
                          v-model="form.email"
                          id="contact_email"
                          name="contact_email"
                          :class="`rounded w-full py-2 px-3 border-2 ${
                            isValidate.email === false
                              ? 'border-red-500 !focus-visible:border-red-500 border-2'
                              : ''
                          }`"
                          placeholder="email"
                        />
                        <p
                          v-if="isValidate.email === false"
                          class="text-[10px] text-red-600 mt-1"
                        >
                          Email is required.
                        </p>
                      </div>
                      <div class="mb-4">
                        <label
                          for="contact_phone"
                          class="block text-gray-700 font-bold mb-2"
                          >Contact number</label
                        >
                        <input
                          type="tel"
                          id="contact_phone"
                          v-model="form.phone"
                          name="contact_phone"
                          :class="`rounded w-full py-2 px-3 border-2 ${
                            isValidate.phone === false
                              ? 'border-red-500 !focus-visible:border-red-500 border-2'
                              : ''
                          }`"
                          placeholder="number"
                        />
                        <p
                          v-if="isValidate.phone === false"
                          class="text-[10px] text-red-600 mt-1"
                        >
                          Required and should be 11-digits
                        </p>
                      </div>

                      <div class="grid grid-cols-2">
                        <button
                          class="mx-1 bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                          type="submit"
                        >
                          {{ isEdit ? "Update Contact" : "Add Contact" }}
                        </button>
                        <button
                          type="button"
                          class="mx-1 justify-center rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200 bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                          @click="closeModal"
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
