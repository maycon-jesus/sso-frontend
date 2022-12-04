type application = {
  name: string,
  id: string
}

export const useApplicationsStore = defineStore('applications', {
  state: (): {
    applications: any[]
    currentApp: any
  } => ({
    applications: [],
    currentApp: null
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
    },
    getApplicationFetch (appId: string) {
      const $api = useApiFetch()
      return $api<application>('/users/me/applications/' + appId, {
        method: 'GET'
      }).then((data) => {
        this.currentApp = data
        return data
      })
    }
  }
})
