<script setup lang="ts">
defineProps({
  label: String,
  id: String,
  name: String,
  type: String,
  placeholder: String,
  value: String || Boolean,

  hasHelper: Boolean,
  helperMessage: String,
  hasError: Boolean,
  errorMessage: String
})

</script>

<template>
  <div class="inputsection">
    <label :for="id">{{ label }}</label>
    <input :type="type" :id="id" :name="name" :placeholder="placeholder" :value="value"/>
    <p v-if="hasHelper" class="caption">{{ helperMessage }}</p>
    <p v-if="hasError" class="caption errortext">{{ errorMessage }}</p>
  </div>
</template>

<style>
.inputsection {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
