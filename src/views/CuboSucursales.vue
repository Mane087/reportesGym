<script setup lang="ts">
import { ref } from 'vue';
import { getDataBySucursal } from '../API/reportes.ts';

const data = ref([]);
const fecha = ref('');
const sucursal = ref('');
const meses = ref([]);

const searchData = async () => {
    if (fecha.value && sucursal.value) {
        const rango = parseInt(fecha.value);
        const sucurl = parseInt(sucursal.value);
        const response = await getDataBySucursal(sucurl, rango);
        data.value = response;
        console.log('Datos obtenidos:', response);

        const { startDate, endDate } = getStartEndDates(rango);
        meses.value = generateMonths(startDate, endDate);
    }
};

// Función para la primera tabla
const getCount = (entrenadorId, month) => {
    const monthIndex = new Date(month).getMonth();
    const entrenadorData = data.value.flatMap((suc) => 
        suc.entrenadores.map((ent) => ({
            entrenadorId: ent.entrenador.id,
            count: ent.count,
            month: monthIndex
        }))
    ).find((ent) => ent.entrenadorId === entrenadorId && ent.month === monthIndex);

    return entrenadorData ? entrenadorData.count : 0;
};

const generateMonths = (startDate, endDate) => {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return dates;
};

const getStartEndDates = (rango) => {
    const currentDate = new Date();
    let startDate;
    let endDate;

    if (rango === 3) { // MENSUAL
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    } else if (rango === 2) { // SEMESTRAL
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 4, 1);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    } else if (rango === 1) { // ANUAL
        startDate = new Date(currentDate.getFullYear(), 0, 1);
        endDate = new Date(currentDate.getFullYear(), 11, 31);
    }

    return { startDate, endDate };
};

searchData();
</script>

<template>
    <div class="w-full h-max overflow-hidden">
        <div class="w-[90%] h-max mx-auto py-5 flex flex-row justify-evenly items-center">
            <label class="font-bold">Rango de fecha</label>
            <select class="p-2 border rounded-lg" v-model="fecha">
                <option value="3" selected>MENSUAL</option>
                <option value="2">SEMESTRAL</option>
                <option value="1">ANUAL</option>
            </select>
            <label class="font-bold">Sucursales</label>
            <select class="p-2 border rounded-lg" v-model="sucursal">
                <option value="1">ZonaFitness</option>
                <option value="2">MuscleGym</option>
                <option value="3">Olimpus</option>
                <option value="4">GrulloFit</option>
            </select>
            <button class="px-2 rounded-md bg-blue-700 text-white" @click="searchData">Buscar</button>
        </div>

        <div class="w-[90%] h-[90%] mx-auto py-5 overflow-y-auto">
            <table class="w-full h-full mb-5">
                <thead>
                    <tr>
                        <th class="border border-[#ccc]">Fechas</th>
                        <th class="border border-[#ccc]">Emmanuel Alaniz</th>
                        <th class="border border-[#ccc]">Maria Gomez</th>
                        <th class="border border-[#ccc]">Juan Perez</th>
                        <th class="border border-[#ccc]">Luis Fernandez</th>
                        <th class="border border-[#ccc]">Ana Martinez</th>
                        <th class="border border-[#ccc]">Carlos Hernandez</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="month in meses" :key="month">
                        <td class="border border-[#ccc] text-center">{{ new Intl.DateTimeFormat('es-MX', {
                            year: 'numeric', month: 'long'
                        }).format(month) }}</td>
                        <td class="border border-[#ccc] text-center">{{ getCount(1, month) }}</td>
                        <td class="border border-[#ccc] text-center">{{ getCount(2, month) }}</td>
                        <td class="border border-[#ccc] text-center">{{ getCount(3, month) }}</td>
                        <td class="border border-[#ccc] text-center">{{ getCount(4, month) }}</td>
                        <td class="border border-[#ccc] text-center">{{ getCount(5, month) }}</td>
                        <td class="border border-[#ccc] text-center">{{ getCount(6, month) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
