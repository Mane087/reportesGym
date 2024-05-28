<script setup lang="ts">
import { ref } from 'vue';
import { getDataByTrainer } from '../API/reportes.ts';

const data = ref([]);
const fecha = ref('3'); // Valor predeterminado
const entrenador = ref(''); // Valor predeterminado
const meses = ref([]);

const searchData = async () => {
    if (fecha.value && entrenador.value) {
        const rango = parseInt(fecha.value);
        const trainer = parseInt(entrenador.value);
        const response = await getDataByTrainer(trainer, rango);
        data.value = response;
        console.log('Datos obtenidos:', response);

        const { startDate, endDate } = getStartEndDates(rango);
        meses.value = generateMonths(startDate, endDate);
    }
};

const getCount = (sucursalNombre, entrenadorId) => {
    console.log('sucursalNombre', sucursalNombre);
    console.log('entrenadorId', entrenadorId);
    
    
    const sucursal = data.value.find((suc) => suc.sucursal === sucursalNombre);
    console.log('sucursal en la primera cara', sucursal);

    if (!sucursal) return 0;

    const entrenadorData = sucursal.entrenadores.find((ent) => ent.entrenador.id === entrenadorId);
    console.log('entrenador en la primera cara', entrenadorData);
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
                <option value="3">MENSUAL</option>
                <option value="2">SEMESTRAL</option>
                <option value="1">ANUAL</option>
            </select>
            <label class="font-bold">Entrenador</label>
            <select class="p-2 border rounded-lg" v-model="entrenador">
                <option value="1">Emmanuel Alaniz</option>
                <option value="2">Maria Gomez</option>
                <option value="3">Juan Perez</option>
                <option value="4">Luis Fernandez</option>
                <option value="5">Ana Martinez</option>
                <option value="6">Carlos Hernandez</option>
            </select>
            <button class="px-2 rounded-md bg-blue-700 text-white" @click="searchData">Buscar</button>
        </div>

        <div class="w-[90%] h-[90%] mx-auto py-5 overflow-y-auto">
            <table class="w-full h-full mb-5">
                <thead>
                    <tr>
                        <th class="border border-[#ccc]">Fecha</th>
                        <th class="border border-[#ccc]">ZonaFitness</th>
                        <th class="border border-[#ccc]">Muscle Gym</th>
                        <th class="border border-[#ccc]">Olimpus</th>
                        <th class="border border-[#ccc]">GrulloFit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="month in meses" :key="month">
                        <td class="border border-[#ccc] text-center">{{ new Intl.DateTimeFormat('es-MX', {
                            year:
                                'numeric', month: 'long'
                        }).format(month) }}</td>
                        <td class="border border-[#ccc] text-center">{{ getCount('ZonaFitness',
                            parseInt(entrenador.valueOf())) }}</td>
                        <td class="border border-[#ccc] text-center">{{ getCount('Muscle Gym',
                            parseInt(entrenador.valueOf())) }}</td>
                        <td class="border border-[#ccc] text-center">{{ getCount('Olimpus', parseInt(entrenador.valueOf()))
                            }}</td>
                        <td class="border border-[#ccc] text-center">{{ getCount('GrulloFit',
                            parseInt(entrenador.valueOf())) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
