<template>
  <div class="card">
    <div class="card-body p-3 position-relative">
      <div class="row">
        <div class="col-7 text-start">
          <p class="text-sm mb-1 text-capitalize font-weight-bold">
            {{ title }}
          </p>
          <h5 class="font-weight-bolder mb-0">{{ amount }}</h5>
          <span class="text-sm text-end font-weight-bolder mt-auto mb-0" :class="percentageClass">
            {{ percentage }}
            <span class="font-weight-normal text-secondary">
              {{ subtitle }}
            </span>
          </span>
        </div>
        <div class="col-5">
          <div class="dropdown text-end">
            <a
              href="javascript:;"
              class="cursor-pointer text-secondary"
              id="dropdownUsers1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="text-xs text-secondary">{{ dateRange }}</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end px-2 py-3" aria-labelledby="dropdownUsers1">
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;" @click="selectRange('Last 7 days')">
                  Last 7 days
                </a>
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;" @click="selectRange('Last week')">
                  Last week
                </a>
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;" @click="selectRange('Last 30 days')">
                  Last 30 days
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {
    title: String,
    amount: String,
    percentage: String,
    subtitle: String,
    dateRange: String,
    isPositive: Boolean,
  },
  setup(props, { emit }) {
    const selectedRange = ref(props.dateRange);

    const percentageClass = computed(() => (props.isPositive ? "text-success" : "text-danger"));

    const selectRange = (range) => {
      selectedRange.value = range;
      emit("update:dateRange", range);
    };

    return { selectedRange, selectRange, percentageClass };
  },
};
</script>
