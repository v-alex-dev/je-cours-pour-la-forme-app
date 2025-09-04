<template>
  <div class="min-h-screen flex flex-col bg-glassmorphism">
    <header
      class="w-full px-4 py-3 flex items-center justify-between bg-white/30 backdrop-blur-md shadow-md"
    >
      <router-link to="/" class="flex items-center gap-2">
        <span class="font-bold text-lg text-blue-600">Je cours pour la forme</span>
      </router-link>
      <nav class="flex gap-4">
        <router-link to="/login" class="nav-link" active-class="text-blue-600 font-semibold"
          >Connexion</router-link
        >
        <router-link to="/register" class="nav-link" active-class="text-blue-600 font-semibold"
          >Inscription</router-link
        >
      </nav>
    </header>
    <main class="flex-1 flex items-center justify-center">
      <slot />
    </main>
  </div>
</template>

<script setup></script>

<style scoped>
.bg-glassmorphism {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
}
.nav-link {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background 0.2s;
}
.nav-link:hover {
  background: rgba(59, 130, 246, 0.1);
}
</style>
