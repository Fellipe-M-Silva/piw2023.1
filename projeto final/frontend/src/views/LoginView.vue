<script setup>
import SectionTitle from '../components/SectionTitle.vue';
import FormInput from '../components/FormInput.vue'
defineProps({
  name: 'loginView',
})
</script>

<template>
  <div class="container">
    <div class="panel">
      <SectionTitle title="Olá!" subtitle="Faça login para coninuar" />
      <form name="loginForm">
        <FormInput type="text" label="E-mail" id="email" name="email" />
        <FormInput type="password" label="Senha" id="password" name="password" :hasError="false" errorMessage="E-mail ou senha incorretos"/>
        <button class="btn-primary"type="submit" name="login" method="post">Entrar</button>
      </form>
      <div class="footer">
        <p class="body2 centered"> ou </p>
        <RouterLink to="/cadastro">
          <button class="btn-plain">Criar conta</button>
          </RouterLink>
      </div>

      <!-- <RouterLink to="/fichamentos" class="body1">Fichamentos</RouterLink> -->

    </div>
  </div>
</template>

<style scoped>
.container {
  justify-content: center;
  align-items: center;
}
.panel {
  min-width: none;
  align-self: center;
  /* flex: 0 1 0; */
  
  /* align-self: stretch; */
  width: 400px;
}

.footer {
  display: flex;
  flex-direction: column;
  align-self: stretch;
}

.footer a {
  display: flex;
  align-self: stretch;
}

.footer button {
  flex: 1 0 0;
}
</style>
