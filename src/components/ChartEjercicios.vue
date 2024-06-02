<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps<{
  data: Array<{ nombre: string, uso: number }>
}>();

let myChart = ref<Chart | null>(null);
const chartRef = ref<HTMLCanvasElement | null>(null);

const createChart = () => {
  if (chartRef.value) {
    const ctx = chartRef.value.getContext('2d');
    if (ctx) {
      if (myChart.value) {
        myChart.value.destroy(); // Destroy previous instance to avoid overlaps
      }
      myChart.value = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: props.data.map(item => item.nombre),
          datasets: [
            {
              label: 'Uso',
              data: props.data.map(item => item.uso),
              backgroundColor: 'rgba(214, 31, 43, 0.8)',
              borderColor: 'rgb(255, 255, 255)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
};

const recreateChart = () => {
  if (chartRef.value && props.data && props.data.length > 0) {
    createChart();
  }
};

onMounted(() => {
  recreateChart();
});

watch(() => props.data, recreateChart);
</script>

<template>
  <div class="overflow-x-auto">
    <canvas ref="chartRef" id="chartEjercicios"></canvas>
  </div>
</template>

