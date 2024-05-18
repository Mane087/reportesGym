<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
const props = defineProps<{
    text: string;
}>();

const emit = defineEmits(['click']);

</script>

<template>
    <button @click="emit('click')" class="w-3/4 h-max py-3 bg-white rounded-md text-black">
        {{ props.text }}
    </button>
</template>
