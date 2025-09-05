<template>
  <div class="min-h-screen flex flex-col register-container">
    <header class="w-full px-4 py-3 flex items-center justify-between bg-white shadow-md">
      <router-link to="/" class="flex items-center gap-2">
        <span class="font-bold text-lg text-[color:var(--secondary)]">Je cours pour la forme</span>
      </router-link>
      <nav class="flex gap-4">
        <template v-if="!userStore.isAuthenticated">
          <router-link
            to="/login"
            class="nav-link text-[color:var(--secondary)]"
            active-class="font-semibold"
            >Connexion</router-link
          >
          <router-link
            to="/register"
            class="nav-link text-[color:var(--secondary)]"
            active-class="font-semibold"
            >Inscription</router-link
          >
        </template>
        <template v-else>
          <button
            class="nav-link flex items-center gap-2 text-[color:var(--secondary)]"
            :disabled="isLoading"
            @click="handleLogout"
          >
            <SpinnerComponent :loading="isLoading" />
            <span v-if="!isLoading">Déconnexion</span>
            <span v-else>Déconnexion...</span>
          </button>
        </template>
      </nav>
    </header>
    <main class="flex-1 flex items-center justify-center">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import SpinnerComponent from '../components/SpinnerComponent.vue'

const userStore = useUserStore()
const isLoading = ref(false)

const handleLogout = async () => {
  isLoading.value = true
  await userStore.logout()
  isLoading.value = false
}
</script>

<!-- Styles centralisés dans main.css -->
