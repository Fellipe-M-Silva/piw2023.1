<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/api'
import { useUserStore } from '@/stores/userStore'

const login = ref('')
const password = ref('')
const router = useRouter()
const userStore = useUserStore()

const hidePassword = ref(true)
const inputType = computed(() => {
  if (hidePassword.value) {
    return 'password'
  }
  else {
    return 'text'
  }
})
const inputIcon = computed(() => {
  if (hidePassword.value) {
    return 'visibility'
  }
  else {
    return 'visibility_off'
  }
})


const showError = ref(false)
const message = ref('')

async function toggleMessage() {
  showError.value = !showError.value
}

async function toggleVisibility() {
  hidePassword.value = !hidePassword.value
}

async function authUser() {
  try {
    const { data } = await api.post('/login', {
      login: login.value,
      password: password.value
    })
    const { token, user } = data
    userStore.login(user, token)

    router.push('/')
  } catch (error) {
    console.log(error)
    toggleMessage()
    message.value = 'Login ou senha incorretos.'
  }
}
</script>

<template>
  <div class="container">
    <div class="panel">
      <div class="titleandsubtitle">
        <h1>Olá!</h1>
        <p>Faça login para continuar.</p>
      </div>
      <form name="loginForm" @submit.prevent="authUser()">
        <div class="grid-list">
          <div class="inputsection">
            <label for="login">Login</label>
            <input type="text" id="login" v-model="login" placeholder="E-mail ou nome de usuário" />
          </div>

          <div class="inputsection">
            <label for="password">Senha</label>
            <input :type="inputType" id="password" v-model="password" />
            <button type="button" @click="toggleVisibility()" class="toggle-password btn-icon-sm btn-plain" >
              <span class="material-symbols-outlined"> {{ inputIcon }}</span>
            </button>
          </div>
        </div>

        <button class="btn-primary" type="submit" name="login" method="post">Entrar</button>
      </form>
      <div class="footer">
        <p class="body2 centered">ou</p>
        <RouterLink to="/cadastro">
          <button class="btn-plain">Criar conta</button>
        </RouterLink>
      </div>
    </div>
  </div>

  <div v-if="showError" class="non-modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5>Erro</h5>
        <button @click="toggleMessage()" class="btn-icon btn-icon-sm btn-plain">
          <span class="material-symbols-outlined"> close </span>
        </button>
      </div>

      <div class="modal-body">
        <p class="body1">{{ message }}</p>
      </div>
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

.toggle-password {
  position:relative;
  bottom: 2.5rem;
  left: calc(100% - 2rem);
}
</style>
