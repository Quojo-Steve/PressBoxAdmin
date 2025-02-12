<template>
  <AppSideBar />
  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
  >
    <!-- Navbar -->
    <AppNavbar
      title="Tags"
      breadcrumbParent="Dashboard"
      breadcrumbCurrent="Tags"
    />
    <!-- End Navbar -->
    <div class="container-fluid py-4">
      <div class="row">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <!-- Card header -->
                <div class="card-header ind-header">
                  <div>
                    <h5 class="mb-0">Tags</h5>
                    <p class="text-sm mb-0">All system tags</p>
                  </div>
                  <button
                    class="btn bg-gradient-success mb-0 mt-lg-auto w-20"
                    @click="showAddIndustryModal"
                  >
                    Add Tag
                  </button>
                </div>
                <div class="table-responsive">
                  <table class="table table-flush" id="datatable-search">
                    <thead class="thead-light">
                      <tr>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(tag, index) in tags" :key="tag.id">
                        <td class="text-sm font-weight-normal tableau">
                          {{ tag.name }}
                        </td>
                        <td class="text-sm font-weight-normal tableau">
                          {{ tag.slug }}
                        </td>
                        <td class="text-sm font-weight-normal">
                          <p v-if="tag.status !== 'inactive'" class="text-sm font-weight-normal cat ">
                            {{ tag.status }}
                          </p>
                          <p v-else class="text-sm font-weight-normal cat1 text-light">
                            {{ tag.status }}
                          </p>
                        </td>
                        <td
                          class="text-sm font-weight-normal tableau mt-3 action"
                        >
                          <div class="action1">
                            <i
                              class="fas fa-edit mr-2 light1"
                              @click="editItem(tag)"
                              style="cursor: pointer; color: rgb(0, 0, 255, 0.4)"
                            ></i>
                          </div>
                          <div v-if="tag.status !== 'inactive'">
                            <i
                              class="fa-solid fa-ban light1"
                              @click="onDelete(tag, index)"
                              style="cursor: pointer; color: rgb(255, 0, 0, 0.4)"
                            ></i>
                          </div>
                          <div v-else>
                            <i
                              class="fa-solid fa-arrow-rotate-left light1"
                              @click="restoreTag(tag, index)"
                              style="cursor: pointer; color: rgb(255, 0, 0, 0.4)"
                            ></i>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Industry Modal -->
    <div
      class="modal fade"
      id="addIndustryModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Tag</h5>
            <button
              type="button"
              class="btn-close"
              @click="hideAddIndustryModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addIndustry">
              <div class="mb-3">
                <label for="industryName" class="form-label">Tag Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="industryName"
                  v-model="newIndustryName"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Industry Modal -->
    <div
      class="modal fade"
      id="editIndustryModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Tag</h5>
            <button
              type="button"
              class="btn-close"
              @click="hideEditIndustryModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateIndustry">
              <div class="mb-3">
                <label for="editIndustryName" class="form-label"
                  >Tag Name</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="editIndustryName"
                  v-model="editIndustryName"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from "vue";
import { Axios } from "../services/Axios";
import { toast } from "vue3-toastify";
import { Modal } from "bootstrap";
import Swal from "sweetalert2";

