<template>
  <aside
    class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark"
  >
    <div class="sidenav-header">
      <a class="navbar-brand m-0" href="/" target="_blank">
        <img
          src="../assets/img/pressbox-logo.png"
          class="navbar-brand-img h-100"
          alt="main_logo"
        />
      </a>
    </div>
    <hr class="horizontal light mt-0 mb-2" />
    <div class="collapse navbar-collapse w-auto h-auto">
      <ul class="navbar-nav">
        <!-- ✅ Profile Section -->
        <li class="nav-item mb-2 mt-0">
          <a
            data-bs-toggle="collapse"
            href="#ProfileNav"
            class="nav-link text-white"
            role="button"
            aria-expanded="false"
          >
            <img src="../assets/img/team-3.jpg" class="avatar" />
            <span class="nav-link-text ms-2 ps-1">Ahmed Ashafa</span>
            <font-awesome-icon icon="caret-down" class="dropdown1" />
          </a>

          <div class="collapse" id="ProfileNav">
            <ul class="nav">
              <li class="nav-item" :class="{ active: isActive('/dashboard/profile') }">
                <router-link
                  class="nav-link text-white"
                  :class="{ active: isActive('/dashboard/profile') }"
                  to="/dashboard/profile"
                >
                  <span class="sidenav-mini-icon">
                    <font-awesome-icon icon="user" />
                  </span>
                  <span class="sidenav-normal ms-3 ps-1"> My Profile </span>
                </router-link>
              </li>
              <li class="nav-item" :class="{ active: isActive('/dashboard/settings') }">
                <router-link
                  class="nav-link text-white"
                  :class="{ active: isActive('/dashboard/settings') }"
                  to="/dashboard/settings"
                >
                  <span class="sidenav-mini-icon">
                    <font-awesome-icon icon="gear" />
                  </span>
                  <span class="sidenav-normal ms-3 ps-1"> Settings </span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link text-white" to="/dashboard/logout">
                  <span class="sidenav-mini-icon">
                    <font-awesome-icon
                      icon="person-walking-dashed-line-arrow-right"
                    />
                  </span>
                  <span class="sidenav-normal ms-3 ps-1"> Logout </span>
                </router-link>
              </li>
            </ul>
          </div>
        </li>

        <hr class="horizontal light mt-0" />
        <li class="nav-item">
          <a
            data-bs-toggle="collapse"
            href="#dashboardsExamples"
            class="nav-link text-white"
          >
            <i class="material-icons-round opacity-10">dashboard</i>
            <span class="nav-link-text ms-2 ps-1">Dashboard</span>
            <font-awesome-icon icon="caret-down" class="dropdown1" />
          </a>
          <div class="collapse show" id="dashboardsExamples">
            <ul class="nav">
              <li class="nav-item" :class="{ active: isActive('/dashboard/analytics') }">
                <router-link
                  class="nav-link text-white"
                  :class="{ active: isActive('/dashboard/analytics') }"
                  to="/dashboard/analytics"
                >
                  <span class="sidenav-mini-icon">
                    <font-awesome-icon icon="chart-simple" />
                  </span>
                  <span class="sidenav-normal ms-2 ps-1"> Analytics </span>
                </router-link>
              </li>
              <li
                class="nav-item"
                :class="{ active: isActive('/dashboard/press-release') }"
              >
                <router-link
                  class="nav-link text-white"
                  :class="{ active: isActive('/dashboard/press-release') }"
                  to="/dashboard/press-release"
                >
                  <span class="sidenav-mini-icon">
                    <font-awesome-icon icon="bullhorn" />
                  </span>
                  <span class="sidenav-normal ms-2 ps-1"> Press Releases </span>
                </router-link>
              </li>
              <li class="nav-item" :class="{ active: isActive('/dashboard/sales') }">
                <router-link
                  class="nav-link text-white"
                  :class="{ active: isActive('/dashboard/sales') }"
                  to="/dashboard/sales"
                >
                  <span class="sidenav-mini-icon">
                    <font-awesome-icon icon="money-check-dollar" />
                  </span>
                  <span class="sidenav-normal ms-2 ps-1"> Subscriptions </span>
                </router-link>
              </li>
              <li class="nav-item" :class="{ active: isActive('/dashboard/sources') }">
                <router-link
                  class="nav-link text-white"
                  :class="{ active: isActive('/dashboard/sources') }"
                  to="/dashboard/sources"
                >
                  <span class="sidenav-mini-icon">
                    <font-awesome-icon icon="building" />
                  </span>
                  <span class="sidenav-normal ms-2 ps-1"> Sources </span>
                </router-link>
              </li>
              <li class="nav-item" :class="{ active: isActive('/dashboard/users') }">
                <router-link
                  class="nav-link text-white"
                  :class="{ active: isActive('/dashboard/users') }"
                  to="/dashboard/users"
                >
                  <span class="sidenav-mini-icon">
                    <font-awesome-icon icon="users" />
                  </span>
                  <span class="sidenav-normal ms-2 ps-1"> Users </span>
                </router-link>
              </li>
              <li class="nav-item" :class="{ active: isActive('/dashboard/industries') }">
                <router-link
                  class="nav-link text-white"
                  :class="{ active: isActive('/dashboard/industries') }"
                  to="/dashboard/industries"
                >
                  <span class="sidenav-mini-icon">
                    <i class="fa-duotone fa-solid fa-industry"></i>
                  </span>
                  <span class="sidenav-normal ms-2 ps-1"> Industries </span>
                </router-link>
              </li>
              <li class="nav-item" :class="{ active: isActive('/dashboard/categories') }">
                <router-link
                  class="nav-link text-white"
                  :class="{ active: isActive('/dashboard/categories') }"
                  to="/dashboard/categories"
                >
                  <span class="sidenav-mini-icon">
                    <i class="fa-sharp-duotone fa-solid fa-layer-group"></i>
                  </span>
                  <span class="sidenav-normal ms-2 ps-1"> Categories </span>
                </router-link>
              </li>
              <li class="nav-item" :class="{ active: isActive('/dashboard/tags') }">
                <router-link
                  class="nav-link text-white"
                  :class="{ active: isActive('/dashboard/tags') }"
                  to="/dashboard/tags"
                >
                  <span class="sidenav-mini-icon">
                    <i class="fa-duotone fa-solid fa-tag"></i>
                  </span>
                  <span class="sidenav-normal ms-2 ps-1"> Tags </span>
                </router-link>
              </li>
              <li class="nav-item" :class="{ active: isActive('/dashboard/reports') }">
                <router-link
                  class="nav-link text-white"
                  :class="{ active: isActive('/dashboard/reports') }"
                  to="/dashboard/reports"
                >
                  <span class="sidenav-mini-icon"
                    ><font-awesome-icon icon="book" />
                  </span>
                  <span class="sidenav-normal ms-2 ps-1"> Reports </span>
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  name: "Sidebar",
  setup() {
    const route = useRoute();

    // ✅ Fix: Highlight active route including subpaths
    const isActive = (path) => {
      return route.path.startsWith(path); // Ensures subpaths like `/dashboard/analytics` are active
    };

    return { isActive };
  },
};
</script>

<style>
/* ✅ Styling for active class */
.nav-item.active,
.nav-link.active {
  background-color: #4caf50;
  border-radius: 5px;
  margin: 0px 20px;
}
</style>