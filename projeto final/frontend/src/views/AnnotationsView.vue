<script setup>
import WorkList from '../components/WorkList.vue'
import NavBar from '@/components/NavBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import SectionOptions from '@/components/SectionOptions.vue';
import { ref } from 'vue'

const nomePagina = ref('Fichamentos')
const button1Label = ref('Importar')
const button1Icon = ref('download')
const button2Label = ref('Novo fichamento')
const button2Icon = ref('add')
const button2Link = ref('fichamentos/novo')

const data = {
  works: [
    { title: 'O detalhe na tipografia', authors: [{ id: "12345", name: 'Jost Hochuli' }] },
    { title: 'A história consisa da escrita', authors: [{ name: 'Higonet' }] },
    {
      title: 'Pervasive Information Architecture',
      authors: [{ name: 'Luca Rossati' }, { name: 'Resmini' }]
    },
    { title: 'Criatividade e processos de criação', authors: [{ name: 'Fayga Ostrower' }]},
    { title: 'Das coisas nascem coisas', authors: [{ name: 'Bruno Munari' }] },
    { title: 'Ergonomia', authors: [{ name: 'Itiro Iida' }] },
    {
      title: 'Pervasive Information Architecture',
      authors: [{ name: 'Luca Rossati' }, { name: 'Resmini' }]
    },
    { title: 'Criatividade e processos de criação', authors: [{ name: 'Fayga Ostrower' }]},
    { title: 'Criatividade e processos de criação', authors: [{ name: 'Fayga Ostrower' }] },
    { title: 'Das coisas nascem coisas', authors: [{ name: 'Bruno Munari' }] },
    { title: 'Ergonomia', authors: [{ name: 'Itiro Iida' }] },
    {
      title: 'Pervasive Information Architecture',
      authors: [{ name: 'Luca Rossati' }, { name: 'Resmini' }]
    },
    { title: 'Criatividade e processos de criação', authors: [{ name: 'Fayga Ostrower' }]}
    
  ]
}

defineProps({
  name: 'dashbordView'
})
</script>

<template>
  <main>
    <NavBar></NavBar>
    <div class="container">
      <div class="content">
        <SectionHeader :pageName="nomePagina"></SectionHeader>
        <SectionOptions :showButton1="true" :button1Label="button1Label" :button1Icon="button1Icon" :button2Label="button2Label" :button2Icon="button2Icon" :button2Link="button2Link" />
        <WorkList :data="data"/>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  overflow-y: scroll;
}
</style>