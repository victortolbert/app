import { defineStore } from 'pinia'
import { useApiFetch } from '~/composables/useApiFetch'

interface User {
  id: number
  name: string
  email: string
}

interface Credentials {
  email: string
  password: string
}

interface RegistrationInfo {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => !!user.value)

  async function logout() {
    await useApiFetch('/logout', { key: 'logout', method: 'POST' })
    user.value = null
    navigateTo('/login')
  }

  async function fetchUser() {
    const { data, error } = await useApiFetch('/api/user', {
      key: 'user',
    })
    user.value = data.value as User
  }

  async function login(credentials: Credentials) {
    await useApiFetch('/sanctum/csrf-cookie')

    const login = await useApiFetch('/login', {
      key: 'login',
      method: 'POST',
      body: credentials,
    })

    await fetchUser()

    return login
  }

  async function register(info: RegistrationInfo) {
    await useApiFetch('/sanctum/csrf-cookie')

    const register = await useApiFetch('/register', {
      key: 'register',
      method: 'POST',
      body: info,
    })

    await fetchUser()

    return register
  }

  return { user, login, isLoggedIn, fetchUser, logout, register }
})
