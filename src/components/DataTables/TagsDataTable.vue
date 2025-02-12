<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <!-- Card header -->
          <div class="card-header">
            <h5 class="mb-0">Tags</h5>
            <p class="text-sm mb-0">All created tags</p>
          </div>
          <div class="table-responsive">
            <table class="table table-flush" id="datatable-search">
              <thead class="thead-light">
                <tr>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tag, index) in tags" :key="index">
                  <td class="text-sm font-weight-normal tableau">
                    {{ tag.name }}
                  </td>
                  <td class="text-sm font-weight-normal tableau">
                    {{ tag.slug }}
                  </td>
                  <td class="text-sm font-weight-normal tableau action">
                    <div class="action1">
                      <i
                        class="fas fa-edit mr-2"
                        @click="editItem(index)"
                        style="cursor: pointer; color: gray"
                      ></i>
                    </div>
                    <div>
                      <i
                        class="fas fa-trash-alt"
                        @click="onDelete(index)"
                        style="cursor: pointer; color: #a71d2a"
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
</template>

<script>
import { ref, onMounted } from "vue";
import { Axios } from "../../services/Axios";
import { toast } from "vue3-toastify";

export default {
  setup() {
    const tags = ref([]);
    const limitBy = ref(20);

    const sortBy = ref("created_at");

    const orderBy = ref("desc");

    const page = ref(1);

    const isLoading = ref(false);

    const onLoad = async () => {
      try {
        isLoading.value = true;
        const endpoint = `/superadmin/tags`;
        const params = {
          limit: limitBy.value,
          sort: sortBy.value,
          order: orderBy.value,
          page: page.value,
        };
        const { data } = await Axios.get(endpoint, { params });
        if (data.status) {
          tags.value = data.data;
          // toast.success("Tags loaded successfully!"); // ✅ Success toast
        } else {
          toast.warning("No tags found.");
        }
      } catch (error) {
        toast.error(`Error fetching tags: ${error.message}`); // ✅ Error toast
      } finally {
        isLoading.value = false;
      }
    };

    const onDelete = async (item, index) => {
      // const { article_id, title } = item;
      // Swal.fire({
      //   title: "DELETE ARTICLE?",
      //   text: `Are you sure you want to delete ${title}?`,
      //   icon: "warning",
      //   showCancelButton: true,
      //   confirmButtonText: "Yes, delete it!",
      //   reverseButtons: true,
      // }).then(async ({ isConfirmed }) => {
      //   if (isConfirmed) {
      //     try {
      //       const endpoint = `/tags/${article_id}`;
      //       const { data } = await Axios.delete(endpoint);
      //       const { status } = data;
      //       if (status) {
      //         tags.value.splice(index, 1);
      //       }
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   }
      // });

      console.log("object")
    };

    onMounted(() => {
      onLoad(); // Fetch tags when the component mounts
    });

    return { tags, isLoading };
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
