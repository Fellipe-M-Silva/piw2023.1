<script setup lang="ts">
import type { User } from '@/types';


// const props = defineProps({
//   data: {
//     users: User[]
//   }
// })
defineProps<User>()

</script>

<template>
  <div class="panel">
    <!-- <table>
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
    </table> -->
  </div>
</template>

<style>
thead {
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.20);
}

td {
  padding: 0.5rem 0;
}

table {
  align-self: stretch;
}
</style>
