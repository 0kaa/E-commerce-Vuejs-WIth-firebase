import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Front/Home.vue";
import SignIn from "../views/Front/SignIn.vue";
import Login from "../views/Front/Login.vue";
// Admin
import HomeAdmin from "../views/Admin/AdminHome.vue";
import AdminProducts from "../views/Admin/AdminProducts.vue";
import AdminUsers from "../views/Admin/AdminUsers.vue";
import AdminWelcomePage from "../views/Admin/AdminWelcomePage.vue";

import { fb } from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/admin",
    component: HomeAdmin,
    children: [
      {
        path: "/",
        component: AdminWelcomePage,
        meta: { requiresAuth: true },
      },
      {
        path: "products",
        component: AdminProducts,
        meta: { requiresAuth: true },
      },
      {
        path: "users",
        component: AdminUsers,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/sign",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        fb.auth()
          .currentUser.getIdTokenResult()
          .then(function({ claims }) {
            if (claims.admin) {
              next();
            }
          });
      } else {
        next("/");
      }
    });
  } else {
    next();
  }
});

export default router;
