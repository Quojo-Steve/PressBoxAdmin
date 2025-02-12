<template>
  <AppSideBar />
  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
  >
    <!-- Navbar -->
    <AppNavbar
      title="Analytics"
      breadcrumbParent="Dashboard"
      breadcrumbCurrent="Analytics"
    />
    <!-- End Navbar -->
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-sm-4">
          <TopInfo
            title="Sales"
            amount="$230,220"
            percentage="+55%"
            subtitle="since last month"
            :isPositive="false"
            :dateRange="selectedDate"
            @update:dateRange="selectedDate = $event"
          />
        </div>
        <div class="col-sm-4">
          <TopInfo
            title="Customers"
            amount="420"
            percentage="+55%"
            subtitle="since last month"
            :isPositive="true"
            :dateRange="selectedDate"
            @update:dateRange="selectedDate = $event"
          />
        </div>
        <div class="col-sm-4">
          <TopInfo
            title="Avg. Revenue"
            amount="$230,220"
            percentage="+55%"
            subtitle="since last month"
            :isPositive="true"
            :dateRange="selectedDate"
            @update:dateRange="selectedDate = $event"
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-lg-4 col-sm-6">
          <div class="card h-100">
            <div class="card-header pb-0 p-3">
              <div class="d-flex justify-content-between">
                <h6 class="mb-0">Channels</h6>
                <button
                  type="button"
                  class="btn btn-icon-only btn-rounded btn-outline-secondary mb-0 ms-2 btn-sm d-flex align-items-center justify-content-center"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title=""
                  data-bs-original-title="See traffic channels"
                >
                  <i class="material-icons text-sm">priority_high</i>
                </button>
              </div>
            </div>
            <div class="card-body card1 pb-0 p-3 mt-4">
              <div class="row">
                <div class="col-7 chart1 text-start">
                  <div class="chart">
                    <div id="chart-line" class="chart-canvas" height="300">
                      <PieChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer pt-0 pb-0 p-3 d-flex align-items-center">
              <div class="w-60">
                <p class="text-sm">
                  More than <b>1,200,000</b> sales are made using referral
                  marketing, and <b>700,000</b> are from social media.
                </p>
              </div>
              <div class="w-40 text-end">
                <a class="btn bg-light mb-0 text-end" href="javascript:;"
                  >Read more</a
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8 col-sm-6 mt-sm-0 mt-4">
          <div class="card">
            <div class="card-header pb-0 p-3">
              <div class="d-flex justify-content-between">
                <h6 class="mb-0">Revenue</h6>
                <button
                  type="button"
                  class="btn btn-icon-only btn-rounded btn-outline-secondary mb-0 ms-2 btn-sm d-flex align-items-center justify-content-center"
                  data-bs-toggle="tooltip"
                  data-bs-placement="left"
                  data-bs-original-title="See which ads perform better"
                >
                  <i class="material-icons text-sm">priority_high</i>
                </button>
              </div>
            </div>
            <div class="card-body p-3">
              <div class="chart">
                <div id="chart-line" class="chart-canvas" height="300">
                  <BarChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DataTable />
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
  data() {
    
  },
  methods: {
    editItem(index) {
      console.log('Edit item:', this.items[index]);
    },
    deleteItem(index) {
      this.items.splice(index, 1);
    },
    getActionIcons(index) {
      return `
        <i class="fas fa-edit text-primary mr-2" onclick="this.$parent.editItem(${index})"></i>
        <i class="fas fa-trash-alt text-danger" onclick="this.$parent.deleteItem(${index})"></i>
      `;
    },
  },
};
</script>

<style scoped>
.fa-edit, .fa-trash-alt {
  cursor: pointer;
}
.fa-edit:hover {
  color: #0056b3 !important;
}
.fa-trash-alt:hover {
  color: #a71d2a !important;
}
</style>