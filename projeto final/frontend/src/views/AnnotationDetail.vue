<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { onMounted, ref } from 'vue'
import { api } from '@/api'
import type { Annotation } from '@/types'
import { useRoute, useRouter } from 'vue-router'

const isAdmin = ref(true)
const isSuperAdmin = ref(true)

const route = useRoute()
const router = useRouter()
const annotation = ref({} as Annotation)
const id = ref('')
const modoEdicao = ref(false)

async function fetchAnnotation() {
  try {
    const res = await api.get(`/annotations/${id.value}`)
    annotation.value = res.data
  } catch (error) {
    console.log(error)
  }
}

async function createAnnotation() {
  try {
    const res = await api.post(`/annotations`, {
      userId: 'be36baf2-84ab-4e16-b4a1-f82adc0b9112',
      isPublic: annotation.value.isPublic,
      workTitle: annotation.value.workTitle,
      workAuthors: annotation.value.workAuthors
    })

    annotation.value = res.data
    router.push(`/fichamentos/${id}`)
  } catch (error) {
    console.log(error)
  }
}

async function updateAnnotation() {
  try {
    
    const res = await api.put(`/annotations/${id.value}`, {
      isPublic: annotation.value.isPublic,
      workTitle: annotation.value.workTitle,
      workAuthors: annotation.value.workAuthors
    })
    console.log(res.data)
    annotation.value = res.data
    
    router.push(`/fichamentos/${id.value}`)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  try {
    id.value = route.params.id.toString()
    if (id.value && id.value != '') {
      modoEdicao.value = true
      await fetchAnnotation()
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
    <NavBar :isAdmin="isAdmin" :isSuperAdmin="isSuperAdmin"></NavBar>
    <div class="container">
      <div class="content">
        <SectionHeader pageName="Fichamento" v-if="modoEdicao"></SectionHeader>
        <SectionHeader pageName="Novo fichamento" v-else></SectionHeader>
        

        <div class="panel">
          <form
            name="annotationForm"
            @submit.prevent="id ? updateAnnotation() : createAnnotation()"
          >
            <div class="grid-list">
              <p class="body2">OBRA</p>
              <div class="inputsection">
                <label for="title">Título</label>
                <input type="text" id="title" v-model="annotation.workTitle" />
              </div>
              <div class="inputsection">
                <label for="workAuthors">Autoria</label>
                <input type="text" id="workAuthors" v-model="annotation.workAuthors" />
              </div>
              <div class="inputsection">
                <label for="isPublic">Marcar como público</label>
                <input type="checkbox" id="isPublic" v-model="annotation.isPublic" />
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
                v-if="modoEdicao && id"
                class="btn-primary"
                type="submit"
                name="login"
                method="post"
              >
                Salvar Alterações
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
