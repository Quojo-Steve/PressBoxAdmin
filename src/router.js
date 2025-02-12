import { createRouter, createWebHistory } from 'vue-router';
// import { createRouter, createWebHashHistory } from "vue-router";
import { isAuthenticated } from "./services/Crypto";
import axios from "axios";

const routes = [
  {
    path: "/",
    children: [
      {
        path: "",
        component: () => import("./views/SignIn.vue"),
      },
      {
        path: "analytics", // Relative to /dashboard
        component: () => import("./views/Analytics.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    component: () => import("./IndexDashboard.vue"),
    // meta: {
    //   requiresAuth: true,
    // },
    children: [
      {
        path: "analytics", // Relative to /dashboard
        component: () => import("./views/Analytics.vue"),
      },
      {
        path: "press-release", // Relative to /dashboard
        component: () => import("./views/PressReleases.vue"),
      },
      {
        path: "press-release/:releaseid", // Relative to /dashboard
        component: () => import("./views/PressReleaseDetail.vue"),
      },
      {
        path: "settings", // Relative to /dashboard
        component: () => import("./views/PressReleases.vue"),
      },
      {
        path: "profile", // Relative to /dashboard
        component: () => import("./views/PressReleases.vue"),
      },
      {
        path: "logout", // Relative to /dashboard
        component: () => import("./views/PressReleases.vue"),
      },
      {
        path: "sales", // Relative to /dashboard
        component: () => import("./views/PressReleases.vue"),
      },
      {
        path: "users", // Relative to /dashboard
        component: () => import("./views/Users.vue"),
      },
      {
        path: "sources", // Relative to /dashboard
        component: () => import("./views/Sources.vue"),
      },
      {
        path: "industries", // Relative to /dashboard
        component: () => import("./views/Industries.vue"),
      },
      {
        path: "categories", // Relative to /dashboard
        component: () => import("./views/Categories.vue"),
      },
      {
        path: "tags", // Relative to /dashboard
        component: () => import("./views/Tags.vue"),
      },
      {
        path: "reports", // Relative to /rdashboard
        component: () => import("./views/Reports.vue"),
      },
      {
        path: "sources/:sourceId", // Relative to /dashboard
        component: () => import("./views/SourceDetails.vue"),
      },
    ],
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    }
});

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes,
//   scrollBehavior(to, from, savedPosition) {
//     return { top: 0 };
//   },
// });

router.beforeEach((to, from, next) => {
  // Check for the token and set the header on page load
  const token = localStorage.getItem("X-Pressbox-Token");

  // Set the header for all requests
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (token) {
      next();
    } else {
      next("/signin");
    }
  } else {
    next();
  }
});

export default router;
