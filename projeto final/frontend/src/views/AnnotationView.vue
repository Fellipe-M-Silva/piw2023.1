<script setup lang="ts">
import { api } from '@/api'
import NavBar from '@/components/NavBar.vue'
import SearchBar from '@/components/SearchBar.vue'
import { onMounted, ref } from 'vue'
import type { Annotation, Quote } from '@/types'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'

const route = useRoute()
const annotation = ref({} as Annotation)
const id = ref('')
const userStore = useUserStore()
const creator = ref(false)

async function fetchAnnotation() {
  try {
    const res = await api.get(`/annotations/${id.value}`, {
      headers: { Authorization: `Bearer ${userStore.token}` }
    })
    annotation.value = res.data.data
    console.log(annotation.value)
  } catch (error) {
    console.log(error)
  }
}

const quoteToRemove = ref<Quote>()
const deleteRequested = ref(false)

async function askToDelete(id: string) {
  const index = annotation.value.quotes.findIndex((u) => u.id === id)
  quoteToRemove.value = annotation.value.quotes[index]
  toggleModal()
}

async function removeQuote() {
  try {
    const res = await api.delete(`/quotes/${quoteToRemove.value?.id}`, {
      headers: { Authorization: `Bearer ${userStore.token}` }
    })
    const removedUser: Annotation = res.data
    const toRemove = annotation.value.quotes.findIndex((u) => removedUser.id == u.id)
    annotation.value.quotes.splice(toRemove, 1)
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
    id.value = route.params.id.toString()
    if (id.value && id.value != '') {
      await fetchAnnotation()
      if (annotation.value.user.id == userStore.user.id) {
        creator.value = true
      }
      else {
        creator.value = false
      }
    } else {
      router.push('/notfound')
    }
  } catch (error) {
    console.log(error)
  }
})

const quoteToCopy = ref<Quote>()

function copyText(quoteId: string) {
  const index = annotation.value.quotes.findIndex((u) => u.id === quoteId)
  quoteToCopy.value = annotation.value.quotes[index]

  var copyText = quoteToCopy.value.text

  navigator.clipboard.writeText(copyText)

  alert('Texto copiado: ' + copyText)
}
</script>

<template>
  <main>
    <NavBar></NavBar>
    <div class="container">
      <div class="content">
        <div class="panel" style="flex-direction: row">
          <h1 style="flex: 1 0 0">{{ annotation.workTitle }}</h1>
        </div>
        <div class="panel" id="sectionOptions">
          <SearchBar />
          <div v-if="creator" class="holder">
            <RouterLink :to="`/fichamentos/${id}/editar`">
              <button class="button btn-secondary">
                <span class="material-symbols-outlined">edit</span>Editar
              </button>
            </RouterLink>
            <button class="button btn-negative">
              <span class="material-symbols-outlined">delete</span>Excluir
            </button>
            <RouterLink :to="`/fichamentos/${id}/citacoes/nova`" as="button">
              <button class="btn-primary">
                <span class="material-symbols-outlined">add</span>
                Nova citação
              </button>
            </RouterLink>
          </div>
        </div>

        <div class="quoteList">
          <article v-for="quote in annotation.quotes" class="card">
            <p class="quote">“&hairsp;{{ quote.text }}&hairsp;”</p>

            <p v-if="quote.note" class="body2">{{ quote.note }}</p>

            <div class="footer">
              <div class="pages">
                <p>p. {{ quote.startingPage }}</p>
                <p v-if="quote.endingPage">-</p>
                <p>{{ quote.endingPage }}</p>
              </div>
              <div class="holder">
                <button @click="copyText(quote.id)" class="btn-icon-sm">
                  <span class="material-symbols-outlined"> content_copy </span>
                </button>
                <RouterLink v-if="creator"   :to="`/fichamentos/${id}/citacoes/${quote.id}`">
                  <button class="btn-icon-sm">
                    <span class="material-symbols-outlined"> edit </span>
                  </button>
                </RouterLink>
                <button v-if="creator" @click="askToDelete(quote.id)" class="btn-icon-sm btn-negative">
                  <span class="material-symbols-outlined"> delete </span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </main>

  <div class="modal" v-if="deleteRequested">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Remover citação</h5>
          <button @click="deleteRequested = false" class="btn-icon btn-icon-sm btn-plain">
            <span class="material-symbols-outlined"> close </span>
          </button>
        </div>

        <div class="modal-body">
          <p class="body1">
            A citação será removida do fichamento. Esta ação não pode ser desfeita, tem certeza de
            que deseja continuar?
          </p>
        </div>

        <div class="modal-footer">
          <button @click="deleteRequested = false" class="btn-secondary">Voltar</button>
          <button @click="removeQuote" class="btn-primary">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quoteList {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.note {
  color: rgba(0, 0, 0, 0.7);
  font-variant-numeric: lining-nums proportional-nums;
  flex: 1 0 0;
}

.quote {
  font-size: 1rem;
  line-height: 200%;
  flex: 1 0 0;
  align-self: stretch;
}

.body2 {
  flex: 1 0 0;
  align-self: stretch;
}

.quote:hover {
  font-weight: 500;
}

.footer {
  display: flex;
  /* gap: 0.5rem; */
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}

.pages {
  display: flex;
  flex-direction: row;
  gap: 0.125rem;
  justify-content: center;
  align-items: center;
}

.pages p {
  color: rgba(0, 0, 0, 0.5);
  font-variant-numeric: lining-nums proportional-nums;
  font-family: var(--body-font, 'Source Sans 3');
  font-size: var(--typography-font-size-body-2, 0.8125rem);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
}
</style>
