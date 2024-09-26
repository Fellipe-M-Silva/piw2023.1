<script setup lang="ts">
</script>

<template>
  <div class="container">
    <div class="content">
      <div class="panel">
        <div class="title">
          <h1 class="centered">Página não encontrada!</h1>
          <p class="body2 centered">A página que você procura não existe.</p>
        </div>
        <RouterLink to="/repositorio"><button class="btn-primary">Voltar para início</button></RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  align-items: center;
  overflow: hidden;
}


.panel {
  align-self: stretch;
  max-width: 400px;
}

.title {
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
