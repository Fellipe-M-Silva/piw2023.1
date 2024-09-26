<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import NavBarItem from './NavBarItem.vue'
import { onMounted, onUpdated, ref } from 'vue'

const isAuthenticated = ref<boolean>()
const isAdmin = ref(false)
const isSuperAdmin = ref(false)
const userStore = useUserStore()

onMounted(async () => {
  if (userStore.isAuthenticated) {
    isAuthenticated.value = Boolean(userStore.isAuthenticated)
    isAdmin.value = Boolean(userStore.user.isAdmin)
    isSuperAdmin.value = Boolean(userStore.user.isSuperAdmin)
  }
})
</script>

<template>
  <nav>
    <div class="menu">
      <div class="tituloelista">
        <h5>COMUNIDADE</h5>
        <div class="menulista">
          <NavBarItem to="/repositorio" label="Repositório" icon="public"></NavBarItem>
        </div>
      </div>
      <div v-if="isAuthenticated" class="tituloelista">
        <h5>MEU FICHÁRIO</h5>
        <div class="menulista">
          <NavBarItem to="/fichamentos" label="Meus fichamentos" icon="folder_open"></NavBarItem>
          <NavBarItem to="/citacoes" label="Citações" icon="format_quote"></NavBarItem>
        </div>
      </div>
      <div v-else class="logindiv">
        <h3>Faça login </h3>
        <p class="body2">Acesse sua conta para gerenciar seus fichamentos.</p>
        <RouterLink to="/login" as="button" class="btn-primary">Login</RouterLink>
      </div>
      <div v-if="isAdmin && isAuthenticated" class="tituloelista">
        <h5>ADMINISTRAÇÃO</h5>
        <div class="menulista">
          <NavBarItem to="/usuarios" label="Usuários" icon="person"></NavBarItem>
          <NavBarItem
            v-if="isSuperAdmin && isAuthenticated"
            to="/administradores"
            label="Administradores"
            icon="badge"
          ></NavBarItem>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  align-self: stretch;
}

.tituloelista {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
}

.menulista {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0rem;
  align-self: stretch;
}


</style>
