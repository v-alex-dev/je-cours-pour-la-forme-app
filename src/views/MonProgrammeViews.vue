<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-[color:var(--secondary)]">
    <div class="card-glass w-full max-w-md p-8 flex flex-col items-center">
      <h1 class="register-title text-center">Mon programme</h1>
      <section class="w-full mb-4">
        <div class="card-glass mb-4 p-4">
          <h2 class="title-accent text-lg font-semibold mb-2">Progression</h2>
          <user-progression></user-progression>
        </div>
        <div class="card-glass mb-4 p-4">
          <h2 class="title-accent text-lg font-semibold mb-2">Plan d'entraînement</h2>
          <TrainingPlan
            :plans="trainingStore.plans"
            :loading="trainingStore.loading"
            :error="trainingStore.error"
          />
        </div>
      </section>
      <div class="flex gap-3 w-full">
        <button class="btn-primary flex-1" @click="lancerSession">
          Lancer la prochaine session
        </button>
        <button
          class="btn-primary flex-1"
          style="background-color: var(--accent); color: var(--primary)"
          @click="reinitialiserProgramme"
        >
          Réinitialiser mon programme
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useTrainingStore } from '../stores/training'
import { useUserStore } from '../stores/user'
import TrainingPlan from '../components/TrainingPlan.vue'
import UserProgression from '../components/UserProgression.vue'
import { useRouter } from 'vue-router'

const trainingStore = useTrainingStore()
const userStore = useUserStore()
const router = useRouter()
const userId = computed(() => userStore.user?.id)
console.log(userId)

onMounted(() => {
  if (userId.value) {
    trainingStore.fetchProgression(userId.value)
  }
})

onMounted(() => {
  trainingStore.fetchPlans()
})

function lancerSession() {
  router.push('/session-progression')
}

function reinitialiserProgramme() {
  // Logique pour réinitialiser le programme
}
</script>

<style scoped>
/* Utilisation des classes globales, rien à surcharger ici */
</style>
