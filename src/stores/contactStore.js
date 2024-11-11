import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "vue-toastification";
import router from "@/router";
const toast = useToast();

export const useContactsStore = defineStore("contacts", {
  state: () => ({
    contacts: [],
    isLoading: false,
    error: null,
    contact: {},
  }),
  getters: {
    sortedContacts() {
      return this.contacts.sort(
        (a, b) => new Date(b.created_At) - new Date(a.created_At)
      );
    },
  },
  actions: {
    async fetchContacts() {
      console.log("called Fetch all contacts api");
      this.isLoading = true;
      try {
        const response = await axios.get("/api/contacts");
        this.contacts = response.data;
      } catch (error) {
        console.error("Fetch error", error);
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
    async fetchContact(id) {
      this.isLoading = true;
      try {
        const response = await axios.get(`/api/contacts/${id}`);
        this.contact = response.data;
      } catch (error) {
        console.error("Fetch error", error);
      } finally {
        this.isLoading = false;
      }
    },
    async createJob(newJob) {
      this.isLoading = true;

      try {
        const res = await axios.post("/api/contacts", newJob);
        router.push(`/contacts/${res.data.id}`);
        toast.success("Contact added successfully!", {
          position: "bottom-right",
        });
      } catch (error) {
        console.error("Fetch error", error);
        toast.error("Fetch error!", {
          position: "bottom-right",
        });
      } finally {
        this.isLoading = false;
        this.fetchContacts();
      }
    },
    async deleteContact(id) {
      this.isLoading = true;

      try {
        await axios.delete(`/api/contacts/${id}`);
        router.push(`/contacts`);
        toast.success("Job Deleted Successfuly!", {
          position: "bottom-right",
        });
      } catch (error) {
        console.error("Fetch error", error);
        toast.error("Contact Not Deleted!", {
          position: "bottom-right",
        });
      } finally {
        this.isLoading = false;
        this.fetchContacts();
      }
    },
    async updateContact(id, updatedJob) {
      this.isLoading = true;

      try {
        const res = await axios.put(`/api/contacts/${id}`, updatedJob);
        router.push(`/contacts/${res.data.id}`);
        toast.success("Contact updated Successfully!", {
          position: "bottom-right",
        });
      } catch (error) {
        console.error("Fetch error", error);
        toast.error("Fetch error!", {
          position: "bottom-right",
        });
      } finally {
        this.isLoading = false;
        this.fetchContacts();
      }
    },
  },
});
