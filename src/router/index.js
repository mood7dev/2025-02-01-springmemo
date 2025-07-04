import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home", //라우트 이름
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/memo/add",
      component: () => import("@/views/Form.vue"),
    },
    {
      path: "/memo/:id",
      component: () => import("@/views/Detail.vue"),
    },
  ],
});

export default router;
