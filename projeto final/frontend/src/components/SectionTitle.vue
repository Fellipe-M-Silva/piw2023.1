<script setup>
defineProps({
  title:String,
  subtitle:String
})
</script>

<template>
  <div>
    <h1 class="centered">{{ title }}</h1>
    <p class="body2 centered">{{ subtitle }}</p>
  </div>
</template>

<style scoped>
div {
  margin: 0;
  display: flex;
  padding: 1rem;
  gap: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1 0 0;
  align-self: stretch;
}
</style>