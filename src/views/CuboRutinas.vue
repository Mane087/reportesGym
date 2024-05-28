<script setup lang="ts">
import { ref } from 'vue';
import { getData, getDataByTrainer, getDataBySucursal } from '../API/reportes.ts';


const data = ref([]);
const fecha = ref('');
const show = ref(true);
const showSucursales = ref(false);
const showEntrenadores = ref(false);
const sucursal = ref('');
const entrenador = ref('');


const searchData = async () => {
    const rango = parseInt(fecha.value);
    if (show) {
        if (rango == 1) {
            const response = await getData(1);
            data.value = response;
        }
        if (rango == 2) {
            const response = await getData(2);
            data.value = response;
        }
        if (rango == 3) {
            const response = await getData(3);
            data.value = response;
        }
    }
    if (showEntrenadores) {
        const trainer = parseInt(entrenador.value);
        if (rango == 1) {
            if (trainer == 1) {
                const response = await getDataByTrainer(1, 1);
                data.value = response;
            }
            if (trainer == 2) {
                const response = await getDataByTrainer(1, 2);
                data.value = response;
            }
            if (trainer == 3) {
                const response = await getDataByTrainer(1, 3);
                data.value = response;
            }
            if (trainer == 4) {
                const response = await getDataByTrainer(1, 4);
                data.value = response;
            }
            if (trainer == 5) {
                const response = await getDataByTrainer(1, 5);
                data.value = response;
            }
            if (trainer == 6) {
                const response = await getDataByTrainer(1, 6);
                data.value = response;
            }
        }
        if (rango == 2) {
            if (trainer == 1) {
                const response = await getDataByTrainer(2, 1);
                data.value = response;
            }
            if (trainer == 2) {
                const response = await getDataByTrainer(2, 2);
                data.value = response;
            }
            if (trainer == 3) {
                const response = await getDataByTrainer(2, 3);
                data.value = response;
            }
            if (trainer == 4) {
                const response = await getDataByTrainer(2, 4);
                data.value = response;
            }
            if (trainer == 5) {
                const response = await getDataByTrainer(2, 5);
                data.value = response;
            }
            if (trainer == 6) {
                const response = await getDataByTrainer(2, 6);
                data.value = response;
            }
        }
        if (rango == 3) {
            if (trainer == 1) {
                const response = await getDataByTrainer(3, 1);
                data.value = response;
            }
            if (trainer == 2) {
                const response = await getDataByTrainer(3, 2);
                data.value = response;
            }
            if (trainer == 3) {
                const response = await getDataByTrainer(3, 3);
                data.value = response;
            }
            if (trainer == 4) {
                const response = await getDataByTrainer(3, 4);
                data.value = response;
            }
            if (trainer == 5) {
                const response = await getDataByTrainer(3, 5);
                data.value = response;
            }
            if (trainer == 6) {
                const response = await getDataByTrainer(3, 6);
                data.value = response;
            }
        }
    }

    if (showSucursales) {
        const sucur = parseInt(sucursal.value);
        if (rango == 1) {
            if (sucur == 1) {
                const response = await getDataBySucursal(1, 1);
                data.value = response;
            }
            if (sucur == 2) {
                const response = await getDataBySucursal(1, 2);
                data.value = response;
            }
            if (sucur == 3) {
                const response = await getDataBySucursal(1, 3);
                data.value = response;
            }
            if (sucur == 4) {
                const response = await getDataBySucursal(1, 4);
                data.value = response;
            }
        }
        if (rango == 2) {
            if (sucur == 1) {
                const response = await getDataBySucursal(2, 1);
                data.value = response;
            }
            if (sucur == 2) {
                const response = await getDataBySucursal(2, 2);
                data.value = response;
            }
            if (sucur == 3) {
                const response = await getDataBySucursal(2, 3);
                data.value = response;  
            }
            if (sucur == 4) {
                const response = await getDataBySucursal(2, 4);
                data.value = response;
            }
        }
        if (rango == 3) {
            if (sucur == 1) {
                const response = await getDataBySucursal(3, 1);
                data.value = response;
            }
            if (sucur == 2) {
                const response = await getDataBySucursal(3, 2);
                data.value = response;
            }
            if (sucur == 3) {
                const response = await getDataBySucursal(3, 3);
                data.value = response;
            }
            if (sucur == 4) {
                const response = await getDataBySucursal(3, 4);
                data.value = response;
            }
        }
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



const viewCuboSucursales = () => {
    showSucursales.value = true;
    show.value = false;
    showEntrenadores.value = false;
};

const viewCuboEntrenadores = () => {
    showSucursales.value = false;
    show.value = false;
    showEntrenadores.value = true;
    console.log(showEntrenadores.value);

};

const viewCubo = () => {
    showSucursales.value = false;
    show.value = true;
    showEntrenadores.value = false;
};



</script>


<template>
    <div class="w-full h-max overflow-hidden">

        <div class="w-full h-max flex justify-center gap-x-5 p-2">
            <button class="px-2 rounded-md bg-blue-700 text-white" @click="viewCubo">Cara 1</button>
            <button class="px-2 rounded-md bg-blue-700 text-white" @click="viewCuboEntrenadores">Cara 2</button>
            <button class="px-2 rounded-md bg-blue-700 text-white" @click="viewCuboSucursales">Cara 3</button>
        </div>
        <div class="w-[90%] h-max mx-auto py-5 flex flex-row justify-evenly">
            <div v-if="show" class="h-full flex flex-row items-center gap-x-2">
                <label class="font-bold">Rango de fecha</label>
                <select class="p-2 border rounded-lg" v-model="fecha">
                    <option value="3" selected>MENSUAL</option>
                    <option value="2">SEMESTRAL</option>
                    <option value="1">ANUAL</option>
                </select>
                <button class="px-2 rounded-md bg-blue-700 text-white" @click="searchData">Buscar</button>
            </div>
            <div v-if="showEntrenadores" class="h-full flex flex-row items-center gap-x-2">
                <label class="font-bold">Rango de fecha</label>
                <select class="p-2 border rounded-lg" v-model="fecha">
                    <option value="3" selected>MENSUAL</option>
                    <option value="2">SEMESTRAL</option>
                    <option value="1">ANUAL</option>
                </select>
                <label class="font-bold">Entrenador</label>
                <select class="p-2 border rounded-lg" v-model="entrenador">
                    <option value="1" selected>Emmanuel Alaniz</option>
                    <option value="2">Maria Gomez</option>
                    <option value="3">Juan Perez</option>
                    <option value="4">Luis Fernandez</option>
                    <option value="5">Ana Martinez</option>
                    <option value="6">Carlos Hernanez</option>
                </select>
            </div>
            <div v-if="showSucursales" class="h-full flex flex-row items-center gap-x-2">
                <label class="font-bold">Rango de fecha</label>
                <select class="p-2 border rounded-lg" v-model="fecha">
                    <option value="3" selected>MENSUAL</option>
                    <option value="2">SEMESTRAL</option>
                    <option value="1">ANUAL</option>
                </select>
                <label class="font-bold">Sucursales</label>
                <select class="p-2 border rounded-lg" v-model="sucursal">
                    <option value="1" selected>ZonaFitness</option>
                    <option value="2">MuscleGym</option>
                    <option value="3">Olimpus</option>
                    <option value="4">GrulloFit</option>
                </select>
            </div>
        </div>

        <div v-if="show" class="w-[90%] h-[90%] mx-auto py-5 overflow-y-auto">
            <table class="w-full h-full mb-5">
                <thead>
                    <tr>
                        <th class="border border-[#ccc]">Entranodores</th>
                        <th class="border border-[#ccc]">ZonaFitness</th>
                        <th class="border border-[#ccc]">MuscleGym</th>
                        <th class="border border-[#ccc]">Olimpus</th>
                        <th class="border border-[#ccc]">GrulloFit</th>
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
        </div>
        <div v-if="showSucursales" class="w-[90%] h-[90%] mx-auto py-5 overflow-y-auto">
            <table class="w-full h-full mb-5">
                <thead>
                    <tr>
                        <th class="border border-[#ccc]">Fechas</th>
                        <th class="border border-[#ccc]">Emmanuel Alaniz</th>
                        <th class="border border-[#ccc]">Maria Gomez</th>
                        <th class="border border-[#ccc]">Juan Perez</th>
                        <th class="border border-[#ccc]">Luis Fernandez</th>
                        <th class="border border-[#ccc]">Ana Martinez</th>
                        <th class="border border-[#ccc]">Carlos Hernanez</th>
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
        </div>
        <div v-if="showEntrenadores" class="w-[90%] h-[90%] mx-auto py-5 overflow-y-auto">
            <table class="w-full h-full mb-5">
                <thead>
                    <tr>
                        <th class="border border-[#ccc]">Entranodores</th>
                        <th class="border border-[#ccc]">ZonaFitness</th>
                        <th class="border border-[#ccc]">MuscleGym</th>
                        <th class="border border-[#ccc]">Olimpus</th>
                        <th class="border border-[#ccc]">GrulloFit</th>
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
        </div>
    </div>
</template>