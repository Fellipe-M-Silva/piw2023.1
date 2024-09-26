<script setup lang="ts">
import { RouterView } from 'vue-router'
import PageHeader from './components/PageHeader.vue'
import { onMounted, onUpdated, ref } from 'vue';
import { useUserStore } from './stores/userStore';
const authenticated = ref<boolean>()
const userStore = useUserStore()
console.log(userStore.isAuthenticated)
onMounted(async () => {
  if (userStore.isAuthenticated) {
    authenticated.value = true
  }
  else {
    authenticated.value = false
  }
})

onUpdated(async () => {
  if (Boolean(userStore.isAuthenticated)) {
    authenticated.value = true
  }
  else {
    authenticated.value = false
  }
})

</script>

<template>
  <PageHeader :authenticated="authenticated"/>
  <RouterView />
</template>

<style scoped>
@import './assets/base.css';
</style>
