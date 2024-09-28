<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { onMounted, ref } from 'vue'
import { api } from '@/api'
import type { Annotation } from '@/types'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const route = useRoute()
const router = useRouter()
const annotation = ref({} as Annotation)
const id = ref('')
const modoEdicao = ref(false)
const userStore = useUserStore()

const showError = ref(false)
const message = ref('')

async function toggleMessage() {
  showError.value = !showError.value
}

async function fetchAnnotation() {
  try {
    const res = await api.get(`/annotations/${id.value}`, {
      headers: { Authorization: `Bearer ${userStore.token}`}
    })
    annotation.value = res.data.data
  } catch (error) {
    router.push('/notFound')
    toggleMessage()
    message.value = "Usuário não encontrado."
  }
}

async function createAnnotation() {
  try {
    const res = await api.post(
      `/annotations`,
      {
        userId: userStore.user.id,
        creatorUsername: userStore.user.username, 
        isPublic: annotation.value.isPublic,
        workTitle: annotation.value.workTitle,
        workAuthors: annotation.value.workAuthors
      },
      {
        headers: {
          Authorization: `Bearer ${userStore.token}`
        }
      }
    )
    annotation.value = res.data.data
    router.push(`/fichamentos/${annotation.value.id}/citacoes`)
  } catch (error:any) {
    toggleMessage()
    message.value = "Dados obrigatórios não adicionados."
  }
}

async function updateAnnotation() {
  try {
    const res = await api.put(
      `/annotations/${id.value}`,
      {
        isPublic: annotation.value.isPublic,
        workTitle: annotation.value.workTitle,
        workAuthors: annotation.value.workAuthors
      },
      {
        headers: {
          Authorization: `Bearer ${userStore.token}`
        }
      }
    )
    annotation.value = res.data

    router.push(`/fichamentos/${id.value}/citacoes`)
  } catch (error) {
    toggleMessage()
    message.value = "Dados obrigatórios não adicionados."
  }
}

onMounted(async () => {
  try {
    id.value = route?.params?.id?.toString()
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
    <NavBar></NavBar>
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
                <label for="workTitle">Título</label>
                <input type="text" id="workTitle" v-model="annotation.workTitle" />
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
