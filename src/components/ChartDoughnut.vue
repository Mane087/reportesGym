<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps<{
  value: number,
  max: number
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
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [props.value, props.max - props.value],
              backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(200, 200, 200, 0.5)'],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(200, 200, 200, 1)'],
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          cutout: '70%',
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const value = tooltipItem.raw;
                  return `${value} / ${props.max}`;
                }
              }
            }
          }
        }
      });
    }
  }
};

const recreateChart = () => {
  if (chartRef.value && props.value !== undefined && props.max !== undefined) {
    createChart();
  }
};

onMounted(() => {
  recreateChart();
});

watch(() => [props.value, props.max], recreateChart);
</script>

<template>
  <div class="overflow-x-auto">
    <canvas ref="chartRef"></canvas>
  </div>
</template>
