<script setup lang="ts">
import { ref } from 'vue';
import SectionTitle from '../components/SectionTitle.vue';
import { parseQuery, useRouter } from 'vue-router';
import { api } from '@/api';
import { useUserStore } from '@/stores/userStore';

// const user = ref<User>({})
const email = ref('')
const password = ref('')
const router = useRouter()
const userStore = useUserStore()


async function authUser() {
  try {
    const { data } = await api.post('/login', {
      email: email.value,
      password: password.value
    })

    console.log(data)
    const { token, user } = data
    userStore.authenticaded(user, token)

    router.push('/fichamentos')
  } catch (error) {
  }
}
</script>

<template>
  <div class="container">
    <div class="panel">
      <SectionTitle title="Olá!" subtitle="Faça login para coninuar" />
      <form name="loginForm" @submit.prevent="authUser()">
        <div class="grid-list">

          <div class="inputsection">
            <label for="email">E-mail</label>
            <input type="text" id="email" v-model="email" />
          </div>

          <div class="inputsection">
            <label for="password">Senha</label>
            <input type="password" id="password" v-model="password" />
          </div>
        </div>

        <button class="btn-primary" type="submit" name="login" method="post">Entrar</button>
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
