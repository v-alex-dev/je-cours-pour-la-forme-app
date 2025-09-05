<template>
  <div>
    <div v-if="loading" class="flex justify-center items-center py-4">
      <SpinnerComponent :loading="true" />
    </div>
    <div v-else>
      <template v-for="saison in plans" :key="saison.id">
        <h2 class="font-bold text-xl mb-4">{{ saison.nom }}</h2>
        <div class="flex flex-col gap-4">
          <div
            v-for="semaine in saison.semaines"
            :key="semaine.id"
            class="glass-card rounded-2xl shadow-xl p-4 md:p-6 mb-2"
          >
            <div class="font-semibold text-lg mb-4 text-gray-800">Semaine {{ semaine.numero }}</div>
            <div v-if="semaine.etapes && semaine.etapes.length > 0">
              <div
                v-for="(etape, idx) in semaine.etapes"
                :key="etape.id"
                class="mb-4 pb-3 border-b border-gray-200 last:border-b-0"
              >
                <div class="font-bold text-base mb-2 text-gray-900">Jour {{ idx + 1 }}</div>
                <div v-if="etape.etape_exercice.length > 0">
                  <div
                    v-for="ex in etape.etape_exercice"
                    :key="ex.exercice_id"
                    class="flex items-center mb-2"
                  >
                    <span
                      :class="[
                        'inline-block px-3 py-1 rounded-lg text-sm font-semibold mr-2',
                        getColorClass(ex.exercices.nom),
                        getTextColorClass(ex.exercices.nom),
                      ]"
                      style="border: 1px solid #eee"
                    >
                      {{ ex.exercices.nom }}
                    </span>
                    <span class="ml-2 text-gray-700 text-sm">{{ ex.exercices.duree }} min</span>
                  </div>
                </div>
                <div v-else class="text-gray-400 italic text-xs">Aucun exercice</div>
              </div>
            </div>
            <template v-else>
              <div class="text-gray-400 italic text-sm">
                Aucune journée disponible pour cette semaine.
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
    <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
    <button @click="startSession" class="btn-glass">Démarrer la session</button>
  </div>
</template>

<style scoped>
/* Glassmorphism card */
.glass-card {
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.25);
}
</style>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

// Couleur du texte selon le fond du badge
function getTextColorClass(nom) {
  nom = nom.toLowerCase()
  if (nom.includes('marche')) return 'text-white'
  if (nom.includes('course')) return 'text-white'
  if (nom.includes('sprint')) return 'text-white'
  if (nom.includes('étirement') || nom.includes('etirement')) return 'text-white'
  if (nom.includes('échauffement') || nom.includes('echauffement')) return 'text-black'
  return 'text-gray-800'
}

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

function startSession() {
  router.push('/session-progression')
}
</script>
