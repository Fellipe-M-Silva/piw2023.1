<script setup lang="ts">
import SectionTitle from '../components/SectionTitle.vue'
import { api } from '@/api'
import { ref } from 'vue'
import type { User } from '@/types'
import { useRouter } from 'vue-router';

const user = ref({} as User)
const router = useRouter()

async function createUser() {
  try {
    const res = await api.post(`/users/`, {
      name: user.value.name,
      email: user.value.email,
      password: user.value.password,
      isAdmin: user.value.isAdmin,
      isSuperAdmin: false
    })
    user.value = res.data
    router.push('/fichamentos')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="container">
    <div class="panel">
      <SectionTitle title="Boas-vindas!" subtitle="Crie uma conta e comece o seu fichário particular."/>

      <form name="registerForm" @submit.prevent="createUser()">
        <div class="grid-list">
          <div class="inputsection">
            <label for="name">Nome</label>
            <input type="text" id="name" v-model="user.name" />
          </div>

          <div class="inputsection">
            <label for="email">E-mail</label>
            <input type="text" id="email" v-model="user.email" />
          </div>

          <div class="inputsection">
            <label for="password">Senha</label>
            <input type="password" id="password" v-model="user.password" />
          </div>
        </div>

        <button class="btn-primary" type="submit" name="login" method="post">Criar conta</button>
      </form>
      
      <div class="footer">
        <p class="body2 centered">ou</p>
        <RouterLink to="/login">
          <button class="btn-plain">Fazer login</button>
        </RouterLink>
      </div>

    </div>
  </div>
</template>

<style scoped>
.container {
  justify-content: flex-start;
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
