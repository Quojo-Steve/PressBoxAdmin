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
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="mb-4">Source Details</h5>
              <div class="row">
                <div class="col-xl-5 col-lg-6 text-center">
                  <!-- Updated Image Tag -->
                  <img
                    class="w-100 border-radius-lg shadow-lg mx-auto"
                    :src="
                      source.logo ||
                      'https://i.pinimg.com/736x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg'
                    "
                    alt="source logo"
                  />
                </div>
                <div class="col-lg-5 mx-4">
                  <h3 class="mt-lg-0 mt-4">{{ source.name }}</h3>
                  <div class="rating">
                    <p class="material-icons1 text-lg">
                      {{ source.email }}
                    </p>
                  </div>
                  <br />
                  <h6 class="mb-0 mt-3">{{ source.telephone }}</h6>
                  <h5>{{ source.region }}, {{ source.country }}</h5>
                  <span
                    v-if="source.status !== 'inactive'"
                    class="badge badge-success"
                    >{{ source.status }}</span
                  >
                  <span v-else class="badge badge-danger">{{
                    source.status
                  }}</span>
                  <br />
                  <h6 class="mb-0 mt-3 text-md">Industry</h6>
                  <p class="material-icons1 text-sm">{{ source.industry }}</p>

                  <h6 class="mb-0 mt-2 text-md">Website</h6>
                  <a class="material-icons1 text-sm" :href="source.website">{{
                    source.website
                  }}</a>
                  <h6 class="mt-3">Description</h6>
                  <p>
                    {{ source.description }}
                  </p>

                  <div class="row mt-4">
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
                  </div>
                </div>
              </div>
              <div class="row mt-6">
                <div class="col-12">
                  <div class="mb-5 ps-3">
                    <h6 class="mb-1 fs-1">Press Releases</h6>
                    <p class="text-sm">Press releases by source</p>
                  </div>
                  <div class="row">
                    <div
                      v-for="article in source.articles"
                      :key="article.article_id"
                      class="col-xl-3 col-md-6 mb-xl-0 mb-4"
                    >
                      <div class="card card-blog card-plain">
                        <div class="card-header p-0 mt-n4 mx-3">
                          <a class="d-block shadow-xl border-radius-xl">
                            <img
                              :src="
                                article.media1?.[0]?.url ||
                                'https://i.pinimg.com/736x/16/8a/6c/168a6c2473b5bc1f4c489174a64e7a39.jpg'
                              "
                              alt="article image"
                              class="img-fluid shadow border-radius-xl"
                              style="height: 150px; width: 100%; object-fit: cover;"
                            />
                          </a>
                        </div>
                        <div class="card-body p-3">
                          <p class="mb-0 text-sm">#{{ article.slug }}</p>
                          <a>
                            <h5>{{ article.title }}</h5>
                          </a>
                          <p class="mb-4 text-sm">
                            {{ truncateText(article.content) }}
                          </p>
                          <div
                            class="d-flex align-items-center justify-content-between"
                          >
                            <button
                              type="button"
                              class="btn btn-outline-primary btn-sm mb-0"
                            >
                              View Article
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref,computed  } from "vue";
import { toast } from "vue3-toastify";
import { useRoute } from "vue-router";
import { Axios } from "../services/Axios";
import Swal from "sweetalert2";

const { sourceId } = useRoute().params;

const source = ref({ articles: [] });

const isLoading = ref(false);

const truncateText = (text, length = 30) => {
  return text.length > length ? text.slice(0, length) + "..." : text;
};

const onLoad = async () => {
  try {
    isLoading.value = true;
    const endpoint = `/superadmin/sources/${sourceId}`;
    const { data } = await Axios.get(endpoint);

    if (data.status) {
      let responseData = data.data;
      // console.log(responseData.articles[1].media1[0].url);

      // Ensure articles are grouped with their media
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
    toast.error(error.message);
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
onLoad();
</script>