export default {
  setup() {
    const tags = ref([]);
    const newIndustryName = ref("");
    const editIndustryName = ref("");
    const editingIndustryId = ref(null);
    let addIndustryModal = null;
    let editIndustryModal = null;

    // Fetch industries from API
    const fetchIndustries = async () => {
      try {
        const endpoint = "/superadmin/tags";
        const response = await Axios.get(endpoint);

        if (response.data.status) {
          tags.value = response.data.data;
        } else {
          toast.error("Failed to fetch industries.");
        }
      } catch (error) {
        toast.error(`Error fetching industries: ${error.message}`);
      }
    };

    // Initialize modals
    onMounted(() => {
      addIndustryModal = new Modal(document.getElementById("addIndustryModal"));
      editIndustryModal = new Modal(
        document.getElementById("editIndustryModal")
      );
      fetchIndustries(); // Fetch industries when component loads
    });

    // Show/hide modals
    const showAddIndustryModal = () => addIndustryModal.show();
    const hideAddIndustryModal = () => addIndustryModal.hide();
    const showEditIndustryModal = () => editIndustryModal.show();
    const hideEditIndustryModal = () => editIndustryModal.hide();

    // Add a new industry
    const addIndustry = async () => {
      try {
        const response = await Axios.post("/superadmin/tags", {
          tags: newIndustryName.value,
        });

        if (response.data.status) {
          toast.success("Tag added successfully!");
          fetchIndustries(); // Refresh the list
          hideAddIndustryModal(); // Hide the modal
          newIndustryName.value = ""; // Clear the input
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(`Error adding tag: ${error.message}`);
      }
    };

    const onDelete = async (item, index) => {
      const { id, name } = item; // Ensure correct field names
      Swal.fire({
        title: "Deactivate Tag ?",
        text: `Are you sure you want to deactivate ${name} tag?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, deactivate it!",
        reverseButtons: true,
      }).then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          try {
            const endpoint = `/superadmin/tags-deactivate/${id}`; // Adjust API path
            const { data } = await Axios.put(endpoint);

            if (data.status) {
              // tags.value.splice(index, 1); // Remove deleted industry from list
              toast.success(`${name} deactivated successfully!`);
              fetchIndustries(); // Refresh the list
            } else {
              toast.error("Failed to deactivate tag.");
            }
          } catch (error) {
            console.error("Error deactivating tag:", error);
            toast.error(`Error: ${error.message}`);
          }
        }
      });
    };

    const restoreTag = async (item, index) => {
      const { id, name } = item; // Ensure correct field names
      Swal.fire({
        title: "Reactivate Tag ?",
        text: `Are you sure you want to reactivate ${name} tag?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, reactivate it!",
        reverseButtons: true,
      }).then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          try {
            const endpoint = `/superadmin/tags-reactivate/${id}`; // Adjust API path
            const { data } = await Axios.put(endpoint);

            if (data.status) {
              // tags.value.splice(index, 1); // Remove deleted industry from list
              toast.success(`${name} reactivated successfully!`);
              fetchIndustries(); // Refresh the list
            } else {
              toast.error("Failed to reactivate tag.");
            }
          } catch (error) {
            console.error("Error reactivating tag:", error);
            toast.error(`Error: ${error.message}`);
          }
        }
      });
    };

    // Edit an industry
    const editItem = (industry) => {
      editingIndustryId.value = industry.id;
      editIndustryName.value = industry.name;
      showEditIndustryModal();
    };

    // Update an industry
    const updateIndustry = async () => {
      try {
        const response = await Axios.put(
          `/superadmin/tags/${editingIndustryId.value}`,
          {
            name: editIndustryName.value,
          }
        );

        if (response.data.status) {
          toast.success("Tag updated successfully!");
          fetchIndustries(); // Refresh the list
          hideEditIndustryModal(); // Hide the modal
        } else {
          toast.error(response.data.message);
          hideEditIndustryModal(); // Hide the modal
        }
      } catch (error) {
        toast.error(`Error updating tag: ${error.message}`);
      }
    };

    return {
      tags,
      newIndustryName,
      editIndustryName,
      addIndustry,
      onDelete,
      restoreTag,
      editItem,
      updateIndustry,
      showAddIndustryModal,
      hideAddIndustryModal,
      showEditIndustryModal,
      hideEditIndustryModal,
    };
  },
};
</script>

<style scoped>
.modal-content {
  border-radius: 10px;
}

.modal-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.modal-title {
  font-weight: bold;
}

.modal-body {
  padding: 20px;
}

.form-control {
  border-radius: 5px;
}

.btn-primary {
  background-color: #4caf50;
  border: none;
}

.btn-primary:hover {
  background-color: #45a049;
}
</style>
