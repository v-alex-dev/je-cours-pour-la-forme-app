export const useUserStore = defineStore('user', {
  state: () => ({
    name: 'Eduardo',
  }),
  getters: {
    getName: (state) => state.name,
  },
  actions: {
  },
})