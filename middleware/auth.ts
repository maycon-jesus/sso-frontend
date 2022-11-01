import { createNuxt } from "nuxt"

export default defineNuxtRouteMiddleware(async(to)=>{
    const authToken = useCookie('AUTH_TOKEN')
    if(authToken.value) return
    
    return navigateTo({
        path:'/',
        query:{
            redirectPath: to.path
        }
    }, {
        redirectCode:302
    })
})