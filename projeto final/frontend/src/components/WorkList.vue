<script setup>
import CardAnnotation from './CardAnnotation.vue'

defineProps({
  data: {
    works: {
      title: String,
      authors: [{ id: String, name: String }]
    }
  }
})
</script>

<template>
  <div class="grid-list">
    <CardAnnotation
      v-for="work in data.works"
      :title="work.title"
      :authors="work.authors"
    ></CardAnnotation>
  </div>
</template>

<style>
div {
  display: grid;
  gap: 1.25rem;
}

@media screen and (max-width: 1440px) {
  .grid-list {
    grid-template-columns: auto auto auto;
  }
}

@media screen and (max-width: 768px) {
  .grid-list {
    grid-template-columns: auto auto;
  }
}

@media screen and (max-width: 480px) {
  .grid-list {
    grid-template-columns: auto ;
  }
}

</style>
