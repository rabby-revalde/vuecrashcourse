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
  actions: {
    async fetchContacts() {
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
        this.isLoading = false;
        router.push(`/contacts/${res.data.id}`);
        toast.success("Contact added successfully!", {
          position: "bottom-right",
        });
      } catch (error) {
        console.error("Fetch error", error);
        toast.error("Fetch error!", {
          position: "bottom-right",
        });
      }
    },
    async deleteContact(id) {
      this.isLoading = true;
      const confirmDel = confirm("Are you sure to delete this Contact?");
      try {
        if (confirmDel) {
          await axios.delete(`/api/contacts/${id}`);
          router.push(`/contacts`);
          toast.success("Job Deleted Successfuly!", {
            position: "bottom-right",
          });
        }
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
      }
    },
  },
});
