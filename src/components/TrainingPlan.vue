<template>
  <div class="bg-white rounded-xl shadow-lg p-4">
    <div v-if="loading" class="flex justify-center items-center py-4">
      <SpinnerComponent :loading="true" />
    </div>
    <ul v-else class="text-[color:var(--secondary)]">
      <template v-for="saison in plans" :key="saison.id">
        <li class="font-bold mt-2">{{ saison.nom }}</li>
        <ul v-for="semaine in saison.semaines" :key="semaine.id" class="ml-2">
          <li class="font-semibold">Semaine {{ semaine.numero }}</li>
          <ul v-for="etape in semaine.etapes" :key="etape.id" class="ml-4">
            <li>{{ etape.nom }}</li>
            <ul v-for="ex in etape.etape_exercice" :key="ex.exercice_id" class="ml-6">
              <li>{{ ex.exercices.nom }} - {{ ex.exercices.duree }} min</li>
            </ul>
          </ul>
        </ul>
      </template>
    </ul>
    <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
  </div>
</template>
// ...existing code...
<style scoped>
ul {
  list-style-type: none;
  padding-left: 0;
}
li {
  color: #222;
  margin-bottom: 4px;
}
.font-bold {
  color: var(--secondary);
}
.font-semibold {
  color: var(--secondary);
}
</style>
<script setup>
// ...existing code...

import SpinnerComponent from './SpinnerComponent.vue'
defineProps({
  plans: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
})
</script>
