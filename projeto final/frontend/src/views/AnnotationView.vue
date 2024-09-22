<script setup lang="ts">
import { api } from '@/api'
import CardQuote from '@/components/CardQuote.vue'
import NavBar from '@/components/NavBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import SectionOptions from '@/components/SectionOptions.vue'
import { ref } from 'vue'
import type { User } from '@/types'

const user = ref({} as User)
const isAdmin = ref(true)
const isSuperAdmin = ref(true)

async function loadUser(id: Number) {
  try {
    const res = await api.get(`/users/${id}`)
    user.value = res.data.data
  } catch (e) { }
}

const button1Label = ref('Importar')
const button1Icon = ref('download')
const button2Label = ref('Nova citação')
const button2Icon = ref('add')
const button2Link = ref(`fichamentos/novo`)

// const data = {
// 	"id": "10",
// 	"isPublic": false,
// 	"work": {
// 		"id": "10010c71-0713-438a-99c8-021db1a43577",
// 		"title": "O detalhe na tipografia",
// 		"edition": "2ª",
// 		"publisher": "WMF Martins Fontes",
// 		"publishingYear": 2013,
// 		"authors": [
// 			{
// 				"id": "4de85426-ccdf-4027-8781-11e03c65d133",
// 				"name": "Jost Hochuli"
// 			},
//       {
// 				"id": "4de85426-ccdf-4027-8781-11e03c65d133",
// 				"name": "Jost Hochuli da Silvasauro"
// 			}
// 		]
// 	},
// 	"quotes": [
// 		{
// 			"id": "30cc6d43-0e1b-4744-b4e7-5e797894053b",
// 			"text": "Somente durante uma fixação é que a informação é registrada",
// 			"startingPage": "8",
// 			"endingPage": null,
// 			"note": "Retirado do começo do livro."
// 		},
//     {
// 			"id": "30cc6d43-0e1b-4744-b4e7-5e797894053b",
// 			"text": "Somente durante uma fixação é que a informação é registrada",
// 			"startingPage": "8",
// 			"endingPage": null,
// 			"note": "Retirado do começo do livro."
// 		},
//     {
// 			"id": "30cc6d43-0e1b-4744-b4e7-5e797894053b",
// 			"text": "Somente durante uma fixação é que a informação é registrada",
// 			"startingPage": "8",
// 			"endingPage": null,
// 			"note": "Retirado do começo do livro."
// 		},
//     {
// 			"id": "30cc6d43-0e1b-4744-b4e7-5e797894053b",
// 			"text": "Somente durante uma fixação é que a informação é registrada",
// 			"startingPage": "8",
// 			"endingPage": null,
// 			"note": "Retirado do começo do livro."
// 		},
// 		{
// 			"id": "cae2f1de-5171-4b8b-8c72-db011c407e2a",
// 			"text": "Blebleble",
// 			"startingPage": "20",
// 			"endingPage": null,
// 			"note": "Retirado do começo do livro."
// 		}
// 	]
// }

// function nomeFormatado(nomeCompleto) {
//   const nomes = nomeCompleto.trim().split(' ');

//   if (nomes.length === 1) {
//     return `${nomes[0].toUpperCase()}, ${nomes[0]}`;
//   }

//   const primeiroNome = nomes[0];
//   const ultimoNome = nomes[nomes.length - 1].toUpperCase();
//   return `${ultimoNome}, ${primeiroNome}`

// }
</script>

<template>
  <main>
    <NavBar :isAdmin="isAdmin" :isSuperAdmin="isSuperAdmin"></NavBar>
    <div class="container">
      <div class="content">
        <SectionHeader :pageName="data.work.title" :options="true"></SectionHeader>
        <SectionOptions
          :showButton1="true"
          :button1Label="button1Label"
          :button1Icon="button1Icon"
          :button2Label="button2Label"
          :button2Icon="button2Icon"
          :button2Link="button2Link"
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
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
