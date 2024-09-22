<script setup>
import CardQuote from '@/components/CardQuote.vue'
import NavBar from '@/components/NavBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import SectionOptions from '@/components/SectionOptions.vue'
import { ref } from 'vue'

const isAdmin = ref(true)
const isSuperAdmin = ref(true)

const nomePagina = ref('Citações')
const button1Label = ref('Importar')
const button1Icon = ref('download')
const button2Label = ref('Novo fichamento')
const button2Icon = ref('add')

const data = {
  quotes: [
    {
      id: '30cc6d43-0e1b-4744-b4e7-5e797894053b',
      text: 'Somente durante uma fixação é que a informação é registrada',
      startingPage: '8',
      endingPage: '9',
      note: 'Retirado do começo do livro.'
    },
    {
      id: 'cae2f1de-5171-4b8b-8c72-db011c407e2a',
      text: 'Data is facts and figures. Relational databases are highly structured and produce specific answers to specific questions. Knowledge is the stuff in people’s heads. Knowledge managers develop tools, processes, and incentives to encourage people to share that stuff. Information exists in the messy middle.',
      startingPage: '23',
      endingPage: null,
      note: null
    }
    ,
    {
      id: 'cae2f1de-5171-4b8b-8c72-db011c407e2a',
      text: 'Structuring involves determining the appropriate levels of granularity for the information “atoms” in your product or service, and deciding how to relate them to one another.',
      startingPage: '23',
      endingPage: '21',
      note: 'Retirado do começo do livro.'
    },
    {
      id: 'cae2f1de-5171-4b8b-8c72-db011c407e2a',
      text: '[...] We must try our best to design labels that speak the same language as our environment’s users while reflecting its content. [...] Labels should educate people about new concepts and help them quickly identify familiar ones.',
      startingPage: '128',
      endingPage: null,
      note: 'Retirado do começo do livro.'
    },
    {
      id: 'cae2f1de-5171-4b8b-8c72-db011c407e2a',
      text: 'Labels describe the hypertext links within the body of a document or chunk of information, and naturally occur within the descriptive context of their surrounding text. Contextual links are easy to create and are the basis for the exciting interconnectedness that drives much of the Web’s success.',
      startingPage: '129',
      endingPage: null,
      note: 'Retirado do começo do livro.'
    }
  ]
}

defineProps({
  name: 'dashbordView'
})
</script>

<template>
  <main>
    <NavBar :isAdmin="isAdmin" :isSuperAdmin="isSuperAdmin"></NavBar>
    <div class="container">
      <div class="content">
        <SectionHeader :pageName="nomePagina"></SectionHeader>
        <SectionOptions
          :showButton1="true"
          :button1Label="button1Label"
          :button1Icon="button1Icon"
          :button2Label="button2Label"
          :button2Icon="button2Icon"
        />

        <div class="quoteList">
          <CardQuote
            v-for="quote in data.quotes"
            :text="quote.text"
            :startingPage="quote.startingPage"
            :endingPage="quote.endingPage"
            :note="quote.note"
          />
        </div>
        
      </div>
    </div>
  </main>
</template>

<style scoped>
.quoteList {
  display: flex;
  flex-direction: column;
  gap: 0.5rem
}
</style>