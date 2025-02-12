<template>
  <nav class="navbar navbar-main navbar-expand-lg position-sticky mt-4 top-1 px-0 mx-4 shadow border-radius-xl z-index-sticky" id="navbarBlur" data-scroll="true">
    <div class="container-fluid py-1 px-3">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
          <li class="breadcrumb-item text-sm">
            <a class="opacity-3 text-dark" href="analytics">
              <font-awesome-icon icon="home" />
            </a>
          </li>
          <li class="breadcrumb-item text-sm">
            <a class="opacity-5 text-dark text-decoration-none" :href="navigateTo">{{ breadcrumbParent }}</a>
          </li>
          <li class="breadcrumb-item text-sm text-dark active" aria-current="page">
            {{ breadcrumbCurrent }}
          </li>
        </ol>
        <h6 class="font-weight-bolder mb-0">{{ title }}</h6>
      </nav>

      <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
        <div class="ms-md-auto pe-md-3 d-flex align-items-center">
          <div class="input-group input-group-outline">
            <label class="form-label">Search here</label>
            <input type="text" class="form-control" />
          </div>
        </div>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item">
            <a href="/profile" class="nav-link text-body p-0 position-relative">
              <font-awesome-icon icon="circle-user" />
            </a>
          </li>
          <li class="nav-item px-3">
            <a href="javascript:;" class="nav-link text-body p-0">
              <font-awesome-icon icon="gear" />
            </a>
          </li>
          <li class="nav-item dropdown pe-2">
            <a href="javascript:;" class="nav-link text-body p-0 position-relative" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              <font-awesome-icon icon="bell" />
              <span class="position-absolute top-5 start-100 translate-middle badge rounded-pill bg-danger border border-white small py-1 px-2">
                <span class="small">11</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    breadcrumbParent: {
      type: String,
      required: false,
      default: "Dashboard"
    },
    breadcrumbCurrent: {
      type: String,
      required: true
    },
    navigateTo: {
      type: String,
      required: false
    },
  }
};
</script>
