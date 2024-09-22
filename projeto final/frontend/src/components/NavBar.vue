<script setup lang="ts">
import NavBarItem  from './NavBarItem.vue'

defineProps({
  isAdmin: Boolean,
  isSuperAdmin: Boolean
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
      <div class="tituloelista">
        <h5>MEU FICHÁRIO</h5>
        <div class="menulista">
          <NavBarItem to="/fichamentos" label="Meus fichamentos" icon="folder_open"></NavBarItem>
          <NavBarItem to="/citacoes" label="Citações" icon="format_quote"></NavBarItem>
        </div>
      </div>
      <div v-if="isAdmin" class="tituloelista">
        <h5>ADMINISTRAÇÃO</h5>
        <div class="menulista">
          <NavBarItem to="/usuarios" label="Usuários" icon="person"></NavBarItem>
          <NavBarItem v-if="isSuperAdmin" to="/administradores" label="Administradores" icon="badge"></NavBarItem>
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
