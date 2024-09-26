<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { onMounted, ref } from 'vue'
import type { Annotation, Quote } from '@/types'
import { api } from '@/api'

const annotations = ref([] as Annotation[])

onMounted(async () => {
  try {
    const { data } = await api.get('/annotations')

    const filter = annotations.value = data.filter((annotation: Annotation) =>
    annotation.isPublic == true)
    annotations.value = filter
  } catch (e) {}
})

const nomePagina = ref('Repositório de fichamentos')
</script>

<template>
  <main>
    <NavBar></NavBar>
    <div class="container">
      <div class="content">
        <SectionHeader :pageName="nomePagina"></SectionHeader>
        <div class="grid-list">
          <div v-for="annotation in annotations">
            <RouterLink :to="`/fichamentos/${annotation.id}/citacoes`">
              <div class="card">
                <h3>{{ annotation.workTitle }}</h3>
                <div class="footer">
                  <ul>
                    <li>
                      {{ annotation.workAuthors }}
                    </li>
                  </ul>
                  <div class="holder">
                    <RouterLink :to="`/fichamentos/${annotation.id}/citacoes`">
                      <button class="btn-icon-sm">
                        <span class="material-symbols-outlined"> visibility </span>
                      </button>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </RouterLink>
          </div>  
        </div>
      </div>
    </div>
  </main>
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

.card a {
  align-self: stretch
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
