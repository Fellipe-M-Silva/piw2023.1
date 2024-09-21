<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import FormInput from '@/components/FormInput.vue'
import { ref } from 'vue'

const modoEdicao = ref(false)

</script>

<template>
  <main>
    <NavBar></NavBar>
    <div class="container">
      <div class="content">
        <SectionHeader pageName="Editar usuário" v-if="modoEdicao"></SectionHeader>
        <SectionHeader pageName="Novo usuário" v-else></SectionHeader>

        <div class="panel">
          <form name="userForm">
            <div class="grid-list">
              <FormInput type="text" label="Nome" id="name" name="name" />
              <FormInput type="text" label="E-mail" id="email" name="email" />
              <FormInput
                type="password"
                label="Senha"
                id="password"
                name="password"
                :hasError="false"
                errorMessage="E-mail ou senha incorretos"
              />
              <FormInput type="checkbox" label="Administrador" id="isAdmin" name="isAdmin" />
            </div>

            <div class="holder">
              <button class="btn-primary" type="submit" name="login" method="post">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.body2 {
  grid-column: 1 / -1;
}

.holder {
  justify-content: right;
}
</style>
