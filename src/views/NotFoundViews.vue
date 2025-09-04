<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-glassmorphism">
    <div class="bg-white/30 backdrop-blur-lg rounded-xl shadow-lg p-8 flex flex-col items-center">
      <img src="/images/logo-192-192.png" alt="Logo" class="w-20 h-20 mb-4" />
      <h1 class="text-4xl font-bold text-gray-800 mb-2">404</h1>
      <p class="text-lg text-gray-600 mb-6">Oups ! Cette page n'existe pas.</p>
      <router-link to="/dashboard">
        <button
          class="px-6 py-2 rounded-lg bg-white/60 hover:bg-white/80 text-blue-600 font-semibold shadow transition-all flex items-center gap-2"
        >
          <span>Retour à l'accueil</span>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Pas de logique complexe ici, page statique
</script>

<style scoped>
.bg-glassmorphism {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(173, 216, 230, 0.3) 100%);
}
</style>
