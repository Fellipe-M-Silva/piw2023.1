import { defineStore } from "pinia";
import type { User } from "@/types";
import { computed, ref } from "vue";


export const useUserStore = defineStore('user', () => {
  const user = ref<Omit<User, 'password'>>({
    id: localStorage.getItem('id') || "",
    name: localStorage.getItem('name') || "",
    email: localStorage.getItem('email') || "",
    isAdmin: Boolean(localStorage.getItem('isAdmin')) || false,
    isSuperAdmin: Boolean(localStorage.getItem('isSuperAdmin')) || false
  })
  
  const jwt = ref('')
  const email = computed(() => user.value.email)
  const isAuthenticated = computed(() => jwt.value !== "")
  const isAdmin = computed(() => user.value.isAdmin)
  const isSuperAdmin = computed(() => user.value.isSuperAdmin)
  
  function authenticaded(authUser: User, token: string) {
    user.value = authUser
    jwt.value = token
    localStorage.setItem('id', authUser.id)
    localStorage.setItem('email', authUser.email)
    localStorage.setItem('isAdmin', authUser.isAdmin.toString())
    localStorage.setItem('isSuperAdmin', authUser.isSuperAdmin.toString())
    localStorage.setItem('isAuthenticated', isAuthenticated.value.toString())
    localStorage.setItem('token', token)
  }

  function logout() {
    jwt.value = ''
    user.value = {} as User;

    localStorage.clear()
  }

  return { user, email, jwt, isAdmin, isSuperAdmin, isAuthenticated, authenticaded, logout}
})