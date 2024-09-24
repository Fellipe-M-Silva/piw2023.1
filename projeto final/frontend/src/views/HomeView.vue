<script setup lang="ts">
// import WorkList from '@/components/WorkList.vue'
import NavBar from '@/components/NavBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import SectionOptions from '@/components/SectionOptions.vue'
import CardAnnotation from '@/components/CardAnnotation.vue'
import { onMounted, ref } from 'vue'
import type { Annotation, Quote } from '@/types'
import { api } from '@/api'
import { useRouter } from 'vue-router'

const annotations = ref([] as Annotation[])
const isAdmin = ref(true)
const isSuperAdmin = ref(true)
const router = useRouter()

const annotationToRemove = ref<Annotation>()
const deleteRequested = ref(false)

async function askToDelete(id:string) {
  const index = annotations.value.findIndex(u => u.id === id)
  annotationToRemove.value = annotations.value[index]
  toggleModal()
}

async function removeAnnotation() {
  try {
    const res = await api.delete(`/annotations/${annotationToRemove.value?.id}`)
    const removedUser: Annotation = res.data
    const toRemove = annotations.value.findIndex(u => removedUser.id == u.id)
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
    const { data } = await api.get('/annotations')
    annotations.value = data
  } catch (e) {}
})

const personal = ref(false)

const nomePagina = ref('Fichamentos')
const button1Label = ref('Importar')
const button1Icon = ref('download')
const button2Label = ref('Novo fichamento')
const button2Icon = ref('add')
const button2Link = ref('fichamentos/novo')
</script>

<template>
  <main>
    <NavBar :isAdmin="isAdmin" :isSuperAdmin="isSuperAdmin"></NavBar>
    <div class="container">
      <div class="content">
        <SectionHeader :pageName="nomePagina"></SectionHeader>
        <!-- <SectionOptions
          :showButton1="false"
          :button1Label="button1Label"
          :button1Icon="button1Icon"
          :showButton2="true"
          :button2Label="button2Label"
          :button2Icon="button2Icon"
          :button2Link="button2Link"
        /> -->
        <div class="grid-list">
          <!-- <RouterLink
            v-for="annotation in annotations"
            :to="`/fichamentos/${annotation.id}`"
            as="article"
          >
            <article class="card">
              <h2>{{ annotation.workTitle }}</h2>
              <div class="footer">
                <ul>
                  <li>
                    {{ annotation.workAuthors }}
                  </li>
                </ul>
                <div class="holder">
                  <RouterLink :to="`/fichamentos/${annotation.id}/`">
                    <button class="btn-icon-sm">
                      <span class="material-symbols-outlined"> visibility </span>
                    </button>
                  </RouterLink>
                  <RouterLink :to="`/fichamentos/${annotation.id}/editar`">
                    <button class="btn-icon-sm">
                      <span class="material-symbols-outlined"> edit </span>
                    </button>
                  </RouterLink>
                  <button @click="askToDelete(annotation.id)" class="btn-negative btn-icon-sm">
                    <span class="material-symbols-outlined"> delete </span>
                  </button>
                </div>
              </div>
            </article>
          </RouterLink> -->
          <div
          class="card"
            
            v-for="annotation in annotations"
            :to="`/fichamentos/${annotation.id}`"
            as="article"
          >
            <article class="card">
              <h2>{{ annotation.workTitle }}</h2>
              <div class="footer">
                <ul>
                  <li>
                    {{ annotation.workAuthors }}
                  </li>
                </ul>
                <div class="holder">
                  <RouterLink :to="`/fichamentos/${annotation.id}/`">
                    <button class="btn-icon-sm">
                      <span class="material-symbols-outlined"> visibility </span>
                    </button>
                  </RouterLink>
                  <!-- <RouterLink :to="`/fichamentos/${annotation.id}/editar`">
                    <button class="btn-icon-sm">
                      <span class="material-symbols-outlined"> edit </span>
                    </button>
                  </RouterLink>
                  <button @click="askToDelete(annotation.id)" class="btn-negative btn-icon-sm">
                    <span class="material-symbols-outlined"> delete </span>
                  </button> -->
                </div>
              </div>
            </article>
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
            O fichamendo da obra <strong>{{ annotationToRemove?.workTitle }}</strong> será removido junto de todas as suas citações. Esta ação não pode ser desfeita, tem certeza de que deseja continuar?
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

h2 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

a {
  border-radius: var(--root-025-rem, 0.25rem);
  background: var(--root-background-2, #e8ebee);
  /* padding: 0.25rem 0.5rem; */
  align-self: stretch;

  color: var(--text-text-medium, #626262);
  font-variant-numeric: lining-nums proportional-nums;

  /* body 2 */
  font-family: var(--body-font, 'Source Sans 3');
  font-size: var(--typography-font-size-body-2, 0.8125rem);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 1.21875rem */
  text-decoration: none;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-self: stretch;
}

article {
  min-width: 32.3%;
}
</style>
