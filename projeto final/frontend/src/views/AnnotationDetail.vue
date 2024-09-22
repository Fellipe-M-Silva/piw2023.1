<script setup>
import NavBar from '@/components/NavBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import FormInput from '@/components/FormInput.vue'
import { ref } from 'vue'

defineProps({
  name: 'AnnotationDetail'
})

const isCreate = ref(false)
const nomePagina = ref('Novo fichamento')
const isAdmin = ref(true)
const isSuperAdmin = ref(true)

const button1Label = ref('Importar')
const button1Icon = ref('download')
const button2Label = ref('Nova citação')
const button2Icon = ref('add')



const data = {
  id: '10',
  isPublic: false,
  work: {
    id: '10010c71-0713-438a-99c8-021db1a43577',
    title: 'O detalhe na tipografia',
    edition: '2ª',
    publisher: 'WMF Martins Fontes',
    publishingYear: 2013,
    authors: [
      {
        id: '4de85426-ccdf-4027-8781-11e03c65d133',
        name: 'Jost Hochuli'
      },
      {
        id: '4de85426-ccdf-4027-8781-11e03c65d133',
        name: 'Jost Hochuli da Silvasauro'
      }
    ]
  },
  quotes: [
    {
      id: '30cc6d43-0e1b-4744-b4e7-5e797894053b',
      text: 'Somente durante uma fixação é que a informação é registrada',
      startingPage: '8',
      endingPage: null,
      note: 'Retirado do começo do livro.'
    },
    {
      id: '30cc6d43-0e1b-4744-b4e7-5e797894053b',
      text: 'Somente durante uma fixação é que a informação é registrada',
      startingPage: '8',
      endingPage: null,
      note: 'Retirado do começo do livro.'
    },
    {
      id: '30cc6d43-0e1b-4744-b4e7-5e797894053b',
      text: 'Somente durante uma fixação é que a informação é registrada',
      startingPage: '8',
      endingPage: null,
      note: 'Retirado do começo do livro.'
    },
    {
      id: '30cc6d43-0e1b-4744-b4e7-5e797894053b',
      text: 'Somente durante uma fixação é que a informação é registrada',
      startingPage: '8',
      endingPage: null,
      note: 'Retirado do começo do livro.'
    },
    {
      id: 'cae2f1de-5171-4b8b-8c72-db011c407e2a',
      text: 'Blebleble',
      startingPage: '20',
      endingPage: null,
      note: 'Retirado do começo do livro.'
    }
  ]
}
</script>

<template>
  <main>
    <NavBar :isAdmin="isAdmin" :isSuperAdmin="isSuperAdmin"></NavBar>
    <div class="container">
      <div class="content">
        <SectionHeader :pageName="nomePagina"></SectionHeader>

        <div class="panel">
          <form name="annotationForm">
            <div class="grid-list">
              <p class="body2">OBRA</p>
              <FormInput
                type="text"
                label="Titulo"
                id="titulo"
                name="title"
                :hasError="false"
                errorMessage="Informação obrigatória"
								style="grid-column: 1/-1;"
              />
              <FormInput type="text" label="Editora (opcional)" id="publisher" name="publisher" />
              <FormInput type="text" label="Edição (opcional)" id="edition" name="edition" />
              <FormInput
                type="text"
                label="Ano de publicação (opcional)"
                id="publishingYear"
                name="publishingYear"
              />
              <FormInput type="checkbox" label="Público" id="isPublic" name="isPublic" />
            </div>

						<div class="grid-list">
							<p class="body2">AUTORIA</p>
            <FormInput type="text" label="Autor" id="author1" name="author1" />
            <FormInput type="text" label="Autor" id="author2" name="author2" />
            <FormInput type="text" label="Autor" id="author3" name="author3" />
            <FormInput type="text" label="Autor" id="author4" name="author4" />
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
