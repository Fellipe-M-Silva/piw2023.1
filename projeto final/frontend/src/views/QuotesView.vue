<script setup lang="ts">
import { api } from '@/api'
import NavBar from '@/components/NavBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import SectionOptions from '@/components/SectionOptions.vue'
import { useUserStore } from '@/stores/userStore'
import type { Quote } from '@/types'
import { onMounted, ref } from 'vue'

const userStore = useUserStore()
const nomePagina = ref('Citações')

const quotes = ref([] as Quote[])

onMounted(async () => {
  try {
    const { data } = await api.get('/quotes', {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    })
    const username = userStore.user.username
    // const filter = quotes.value = data.filter((quote: Quote) =>
    // quote.annotation.creatorUsername == username)
    // quotes.value = filter
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
        <SectionHeader :pageName="nomePagina"></SectionHeader>
        <SectionOptions/>

        <div class="panel">
          <table>
            <thead>
              <td class="body2">Citação</td>
              <td class="body2">Obra</td>
              <td class="body2">Página</td>
              <td class="body2">Nota</td>
            </thead>
            <tr v-for="quote in quotes" >
              <td>{{ quote.text }}</td>
              <td style="display: flex; flex-direction: row; gap:0">{{ quote.startingPage }} 
                <p v-if="quote.endingPage != ''"> - {{ quote.endingPage }}</p>
              </td>
              <td>{{ quote.annotation.workTitle }}</td>
              <td>{{ quote.note }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.quoteList {
  display: flex;
  flex-direction: column;
  gap: 0.5rem
}
</style>