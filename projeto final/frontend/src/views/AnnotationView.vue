<script setup lang="ts">
import { api } from '@/api'
import CardQuote from '@/components/CardQuote.vue'
import NavBar from '@/components/NavBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import SectionOptions from '@/components/SectionOptions.vue'
import { onMounted, ref } from 'vue'
import type { Annotation } from '@/types'
import { useRoute, useRouter } from 'vue-router'

const isAdmin = ref(true)
const isSuperAdmin = ref(true)

// async function loadAnnotation(id: String) {
//   try {
//     const res = await api.get(`/annotations/${id}`)
//     // console.log(res.data)
//     annotation.value = res.data
//   } catch (e) {
//     console.log(e)
//   }
// }

// onMounted(async () => {
//   try {
//     console.log(route.params.id)
//     id.value = route.params.id || ''
//     if (id.value && id.value != '1234') {
//       await loadAnnotation(id.value)
//     }
//   } catch (e) {}
// })

const route = useRoute()
const router = useRouter()
const annotation = ref({} as Annotation)
const id = ref('')
const modoEdicao = ref(false)

async function fetchAnnotation() {
  try {
    const res = await api.get(`/annotations/${id.value}`)
    annotation.value = res.data
    console.log(annotation.value)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  try {
    id.value = route.params.id.toString()
    if (id.value && id.value != '') {
      modoEdicao.value = false
      await fetchAnnotation()
    } else {
      modoEdicao.value = true
    }
  } catch (error) {
    console.log(error)
  }
})

const button2Label = ref('Nova citação')
const button2Icon = ref('add')
// const button2Link = ref(`/${id.value}/citacoes/nova`)
</script>

<template>
  <main>
    <NavBar :isAdmin="isAdmin" :isSuperAdmin="isSuperAdmin"></NavBar>
    <div class="container">
      <div class="content">
        <div class="panel" style="flex-direction: row;">
          <h1>{{ annotation.workTitle }}</h1>
          <div class="holder">
            <RouterLink :to="`/fichamentos/${id}/editar`">
              <button class="button btn-secondary">Editar</button>
            </RouterLink>
            <button class="button btn-negative">
              Excluir
            </button>
          </div>
        </div>
        <SectionOptions
          :showButton2="true"
          :button2Label="button2Label"
          :button2Icon="button2Icon"
          :button2Link="`/citacoes/nova`"
        />

        <div class="quoteList">
          <CardQuote
            v-for="quote in annotation.quotes"
            :id="quote.id"
            :text="quote.text"
            :startingPage="quote.startingPage"
            :endingPage="quote.endingPage"
            :note="quote.note"
          />
        </div>
      </div>
    </div>
  </main>

  
</template>

<style scoped>
.quoteList {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
