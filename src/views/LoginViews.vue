<template>
  <div class="min-h-screen flex items-center justify-center bg-glassmorphism">
    <form
      @submit.prevent="handleLogin"
      class="w-full max-w-sm p-6 rounded-xl shadow-lg backdrop-blur-md bg-white/30"
    >
      <h1 class="text-2xl font-bold mb-6 text-center">Connexion</h1>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium mb-1">Email</label>
        <input
          v-model="email"
          id="email"
          type="email"
          required
          class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/60"
        />
      </div>
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium mb-1">Mot de passe</label>
        <input
          v-model="password"
          id="password"
          type="password"
          required
          class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/60"
        />
      </div>
      <button
        type="submit"
        class="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 disabled:opacity-60"
        :disabled="isLoading"
      >
        <SpinnerComponent :loading="isLoading" />
        <span v-if="!isLoading">Se connecter</span>
        <span v-else>Connexion...</span>
      </button>
      <p v-if="error" class="mt-4 text-red-500 text-center">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import SpinnerComponent from '../components/SpinnerComponent.vue'

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref('')
const router = useRouter()
const userStore = useUserStore()

async function handleLogin() {
  error.value = ''
  isLoading.value = true
  try {
    await userStore.login({ email: email.value, password: password.value })
    if (!userStore.error) {
      router.push('/dashboard')
    } else {
      error.value = userStore.error
    }
  } catch (e) {
    error.value = e.message || 'Erreur de connexion'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.bg-glassmorphism {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
}
</style>
