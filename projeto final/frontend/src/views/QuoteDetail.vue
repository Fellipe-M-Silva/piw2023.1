<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import FormInput from '@/components/FormInput.vue'
import { onMounted, ref } from 'vue'
import type { Quote } from '@/types'
import { api } from '@/api'
import { useRoute } from 'vue-router'

const modoEdicao = ref(false)
const isAdmin = ref(true)
const isSuperAdmin = ref(true)

const quote = ref({} as Quote)
const id = ref('1234')
const route = useRoute()
const text = ref("")
const startingPage = ref("")
const endingPage = ref("")
const note = ref("")

async function loadQuote(id: String) {
  try {
    const res = await api.get(`/quotes/${id}`)
    console.log(res.data)
    quote.value = res.data
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {
  try {
    console.log(route.query)
    id.value = route.params.id || ''
    if (id.value && id.value != '1234') {
      await loadQuote(id.value)
      modoEdicao.value = true
    }
    else {  
      modoEdicao.value = false
    }
  } catch (e) {}
})

</script>

<template>
  <main>
    <NavBar :isAdmin="isAdmin" :isSuperAdmin="isSuperAdmin"></NavBar>
    <div class="container">
      <div class="content">
        <SectionHeader pageName="Citação" v-if="modoEdicao"></SectionHeader>
        <SectionHeader pageName="Nova citação" v-else></SectionHeader>

        <div class="panel">
          <form name="annotationForm">
            <div class="grid-list">
              <FormInput
                type="text-area"
                label="Citação"
                id="text"
                name="text"
                :value="quote.text" 
                @input="event => text = event.target.value"
                :hasError="false"
                errorMessage="Informação obrigatória"
								style="grid-column: 1/-1;"
              />
              <FormInput type="text" label="Página inicial" id="startingPage" name="startingPage" :value="quote.startingPage" 
              @input="event => startingPage = event.target.value"
              :hasError="false"
                errorMessage="Informação obrigatória"/>
              <FormInput type="text" label="Página final (opcional)" 
              @input="event => text = endingPage.target.value"
              :value="quote.endingPage"  id="endingPage" name="endingPage" />
              <FormInput
                type="textarea"
                label="Nota (opcional)"
                id="note"
                name="note"
                @input="event => note = event.target.value"
                :value="quote.note" 
                style="grid-column: 1/-1"
              />
            </div>
            <div class="holder">
							<button class="btn-primary" type="submit" name="login" method="post">Salvar</button>
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
