<script setup lang="ts">
import NavBarItem  from './NavBarItem.vue'
</script>

<template>
  <nav>
    <div class="menu">
      <div class="tituloelista">
        <h5>MEU FICHÁRIO</h5>
        <div class="menulista">
          <NavBarItem to="/fichamentos" label="Fichamentos" icon="folder_open"></NavBarItem>
          <NavBarItem to="/citacoes" label="Citações" icon="format_quote"></NavBarItem>
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
  gap: 0.5rem;
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
