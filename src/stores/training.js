import { defineStore } from 'pinia'
import { useTrainingApi } from '../composables/useTrainingApi'

export const useTrainingStore = defineStore('training', {
  state: () => ({
    plans: [],
    loading: false,
    error: null,
    progression: {
      completed_steps: 0,
      total_steps: 0,
    },
    progressionLoading: false,
    progressionError: null,
    sessionProgression: [],
  }),
  actions: {
    async fetchPlans() {
      this.loading = true
      this.error = null
      try {
        const data = await useTrainingApi().getPlans()
        this.plans = data
      } catch (e) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },

    async fetchProgression(userId) {
      this.progressionLoading = true
      this.progressionError = null
      try {
        const data = await useTrainingApi().getProgression(userId)
        console.log('[fetchProgression] Data:', data)
        this.progression = {
          completed_steps: data.completed_steps || 0,
          total_steps: data.total_steps || 0,
        }
      } catch (e) {
        this.progressionError = e.message
      } finally {
        this.progressionLoading = false
      }
    },
    async fetchSessionProgression() {
      const { getSessionProgression } = useTrainingApi()
      const res = await getSessionProgression()
      this.sessionProgression = res
    },
    async validateSessionProgression(userId) {
      const { validateSessionProgression } = useTrainingApi()
      await validateSessionProgression(userId)
    },
  },

  getters: {
    progressionPercent(state) {
      const { completed_steps, total_steps } = state.progression
      if (!total_steps || total_steps === 0) return 0
      return Math.round((completed_steps / total_steps) * 100)
    },
  },
})
