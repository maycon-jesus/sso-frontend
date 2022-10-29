import axios from "axios"

export default defineNuxtPlugin(()=>{
    const runtimeConfig = useRuntimeConfig()
    const api = axios.create({
        baseURL: runtimeConfig.public.BASE_URL_API
    })
    const cookie = useCookie('AUTH_TOKEN')
    
    api.interceptors.request.use((req)=>{
        if(cookie.value) req.headers.common.set('Authorization', cookie.value)
        return req
    })

    return {
        provide:{
            api
        }
    }
})