import { defineStore } from 'pinia'
import { useSupabaseAuth } from '../composables/useSupabaseAuth'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    session: null,
    error: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.session,
    getUser: (state) => state.user,
    getError: (state) => state.error,
  },
  actions: {
    async register({ email, password, name }) {
      this.error = null
      const { signUp } = useSupabaseAuth()
      const { data, error } = await signUp({ email, password, name })
      if (error) {
        this.error = error.message
        this.user = null
        this.session = null
      } else {
        this.user = data.user || data.session?.user || null
        this.session = data.session || null
      }
    },
    async login({ email, password }) {
      this.error = null
      const { signIn } = useSupabaseAuth()
      const { data, error } = await signIn({ email, password })
      if (error) {
        this.error = error.message
        this.user = null
        this.session = null
      } else {
        this.user = data.user || data.session?.user || null
        this.session = data.session || null
      }
    },
    async logout() {
      this.error = null
      const { signOut } = useSupabaseAuth()
      const { error } = await signOut()
      if (error) {
        this.error = error.message
      }
      this.user = null
      this.session = null
    },
  },
})
