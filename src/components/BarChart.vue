<template>
    <div style="height: 420px; "> <!-- Set container size -->
    <BarChart :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default defineComponent({
  name: "App",
  components: {
    BarChart: Bar, // Use the Bar component from vue-chartjs
  },
  setup() {
    // Chart data
    const chartData = {
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], // X-axis labels
      datasets: [
        {
          label: "Sales", // Dataset label
          backgroundColor: "#4CAF50", // Bar color
          data: [40, 20, 80, 60, 50,80,55,45,85,45,70,50], // Data points
        },
      ],
    };

    // Chart options
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false, // Optional settings
    };

    return { chartData, chartOptions };
  },
});
</script>