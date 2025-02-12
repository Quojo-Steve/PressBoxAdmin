<template>
  <AppSideBar />
  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
  >
    <!-- Navbar -->
    <AppNavbar
      title="Article Details"
      breadcrumbParent="Dashboard"
      breadcrumbCurrent="Article Details"
      navigateTo="/dashboard/press-release"
    />
    <!-- End Navbar -->
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="mb-4 fw-bold">Press Release Details</h5>
              <div class="row">
                <div class="col-xl-5 col-lg-6 text-center">
                  <!-- Source Logo -->
                  <img
                    class="w-100 border-radius-lg shadow-lg mx-auto"
                    :src="
                      article.url ||
                      'https://i.pinimg.com/736x/16/8a/6c/168a6c2473b5bc1f4c489174a64e7a39.jpg'
                    "
                    alt="source logo"
                    style="height: 400px; object-fit: cover;"
                  />
                </div>
                <div class="col-lg-5 mx-4">
                  <h3 class="mt-lg-0 mt-4">{{ article.title }}</h3>
                  <div class="rating">
                    <p class="material-icons1 text-lg">
                      Author: {{ article.author_name }}
                    </p>
                  </div>
                  <br />
                  <h6 class="mb-0 mt-3">Source: {{ article.source_name }}</h6>
                  <h5>Published On: {{ article.published_on }}</h5>
                  <span
                    :class="{
                      'badge badge-warning': article.status === 'draft',
                      'badge badge-success': article.status === 'approved',
                    }"
                  >
                    {{ article.status }}
                  </span>
                  <br />
                  <div>
                    <h6 class="mb-0 mt-3 text-md">Content</h6>
                    <p
                      class="material-icons1 text-sm"
                      v-html="article.content"
                      style="
                        overflow-wrap: break-word;
                        word-break: break-word;
                        padding: 0 16px;
                      "
                    ></p>
                  </div>
                  <div class="row mt-4">
                    <div class="col-lg-5">
                      <!-- Button to change status from draft to approved -->
                      <button
                        v-if="article.status === 'draft'"
                        class="btn btn-outline-primary mb-0 mt-lg-auto w-100"
                        type="button"
                        name="button"
                        @click="approveArticle(article)"
                      >
                        Approve Article
                      </button>
                      <button
                        v-else
                        class="btn btn-outline-success mb-0 mt-lg-auto w-100"
                        type="button"
                        name="button"
                        disabled
                      >
                        Approved
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
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { toast } from "vue3-toastify";
import { useRoute } from "vue-router";
import { Axios } from "../services/Axios";
import Swal from "sweetalert2";

const { releaseid } = useRoute().params;

const article = ref({
  article_id: "",
  author_name: "",
  content: "",
  created_at: "",
  is_featured: 0,
  is_scheduled: 0,
  language: "",
  media_link: null,
  published_on: "",
  quote: null,
  release_date: "",
  slug: "",
  source_description: "",
  source_id: "",
  source_industry: "",
  source_logo: "",
  source_name: "",
  status: "draft",
  summary: null,
  title: "",
  updated_at: "",
  user_id: "",
  video: null,
});

const isLoading = ref(false);

// Fetch article details
const fetchArticle = async () => {
  try {
    isLoading.value = true;
    const endpoint = `/superadmin/releases/${releaseid}`;
    const { data } = await Axios.get(endpoint);

    if (data.status) {
      article.value = data.data[0]; // Assign the first article from the response
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    isLoading.value = false;
  }
};

// Approve article
const approveArticle = async (article) => {
  Swal.fire({
    title: "APPROVE ARTICLE?",
    text: `Are you sure you want to approve "${article.title}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, approve it!",
    reverseButtons: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const { data } = await Axios.put(
          `/superadmin/approve-article/${article.article_id}`
        );
        if (data.status) {
          toast.success("Article approved successfully!");
          article.status = "approved"; // Update the status locally
        } else {
          toast.error("Failed to approve article.");
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      }
    }
  });
};

// Fetch article details on component mount
onMounted(fetchArticle);
</script>
