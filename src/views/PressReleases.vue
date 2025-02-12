<template>
  <AppSideBar />
  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
  >
    <!-- Navbar -->
    <AppNavbar
      title="Press Releases"
      breadcrumbParent="Dashboard"
      breadcrumbCurrent="Press Releases"
    />
    <!-- End Navbar -->
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-sm-6">
          <TopInfo title="Pending Approval" amount="50" :isPositive="true" />
        </div>
        <div class="col-sm-6">
          <TopInfo title="Approved Releases" amount="230" :isPositive="true" />
        </div>
        <div class="container-fluid py-4">
          <div class="row mt-2">
            <div class="col-12">
              <div class="card">
                <!-- Card header -->
                <div class="card-header">
                  <h5 class="mb-0">Press Releases</h5>
                  <p class="text-sm mb-0">
                    All press releases both pending and released
                  </p>
                </div>
                <div class="table-responsive">
                  <table class="table table-flush" id="datatable-search">
                    <thead class="thead-light">
                      <tr>
                        <th>Blog Title</th>
                        <th>Published Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(release, index) in pressReleases"
                        :key="release.id"
                      >
                        <td class="text-sm font-weight-normal">
                          {{ release.title }}
                        </td>
                        <td class="text-sm font-weight-normal">
                          {{ release.published_on }}
                        </td>
                        <td class="text-sm font-weight-normal">
                          <p class="text-sm font-weight-normal mb-0 cat">
                            {{ release.status }}
                          </p>
                        </td>
                        <td class="text-sm font-weight-normal">
                          <i
                            class="fas fa-edit text-primary mr-2"
                            @click="onEdit(release)"
                          ></i>
                          <i
                            class="fas fa-trash-alt text-danger"
                            @click="onDelete(release, index)"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-if="isLoading" class="text-center p-3">
                  <span class="spinner-border spinner-border-sm"></span>
                  Loading...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from "vue";
import { DataTable } from "simple-datatables";
import { Axios } from "../services/Axios";
import { toast } from "vue3-toastify";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default {
  setup() {
    const pressReleases = ref([]);
    const isLoading = ref(false);
    const limitBy = ref(20);
    const sortBy = ref("created_at");
    const orderBy = ref("desc");
    const page = ref(1);
    const router = useRouter();
    let table = null;

    const fetchPressReleases = async () => {
      try {
        isLoading.value = true;
        const { data } = await Axios.get("/superadmin/releases", {
          params: { limit: limitBy.value },
        });

        if (data.status) {
          pressReleases.value = data.data;
          reinitializeTable();
          // toast.success("Press releases loaded successfully!");
        } else {
          // toast.warning("No press releases found.");
          console.log("No press releases found.");
        }
      } catch (error) {
        toast.error("Error fetching press releases.");
      } finally {
        isLoading.value = false;
      }
    };

    // ✅ Delete Press Release
    const onDelete = async (release, index) => {
      Swal.fire({
        title: "DELETE PRESS RELEASE?",
        text: `Are you sure you want to delete "${release.title}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const { data } = await Axios.delete(
              `/press-releases/${release.id}`
            );
            if (data.status) {
              pressReleases.value.splice(index, 1);
              toast.success("Press release deleted successfully!");
            }
          } catch (error) {
            toast.error("Failed to delete press release.");
          }
        }
      });
    };

    // ✅ Edit Press Release
    const onEdit = (source) => {
  router.push(`/dashboard/press-release/${source}`);
};

    // ✅ Initialize DataTable
    const reinitializeTable = () => {
      if (table) {
        table.destroy();
      }
      setTimeout(() => {
        table = new DataTable("#datatable-search", {
          searchable: true,
          fixedHeight: true,
          perPage: 10,
          perPageSelect: [5, 10, 15, 20],
        });
      }, 100); // Give a small delay for re-render
    };

    onMounted(fetchPressReleases);

    return { pressReleases, isLoading, onDelete, onEdit };
  },
};
</script>

<style scoped>
.fa-edit,
.fa-trash-alt {
  cursor: pointer;
}
.fa-edit:hover {
  color: #0056b3 !important;
}
.fa-trash-alt:hover {
  color: #a71d2a !important;
}
</style>
