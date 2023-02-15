import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import {RoutePath} from "@/constants/routePath";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: RoutePath.HOME,
      name: "home",
      component: HomeView,
    },
    {
      path: RoutePath.EDIT_POST,
      name: "editPost",
      component: () => import("../views/EditPostView.vue"),
    },
    {
      path: RoutePath.DELETE_POST,
      name: "deletePost",
      component: () => import("../views/DeletePostView.vue"),
    },
    {
      path: RoutePath.POSTS,
      name: "posts",
      component: () => import("../views/PostsView.vue"),
    },
    {
      path: RoutePath.ABOUT,
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
