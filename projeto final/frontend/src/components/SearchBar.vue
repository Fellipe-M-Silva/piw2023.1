<template>
  <form>
    <input type="text"  placeholder="Buscar" />
    <button type="submit" class="btn-icon btn-plain" >
      <span class="material-symbols-outlined"> search </span>
    </button>
  </form>
</template>

<style scoped>
form {
  min-width: 288px;
  max-width: 480px;
  display: flex;
  position:relative;
  align-self: stretch;
}

input {
  min-width: 288px;
  max-width: 480px;
  align-self: stretch;
}

button {
  position: absolute;
  top: 0;
  right: 0%

}
</style>