<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 p-4"
  >
    <div v-if="loading" class="w-full flex justify-center mb-4">
      <SpinnerComponent :loading="loading" />
    </div>
    <div v-else>
      <div class="glass-card p-6 w-full max-w-md flex flex-col items-center">
        <h2 class="text-2xl font-bold mb-2 text-center text-white drop-shadow">
          {{ currentExercise?.nom }}
        </h2>
        <p class="mb-4 text-center text-white/80">{{ currentExercise?.description }}</p>
        <div v-if="timer > 0" class="flex flex-col items-center">
          <div class="relative mb-4">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="70" fill="none" stroke="#ffffff33" stroke-width="12" />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                :stroke="timerColor"
                stroke-width="12"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="dashOffset"
                stroke-linecap="round"
                style="transition: stroke-dashoffset 1s linear"
              />
              <text
                x="80"
                y="90"
                text-anchor="middle"
                font-size="2.2em"
                fill="#fff"
                font-weight="bold"
              >
                {{ timerDisplay }}
              </text>
            </svg>
          </div>
          <div class="flex gap-2 mt-2">
            <button @click="pauseTimer" v-if="!paused" class="btn-glass">Pause</button>
            <button @click="resumeTimer" v-if="paused" class="btn-glass">Play</button>
            <button @click="stopSession" class="btn-glass">Stop</button>
          </div>
        </div>
        <div v-else class="flex flex-col items-center">
          <span class="text-green-400 font-bold mb-2 text-lg">Exercice terminé !</span>
          <button v-if="hasNextExercise" @click="nextExercise" class="btn-glass">Suivant</button>
          <button
            v-else
            @click="validateSession"
            :disabled="validating"
            class="btn-glass flex items-center"
          >
            <SpinnerComponent :loading="validating" />
            <span v-if="!validating">Valider</span>
            <span v-else>Validation...</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTrainingStore } from '../stores/training'
import SpinnerComponent from '../components/SpinnerComponent.vue'

const router = useRouter()
const trainingStore = useTrainingStore()
const loading = ref(true)
const validating = ref(false)
const paused = ref(false)
const timer = ref(0)
const timerInterval = ref(null)
const currentIndex = ref(0)
const initialDuration = ref(0)

const progression = computed(() => trainingStore.sessionProgression)
const currentExercise = computed(() => progression.value?.[currentIndex.value] || null)
const hasNextExercise = computed(() => currentIndex.value < progression.value.length - 1)

const timerDisplay = computed(() => {
  const min = Math.floor(timer.value / 60)
  const sec = timer.value % 60
  return `${min}:${sec.toString().padStart(2, '0')}`
})

const circumference = 2 * Math.PI * 70
const timerColor = computed(() => (timer.value > 10 ? '#38bdf8' : '#f87171'))
const dashOffset = computed(() => {
  if (!initialDuration.value) return circumference
  return circumference * (1 - timer.value / initialDuration.value)
})

function startTimer(duration) {
  timer.value = duration
  initialDuration.value = duration
  clearInterval(timerInterval.value)
  timerInterval.value = setInterval(() => {
    if (!paused.value && timer.value > 0) {
      timer.value--
    }
    if (timer.value === 0) {
      clearInterval(timerInterval.value)
    }
  }, 1000)
}

function pauseTimer() {
  paused.value = true
}
function resumeTimer() {
  paused.value = false
}
function stopSession() {
  clearInterval(timerInterval.value)
  router.push('/mon-programme')
}
function nextExercise() {
  currentIndex.value++
  if (currentExercise.value?.duree) {
    startTimer(currentExercise.value.duree)
  }
}
// import { useUserStore } from '../stores/user'
// const userStore = useUserStore()
// const userId = computed(() => userStore.user?.id)

async function validateSession() {
  validating.value = true
  // await trainingStore.validateSessionProgression(userId.value) // <-- Envoi à la DB désactivé pour test
  validating.value = false
  router.push('/mon-programme')
}

onMounted(async () => {
  await trainingStore.fetchSessionProgression()
  loading.value = false
  if (currentExercise.value?.duree) {
    startTimer(currentExercise.value.duree)
  }
})

watch(currentIndex, () => {
  if (currentExercise.value?.duree) {
    startTimer(currentExercise.value.duree)
  }
})
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(16px);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.25);
}
.btn-glass {
  padding: 0.7em 1.5em;
  border-radius: 1em;
  background: rgba(255, 255, 255, 0.25);
  color: #1e293b;
  font-weight: 600;
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.15);
  transition: background 0.2s;
  border: none;
  outline: none;
}
.btn-glass:hover {
  background: rgba(255, 255, 255, 0.45);
}
</style>
