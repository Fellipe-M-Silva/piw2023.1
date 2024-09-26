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

async function fetchQuote() {
  try {
    const res = await api.get(`/quotes/${quoteId.value}`, {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    })
    quote.value = res.data
  } catch (error) {
    console.log(error)
  }
}

async function createQuote() {
  try {
    console.log('criando citação')
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
          Authorization: `Bearer ${userStore.jwt}`
        }
      }
    )
    quote.value = res.data
    console.log(quote.value)
    router.push(`/fichamentos/${id.value}/citacoes`)
  } catch (error) {
    console.log(error)
  }
}

async function updateQuote() {
  try {
    const res = await api.put(
      `/quotes/${quoteId.value}`,
      {
        text: quote.value.text,
        annotationId: quoteId.value,
        startingPage: quote.value.startingPage,
        endingPage: quote.value.endingPage,
        note: quote.value.note
      },
      {
        headers: {
          Authorization: `Bearer ${userStore.jwt}`
        }
      }
    )
    quote.value = res.data
    router.push(`/fichamentos/${id.value}/citacoes`)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  try {
    const teste: string = String(route.params.id)
    id.value = teste

    if (route.params.quoteId) {
      const teste2: string = String(route.params.quoteId)
      quoteId.value = teste2
    }

    console.log(quoteId.value)

    if (quoteId.value && quoteId.value != '') {
      modoEdicao.value = false
      await fetchQuote()
    } else {
      modoEdicao.value = true
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
</template>

<style scoped>
.body2 {
  grid-column: 1 / -1;
}

.holder {
  justify-content: right;
}
</style>
