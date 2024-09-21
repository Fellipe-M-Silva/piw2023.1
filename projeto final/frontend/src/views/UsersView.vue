<script setup lang="ts">
import UserList from '@/components/UserList.vue'
import NavBar from '@/components/NavBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import SectionOptions from '@/components/SectionOptions.vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { api } from '@/api'
import type { User } from '@/types'

// api.get('/users')

const users = ref([] as User[])

onMounted(async () => {
  try {
    const { data } = await api.get('/users')
    console.log(data)
    users.value = data.data
  } catch (e) {}
})

const nomePagina = ref('Usuários')
const button2Label = ref('Novo usuário')
const button2Icon = ref('add')
const button2Link = ref('fichamentos/novo')
// const data = {
//   users: [
// 	{
// 		"id": "942149f6-e5f2-44f7-8d84-c64b12eae544",
// 		"name": "Fellipe Silva",
// 		"email": "fmayan999@gmail.com",
// 		"password": "$2a$10$oe.2/vWgVB4Bpwt6kCNEF.LHUkf728621kqGfk78N5Kc3iyY6RTTi",
// 		"isAdmin": false,
// 		"isSuperAdmin": true
// 	},
// 	{
// 		"id": "c56a98fa-d7f4-4a90-a2f4-b35f0cb75c5a",
// 		"name": "Mayan22",
// 		"email": "fmayan99009@gmail.com",
// 		"password": "$2a$10$HSFjH0xg1U2bmV3vUC8ssup0jtd1W5ToaNpLxY1gqrSUFzX2t7Uu6",
// 		"isAdmin": true,
// 		"isSuperAdmin": false
// 	},
// 	{
// 		"id": "a3fa4ac5-71fc-4525-9ff2-52f7c157ff1d",
// 		"name": "Ana2",
// 		"email": "ana2@gmail.com",
// 		"password": "$2a$10$tIA9/8k3tay66.jGw6C8seRuUsySFkan2ErfC7gML4qa/AYKDviy6",
// 		"isAdmin": true,
// 		"isSuperAdmin": false
// 	},
// 	{
// 		"id": "48224be9-16f8-437d-a98e-d42a8a160c70",
// 		"name": "Paulo sergio",
// 		"email": "paulosergio@gmail.com",
// 		"password": "$2a$10$0cx0Dk9pX.GxTEnKKVx0KeqI8oqm1/6NIjEorlLVveiRLprui/fjG",
// 		"isAdmin": false,
// 		"isSuperAdmin": false
// 	}
// ]
// }

// defineProps({
//   name: 'dashbordView'
// })
</script>

<template>
  <main>
    <NavBar></NavBar>
    <div class="container">
      <div class="content">
        <SectionHeader :pageName="nomePagina"></SectionHeader>
        <SectionOptions
          :showButton1="false"
          :button2Label="button2Label"
          :button2Icon="button2Icon"
          :button2Link="button2Link"
        />
        <!-- <UserList :data="users" /> -->

        <table>
          <thead>
            <td class="caption">Nome</td>
            <td class="caption">E-mail</td>
            <td class="caption">Ações</td>
          </thead>
          <tr v-for="user in users">
            <td class="body1">{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td class="hold">
              <div class="holder">
                <button class="btn-icon-sm">
                  <span class="material-symbols-outlined"> content_copy </span>
                </button>
                <button class="btn-icon-sm">
                  <span class="material-symbols-outlined"> edit </span>
                </button>
                <button class="btn-icon-sm">
                  <span class="material-symbols-outlined"> more_horiz </span>
                </button>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  overflow-y: scroll;
}
</style>
