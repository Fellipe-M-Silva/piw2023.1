<script setup lang="ts">
defineProps({
  pageName: String,
  options: Boolean
})
</script>

<template>
  <div class="panel">
    <button class="button btn-secondary btn-icon">
      <span class="material-symbols-outlined"> arrow_back </span>
    </button>
    <h1>{{ pageName }}</h1>
    <div v-if="options"class="holder">
      <button class="button btn-secondary">Editar</button>
      <button class="button btn-secondary btn-icon">
        <span class="material-symbols-outlined"> more_horiz </span>
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
