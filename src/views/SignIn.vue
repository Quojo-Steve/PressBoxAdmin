<template>
  <main class="main-content main-content1 mt-0">
    <div
      class="page-header align-items-start min-vh-100"
      style="
        background-image: url('https://img.freepik.com/free-photo/newspaper-background-concept_23-2149501597.jpg?t=st=1739048321~exp=1739051921~hmac=b2dff7149da685b90225c6b7578e44a3082ab3b29717dd468e81c74cf98acfc9&w=996');
      "
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container my-auto">
        <div class="row">
          <div class="col-lg-4 col-md-8 col-12 mx-auto">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div
                class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
              >
                <div
                  class="bg-gradient-success shadow-primary border-radius-lg py-3 pe-1"
                >
                  <h4
                    class="text-white font-weight-bolder text-center mt-2 mb-0"
                  >
                    Sign In
                  </h4>
                      <p class=" text-lg w-full">The Premier News Source</p>
                </div>
              </div>
              <div class="card-body">
                <form role="form" class="text-start" @submit.prevent="onLogin">
                  <div class="input-group input-group-outline my-3">
                    <!-- <label class="form-label">Email</label> -->
                    <input
                      v-model="user.email"
                      type="email"
                      class="form-control"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div class="input-group input-group-outline mb-3">
                    <!-- <label class="form-label">Password</label> -->
                    <input
                      v-model="user.password"
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div
                    class="form-check form-switch d-flex align-items-center mb-3"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                      checked
                    />
                    <label class="form-check-label mb-0 ms-3" for="rememberMe"
                      >Remember me</label
                    >
                  </div>
                  <div class="text-center">
                    <button
                      type="submit"
                      class="btn bg-gradient-success w-100 my-4 mb-2"
                      :disabled="isProcessing"
                    >
                      <Spinner v-if="isProcessing" />
                      <span v-else>Sign in</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { validate } from "email-validator";
import { toast } from "vue3-toastify";
import { Axios } from "../services/Axios";
import { useStore } from "../store";
import { useRouter } from "vue-router";
import axios from "axios";

const { setAuthenticate } = useStore();

const router = useRouter();

const isProcessing = ref(false);

const user = ref({
  email: null,
  password: null,
});

const onLogin = async () => {
  const { email, password } = user.value;

  if (!validate(email)) {
    toast.error("Email address is invalid");
    return;
  }

  if (password.length < 8) {
    toast.error("Password is less than 8 digits");
    return;
  }

  try {
    isProcessing.value = true;
    const endpoint = "/auth/superadmin/login";
    const { data } = await Axios.post(endpoint, user.value);
    const { status, message } = data;
    toast[status ? "success" : "error"](message);

    if (status) {
      setAuthenticate(data.data);
      const { token } = data.data;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("X-Pressbox-Token", token);
      window.location.href = "/dashboard/analytics";
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    isProcessing.value = false;
  }
};
</script>
