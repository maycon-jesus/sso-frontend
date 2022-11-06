import axios, { AxiosResponse } from 'axios'

export function useApi () {
  const runtimeConfig = useRuntimeConfig()
  const api = axios.create({
    baseURL: runtimeConfig.public.BASE_URL_API
  })

  api.interceptors.request.use((req) => {
    const cookie = useCookie('AUTH_TOKEN')
    if (cookie.value) { req.headers.Authorization = cookie.value }
    return req
  })

  return api
}

export function useApiAsyncData<T> (a:Promise<AxiosResponse<any, any>>):Promise<T> {
  return new Promise((resolve, reject) => {
    a.then((r) => {
      resolve(r.data)
    }).catch((err) => {
      reject(new Error(err.response ? err.response.data.message : err.message))
    })
  })
}
