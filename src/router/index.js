import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/view/HomeView.vue";
import ContactsView from "@/view/ContactsView.vue";
import ContactView from "@/view/ContactView.vue";
import NotFoundView from "@/view/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/contacts",
      name: "contacts",
      component: ContactsView,
    },
    {
      path: "/contacts/:id",
      name: "contact",
      component: ContactView,
    },
    {
      path: "/:catchAll(.*)",
      namer: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
