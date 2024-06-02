<script setup lang="ts">
import { ref, computed } from 'vue';
import { getDataBySucursal } from '../API/reportes.ts';

const data = ref([]);
const sucursal = ref('');
const fecha = ref(''); // Default to "MENSUAL"
const meses = ref([
    { name: 'Enero', value: 0 },
    { name: 'Febrero', value: 1 },
    { name: 'Marzo', value: 2 },
    { name: 'Abril', value: 3 },
    { name: 'Mayo', value: 4 },
    { name: 'Junio', value: 5 },
    { name: 'Julio', value: 6 },
    { name: 'Agosto', value: 7 },
    { name: 'Septiembre', value: 8 },
    { name: 'Octubre', value: 9 },
    { name: 'Noviembre', value: 10 },
    { name: 'Diciembre', value: 11 },
]);

const searchData = async () => {
    const sucurl = parseInt(sucursal.value);
    data.value = await getDataBySucursal(sucurl);
    console.log('Datos obtenidos:', data.value);
};

const filteredData = computed(() => {
    let startDate = new Date('2024-01-01');
    let endDate = new Date('2024-12-31');

    if (fecha.value === '3') {
        // Mensual
        console.log('Filtrando por mes');
        endDate = new Date('2024-05-31');
    } else if (fecha.value === '2') {
        // Semestral
        console.log('Filtrando por semestre');
        endDate = new Date('2024-06-30');
    }

    console.log('Fechas de filtro:', startDate, endDate);

    return data.value.filter((item) => {
        const itemStartDate = new Date('2024-01-01');
        const itemEndDate = new Date('2024-12-31');
        console.log('Fechas del ítem:', itemStartDate, itemEndDate);
        return itemStartDate <= endDate && itemEndDate >= startDate;
    });
});

const aggregatedData = computed(() => {
    const aggregated = {};

    filteredData.value.forEach((item) => {
        const month = new Date('2024-05-31').getMonth();
        console.log('Mes:', month);

        const entrenador = item.id_entrenador;

        if (!aggregated[month]) {
            aggregated[month] = {};
        }

        if (!aggregated[month][entrenador]) {
            aggregated[month][entrenador] = 0;
        }

        aggregated[month][entrenador] += item._count.id_usuario;
    });

    console.log('Datos agregados:', aggregated);
    return aggregated;
});

const getFilteredMonths = () => {
    let months = meses.value;
    if (fecha.value === '3') {
        months = [meses.value[4]]; // Solo Mayo
    } else if (fecha.value === '2') {
        months = meses.value.slice(0, 6); // Enero a Junio
    }
    return months;
};
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
                    <tr v-for="month in getFilteredMonths()" :key="month.value">
                        <td class="border border-[#ccc]">{{ month.name }}</td>
                        <td class="border border-[#ccc]">{{ aggregatedData[month.value] ? aggregatedData[month.value][1]
                            || 0 : 0 }}</td>
                        <td class="border border-[#ccc]">{{ aggregatedData[month.value] ? aggregatedData[month.value][2]
                            || 0 : 0 }}</td>
                        <td class="border border-[#ccc]">{{ aggregatedData[month.value] ? aggregatedData[month.value][3]
                            || 0 : 0 }}</td>
                        <td class="border border-[#ccc]">{{ aggregatedData[month.value] ?
                            aggregatedData[month.value][4] || 0 : 0 }}</td>
                        <td class="border border-[#ccc]">{{ aggregatedData[month.value] ?
                            aggregatedData[month.value][5] || 0 : 0 }}</td>
                        <td class="border border-[#ccc]">{{ aggregatedData[month.value] ?
                            aggregatedData[month.value][6] || 0 : 0 }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
