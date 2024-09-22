<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import FormInput from '@/components/FormInput.vue'
import { onMounted, ref } from 'vue'
import { api } from '@/api'
import { useRoute, useRouter } from 'vue-router'
import type { User } from '@/types'

const modoEdicao = ref(false)
const updated = ref(false)
const isAdmin = ref(true)
const isSuperAdmin = ref(true)

const user = ref({} as User)
const id = ref<string>('1234')
const route = useRoute()
const router = useRouter()

async function loadUser(id: String) {
  try {
    const res = await api.get(`/users/${id}`)
    user.value = res.data
  } catch (error) {}
}

async function createUser() {
  try {
    const { data } = await api.post(`/users`, {
      name: user.value.name,
      email: user.value.email,
      password: user.value.password,
      isAdmin: false,
      isSuperAdmin: false
    })
    user.value = data.data
    updated.value = true
    console.log(user)
    // router.push('/')

  } catch (error) {
    
  }
}

async function updateUser() {
  
}

onMounted(async () => { 
  id.value = route.params.id || ""
  
  if (id.value && id.value != '1234') {
    await loadUser(id.value)
    modoEdicao.value = true
  } else {
    modoEdicao.value = false
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
              <FormInput type="text" label="Nome" id="name" name="name" :value="user.name" />
              <FormInput type="text" label="E-mail" id="email" name="email" :value="user.email"/>
              <FormInput
                type="password"
                label="Senha"
                id="password"
                name="password"
                :value="user.password"
                :hasError="false"
                errorMessage="E-mail ou senha incorretos"
              />
              <!-- <FormInput type="checkbox" label="Administrador" id="isAdmin" name="isAdmin" :value="user.isAdmin"/> -->
            </div>

            <div class="holder">
              <button v-if="modoEdicao && id" class="btn-primary" type="submit" name="login" method="post">Salvar Alterações</button>
              <button v-else class="btn-primary" type="submit" name="login" method="post">Salvar</button>
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
