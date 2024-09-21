<script setup lang="ts">
import { RouterLink } from 'vue-router'

const props = defineProps({
  page: String,
  label: String,
  icon: String
})
</script>

<template>
  <RouterLink to="{{ page }}">
    <span class="material-symbols-outlined">{{ icon }}</span>
    <p class="body1">{{ label }}</p>
  </RouterLink>
</template>