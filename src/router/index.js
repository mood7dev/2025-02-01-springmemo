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
      path: "/memo/:id", //RL에서 id 값을 동적으로 받아, 해당 메모의 상세 페이지로 이동하게 해주는 라우터 경로
      component: () => import("@/views/Detail.vue"),
    },
  ],
});

export default router;
