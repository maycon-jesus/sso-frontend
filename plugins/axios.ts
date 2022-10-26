import axios from "axios"

export default defineNuxtPlugin(()=>{
    const runtimeConfig = useRuntimeConfig()
    const api = axios.create({
        baseURL: runtimeConfig.public.BASE_URL_API
    })

    return {
        provide:{
            api
        }
    }
})