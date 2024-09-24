<script setup lang="ts">
// import WorkList from '@/components/WorkList.vue'
import NavBar from '@/components/NavBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import SectionOptions from '@/components/SectionOptions.vue'
import CardAnnotation from '@/components/CardAnnotation.vue'
import { onMounted, ref } from 'vue'
import type { Annotation, Work, Quote } from '@/types'
import { api } from '@/api'

const annotations = ref([] as Annotation[])
const isAdmin = ref(true)
const isSuperAdmin = ref(true)

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
        <SectionOptions
          :showButton1="personal"
          :button1Label="button1Label"
          :button1Icon="button1Icon"
          :showButton2="personal"
          :button2Label="button2Label"
          :button2Icon="button2Icon"
          :button2Link="button2Link"
        />
        <div class="grid-list">
          <RouterLink v-for="annotation in annotations" :to="`/fichamentos/${annotation.id}`" as="article">
            <article class="card">
              <h2>{{ annotation.work.title }}</h2>
              <div class="footer">
                <ul>
                  <li v-for="author in annotation.work.authors">
                    {{ author.name }}
                  </li>
                </ul>
                <button class="btn-icon-sm">
                  <span class="material-symbols-outlined"> more_horiz </span>
                </button>
              </div>
            </article>
          </RouterLink>
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
