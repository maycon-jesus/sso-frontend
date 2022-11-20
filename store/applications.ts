export const useApplicationsStore = defineStore('applications', {
  state: () => ({
    applications: []
  }),
  actions: {
    getApplications () {
      return new Promise((resolve) => {
        const $api = useApi()
        $api.get('/users/me/applications')
          .then((applications) => {
            this.applications = applications.data
            resolve(applications.data)
          })
          .catch((err) => {
            console.error(err)
          })
      })
    },
    getApplicationsFetch () {
      const $api = useApiFetch()
      return $api('/users/me/applications', {
        method: 'GET'
      }).then((data:any) => {
        this.applications = data
        return data
      })
    }
  }
})
