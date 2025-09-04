<template>
  <span
    v-if="loading"
    class="inline-block animate-spin border-2 border-gray-300 border-t-primary rounded-full w-5 h-5 align-middle"
  ></span>
</template>

<script setup>
defineProps({ loading: Boolean })
</script>

<style scoped>
/* Utilise Tailwind pour le style, pas besoin de CSS ici */
</style>
