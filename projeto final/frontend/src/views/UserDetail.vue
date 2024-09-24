<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { onMounted, ref } from 'vue'
import { api } from '@/api'
import { useRoute, useRouter } from 'vue-router'
import type { User } from '@/types'

const isAdmin = ref(true)
const isSuperAdmin = ref(true)

const route = useRoute()
const router = useRouter()
const user = ref({} as User)
const id = ref('')
const modoEdicao = ref(false)

async function fetchUser() {
  try {
    const res = await api.get(`/users/${id.value}`)
    user.value = res.data
  } catch (error) {
    console.log(error)
  }
}

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
    router.push('/usuarios')
  } catch (error) {
    console.log(error)
  }
}

async function updateUser() {
  try {
    const res = await api.put(`/users/${id.value}`, {
      name: user.value.name,
      email: user.value.email,
      password: user.value.password,
      isAdmin: false,
      isSuperAdmin: false
    })
    user.value = res.data
    router.push('/usuarios')
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  try {
    id.value = route.params.id.toString()
    if (id.value && id.value != '') {
      modoEdicao.value = false
      await fetchUser()
    } else {
      modoEdicao.value = true
    }
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <main>
    <NavBar :isAdmin="isAdmin" :isSuperAdmin="isSuperAdmin"></NavBar>
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
                <label for="email">E-mail</label>
                <input type="text" id="email" v-model="user.email" />
              </div>
              
              <div class="inputsection">
                <label for="password">Senha</label>
                <input type="password" id="password" v-model="user.password" />
              </div>
            </div>

            <div class="holder">
              <button  @click="$router.go(-1)" class="btn-plain" type="submit" name="login" method="post">
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
</template>

<style scoped>
.body2 {
  grid-column: 1 / -1;
}

.holder {
  justify-content: right;
}
</style>
