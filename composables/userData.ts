import { useToast } from "vue-toastification"

export const useUserData = () => useState<any>('userData', ()=>(null))

export const doLogout = () => {
    const userData = useUserData()
    const route = useRouter()
    const toast = useToast()
    userData.value=null
    route.push('/')
    toast.info('Conta deslogada!')
}