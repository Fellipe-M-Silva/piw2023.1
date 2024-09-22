<script setup lang="ts">
import { api } from '@/api'
import type { Work, Author } from '@/types'
// import { onMounted, ref } from 'vue';

interface Annotation {
  id: String,
  title: String,
  work: Work,
  authors: Author
}

const props = defineProps<{
  annotation: Annotation
}>()


// const annotations = ref([] as Annotation[])

// onMounted(async () => {
//   try {
//     const { data } = await api.get('/users')
//     annotations.value = data
//   } catch (e) {}
// })

// console.log(annotations)
</script>

<template>
  <RouterLink :to="`/citacoes/${annotation.id}`">
    <article class="card">
      <h3>{{ annotation.title }}</h3>
      <div class="footer">
        <ul>
          <li v-for="author in annotation.authors">
            {{ annotation.authors.name }}
          </li>
        </ul>
        <button class="btn-icon-sm">
          <span class="material-symbols-outlined"> more_horiz </span>
        </button>
      </div>
    </article>
  </RouterLink>
</template>

<style scoped>
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

a {
  border-radius: var(--root-025-rem, 0.25rem);
  background: var(--root-background-2, #e8ebee);
  padding: 0.25rem 0.5rem;

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
