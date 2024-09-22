<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import SectionOptions from '@/components/SectionOptions.vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { api } from '@/api'
import type { User } from '@/types'

const users = ref([] as User[])
const isAdmin = ref(true)
const isSuperAdmin = ref(true)

async function deleteUser(id: String) {
  
}

onMounted(async () => {
  try {
    const { data } = await api.get('/users')
    users.value = data
  } catch (e) {}
})
const nomePagina = ref('Usuários')

const button2Label = ref('Novo usuário')
const button2Icon = ref('add')
const button2Link = ref('usuarios/novo')
</script>

<template>
  <main>
    <NavBar :isAdmin="isAdmin" :isSuperAdmin="isSuperAdmin"></NavBar>
    <div class="container">
      <div class="content">
        <SectionHeader :pageName="nomePagina"></SectionHeader>
        <SectionOptions
          :showButton1="false"
          :show-button2="true"
          :button2Label="button2Label"
          :button2Icon="button2Icon"
          :button2Link="button2Link"
        />
        <!-- <UserList :data="users" /> -->
        <div class="panel">
          <table>
            <thead>
              <td class="body2">Nome</td>
              <td class="body2">E-mail</td>
              <td class="body2">Cargo</td>
              <td class="body2">Ações</td>
            </thead>
            <tr v-for="user in users">
              <td class="body1">{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td v-if="user.isAdmin">Admin</td>
              <td v-else>Usuário</td>
              <td class="hold">
                <div class="holder">
                  <RouterLink :to="{ path: `/usuarios/${user.id}`}">
                    <button class="btn-icon-sm">
                      <span class="material-symbols-outlined"> edit </span>
                    </button>
                  </RouterLink>
                  <button class="btn-icon-sm btn-negative">
                    <span class="material-symbols-outlined"> delete </span>
                  </button>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  overflow-y: scroll;
}

table {
  align-self: stretch;
}

tr:hover {
  transition: 0.2s ease-in;
  background-color: rgba(0, 0, 0, 0.02);
  color: #101010;
}

td {
  padding: 0.5rem 0.5rem;
}
</style>
