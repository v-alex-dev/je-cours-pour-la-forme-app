<template>
  <div class="register-container">
    <form @submit.prevent="handleLogin" class="register-form">
      <h1 class="register-title text-center">Connexion</h1>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium mb-1">Email</label>
        <input v-model="email" id="email" type="email" required class="input" />
      </div>
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium mb-1">Mot de passe</label>
        <input v-model="password" id="password" type="password" required class="input" />
      </div>
      <button
        type="submit"
        class="btn-primary flex items-center justify-center gap-2 w-full"
        :disabled="isLoading"
      >
        <SpinnerComponent :loading="isLoading" />
        <span v-if="!isLoading">Se connecter</span>
        <span v-else>Connexion...</span>
      </button>
      <p v-if="error" class="error text-center">{{ error }}</p>
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
      router.push('/mon-programme')
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
