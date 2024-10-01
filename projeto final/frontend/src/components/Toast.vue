<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  visible: Boolean,
  message: String,
  tone: String
})

const visible = ref(props.visible)

function close() {
  visible.value = !visible.value
}
</script>

<template>
  <div :v-if="visible" :class="`toast ${tone}`">
    <div class="modal-content">
      <div class="modal-header">
        <h5>Erro</h5>
        <button @click="close()" class="btn-icon btn-icon-sm btn-plain">
          <span class="material-symbols-outlined"> close </span>
        </button>
      </div>
      <div class="modal-body">
        <p class="body1">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.toast {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 10;
  width: 288px;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: var(--surface-background-3);
  border: 1px solid rgba(0, 0, 0, 0.5);
}
.error {
  color: red;
  border-color: red;
}

.success {
  color: green;
}
</style>