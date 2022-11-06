import { useToast } from 'vue-toastification'

export const doLogout = () => {
  const userData = useUserData()
  const route = useRouter()
  const toast = useToast()
  userData.value = null
  route.push('/')
  toast.info('Conta deslogada!')
}
