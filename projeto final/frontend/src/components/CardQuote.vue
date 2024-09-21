<script setup>
function copyText() {
  try {
    navigator.clipboard.writeText(this.text)
  } catch (error) {}
}

defineProps({
  id: String,
  text: String,
  startingPage: String,
  endingPage: String,
  note: String
})
</script>

<template>
  <article class="card">
    <p @click="copyText" class="quote">“&hairsp;{{ text }}&hairsp;”</p>

    <p v-if="note" class="body2">{{ note }}</p>

    <div class="footer">
      <div class="pages">
        <p>p. {{ startingPage }}</p>
        <p v-if="endingPage">-</p>
        <p>{{ endingPage }}</p>
      </div>
      <div class="holder">
        <button class="btn-icon-sm">
          <span class="material-symbols-outlined"> content_copy </span>
        </button>
        <button class="btn-icon-sm">
          <span class="material-symbols-outlined"> edit </span>
        </button>
        <button class="btn-icon-sm">
          <span class="material-symbols-outlined"> more_horiz </span>
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* article {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fafafa;
  padding: 1rem;
  border-radius: 0.5rem;
  align-self: stretch;
} */

.note {
  color: rgba(0, 0, 0, 0.7);
  font-variant-numeric: lining-nums proportional-nums;
  flex: 1 0 0;
}

.quote {
  font-size: 1rem;
  line-height: 200%;
  flex: 1 0 0;
  align-self: stretch;
}

.body2 {
  flex: 1 0 0;
  align-self: stretch;
}

.quote:hover {
  font-weight: 500;
}

.footer {
  display: flex;
  /* gap: 0.5rem; */
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}

.pages {
  display: flex;
  flex-direction: row;
  gap: 0.125rem;
  justify-content: center;
  align-items: center;
}

.pages p {
  color: rgba(0, 0, 0, 0.5);
  font-variant-numeric: lining-nums proportional-nums;

  /* body 2 */
  font-family: var(--body-font, 'Source Sans 3');
  font-size: var(--typography-font-size-body-2, 0.8125rem);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 1.21875rem */
}
</style>
