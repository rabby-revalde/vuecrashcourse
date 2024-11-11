<script setup>
import { ref } from "vue";
import Button from "../Button.vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";

const props = defineProps({
  id: String | Number,
  deleteContact: Function,
});
const isOpenConf = ref(false);
const closeModalConf = () => {
  isOpenConf.value = false;
};
const openModalConf = () => {
  isOpenConf.value = true;
};
</script>

<template>
  <i
    @click="openModalConf"
    class="pi pi-trash text-red-900 mx-1 cursor-pointer"
  ></i>
  <TransitionRoot appear :show="isOpenConf" as="template">
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
                @click="closeModalConf"
                class="pi pi-times text-xl text-gray-700 absolute right-5 top-5 cursor-pointer"
              ></i>
              <div class="p-4">
                <h2 class="text-xl font-bold">
                  Are you sure to delete this contact?
                </h2>
                <div class="flex justify-around mt-10">
                  <Button :class="`border-0 w-full`" @click="deleteContact(id)"
                    >Yes</Button
                  >
                  <Button
                    :class="`bg-transparent text-black border ml-2 hover:bg-gray-100 w-full`"
                    @click="closeModalConf"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
