<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import SectionOptions from '@/components/SectionOptions.vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { api } from '@/api'
import type { User } from '@/types'
import { useUserStore } from '@/stores/userStore'

const users = ref([] as User[])
const userToRemove = ref<User>()
const deleteRequested = ref(false)
const userStore = useUserStore()

async function askToDelete(id:string) {
  const index = users.value.findIndex(u => u.id === id)
  userToRemove.value = users.value[index]
  toggleModal()
}

async function removeUser() {
  try {
    const res = await api.delete(`/users/${userToRemove.value?.id}`)
    const removedUser: User = res.data
    const toRemove = users.value.findIndex(u => removedUser.id == u.id)
  users.value.splice(toRemove, 1)
  } catch (error) {
    console.log(error)
  } finally {
    toggleModal()
  }
}

async function toggleModal() {
  deleteRequested.value = !deleteRequested.value
}


onMounted(async () => {
  try {
    const params = {
      isAdmin: false
    }
    const { data } = await api.get('/users', {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`
      },
      params})
    users.value = data
  } catch (error) {
    console.log(error)
  }
})

const nomePagina = ref('Usuários')
const button2Label = ref('Novo usuário')
const button2Icon = ref('add')
const button2Link = ref('/usuarios/novo')
</script>

<template>
  <main>
    <NavBar></NavBar>
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
        <div class="panel">
          <table>
            <thead>
              <td class="body2">Nome</td>
              <td class="body2">E-mail</td>
              <td class="body2">Ações</td>
            </thead>
            <tr v-for="user in users" >
              <td v-if="user.isAdmin == false" class="body1">{{ user.name }}</td>
              <td v-if="user.isAdmin == false">{{ user.email }}</td>
              <td v-if="user.isAdmin == false" class="hold">
                <div v-if="user.isAdmin == false" class="holder">
                  <RouterLink :to="`/usuarios/${user.id}`">
                    <button class="btn-icon-sm">
                      <span class="material-symbols-outlined"> edit </span>
                    </button>
                  </RouterLink>
                  <button @click="askToDelete(user.id)" class="btn-icon-sm btn-negative">
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

  <div class="modal" v-if="deleteRequested">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Remover usuário</h5>
          <button @click="deleteRequested = false" class="btn-icon btn-icon-sm btn-plain">
            <span class="material-symbols-outlined"> close </span>
          </button>
        </div>

        <div class="modal-body">
          <p class="body1">
            O usuário <strong>{{ userToRemove?.name }}</strong> será removido. Esta ação não pode
            ser desfeita, tem certeza de que deseja continuar?
          </p>
        </div>

        <div class="modal-footer">
          <button @click="deleteRequested = false" class="btn-secondary">Voltar</button>
          <button @click="removeUser" class="btn-primary">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
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
