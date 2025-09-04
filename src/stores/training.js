import { defineStore } from 'pinia'
import { useTrainingApi } from '../composables/useTrainingApi'

export const useTrainingStore = defineStore('training', {
  state: () => ({
    plans: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPlans() {
      this.loading = true
      this.error = null
      try {
        const data = await useTrainingApi().getPlans()
        console.log('[TrainingStore] Data reçue:', data)
        this.plans = data
      } catch (e) {
        console.error('[TrainingStore] Erreur:', e)
        this.error = e.message
      } finally {
        this.loading = false
        console.log('[TrainingStore] Loading terminé')
      }
    },
  },
})
