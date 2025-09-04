<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-[color:var(--secondary)]">
    <h1 class="text-3xl font-bold mb-6 text-[color:var(--primary)] drop-shadow-lg">Inscription</h1>
    <form
      @submit.prevent="handleRegister"
      class="flex flex-col gap-4 w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/30 border border-[color:var(--primary)] backdrop-blur-md"
    >
      <input
        v-model="name"
        type="text"
        placeholder="Nom"
        required
        class="border border-[color:var(--primary)] rounded-lg px-4 py-2 text-[color:var(--secondary)] bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]"
      />
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
        class="border border-[color:var(--primary)] rounded-lg px-4 py-2 text-[color:var(--secondary)] bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Mot de passe"
        required
        class="border border-[color:var(--primary)] rounded-lg px-4 py-2 text-[color:var(--secondary)] bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]"
      />
      <button
        type="submit"
        class="bg-[color:var(--primary)] text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-green-600 transition flex items-center justify-center gap-2"
        :disabled="isLoading"
      >
        <Spinner :loading="isLoading" />
        <span v-if="!isLoading">S'inscrire</span>
        <span v-else>Inscription...</span>
      </button>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
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
