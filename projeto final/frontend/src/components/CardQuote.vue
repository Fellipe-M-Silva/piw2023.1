<script setup lang="ts">
defineProps({
    quote:String,
    startingPage:Number
})
</script>

<template>
    <article>
        <p class="quote">"{{ quote }}"</p>
        <p><strong>p {{ startingPage }}</strong></p>
    </article>
</template>

<style scoped>
article {
    display: flex;
    flex-direction: column;
    background-color: #FAFAFA;
    padding: 1rem;
    border-radius: 1.5rem;
}

.quote {
    font-size: 1.5rem;
}
</style>