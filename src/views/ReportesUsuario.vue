<script setup lang="ts">
import { ref } from 'vue';
import { userProgressReport } from '../API/reportes'
import Chart from '../components/Chart.vue';


const data = ref([]);
const userId = ref('');  
const startDate = ref('');  
const endDate = ref('');  

const searchDataUser = async () => {
    try {
        const id =  parseInt(userId.value);
        const response = await userProgressReport(id, startDate.value, endDate.value);
        data.value = response;
    } catch (error) {
        console.error(error);
    }
}

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



</script>

<template>
    <div class="w-full h-full">

        <div class="w-3/4 h-[15%] mx-auto flex items-center justify-start border-b border-[#ccc]">
            <h1 class="text-2xl font-bold">Reporte de progreso por usuario</h1>
        </div>

        <div class="w-3/4 h-[10%] mx-auto py-5 flex flex-row justify-evenly">
            <input type="text" v-model="userId" placeholder="Identificador del usuario"
                class="w-max h-max border border-[#ccc] rounded-md py-2 px-3 bg-white text-black">
            <input type="date" v-model="startDate" placeholder="Fecha de inicio"
                class="w-max h-max border border-[#ccc] rounded-md py-2 px-3 bg-white text-black">
            <input type="date" v-model="endDate" placeholder="Fecha fin"
                class="w-max h-max border border-[#ccc] rounded-md py-2 px-3 bg-white text-black">
            <button class="w-max h-max bg-blue-700 text-white rounded-md py-2 px-3"
                @click="searchDataUser">Buscar</button>
        </div>

        <div class="w-3/4 h-[75%] mx-auto py-5 overflow-y-auto">
            <table class="w-full h-full mb-5">
                <thead>
                    <tr>
                        <th class="border border-[#ccc]">Nombre</th>
                        <th class="border border-[#ccc]">Fecha</th>
                        <th class="border border-[#ccc]">Peso</th>
                        <th class="border border-[#ccc]">Grasa</th>
                        <th class="border border-[#ccc]">Musculo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data" :key="item.id_progreso">
                        <td class="border border-[#ccc] text-center">{{ item.usuario.nombre }}</td>
                        <td class="border border-[#ccc] text-center">{{ formatDate(item.fecha) }}</td>
                        <td class="border border-[#ccc] text-center">{{ item.peso }}</td>
                        <td class="border border-[#ccc] text-center">{{ item.grasa_corporal }}</td>
                        <td class="border border-[#ccc] text-center">{{ item.musculo }}</td>
                    </tr>
                </tbody>
            </table>
            <Chart :data="data" />
        </div>
    </div>
</template>