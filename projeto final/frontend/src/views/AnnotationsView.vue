<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import SearchBar from '@/components/SearchBar.vue'
import { onMounted, ref } from 'vue'
import type { Annotation } from '@/types'
import { api } from '@/api'
import { useUserStore } from '@/stores/userStore'

defineProps({
  name: String,
  showOptions: Boolean,
  showCardOptions: Boolean,
  isPublic: Boolean
})

const annotations = ref([] as Annotation[])
const userStore = useUserStore()
const annotationToRemove = ref<Annotation>()
const deleteRequested = ref(false)
const isPublic = ref(false)

async function askToDelete(id: string) {
  const index = annotations.value.findIndex((u) => u.id === id)
  annotationToRemove.value = annotations.value[index]
  toggleModal()
}

async function removeAnnotation() {
  try {
    const res = await api.delete(`/annotations/${annotationToRemove.value?.id}`,{headers: {
        Authorization: `Bearer ${userStore.token}`
      }})
    const removedUser: Annotation = res.data
    const toRemove = annotations.value.findIndex((u) => removedUser.id == u.id)
    annotations.value.splice(toRemove, 1)
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
      const res = await api.get('/annotations', {
      params: {
        creatorUsername: userStore.user.username
      },
      headers: { Authorization: `Bearer ${userStore.token}` }})

      annotations.value = res.data.data
    console.log(res.data.data)
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <main>
    <NavBar></NavBar>
    <div class="container">
      <div class="content">
        <SectionHeader :pageName="name"></SectionHeader>
        <div v-if="showOptions" class="panel" id="sectionOptions">
          <SearchBar />
          <div class="holder">
            <RouterLink to="/fichamentos/novo" as="button">
              <button class="btn-primary">
                <span class="material-symbols-outlined">add</span>
                Novo fichamento
              </button>
            </RouterLink>
          </div>
        </div>
        <div class="grid-list">
          <div v-for="annotation in annotations">
            <div class="card">
              <RouterLink :to="`/fichamentos/${annotation.id}/citacoes`"
                ><h3>{{ annotation.workTitle }}</h3></RouterLink
              >

              <div class="footer">
                <ul>
                  <li class="body2">
                    {{ annotation.workAuthors }}
                  </li>
                </ul>
                <div class="holder">
                  <RouterLink :to="`/fichamentos/${annotation.id}/citacoes`">
                    <button class="btn-icon-sm">
                      <span class="material-symbols-outlined"> visibility </span>
                    </button>
                  </RouterLink>
                  <RouterLink v-if="showCardOptions" :to="`/fichamentos/${annotation.id}/editar`">
                    <button class="btn-icon-sm">
                      <span class="material-symbols-outlined"> edit </span>
                    </button>
                  </RouterLink>
                  <button
                    v-if="showCardOptions"
                    @click="askToDelete(annotation.id)"
                    class="btn-negative btn-icon-sm"
                  >
                    <span class="material-symbols-outlined"> delete </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <div class="modal" v-if="deleteRequested">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Remover usuário</h5>
          <button @click="deleteRequested = false" class="btn-icon btn-icon-sm btn-plain">
            <span class="material-symbols-outlined"> close </span>
          </button>
        </div>

        <div class="modal-body">
          <p class="body1">
            O fichamendo da obra <strong>{{ annotationToRemove?.workTitle }}</strong> será removido
            junto de todas as suas citações. Esta ação não pode ser desfeita, tem certeza de que
            deseja continuar?
          </p>
        </div>

        <div class="modal-footer">
          <button @click="deleteRequested = false" class="btn-secondary">Voltar</button>
          <button @click="removeAnnotation" class="btn-primary">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  overflow-y: scroll;
}

span {
  transform: scale(75%);
}

h3 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-self: stretch;
}

.card a {
  align-self: stretch;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 0.5rem;
  align-self: stretch;
}

li {
  margin: 0;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-self: stretch;
}
</style>
