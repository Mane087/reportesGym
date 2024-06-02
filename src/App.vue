<script setup lang="ts">
import { ref } from 'vue';
import Button from './components/Button.vue';
import CircleImg from './components/CircleImg.vue';
// import ReportesUsuario from './views/ReportesUsuario.vue';
import CuboRutinas from './views/CuboBase.vue';
import CuboEntrenadores from './views/CuboEntrenadores.vue';
import CuboSucursales from './views/CuboSucursales.vue';

import ChartEjercicios from './components/ChartEjercicios.vue';
import ChartRutinas from './components/ChartRutinas.vue';
import ChartDoughnut from './components/ChartDoughnut.vue';

import logo from './assets/Blue Business Architecture Design Logo - Logos.png';

const rutinas = ref([
  { nombre: 'Pecho Alto', satisfaccion: 9 },
  { nombre: 'Brazos Fuertes', satisfaccion: 7 },
  { nombre: 'Full body', satisfaccion: 6 }
]);

const maquinas = ref([
  { nombre: 'Banco plano', uso: 15 },
  { nombre: 'Banco inclinado', uso: 10 },
  { nombre: 'Smith', uso: 9 }
]);




const showCuboRutinas = ref(true);
const showCuboEntrenadores = ref(false);
const showCuboSucursales = ref(false);


const viewCuboSucursales = () => {
  showCuboRutinas.value = false;
  showCuboEntrenadores.value = false;
  showCuboSucursales.value = true;
};

const viewCuboEntrenadores = () => {
  showCuboRutinas.value = false;
  showCuboEntrenadores.value = true;
  showCuboSucursales.value = false;
};

const viewCubo = () => {
  showCuboRutinas.value = true;
  showCuboEntrenadores.value = false;
  showCuboSucursales.value = false;
};


</script>

<template>
  <div class="w-full h-screen flex flex-row bg-[#181818]">
    <aside class="w-[15%] h-screen bg-[#1D3A50] flex flex-col py-5">
      <div class="w-full h-max flex justify-center">
        <CircleImg :src="logo" alt="Logotipo-gymapp" />
      </div>
      <div class="w-full h-max flex flex-col items-center gap-y-5">

      </div>
      <div></div>
    </aside>
    <div class="w-[80%] h-screen flex items-center justify-center">
      <!-- <div class="w-[90%] h-[500px] bg-white rounded-2xl shadow-lg border border-[#ccc]">
        <div class="w-full h-max flex justify-center gap-x-5 p-2">
          <button class="px-2 rounded-md bg-blue-700 text-white" @click="viewCubo">Cara 1</button>
          <button class="px-2 rounded-md bg-blue-700 text-white" @click="viewCuboEntrenadores">Cara 2</button>
          <button class="px-2 rounded-md bg-blue-700 text-white" @click="viewCuboSucursales">Cara 3</button>
        </div>
        <CuboRutinas v-show="showCuboRutinas" />
        <CuboEntrenadores v-show="showCuboEntrenadores" />
        <CuboSucursales v-show="showCuboSucursales" />
      </div> -->
      <div class="w-[90%] h-[90%]">
        <!-- SCORE CARDS -->
        <div class="w-full h-max flex flex-row  justify-center items-center gap-x-3">
          <div class="w-[220px] h-[200px] rounded-lg bg-[#ebebeb] flex flex-col items-center justify-center">
            <h1 class="text-2xl">Clientes</h1>
            <ChartDoughnut :value="16" :max="250" />
          </div>
          <div class="w-[220px] h-[200px] rounded-lg bg-[#ebebeb] flex flex-col items-center justify-center">
            <h1 class="text-2xl">Sucursales</h1>
            <ChartDoughnut :value="4" :max="50" />
          </div>
          <div class="w-[220px] h-[200px] rounded-lg bg-[#ebebeb] flex flex-col items-center justify-center">
            <h1 class="text-2xl">Entrenadores</h1>
            <ChartDoughnut :value="6" :max="50" />
          </div>
        </div>

        <!-- GRAFICAS -->
        <div class="w-full h-max flex flex-row justify-center items-center py-3 gap-x-3 overflow-x-scroll">
          <div class="w-[450px] h-[350px] rounded-lg bg-[#ebebeb] flex flex-col items-center justify-center">
            <h1 class="text-2xl">Rutinas populares</h1>
            <ChartRutinas :data="rutinas" />
          </div>
          <div class="w-[450px] h-[350px] rounded-lg bg-[#ebebeb] flex flex-col items-center justify-center">
            <h1 class="text-2xl">Equipos mas usados</h1>
            <ChartEjercicios :data="maquinas" />
          </div>
          <div class="w-[450px] h-[350px] rounded-lg bg-[#ebebeb] flex flex-col items-center justify-center">
            <h1 class="text-xl mb-4">Usuarios con mejor progreso</h1>
            <table class="w-[90%] h-max">
              <tr>
                <th class="border border-[#ccc]">Nombre</th>
                <th class="border border-[#ccc]">Peso perdido</th>
              </tr>
              <tr>
                <td class="border border-[#ccc]">Miguel Hernandez</td>
                <td class="border border-[#ccc]">20kg</td>
              </tr>
              <tr>
                <td class="border border-[#ccc]">Alejandro perez</td>
                <td class="border border-[#ccc]">16kg</td>
              </tr>
              <tr>
                <td class="border border-[#ccc]">Santiago Ramirez</td>
                <td class="border border-[#ccc]">12kg</td>
              </tr>
            </table>
          </div>
          <div class="w-[450px] h-[350px] rounded-lg bg-[#ebebeb] flex flex-col items-center justify-center">
            <h1 class="text-xl mb-4">Sucursales con mas clientes</h1>
            <table class="w-[90%] h-max">
              <tr>
                <th class="border border-[#ccc]">Sucursal</th>
                <th class="border border-[#ccc]">Clientes</th>
              </tr>
              <tr>
                <td class="border border-[#ccc]">ZonaFitness</td>
                <td class="border border-[#ccc]">5</td>
              </tr>
              <tr>
                <td class="border border-[#ccc]">MuscleGym</td>
                <td class="border border-[#ccc]">4</td>
              </tr>

            </table>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>
