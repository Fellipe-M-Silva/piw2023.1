<script setup lang="ts">
import SearchBar from './SearchBar.vue';

const props = defineProps({
  showButton1: Boolean,
  button1Label: String,
  button1Icon: String,
  button1Link: String,
  button2Label: String,
  button2Icon: String,
  button2Link: String
})
</script>

<template>
  <div class="panel">
    <SearchBar/>
    <div class="actions">
      <RouterLink to="button2Link" as="button">
        <button v-if="showButton1" class="btn-secondary">
        <span class="material-symbols-outlined">{{ button1Icon }}</span> {{ button1Label }}
      </button>
      </RouterLink>
      
      <RouterLink to="button2Link" as="button">
        <button class="btn-primary">
        <span class="material-symbols-outlined">{{ button2Icon }}</span> {{ button2Label }}
      </button>
      </RouterLink>
      
    </div>
  </div>
</template>

<style scoped>

.panel {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.actions {
  display: flex;
  /* flex-wrap: wrap; */
  gap: 0.5rem;
}
</style>
