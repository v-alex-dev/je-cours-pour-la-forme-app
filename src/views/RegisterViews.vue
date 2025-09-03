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
        class="bg-[color:var(--primary)] text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-green-600 transition"
      >
        S'inscrire
      </button>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

const backendUrl = import.meta.env.VITE_BACKEND_URL

async function handleRegister() {
  error.value = ''
  try {
    const res = await fetch(`${backendUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.value, email: email.value, password: password.value }),
    })
    if (!res.ok) {
      const data = await res.json()
      error.value = data.message || 'Erreur lors de l’inscription'
    } else {
      // Redirige ou affiche un message de succès
    }
  } catch (e) {
    error.value = 'Erreur réseau'
  }
}
</script>
