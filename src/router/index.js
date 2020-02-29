import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";

const firebase = require("firebase/app");

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/signin",
      name: "signin",
      component: () =>
        import(/* webpackChunkName: "signin" */ "../views/Signin.vue")
    },
    // Auth routes
    {
      path: "/add-book",
      name: "add-book",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "add-book" */ "../views/add-book.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/book-requests",
      name: "requests",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "request" */ "../views/Requests.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/received-books",
      name: "received",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "received" */ "../views/Received.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/profile",
      name: "profile",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "received" */ "../views/Profile.vue"),
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const { currentUser } = firebase.auth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next("/");
  } else if (!requiresAuth && currentUser) {
    next("dashboard");
  } else {
    next();
  }
});

export default router;
