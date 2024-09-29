<script setup lang="ts">
import { api } from '@/api'
import NavBar from '@/components/NavBar.vue'
import SearchBar from '@/components/SearchBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { useUserStore } from '@/stores/userStore'
import type { Quote } from '@/types'
import { onMounted, ref } from 'vue'

const userStore = useUserStore()

const quotes = ref([] as Quote[])

const quoteToCopy = ref<Quote>()

function copyText(quoteId: string) {
  const index = quotes.value.findIndex((u) => u.id === quoteId)
  quoteToCopy.value = quotes.value[index]

  var copyText = quoteToCopy.value.text

  navigator.clipboard.writeText(copyText)

  alert('Texto copiado: ' + copyText)
}

onMounted(async () => {
  try {
    const { data } = await api.get('/quotes', {
      params: { creatorUsername: userStore.user.username},
      headers: { Authorization: `Bearer ${userStore.token}` }
    })
    quotes.value = data.data
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
        <SectionHeader pageName="Citações"></SectionHeader>
        <div class="panel" id="sectionOptions">
          <SearchBar />
          <div class="holder">
          </div>
        </div>

        <div class="panel">
          <table>
            <thead>
              <td class="col1 body2 stretchy-column">Citação</td>
              <td class="col2 body2 stretchy-column">Obra</td>
              <td class="col3 body2">Página</td>
              <td class="col4 body2 stretchy-column">Nota</td>
              <td class="col5 body2">Ações</td>
            </thead>
            <tr v-for="quote in quotes" >
              <td class="col1 stretchy-column min">“&hairsp;{{ quote.text }}&hairsp;”</td>
              <td class="col2 body2 stretchy-column">{{ quote.annotation.workTitle }}</td>
              <td class="col3 body2" style="display: flex; flex-direction: row; gap:0">{{ quote.startingPage }} 
                <p v-if="quote.endingPage != ''"> - {{ quote.endingPage }}</p>
              </td>
              <td class="col4 body2 stretchy-column">{{ quote.note }}</td>
              <td class="col5"><button @click="copyText(quote.id)" class="btn-icon-sm">
                  <span class="material-symbols-outlined"> content_copy </span>
                </button></td>
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

tr, thead {
  display: flex;
  align-self: stretch;
}

.stretchy-column{
  align-self: stretch;
}

.min {
  min-width: 300px;
}

.col1 {
  min-width: 300px;
}

.col2 {
  min-width: 120px;
  max-width: 210px;
}

.col3 {
  min-width: 120px;
}

.col4 {
  min-width: 120px;
}

.col5 {
  width: 48px;
}
</style>