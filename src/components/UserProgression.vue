<template>
  <div class="w-full max-w-md mx-auto py-4">
    <div class="progress-glass-bar">
      <div class="progress-bar-fill" :style="{ width: percent + '%' }"></div>
      <span class="progress-bar-text">
        <template v-if="percent > 0">{{ percent }}%</template>
        <template v-else>Aucune progression</template>
      </span>
    </div>
    <div v-if="details" class="mt-2 text-xs text-white/80 text-center">
      {{ details }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTrainingStore } from '../stores/training'

const props = defineProps({
  percent: {
    type: Number,
    default: null,
  },
  details: {
    type: String,
    default: '',
  },
})

const trainingStore = useTrainingStore()
const percent = computed(() => {
  // Si progression non définie ou total_steps = 0, afficher 0
  const value = props.percent !== null ? props.percent : trainingStore.progressionPercent
  if (isNaN(value) || value < 0) return 0
  return value
})
</script>

<style scoped>
/* Barre de progression glassmorphism, fluide et élégante */
.progress-glass-bar {
  position: relative;
  width: 100%;
  height: 2.5rem;
  background: rgba(255,255,255,0.25);
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px 0 rgba(30,64,175,0.08), 0 1.5px 6px 0 rgba(30,64,175,0.12);
  backdrop-filter: blur(8px);
  border: 1.5px solid rgba(255,255,255,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.progress-bar-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  border-radius: 1.5rem;
  background: linear-gradient(90deg, #4f8cff 0%, #6a5af9 60%, #a685ff 100%);
  box-shadow: 0 2px 8px 0 rgba(106,90,249,0.12);
  transition: width 0.6s cubic-bezier(.4,0,.2,1);
  z-index: 1;
}
.progress-bar-text {
  position: relative;
  z-index: 2;
  width: 100%;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  color: #2d2e4f;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 4px rgba(255,255,255,0.7);
  background: none;
  border-radius: 1rem;
  padding: 0.25rem 0;
  user-select: none;
}
</style>
