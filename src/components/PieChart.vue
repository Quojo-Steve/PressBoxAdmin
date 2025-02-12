<template>
    <div style="height: 300px;">
      <!-- Set container size -->
      <PieChart :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { defineComponent } from "vue";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement, // ✅ Required for Pie Charts
  } from "chart.js";
  import { Pie } from "vue-chartjs";
  
  // ✅ Register only required components for Pie Charts
  ChartJS.register(Title, Tooltip, Legend, ArcElement);
  
  export default defineComponent({
    name: "PieChartComponent",
    components: {
      PieChart: Pie, // ✅ Ensure correct component name
    },
    setup() {
      // Chart data
      const chartData = {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      };
  
      // Chart options
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
      };
  
      return { chartData, chartOptions };
    },
  });
  </script>
  