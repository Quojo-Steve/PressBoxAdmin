<template>
    <AppSideBar />
    <main
      class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
    >
       <!-- Navbar -->
       <AppNavbar 
        title="Users" 
        breadcrumbParent="Dashboard" 
        breadcrumbCurrent="Users"
      />
      <!-- End Navbar -->
      <div class="container-fluid py-4">
        <div class="row">
          <UDataTable />
        </div>
      </div>
    </main>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    setup() {
      const selectedDate = ref("6 May - 7 May");
  
      return { selectedDate };
    },
  };
  
  </script>