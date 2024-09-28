<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { onMounted, ref } from 'vue'
import type { Quote } from '@/types'
import { api } from '@/api'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const route = useRoute()
const router = useRouter()
const quote = ref({} as Quote)
const id = ref('')
const quoteId = ref('')
const modoEdicao = ref(false)
const userStore = useUserStore()

const showError = ref(false)
const message = ref('')

async function toggleMessage() {
  showError.value = !showError.value
}

async function fetchQuote() {
  try {
    const res = await api.get(`/quotes/${quoteId.value}`, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    })
    quote.value = res.data
  } catch (error) {
    console.log(error)
  }
}

async function createQuote() {
  try {
    const res = await api.post(
      `/quotes/`,
      {
        text: quote.value.text,
        annotationId: id.value,
        startingPage: quote.value.startingPage,
        endingPage: quote.value.endingPage,
        note: quote.value.note
      },
      {
        headers: {
          Authorization: `Bearer ${userStore.token}`
        }
      }
    )
    quote.value = res.data.data
    console.log(quote.value)
    router.push(`/fichamentos/${id.value}/citacoes`)
  } catch (error) {
    console.log(error)
    toggleMessage()
    message.value = "Dados obrigatórios não adicionados."
  }
}

async function updateQuote() {
  try {
    
    const res = await api.put(
      `/quotes/${quoteId.value}`,
      {
        text: quote.value.text,
        annotationId: id.value,
        startingPage: quote.value.startingPage,
        endingPage: quote.value.endingPage,
        note: quote.value.note
      },
      {
        headers: {
          Authorization: `Bearer ${userStore.token}`
        }
      }
    )
    quote.value = res.data
    router.push(`/fichamentos/${id.value}/citacoes`)
  } catch (error) {
    console.log(error)
    toggleMessage()
    message.value = "Dados obrigatórios não adicionados."
  }
}

onMounted(async () => {
  try {
    quoteId.value = route?.params?.quoteId?.toString()
    id.value = route?.params?.id?.toString()
    if (quoteId.value && quoteId.value != '') {
      modoEdicao.value = true
      await fetchQuote()
    } else {
      modoEdicao.value = false
    }
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
        <SectionHeader pageName="Citação" v-if="!modoEdicao"></SectionHeader>
        <SectionHeader pageName="Nova citação" v-else></SectionHeader>

        <div class="panel">
          <form name="quoteForm" @submit.prevent="quoteId ? updateQuote() : createQuote()">
            <div class="grid-list">
              <div class="inputsection">
                <label for="text">Texto</label>
                <input type="text" id="text" v-model="quote.text" />
              </div>

              <div class="inputsection">
                <label for="startingPage">Página inicial</label>
                <input type="text" id="startingPage" v-model="quote.startingPage" />
              </div>

              <div class="inputsection">
                <label for="endingPage">Página final</label>
                <input type="text" id="endingPage" v-model="quote.endingPage" />
              </div>

              <div class="inputsection">
                <label for="note">Nota</label>
                <input type="text" id="note" v-model="quote.note" />
              </div>
            </div>

            <div class="holder">
              <button
                @click="$router.go(-1)"
                class="btn-plain"
                type="submit"
                name="login"
                method="post"
              >
                Voltar
              </button>
              <button
                v-if="modoEdicao && quoteId"
                class="btn-primary"
                type="submit"
                name="login"
                method="post"
              >
                Salvar alterações
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

  <div class="non-modal" v-if="showError">
    <div class="non-modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Erro</h5>
          <button @click="toggleMessage()" class="btn-icon btn-icon-sm btn-plain">
            <span class="material-symbols-outlined"> close </span>
          </button>
        </div>

        <div class="modal-body">
          <p class="body1">{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body2 {
  grid-column: 1 / -1;
}

.holder {
  justify-content: right;
}
</style>
