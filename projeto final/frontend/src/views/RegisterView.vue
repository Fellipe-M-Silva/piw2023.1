<script setup lang="ts">
import SectionTitle from '../components/SectionTitle.vue';
import FormInput from '../components/FormInput.vue'

</script>

<template>
  <div class="container">
    <div class="panel">
      <SectionTitle title="Boas-vindas!" subtitle="Crie uma conta e comece o seu fichário particular." />
      <form name="registerForm">
        <FormInput type="text" label="Nome" id="name" name="name" />
        <FormInput type="text" label="E-mail" id="email" name="email" />
        <FormInput type="password" label="Senha" id="password" name="password" :hasError="false" errorMessage="E-mail ou senha incorretos"/>
        <button class="btn-primary"type="submit" name="register" method="post">Criar conta</button>
      </form>
      <div class="footer">
        <p class="body2 centered"> ou </p>
        <RouterLink to="/login">
          <button class="btn-plain">Fazer login</button>
          </RouterLink>
      </div>

      <!-- <RouterLink to="/fichamentos" class="body1">Fichamentos</RouterLink> -->

    </div>
  </div>
</template>

<style scoped>
.container {
  justify-content:flex-start;
  align-items: center;
  overflow-y: scroll;
}

.panel {
  min-width: none;
  align-self: auto;
  width: 400px;
  /* align-self: stretch; */
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
