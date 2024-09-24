<script setup lang="ts">
defineProps({
  editLink: String,
  pageName: String,
  backButton: Boolean,
  options: Boolean
})
</script>

<template>
  <div class="panel">
    <button v-if="backButton" class="button btn-secondary btn-icon">
      <span class="material-symbols-outlined"> arrow_back </span>
    </button>
    <h1>{{ pageName }}</h1>
    <div v-if="options"class="holder">
      <RouterLink to="editLink">
        <button class="button btn-secondary">Editar</button>
      </RouterLink>
      
      <button class="button btn-negative">
        <span class="material-symbols-outlined"> delete </span>
        Excluir
      </button>
    </div>
  </div>
</template>

<style scoped>
.panel {
  display: flex;
  flex-direction: row;
}

h1 {
  flex: 1 0 0;
}
</style>
