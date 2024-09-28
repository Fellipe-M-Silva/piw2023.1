<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { onMounted, ref } from 'vue'
import { api } from '@/api'
import { useRoute, useRouter } from 'vue-router'
import type { User } from '@/types'
import { useUserStore } from '@/stores/userStore'

defineProps({
  showAdmin: Boolean
})

const route = useRoute()
const router = useRouter()
const user = ref({} as User)
const id = ref('')
const modoEdicao = ref<Boolean>()
const userStore = useUserStore()

const showError = ref(false)
const message = ref('')

async function toggleMessage() {
  showError.value = !showError.value
}


async function fetchUser() {
  try {
    const res = await api.get(`/users/${id.value}`, {
      headers: { Authorization: `Bearer ${userStore.token}` }
    })

    user.value = res.data.data
  } catch (error) {
    console.log(error)
    toggleMessage()
    message.value = "Usuário não encontrado"
    router.push('/notfound')
  }
}

async function createUser() {
  try {
    const res = await api.post(
      `/users`,
      {
        name: user.value.name,
        email: user.value.email,
        username: user.value.username,
        password: user.value.password,
        isAdmin: user.value.isAdmin,
        isSuperAdmin: user.value.isSuperAdmin
      },
      {
        headers: {
          Authorization: `Bearer ${userStore.token}`
        }
      }
    )
    user.value = res.data
    router.push('/usuarios')
  } catch (error) {
    toggleMessage()
    message.value = "Dados obrigatórios não adicionados."
  }
}

async function updateUser() {
  try {
    const res = await api.put(
      `/users/${id.value}`,
      {
        name: user.value.name,
        email: user.value.email,
        username: user.value.username,
        password: user.value.password,
        isAdmin: user.value.isAdmin,
        isSuperAdmin: user.value.isSuperAdmin
      },
      {
        headers: {
          Authorization: `Bearer ${userStore.token}`
        }
      }
    )
    user.value = res.data
    router.push('/usuarios')
  } catch (error) {
    toggleMessage()
    message.value = "Dados obrigatórios não adicionados."
  }
}

onMounted(async () => {
  try {
    id.value = route.params.id.toString()
    if (id.value && id.value != '') {
      modoEdicao.value = true
      await fetchUser()
    } else {
      modoEdicao.value = false
    }
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <main>
    <NavBar></NavBar>
    <div class="container">
      <div class="content">
        <SectionHeader pageName="Usuário" v-if="modoEdicao"></SectionHeader>
        <SectionHeader pageName="Novo usuário" v-else></SectionHeader>

        <div class="panel">
          <form name="userForm" @submit.prevent="id ? updateUser() : createUser()">
            <div class="grid-list">
              <div class="inputsection">
                <label for="name">Nome</label>
                <input type="text" id="name" v-model="user.name" />
              </div>

              <div class="inputsection">
                <label for="username">Nome de usuário</label>
                <input type="text" id="username" v-model="user.username" />
              </div>

              <div class="inputsection">
                <label for="email">E-mail</label>
                <input type="text" id="email" v-model="user.email" />
              </div>

              <div class="inputsection">
                <label for="password">Senha</label>
                <input type="password" id="password" v-model="user.password" />
              </div>

              <div class="inputsection" v-if="userStore.user.isAdmin">
                <label for="isAdmin">Administrador</label>
                <input type="checkbox" id="isAdmin" v-model="user.isAdmin" />
              </div>

              <div class="inputsection" v-if="userStore.user.isSuperAdmin">
                <label for="isSuperAdmin">Superdministrador</label>
                <input type="checkbox" id="isSuperAdmin" v-model="user.isSuperAdmin" />
              </div>
            </div>

            <div class="holder">
              <button
                @click="$router.go(-1)"
                class="btn-plain"
                type="submit"
                name="login"
                method="post"
              >
                Voltar
              </button>
              <button
                v-if="modoEdicao && id"
                class="btn-primary"
                type="submit"
                name="login"
                method="post"
              >
                Salvar Alterações
              </button>
              <button v-else class="btn-primary" type="submit" name="login" method="post">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>

  <div class="non-modal" v-if="showError">
    <div class="non-modal-dialog">
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
  </div>

  <div class="non-modal" v-if="showError">
    <div class="non-modal-dialog">
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
  </div>
</template>

<style scoped>
.body2 {
  grid-column: 1 / -1;
}

.holder {
  justify-content: right;
}
</style>
