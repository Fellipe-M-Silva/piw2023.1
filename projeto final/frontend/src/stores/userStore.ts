import { defineStore } from "pinia";
import type { User } from "@/types";
import router from "@/router";


export const useUserStore = defineStore({
  id: 'auth',
  state: () => ({
      user: JSON.parse(localStorage.getItem('user') || '{}'),
      token: JSON.parse(localStorage.getItem('token') || '{}')
  }),
  actions: {
    login(authUser: User, token: string) {
      this.user = authUser
      this.token = token
      
      localStorage.setItem('user', JSON.stringify(authUser))
      localStorage.setItem('token', JSON.stringify(token))
    },
    
    logout() {
      this.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token')
      router.push('/login');
     }
  }
})