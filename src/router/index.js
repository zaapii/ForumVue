import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage";
import ThreadPageShow from "@/pages/ThreadPageShow";
import NotFound from "@/pages/PageNotFound";
import ForumPage from "@/pages/ForumPage";
import CategoryPage from "@/pages/CategoryPage";
import ProfilePage from "@/pages/ProfilePage";
import ThreadCreate from "@/pages/ThreadCreate";
import ThreadEdit from "@/pages/ThreadEdit";
import RegisterUser from "@/pages/RegisterUser";
import LoginUser from "@/pages/LoginUser";
import store from "@/store";
import { findById } from "@/helpers";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  {
    path: "/logout",
    name: "SignOut",
    async beforeEnter(to, from) {
      await store.dispatch("signOut");
      return { name: "Home" };
    },
  },
  { path: "/forum/:id", name: "ForumPage", component: ForumPage, props: true },
  {
    path: "/register",
    name: "Register",
    component: RegisterUser,
    meta: { requiresGuest: true },
  },
  {
    path: "/login",
    name: "LoginUser",
    component: LoginUser,
    meta: { requiresGuest: true },
  },
  {
    path: "/category/:id",
    name: "CategoryPage",
    component: CategoryPage,
    props: true,
  },
  {
    path: "/me",
    name: "ProfilePage",
    component: ProfilePage,
    meta: { toTop: true, smoothScroll: true, requiresAuth: true },
  },
  {
    path: "/me/edit",
    name: "ProfileEdit",
    component: ProfilePage,
    props: { edit: true },
    meta: { requiresAuth: true },
  },
  {
    path: "/forum/:forumId/thread/create",
    name: "ThreadCreate",
    component: ThreadCreate,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/thread/:id/edit",
    name: "ThreadEdit",
    component: ThreadEdit,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/thread/:id",
    name: "ThreadShow",
    component: ThreadPageShow,
    props: true,
    async beforeEnter(to, from, next) {
      await store.dispatch("fetchThread", { id: to.params.id });
      const threadExists = findById(store.state.threads, to.params.id);

      if (threadExists) {
        return next();
      } else {
        next({
          name: "NotFound",
          params: { pathMatch: to.path.substring(1).split("/") },
          query: to.query,
          hash: to.hash,
        });
      }
    },
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    const scroll = {};
    if (to.meta.toTop) scroll.top = 0;
    if (to.meta.smoothScroll) scroll.behavior = "smooth";
    return scroll;
  },
});

router.beforeEach(async (to, from) => {
  await store.dispatch("initAuthentication");
  store.dispatch("unsubscribeAllSnapshots");
  if (to.meta.requiresAuth && !store.state.authId) {
    return { name: "LoginUser", query: { redirectTo: to.path } };
  }
  if (to.meta.requiresGuest && store.state.authId) {
    return { name: "Home" };
  }
});

export default router;
