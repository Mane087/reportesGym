<script setup lang="ts">
import { Chart, registerables } from 'chart.js';
import { defineProps, watchEffect } from 'vue';

Chart.register(...registerables);

const props = defineProps<{
    data: Array<{ fecha: string, peso: number, grasa_corporal: number, musculo: number, restante?: number }>
}>();

let myChart = null;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
  return adjustedDate.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};


const createChart = () => {
    const ctx = document.getElementById('myChart').getContext('2d');
    if (myChart) {
        myChart.destroy(); // Destruir la instancia anterior para evitar sobreimpresiones
    }
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: props.data.map(item => formatDate(item.fecha)),
            datasets: [
                {
                    label: 'Peso',
                    data: props.data.map(item => item.peso),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 1
                },
                {
                    label: 'Grasa Corporal',
                    data: props.data.map(item => item.grasa_corporal),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1
                },
                {
                    label: 'Músculo',
                    data: props.data.map(item => item.musculo),
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 1
                }
                // Agrega más datasets si es necesario
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    });
};

watchEffect(() => {
    if (props.data && props.data.length > 0) {
        createChart();
    }
});
</script>

<template>
    <div class="overflow-x-auto">
         <canvas id="myChart"></canvas>
    </div>
</template>
