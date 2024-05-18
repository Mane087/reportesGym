<script setup lang="ts">
    import { defineProps } from 'vue';
    
    const props = defineProps<{
        src: string;
        alt: string;
    }>();
</script>

<template>
    <img :src="props.src" :alt="props.alt" class="w-[70%] h-[70%]">
</template>