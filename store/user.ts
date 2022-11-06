import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state () {
    return {
      userData: null
    }
  },
  actions: {
    async getUserData () {
      const { $api } = useNuxtApp()
      const data = await $api.get('/users/me')
      data.data.avatarUrl = `https://www.gravatar.com/avatar/${data.data.avatarUrl}?s=32&d=identicon`
      this.userData = data.data
    },
    getUserDataFetch () {
      const apiFetch = useApiFetch()
      return apiFetch<any>('/users/me')
        .then((data) => {
          data.avatarUrl = `https://www.gravatar.com/avatar/${data.avatarUrl}?s=32&d=identicon`
          this.userData = data
          return data
        })
    }
  }
})
