<template>
  <div class="min-h-screen bg-glassmorphism p-4 flex flex-col items-center">
    <h1 class="text-2xl font-bold mb-4">Mon programme</h1>
    <!-- Progression du coureur -->
    <section class="w-full max-w-md mb-6">
      <div class="bg-white/60 rounded-xl shadow-lg p-4 mb-4">
        <h2 class="text-lg font-semibold mb-2">Progression</h2>
        <!-- À remplacer par la vraie progression -->
        <p>Vous êtes à l'étape X de la semaine Y, saison Z.</p>
      </div>
      <div class="bg-white/60 rounded-xl shadow-lg p-4 mb-4">
        <h2 class="text-lg font-semibold mb-2">Plan d'entraînement</h2>
        <!-- À remplacer par le plan dynamique -->
        <ul>
          <li>Saison 1 > Semaine 1 > Étape 1 > Exercice 1</li>
          <li>...</li>
        </ul>
      </div>
    </section>
    <!-- Actions principales -->
    <div class="flex flex-col gap-3 w-full max-w-md">
      <button class="btn-glass w-full py-2 font-semibold rounded-xl" @click="lancerSession">
        Lancer la prochaine session
      </button>
      <button
        class="btn-glass w-full py-2 font-semibold rounded-xl"
        @click="reinitialiserProgramme"
      >
        Réinitialiser mon programme
      </button>
    </div>
  </div>
</template>

<script setup>
// Ici, importer les stores Pinia et les composables nécessaires
// import { useUserStore } from '@/stores/user'
// import { useProgrammeStore } from '@/stores/programme'
// import { useSupabaseAuth } from '@/composables/useSupabaseAuth'

function lancerSession() {
  // Logique pour lancer la prochaine session
}

function reinitialiserProgramme() {
  // Logique pour réinitialiser le programme
}
</script>

<style scoped>
.bg-glassmorphism {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
}
.btn-glass {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);
  border: none;
  color: #222;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: background 0.2s;
}
.btn-glass:hover {
  background: rgba(255, 255, 255, 0.6);
}
</style>
