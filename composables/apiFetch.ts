export const useApiFetch = () => {
  const runtimeConfig = useRuntimeConfig()

  const authTokenCookie = useCookie('AUTH_TOKEN')
  return $fetch.create({
    baseURL: runtimeConfig.public.BASE_URL_API,
    headers: {
      Authorization: authTokenCookie.value
    }
  })
}
