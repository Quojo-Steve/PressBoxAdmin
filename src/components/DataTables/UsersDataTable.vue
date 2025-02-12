<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <!-- Card header -->
          <div class="card-header">
            <h5 class="mb-0">Users</h5>
            <p class="text-sm mb-0">All system users</p>
          </div>
          <div class="table-responsive">
            <table class="table table-flush" id="datatable-search">
              <thead class="thead-light">
                <tr>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Telephone</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, index) in users" :key="user.user_id">
                  <!-- Logo Column -->
                  <td class="text-sm font-weight-normal">
                    <img
                      :src="user.photo"
                      alt="User Logo"
                      class="img-fluid rounded-circle"
                      style="width: 40px; height: 40px; object-fit: cover"
                    />
                  </td>
                  <td class="text-sm font-weight-normal">{{ user.first_name + " " + user.last_name }}</td>
                  <td class="text-sm font-weight-normal">{{ user.email }}</td>
                  <td class="text-sm font-weight-normal">
                    {{ user.telephone }}
                  </td>
                  <td class="text-sm font-weight-normal">
                    <p class="text-sm font-weight-normal mb-0 cat">
                      {{ user.status }}
                    </p>
                  </td>
                  <td class="text-sm font-weight-normal">
                    <i
                      class="fas fa-edit text-primary mr-2"
                      @click="onEdit(user)"
                    ></i>
                    <i
                      class="fas fa-trash-alt text-danger"
                      @click="onDelete(user, index)"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="isLoading" class="text-center p-3">
            <span class="spinner-border spinner-border-sm"></span> Loading...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { DataTable } from "simple-datatables";
import { Axios } from "../../services/Axios";
import { toast } from "vue3-toastify";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { imagePlaceholder100 } from "../../services/Utils.js"; // Ensure placeholder exists

export default {
  setup() {
    const users = ref([]);
    const isLoading = ref(false);
    const limitBy = ref(20);
    const sortBy = ref("created_at");
    const orderBy = ref("desc");
    const page = ref(1);
    const router = useRouter();
    let table = null;

    const fetchUsers = async () => {
      try {
        isLoading.value = true;
        const { data } = await Axios.get("/superadmin/users", {
          params: {
            limit: limitBy.value,
            sort: sortBy.value,
            order: orderBy.value,
            page: page.value,
          },
        });

        if (data.status) {
          users.value = data.data.map((user) => ({
            ...user,
            photo: user.photo || "https://i.pinimg.com/736x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg",
          }));
          reinitializeTable();
        } else {
          toast.warning("No users found.");
        }
      } catch (error) {
        toast.error("Error fetching users.");
      } finally {
        isLoading.value = false;
      }
    };

    // ✅ Delete User
    const onDelete = async (user, index) => {
      Swal.fire({
        title: "DELETE USER?",
        text: `Are you sure you want to delete ${user.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const { data } = await Axios.delete(`/users/${user.user_id}`);
            if (data.status) {
              users.value.splice(index, 1);
              toast.success("User deleted successfully!");
            }
          } catch (error) {
            toast.error("Failed to delete user.");
          }
        }
      });
    };

    // ✅ Edit User
    const onEdit = (user) => {
      router.push(`/users/${user.user_id}`);
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

    onMounted(fetchUsers);

    return { users, isLoading, onDelete, onEdit };
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
