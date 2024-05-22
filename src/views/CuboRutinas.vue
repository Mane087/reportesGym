<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getRutinasUsuarios, getRutinaById, getRutinaBySatisfaccion, getRutinasUsuariosByDate } from '../API/reportes.ts';

const data = ref([]);
const rutinaId = ref('');
const satisfaccion = ref('');
const startDate = ref('');
const endDate = ref('');

const searchDataUser = async () => {
    const response = await getRutinasUsuarios();
    data.value = response;
};

const searchData = async () => {
    if (rutinaId.value) {
        const id = parseInt(rutinaId.value);
        const response = await getRutinaById(id);
        data.value = response;
    }
    if (startDate.value && endDate.value) {
        console.log(startDate.value, endDate.value);

        const response = await getRutinasUsuariosByDate(startDate.value, endDate.value);
        data.value = response;
    }

    if (satisfaccion.value && rutinaId.value) {
        const id = parseInt(rutinaId.value);
        const satisfac = parseInt(satisfaccion.value)
        const response = await getRutinaBySatisfaccion(id, satisfac);
        data.value = response;
    }
};

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

onMounted(() => {
    searchDataUser();
});

</script>


<template>
    <div class="w-full h-full">

        <div class="w-[90%] h-[15%] mx-auto flex items-center justify-start border-b border-[#ccc]">
            <h1 class="text-2xl font-bold">Reporte de progreso por usuario</h1>
        </div>

        <div class="w-[90%] h-[10%] mx-auto py-5 flex flex-row justify-evenly">
            <input type="text" v-model="rutinaId" placeholder="Identificador de la rutina"
                class="w-max h-max border border-[#ccc] rounded-md py-2 px-3 bg-white text-black">
            <input type="number" v-model="satisfaccion" placeholder="Satisfaccion" min="1" max="10"
                class="w-[140px] h-max border border-[#ccc] rounded-md py-2 px-3 bg-white text-black">
            <input type="date" v-model="startDate" placeholder="Fecha de inicio"
                class="w-max h-max border border-[#ccc] rounded-md py-2 px-3 bg-white text-black">
            <input type="date" v-model="endDate" placeholder="Fecha fin"
                class="w-max h-max border border-[#ccc] rounded-md py-2 px-3 bg-white text-black">
            <button class="w-max h-max bg-blue-700 text-white rounded-md py-2 px-3" @click="searchData">Buscar</button>
            <button class="w-max h-max bg-blue-700 text-white rounded-md py-3 px-3" @click="searchDataUser">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTggMjhBMTIgMTIgMCAxIDAgNiAxNnY2LjJsLTMuNi0zLjZMMSAyMGw2IDZsNi02bC0xLjQtMS40TDggMjIuMlYxNmExMCAxMCAwIDEgMSAxMCAxMFoiLz48L3N2Zz4="
                    alt="">
            </button>
        </div>

        <div class="w-[90%] h-[75%] mx-auto py-5 overflow-y-auto">
            <table class="w-full h-full mb-5">
                <thead>
                    <tr>
                        <th class="border border-[#ccc]">Usuario</th>
                        <th class="border border-[#ccc]">Rutina</th>
                        <th class="border border-[#ccc]">Entrenador</th>
                        <th class="border border-[#ccc]">Fecha inicio</th>
                        <th class="border border-[#ccc]">Fecha fin</th>
                        <th class="border border-[#ccc]">Satisfaccion</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data" :key="item.id_progreso">
                        <td class="border border-[#ccc] text-center">{{ item.usuario.nombre }}</td>
                        <td class="border border-[#ccc] text-center">{{ item.rutina.nombre }}</td>
                        <td class="border border-[#ccc] text-center">{{ item.entrenador.nombre }}</td>
                        <td class="border border-[#ccc] text-center">{{ formatDate(item.fecha_inicio) }}</td>
                        <td class="border border-[#ccc] text-center">{{ formatDate(item.fecha_fin) }}</td>
                        <td class="border border-[#ccc] text-center">{{ item.satisfaccion }}</td>
                    </tr>
                </tbody>
            </table>
            <Chart :data="data" />
        </div>
    </div>
</template>