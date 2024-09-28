<script setup lang="ts">
import SearchBar from './SearchBar.vue';

const props = defineProps({
  showButton2: Boolean,
  button2Label: String,
  button2Icon: String,
  button2Link: String
})
</script>

<template>
  <div class="panel">
    <SearchBar/>
    <div class="holder">
      <RouterLink to="button2Link" as="button">
        <button v-if="showButton2" class="btn-primary">
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
