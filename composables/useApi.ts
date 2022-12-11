import axios from 'axios'

export function useApi () {
  const runtimeConfig = useRuntimeConfig()
  const api = axios.create({
    baseURL: runtimeConfig.public.BASE_URL_API
  })

  api.interceptors.request.use((req) => {
    const cookie = useCookie('AUTH_TOKEN')
    if (!req.headers) { req.headers = {} }
    if (cookie.value) { req.headers.Authorization = cookie.value }
    return req
  })

  return api
}
