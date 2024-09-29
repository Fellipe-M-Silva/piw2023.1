import { defineStore } from "pinia";
import type { User } from "@/types";
import router from "@/router";


export const useUserStore = defineStore({
  id: 'auth',
  state: () => ({
      user: JSON.parse(localStorage.getItem('user') || '{}'),
      token: JSON.parse(localStorage.getItem('token') || '{}'),
      logged: localStorage.getItem('user')? true : false 
  }),
  actions: {
    login(authUser: User, token: string) {
      this.user = authUser
      this.token = token
      this.logged = true
      
      localStorage.setItem('user', JSON.stringify(authUser))
      localStorage.setItem('token', JSON.stringify(token))
    },
    
    logout() {
      this.user = null;
      this.logged = false
      localStorage.removeItem('user');
      localStorage.removeItem('token')
      router.push('/login');
     }
  }
})