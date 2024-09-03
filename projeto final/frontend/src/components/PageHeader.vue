<script setup lang="ts">
defineProps({
  pageName: String
})
</script>

<template>
  <div class="container">
    <button>Voltar</button>
    <h1>{{ pageName }}</h1>
  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--root-05-rem, 8px);
  align-self: stretch;

  padding: 1rem;
  border-radius: 1.5rem;
  border-radius: var(--root-15-rem, 24px);
  background: var(--root-background-1, #fcfcfd);
}

h1 {
    flex: 1 0 0;
}
</style>
