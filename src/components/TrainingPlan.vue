<template>
  <div>
    <div v-if="loading" class="flex justify-center items-center py-4">
      <SpinnerComponent :loading="true" />
    </div>
    <div v-else>
      <template v-for="saison in plans" :key="saison.id">
        <h2 class="font-bold text-xl mb-4">{{ saison.nom }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="semaine in saison.semaines"
            :key="semaine.id"
            class="bg-white rounded-xl shadow-lg p-6"
          >
            <div class="font-semibold text-lg mb-2">Semaine {{ semaine.numero }}</div>
            <div v-for="(etape, idx) in semaine.etapes" :key="etape.id" class="mb-4">
              <div class="font-medium text-base mb-1">Jour {{ idx + 1 }}</div>
              <div
                v-for="ex in etape.etape_exercice"
                :key="ex.exercice_id"
                class="flex items-center mb-1"
              >
                <span
                  :class="[
                    'px-2 py-1 rounded text-white text-sm mr-2',
                    getColorClass(ex.exercices.nom),
                  ]"
                >
                  {{ ex.exercices.nom }}
                </span>
                <span class="ml-2 text-gray-700">{{ ex.exercices.duree }} min</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
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

// Code couleur selon le type d'exercice
function getColorClass(nom) {
  nom = nom.toLowerCase()
  if (nom.includes('marche')) return 'bg-green-500'
  if (nom.includes('course')) return 'bg-blue-500'
  if (nom.includes('sprint')) return 'bg-red-500'
  if (nom.includes('étirement') || nom.includes('etirement')) return 'bg-purple-500'
  if (nom.includes('échauffement') || nom.includes('echauffement'))
    return 'bg-yellow-500 text-black'
  return 'bg-gray-400'
}
</script>
/* Modern card style for training plan */ .grid { margin-top: 1rem; } .bg-white { background: #fff;
} .rounded-xl { border-radius: 1rem; } .shadow-lg { box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
.font-bold { color: var(--secondary); } .font-semibold { color: var(--secondary); } .font-medium {
color: #333; } .text-lg { font-size: 1.125rem; } .text-base { font-size: 1rem; } .text-sm {
font-size: 0.875rem; } .mb-1 { margin-bottom: 0.25rem; } .mb-2 { margin-bottom: 0.5rem; } .mb-4 {
margin-bottom: 1rem; } .mr-2 { margin-right: 0.5rem; } .ml-2 { margin-left: 0.5rem; } .ml-4 {
margin-left: 1rem; } .ml-6 { margin-left: 1.5rem; } .px-2 { padding-left: 0.5rem; padding-right:
0.5rem; } .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; } .rounded { border-radius:
0.375rem; } .text-white { color: #fff; } .text-gray-700 { color: #374151; } .bg-green-500 {
background: #22c55e; } .bg-blue-500 { background: #3b82f6; } .bg-red-500 { background: #ef4444; }
.bg-purple-500 { background: #a855f7; } .bg-yellow-500 { background: #fde047; } .bg-gray-400 {
background: #9ca3af; }
