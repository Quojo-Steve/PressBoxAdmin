<template>
    <div>{{ message }}</div>
</template>

<script setup>
const props = defineProps({
    message: {
        type: String,
        default: 'No results found.',
    },
});
</script>