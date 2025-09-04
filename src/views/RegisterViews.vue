<template>
  <div class="register-container">
    <h1 class="register-title drop-shadow-lg">Inscription</h1>
    <form @submit.prevent="handleRegister" class="register-form">
      <input v-model="name" type="text" placeholder="Nom" required class="input" />
      <input v-model="email" type="email" placeholder="Email" required class="input" />
      <input v-model="password" type="password" placeholder="Mot de passe" required class="input" />
      <button
        type="submit"
        class="btn-primary flex items-center justify-center gap-2"
        :disabled="isLoading"
      >
        <Spinner :loading="isLoading" />
        <span v-if="!isLoading">S'inscrire</span>
        <span v-else>Inscription...</span>
      </button>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="successMessage" class="text-green-600 mt-2">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Spinner from '@/components/SpinnerComponent.vue'

const name = ref('')
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const successMessage = ref('')
const userStore = useUserStore()
const error = computed(() => userStore.getError)
const router = useRouter()

async function handleRegister() {
  isLoading.value = true
  successMessage.value = ''
  await userStore.register({ email: email.value, password: password.value, name: name.value })
  isLoading.value = false
  if (!userStore.getError) {
    successMessage.value = 'Inscription réussie ! Vous allez être redirigé.'
    setTimeout(() => router.push('/'), 1200)
  }
}
</script>
