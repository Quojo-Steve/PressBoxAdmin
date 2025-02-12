<template>
  <AppSideBar />
  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
  >
    <!-- Navbar -->
    <AppNavbar
      title="Sources"
      breadcrumbParent="Dashboard"
      breadcrumbCurrent="Sources"
      navigateTo="/dashboard/sources"
    />
    <!-- End Navbar -->

    <div class="container-fluid px-2 px-md-4">
      <div
        class="page-header min-height-300 border-radius-xl mt-4"
        style="
          background-image: url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
        "
      >
        <span class="mask bg-gradient-success opacity-6"></span>
      </div>

      <div class="card card-body mx-3 mx-md-4 mt-n6">
        <div class="row gx-4">
          <div class="col-auto">
            <div class="avatar avatar-xl position-relative">
              <img
                :src="
                  source.logo ||
                  'https://i.pinimg.com/736x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg'
                "
                alt="profile_image"
                class="w-100 border-radius-lg shadow-sm"
              />
            </div>
          </div>
          <div class="col-auto my-auto">
            <div class="h-100">
              <h5 class="mb-1">{{ source.name }}</h5>
              <p class="mb-0 font-weight-normal text-sm">
                {{ source.email }}
              </p>
            </div>
          </div>
          <div class="row mt-4">
            <button
              class="btn btn-outline-danger mb-0 mt-lg-auto"
              type="button"
              name="button"
              @click="onDelete(source)"
              v-if="source.status !== 'inactive'"
            >
              Deactivate
            </button>
            <button
              class="btn btn-outline-primary mb-0 mt-lg-auto"
              type="button"
              name="button"
              v-else
              @click="onRestore(source)"
            >
              Reactivate
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-5 mx-4">
      <h6 class="mb-0 mt-3">{{ source.telephone }}</h6>
      <h5>{{ source.region }}, {{ source.country }}</h5>
      <span v-if="source.status !== 'inactive'" class="badge badge-success">{{
        source.status
      }}</span>
      <span v-else class="badge badge-danger">{{ source.status }}</span>

      <h6 class="mb-0 mt-2 text-md">Website</h6>
      <a class="material-icons1 text-sm" :href="source.website">{{
        source.website
      }}</a>
      <h6 class="mt-3">Description</h6>
      <p>
        {{ source.description }}
      </p>
      <!-- <div class="row mt-4">
        <div class="col-lg-5">
          <button
            class="btn btn-outline-danger mb-0 mt-lg-auto w-100"
            type="button"
            name="button"
            @click="onDelete(source)"
            v-if="source.status !== 'inactive'"
          >
            Deactivate
          </button>
          <button
            class="btn btn-outline-primary mb-0 mt-lg-auto w-100"
            type="button"
            name="button"
            v-else
            @click="onRestore(source)"
          >
            Reactivate
          </button>
        </div>
      </div> -->
    </div>
    <div class="container-fluid py-4">
      <section class="py-3">
        <div class="row mb-4 mb-md-0">
          <div class="col-md-8 me-auto my-auto text-left">
            <h5>Press Releases</h5>
            <p>Latest articles and news from this source.</p>
          </div>
          <div class="col-lg-4 col-md-12 my-auto text-end">
            <button type="button" class="btn bg-gradient-success mb-0">
              <i
                class="material-icons text-white position-relative text-md pe-2"
                >add</i
              >
              Add New Release
            </button>
          </div>
        </div>

        <div class="row mt-lg-4 mt-2">
          <div
            v-for="article in source.articles"
            :key="article.article_id"
            class="col-lg-4 col-md-6 mb-4"
          >
            <div class="card">
              <div class="card-body p-3">
                <div class="d-flex mt-n2">
                  <div
                    class="avatar avatar-xl bg-gradient-dark border-radius-xl p-0 mt-n4"
                    style="width: 100px"
                  >
                    <img
                      :src="
                        article.media1?.[0]?.url ||
                        'https://i.pinimg.com/736x/16/8a/6c/168a6c2473b5bc1f4c489174a64e7a39.jpg'
                      "
                      alt="article image"
                      class="border-radius-xl"
                      style="height: 100%; width: 100px; object-fit: cover"
                    />
                  </div>
                  <div class="ms-3 my-auto">
                    <h6 class="mb-0 fw-bold">{{ article.title }}</h6>
                  </div>
                </div>
                <p class="text-sm mt-3">{{ truncateText(article.content) }}</p>
                <hr class="horizontal dark" />
                <div class="row">
                  <div class="col-6">
                    <h6 class="text-sm mb-0">
                      {{ truncateText(article.slug) }}
                    </h6>
                    <!-- <p class="text-secondary text-sm font-weight-normal mb-0">
                      Category
                    </p> -->
                  </div>
                  <div class="col-6 text-end">
                    <h6 class="text-sm mb-0">{{ article.published_at }}</h6>
                    <p class="text-secondary text-sm font-weight-normal mb-0">
                      {{ truncateDate(article.release_date) }}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn bg-gradient-success mt-3"
                  @click="onEdit(article.article_id)"
                >
                  View Release
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { toast } from "vue3-toastify";
import { useRoute, useRouter } from "vue-router";
import { Axios } from "../services/Axios";
import Swal from "sweetalert2";

const { sourceId } = useRoute().params;
const router = useRouter();
const source = ref({ articles: [] });
const isLoading = ref(false);

const truncateText = (text, length = 30) => {
  return text.length > length ? text.slice(0, length) + "..." : text;
};

const truncateDate = (text, length = 10) => {
  return text.length > length ? text.slice(0, length) + "" : text;
};

const onEdit = (source) => {
  router.push(`/dashboard/press-release/${source}`);
};

const onLoad = async () => {
  try {
    isLoading.value = true;
    const { data } = await Axios.get(`/superadmin/sources/${sourceId}`);

    if (data.status) {
      let responseData = data.data;
      console.log(responseData)
      let articlesMap = new Map();

      responseData.articles.forEach((article) => {
        if (!articlesMap.has(article.article_id)) {
          articlesMap.set(article.article_id, { ...article, media: [] });
        }
        if (article.url) {
          articlesMap.get(article.article_id).media.push(article.url);
        }
      });

      responseData.articles = Array.from(articlesMap.values());
      source.value = responseData;
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    isLoading.value = false;
  }
};

const onRestore = async (source) => {
  Swal.fire({
    title: "REACTIVATE SOURCE?",
    text: `Are you sure you want to reactivate ${source.name}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, reactivate it!",
    reverseButtons: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const { data } = await Axios.put(
          `/superadmin/reactivate-source/${source.source_id}`
        );
        if (data.status) {
          window.location.href = "/dashboard/sources";
        }
      } catch (error) {
        toast.error("Failed to delete source.");
      }
    }
  });
};
const onDelete = async (source) => {
  Swal.fire({
    title: "DEACTIVATE SOURCE?",
    text: `Are you sure you want to deactivate ${source.name}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, deactivate it!",
    reverseButtons: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const { data } = await Axios.put(
          `/superadmin/deactivate-source/${source.source_id}`
        );
        if (data.status) {
          window.location.href = "/dashboard/sources";
        }
      } catch (error) {
        toast.error("Failed to delete source.");
      }
    }
  });
};

onMounted(onLoad);
</script>
