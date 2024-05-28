<script setup lang="ts">
import Button from './components/Button.vue';
import CircleImg from './components/CircleImg.vue';
// import ReportesUsuario from './views/ReportesUsuario.vue';
import CuboRutinas from './views/CuboRutinas.vue';



const handleButtonClick = () => {
  console.log('Button was clicked!');
}




</script>

<template>
  <div class="w-full h-screen flex flex-row bg-slate-200">
    <aside class="w-[15%] h-screen bg-blue-700 flex flex-col py-5">
      <div class="w-full h-max flex justify-center">
        <CircleImg
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNDAiIGhlaWdodD0iMjQwIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xMiA1Yy0xLjExIDAtMiAuODktMiAycy44OSAyIDIgMnMyLS44OSAyLTJzLS44OS0yLTItMm0xMC00djVoLTJWNEg0djJIMlYxaDJ2MmgxNlYxem0tNyAxMC4yNlYyM2gtMnYtNWgtMnY1SDlWMTEuMjZDNi45MyAxMC4xNyA1LjUgOCA1LjUgNS41VjVoMnYuNUM3LjUgOCA5LjUgMTAgMTIgMTBzNC41LTIgNC41LTQuNVY1aDJ2LjVjMCAyLjUtMS40MyA0LjY3LTMuNSA1Ljc2Ii8+PC9zdmc+"
          alt="Logotipo-gymapp" />
      </div>
      <div class="w-full h-max flex flex-col items-center gap-y-5">
        <Button text="Reporte de progreso" @click="handleButtonClick" />
        <Button text="Reporte de satisfaccion rutinas" @click="handleButtonClick" />
      </div>
      <div></div>
    </aside>
    <div class="w-[80%] h-screen flex items-center justify-center">
      <div class="w-[90%] h-[500px] bg-white rounded-2xl shadow-lg border border-[#ccc]">
        <CuboRutinas />
      </div>
    </div>
  </div>
</template>
