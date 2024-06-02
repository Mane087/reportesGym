<script setup lang="ts">
import { ref } from 'vue';
import { getData } from '../API/reportes.ts';

const data = ref([]);
const fecha = ref('3'); // Default to "MENSUAL"
const entrenadores = ref([]);
const sucursales = ref([]);

const fetchNames = async () => {
    // Fetch the names of the trainers and branches
    entrenadores.value = [
        { id: 1, nombre: 'Emmanuel Alaniz' },
        { id: 2, nombre: 'Maria Gomez' },
        { id: 3, nombre: 'Juan Perez' },
        { id: 4, nombre: 'Luis Fernandez' },
        { id: 5, nombre: 'Ana Martinez' },
        { id: 6, nombre: 'Carlos Hernandez' },
    ];

    sucursales.value = [
        { id: 1, nombre: 'ZonaFitness' },
        { id: 2, nombre: 'MuscleGym' },
        { id: 3, nombre: 'Olimpus' },
        { id: 34, nombre: 'GrulloFit' }
    ];
};

const searchData = async () => {
    data.value = await getData();
    filterData();
};

const filterData = () => {
    const startDate = new Date('2024-01-01');
    let endDate = new Date('2024-12-01');

    if (fecha.value === '3') {
        endDate = new Date('2024-05-01');
    } else if (fecha.value === '2') {
        endDate = new Date('2024-06-01');
    }

    const filteredData = data.value.filter((item) => {
        const itemStartDate = new Date(item.fecha_inicio);
        const itemEndDate = new Date(item.fecha_fin);
        return itemStartDate >= startDate && itemEndDate <= endDate;
    });

    // Aggregate data
    const aggregatedData = {};
    filteredData.forEach((item) => {
        const entrenador = item.id_entrenador;
        const sucursal = item.id_sucursal;

        if (!aggregatedData[entrenador]) {
            aggregatedData[entrenador] = {};
        }

        if (!aggregatedData[entrenador][sucursal]) {
            aggregatedData[entrenador][sucursal] = 0;
        }

        aggregatedData[entrenador][sucursal] += item._count.id_usuario;
    });

    // Update entrenadores with counts
    entrenadores.value.forEach((entrenador) => {
        entrenador.ZonaFitness = aggregatedData[entrenador.id]?.[1] || 0;
        entrenador.MuscleGym = aggregatedData[entrenador.id]?.[2] || 0;
        entrenador.Olimpus = aggregatedData[entrenador.id]?.[3] || 0;
        entrenador.GrulloFit = aggregatedData[entrenador.id]?.[34] || 0;
    });
};

// Fetch initial data
fetchNames();
</script>

<template>
    <div class="w-full h-max overflow-hidden">
        <div class="w-[90%] h-max mx-auto py-5 flex flex-row justify-evenly items-center">
            <div class="h-full flex flex-row items-center gap-x-2">
                <label class="font-bold">Rango de fecha</label>
                <select class="p-2 border rounded-lg" v-model="fecha">
                    <option value="3" selected>MENSUAL</option>
                    <option value="2">SEMESTRAL</option>
                    <option value="1">ANUAL</option>
                </select>
                <button class="px-2 rounded-md bg-blue-700 text-white" @click="searchData">Buscar</button>
            </div>
        </div>

        <div class="w-[90%] h-[90%] mx-auto py-5 overflow-y-auto">
            <table class="w-full h-full mb-5">
                <thead>
                    <tr>
                        <th class="border border-[#ccc]">Entrenadores</th>
                        <th class="border border-[#ccc]">ZonaFitness</th>
                        <th class="border border-[#ccc]">MuscleGym</th>
                        <th class="border border-[#ccc]">Olimpus</th>
                        <th class="border border-[#ccc]">GrulloFit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="entrenador in entrenadores" :key="entrenador.id">
                        <td class="border border-[#ccc]">{{ entrenador.nombre }}</td>
                        <td class="border border-[#ccc]">{{ entrenador.ZonaFitness }}</td>
                        <td class="border border-[#ccc]">{{ entrenador.MuscleGym }}</td>
                        <td class="border border-[#ccc]">{{ entrenador.Olimpus }}</td>
                        <td class="border border-[#ccc]">{{ entrenador.GrulloFit }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
