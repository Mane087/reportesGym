<script setup lang="ts">
import { ref } from 'vue';
import { getData } from '../API/reportes.ts';

const data = ref([]);
const fecha = ref('');


const searchData = async () => {

    if (fecha.value) {
        const rango = parseInt(fecha.value);
        const response = await getData(rango);
        data.value = response;
        console.log('entro a 1');
    }

};


const getCount = (sucursalNombre, entrenadorId) => {
    const sucursal = data.value.find((suc) => suc.sucursal === sucursalNombre);
    if (!sucursal) return 0;

    const entrenador = sucursal.entrenadores.find((ent) => ent.entrenador.id === entrenadorId);
    console.log('entrenador en la primera cara', entrenador);
    return entrenador ? entrenador.count : 0;
};


const uniqueEntrenadores = () => {
    const entrenadorMap = {};
    data.value.forEach((sucursal) => {
        sucursal.entrenadores.forEach((entrenador) => {
            if (!entrenadorMap[entrenador.entrenador.id]) {
                entrenadorMap[entrenador.entrenador.id] = {
                    id: entrenador.entrenador.id,
                    nombre: entrenador.entrenador.nombre,
                    apellido: entrenador.entrenador.apellido,
                };
            }
        });
    });
    return Object.values(entrenadorMap);
};

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
                    <tr v-for="entrenador in uniqueEntrenadores()" :key="entrenador.id">
                        <td class="border border-[#ccc] text-center">{{ entrenador.nombre }} {{ entrenador.apellido }}
                        </td>
                        <td class="border border-[#ccc] text-center">{{ getCount('ZonaFitness', entrenador.id) }}</td>
                        <td class="border border-[#ccc] text-center">{{ getCount('Muscle Gym', entrenador.id) }}</td>
                        <td class="border border-[#ccc] text-center">{{ getCount('Olimpus', entrenador.id) }}</td>
                        <td class="border border-[#ccc] text-center">{{ getCount('GrulloFit', entrenador.id) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>
