<template>
  <AppSideBar />
  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
  >
    <AppNavbar
      title="Sources"
      breadcrumbParent="Dashboard"
      breadcrumbCurrent="Sources"
    />
    <div class="container-fluid py-4">
      <div class="row">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header ind-header">
                  <div>
                    <h5 class="mb-0">Sources</h5>
                    <p class="text-sm mb-0">All system Sources</p>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-flush" id="datatable-search">
                    <thead class="thead-light">
                      <tr>
                        <th>Logo</th>
                        <th>Name</th>
                        <th>Industry</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(tag, index) in paginatedTags" :key="tag.id">
                        <td class="text-sm font-weight-normal">
                          <img
                            :src="tag.logo || defaultLogo"
                            alt="Source Logo"
                            class="img-fluid rounded-circle"
                            style="width: 40px; height: 40px; object-fit: cover"
                          />
                        </td>
                        <td class="text-sm font-weight-normal tableau">
                          {{ tag.name }}
                        </td>
                        <td class="text-sm font-weight-normal tableau">
                          {{ tag.industry }}
                        </td>
                        <td class="text-sm font-weight-normal">
                          <p
                            v-if="tag.status !== 'inactive'"
                            class="text-sm font-weight-normal cat"
                          >
                            {{ tag.status }}
                          </p>
                          <p
                            v-else
                            class="text-sm font-weight-normal cat1 text-light"
                          >
                            {{ tag.status }}
                          </p>
                        </td>
                        <td
                          class="text-sm font-weight-normal tableau mt-3 action"
                        >
                          <div class="action1">
                            <i
                              class="fas fa-edit mr-2 light1"
                              @click="onEdit(tag)"
                              style="
                                cursor: pointer;
                                color: rgba(0, 0, 255, 0.4);
                              "
                            ></i>
                          </div>
                          <div v-if="tag.status !== 'inactive'">
                            <i
                            class="fa-solid fa-ban light1"
                            @click="onDelete(tag, index)"
                              style="
                                cursor: pointer;
                                color: rgba(255, 0, 0, 0.4);
                              "
                            ></i>
                          </div>
                          <div v-else>
                            <i
                              class="fa-solid fa-arrow-rotate-left light1"
                              @click="restoreTag(tag, index)"
                              style="
                                cursor: pointer;
                                color: rgba(255, 0, 0, 0.4);
                              "
                            ></i>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Pagination Controls -->
                <div class="pagination-container">
                  <nav aria-label="Page navigation">
                    <ul class="pagination">
                      <li
                        class="page-item"
                        :class="{ disabled: currentPage === 1 }"
                      >
                        <a
                          class="page-link"
                          href="#"
                          aria-label="Previous"
                          @click.prevent="prevPage"
                        >
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      <li
                        class="page-item"
                        v-for="page in totalPages"
                        :key="page"
                        :class="{ active: currentPage === page }"
                      >
                        <a
                          class="page-link"
                          href="#"
                          @click.prevent="goToPage(page)"
                          >{{ page }}</a
                        >
                      </li>
                      <li
                        class="page-item"
                        :class="{ disabled: currentPage >= totalPages }"
                      >
                        <a
                          class="page-link"
                          href="#"
                          aria-label="Next"
                          @click.prevent="nextPage"
                        >
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                  <div class="pagination-info">
                    Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
                    {{ Math.min(currentPage * itemsPerPage, tags.length) }} of
                    {{ tags.length }} entries
                  </div>
                </div>
                <!-- End Pagination Controls -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { Axios } from "../services/Axios";
import { toast } from "vue3-toastify";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default {
  setup() {
    const tags = ref([]);
    const router = useRouter();
    const defaultLogo = ref('https://i.pinimg.com/736x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg'); // Placeholder image

    // Pagination Variables
    const currentPage = ref(1);
    const itemsPerPage = ref(8);

    // Compute paginated data
    const paginatedTags = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      return tags.value.slice(start, start + itemsPerPage.value);
    });

    // Total pages
    const totalPages = computed(() =>
      Math.ceil(tags.value.length / itemsPerPage.value)
    );

    // Pagination Methods
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    // Fetch sources from API
    const fetchIndustries = async () => {
      try {
        const response = await Axios.get("/superadmin/sources");

        if (response.data.status) {
          tags.value = response.data.data;
        } else {
          toast.error("Failed to fetch sources.");
        }
      } catch (error) {
        toast.error(`Error fetching sources: ${error.message}`);
      }
    };

    onMounted(fetchIndustries);

    // Delete Source
    const onDelete = async (item, index) => {
      Swal.fire({
        title: "Deactivate Source?",
        text: `Are you sure you want to deactivate ${item.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, deactivate it!",
      }).then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          try {
            const { data } = await Axios.put(
              `/superadmin/deactivate-source/${item.source_id}`
            );

            if (data.status) {
              toast.success(`${item.name} deactivated successfully!`);
              fetchIndustries(); // Refresh data
            } else {
              toast.error("Failed to deactivate source.");
            }
          } catch (error) {
            toast.error(`Error: ${error.message}`);
          }
        }
      });
    };

    // Restore Source
    const restoreTag = async (item, index) => {
      Swal.fire({
        title: "Reactivate Source?",
        text: `Are you sure you want to reactivate ${item.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, reactivate it!",
      }).then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          try {
            const { data } = await Axios.put(
              `/superadmin/reactivate-source/${item.source_id}`
            );

            if (data.status) {
              toast.success(`${item.name} reactivated successfully!`);
              fetchIndustries(); // Refresh data
            } else {
              toast.error("Failed to reactivate source.");
            }
          } catch (error) {
            toast.error(`Error: ${error.message}`);
          }
        }
      });
    };

    // Edit Source
    const onEdit = (source) => {
      if (source.source_id) {
        router.push(`/dashboard/sources/${source.source_id}`);
      } else {
        toast.error("Invalid source ID");
      }
    };

    return {
      tags,
      defaultLogo,
      currentPage,
      itemsPerPage,
      paginatedTags,
      totalPages,
      prevPage,
      nextPage,
      onDelete,
      goToPage,
      restoreTag,
      onEdit,
    };
  },
};
</script>

<style scoped>
.pagination-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.pagination {
  display: flex;
  gap: 5px;
  list-style: none;
  padding: 0;
}

.page-item {
  margin: 0 2px;
}

.page-link {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #07dc595e;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
}

.page-link:hover {
  background-color: #f8f9fa;
  color: #07dc595e;
}

.page-item.active .page-link {
  background-color: #05c850;
  border-color: #03682a;
  color: white;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  background-color: #e9ecef;
  border-color: #ddd;
}

.pagination-info {
  margin-top: 10px;
  font-size: 14px;
  color: #6c757d;
}
</style>
